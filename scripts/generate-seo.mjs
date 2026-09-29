import { readFile, writeFile, mkdir, rm } from "node:fs/promises"
import { resolve } from "node:path"
import pages from "../src/seo/pages.json" with { type: "json" }
import business from "../src/seo/business.json" with { type: "json" }

const root = resolve(import.meta.dirname, "..")
const dist = resolve(root, "dist")
const originValue = process.env.VITE_SITE_URL || process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VITE_VERCEL_PROJECT_PRODUCTION_URL || ""
const isPreview = [process.env.VERCEL_ENV, process.env.VERCEL_TARGET_ENV, process.env.VITE_VERCEL_TARGET_ENV].includes("preview")

let origin = null

if (originValue.trim()) {
	try {
		const normalized = /^https?:\/\//i.test(originValue.trim()) ? originValue.trim() : `https://${originValue.trim()}`
		const url = new URL(normalized)
		if (!/^https?:$/.test(url.protocol)) throw new Error("Only HTTP(S) URLs are valid")
		if (url.pathname !== "/" || url.search || url.hash) throw new Error("Use the root domain, without a path or query")
		origin = url.origin
	} catch (error) {
		throw new Error(`Invalid VITE_SITE_URL / production domain: ${error.message}`)
	}
} else {
	console.warn("SEO: No production domain was provided. Canonical, absolute social URLs and sitemap will be omitted. Configure VITE_SITE_URL in Vercel or expose VERCEL_PROJECT_PRODUCTION_URL.")
}

const escapeAttribute = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
const escapeXml = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
const encodeJson = data => JSON.stringify(data).replace(/</g, "\\u003c")
const baseHtml = (await readFile(resolve(dist, "index.html"), "utf8"))
	.replace(/<title>[\s\S]*?<\/title>\s*/i, "")
	.replace(/<meta\s+name="description"[^>]*>\s*/i, "")

if (!baseHtml.includes('name="seo-build-slot"')) throw new Error("Missing SEO build slot in built index.html")

// Load the project's existing typed menu data without copying prices or descriptions into this script.
const ts = await import("typescript")
const menuSource = await readFile(resolve(root, "src/data/menuData.ts"), "utf8")
const transpiled = ts.transpileModule(menuSource, {
	compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText
const { menuCategories } = await import(`data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`)

const jsonLd = path => {
	const page = pages[path]
	const restaurant = {
		"@type": "Restaurant",
		...(origin && { "@id": `${origin}/#restaurant`, url: `${origin}/`, hasMenu: `${origin}/menu`, image: `${origin}/og-blend-burger.png` }),
		...business
	}
	const graph = [
		restaurant,
		{
			"@type": "WebSite",
			name: business.name,
			...(origin && { "@id": `${origin}/#website`, url: `${origin}/` }),
			inLanguage: "es-AR"
		},
		{
			"@type": "WebPage",
			name: page.title,
			description: page.description,
			inLanguage: "es-AR",
			...(origin && { about: { "@id": `${origin}/#restaurant` } }),
			...(origin && { url: `${origin}${path === "/" ? "/" : path}` })
		}
	]

	if (path === "/menu") {
		graph.push({
			"@type": "Menu",
			...(origin && { "@id": `${origin}/menu#menu`, url: `${origin}/menu` }),
			name: "Carta de Blend Burger",
			hasMenuSection: menuCategories.map(category => ({
				"@type": "MenuSection",
				name: category.title,
				description: category.subtitle,
				hasMenuItem: category.items.map(item => ({
					"@type": "MenuItem",
					name: item.name,
					...(item.description && { description: item.description }),
					...(item.price != null && {
						offers: { "@type": "Offer", price: item.price, priceCurrency: "ARS" }
					})
				}))
			}))
		})
	}

	return { "@context": "https://schema.org", "@graph": graph }
}

const siteImage = origin ? `${origin}/og-blend-burger.png` : null
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim() || ""

const metadataFor = path => {
	const valid = path in pages && path !== "notFound"
	const page = valid ? pages[path] : pages.notFound
	const canonical = origin && valid ? `${origin}${path === "/" ? "/" : path}` : null
	const rows = [
		`<title>${escapeAttribute(page.title)}</title>`,
		`<meta name="description" content="${escapeAttribute(page.description)}" />`,
		`<meta name="robots" content="${valid && !isPreview ? "index, follow, max-image-preview:large" : "noindex, follow"}" />`,
		`<meta name="seo-preview" content="${isPreview}" />`,
		`<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
		`<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
		`<meta property="og:type" content="website" />`,
		`<meta property="og:locale" content="es_AR" />`,
		`<meta property="og:site_name" content="Blend Burger" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
		`<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`,
		...(canonical ? [`<link rel="canonical" href="${escapeAttribute(canonical)}" />`, `<meta property="og:url" content="${escapeAttribute(canonical)}" />`] : []),
		...(siteImage ? [
			`<meta property="og:image" content="${escapeAttribute(siteImage)}" />`,
			`<meta property="og:image:width" content="1200" />`,
			`<meta property="og:image:height" content="630" />`,
			`<meta property="og:image:alt" content="Blend Burger: hamburguesas y milanesas en Guernica" />`,
			`<meta name="twitter:image" content="${escapeAttribute(siteImage)}" />`
		] : []),
		...(googleVerification ? [`<meta name="google-site-verification" content="${escapeAttribute(googleVerification)}" />`] : []),
		...(valid ? [`<script id="seo-structured-data" type="application/ld+json">${encodeJson(jsonLd(path))}</script>`] : [])
	]
	return rows.join("\n\t\t")
}

const writePage = async (path, file) => {
	const target = resolve(dist, file)
	await mkdir(resolve(target, ".."), { recursive: true })
	await writeFile(target, baseHtml.replace(/<meta\s+name="seo-build-slot"\s+content="pending"\s*\/?>/, metadataFor(path)), "utf8")
}

await writePage("/", "index.html")
await writePage("/menu", "menu/index.html")
await writePage("/order", "order/index.html")
await writePage("notFound", "404.html")

const sitemap = origin ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/menu", "/order"].map(path => `\t<url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`).join("\n")}\n</urlset>\n` : null
const robots = `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`

await writeFile(resolve(dist, "robots.txt"), robots, "utf8")
if (sitemap) await writeFile(resolve(dist, "sitemap.xml"), sitemap, "utf8")
else await rm(resolve(dist, "sitemap.xml"), { force: true })

console.log(`SEO: generated 3 route-specific documents and a 404 page${origin ? ` for ${origin}` : " (domain not configured)"}.`)
