import assert from "node:assert/strict"
import { readFile, stat } from "node:fs/promises"
import { test } from "node:test"

// Smoke-test the actual files generated for production, rather than source templates.
const readOutput = file => readFile(new URL(`../dist/${file}`, import.meta.url), "utf8")
const readProjectFile = file => readFile(new URL(`../${file}`, import.meta.url), "utf8")
const canonicalOrigin = process.env.VITE_SITE_URL?.replace(/\/$/, "")

const routes = [
	{ file: "index.html", path: "/", title: "Blend Burger en Guernica" },
	{ file: "menu/index.html", path: "/menu", title: "Carta, menú y precios" },
	{ file: "order/index.html", path: "/order", title: "Pedidos por WhatsApp" }
]

test("each public route has one distinct title and description", async () => {
	const titles = []
	const descriptions = []

	for (const route of routes) {
		const html = await readOutput(route.file)
		const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
		const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]
		assert.ok(title?.startsWith(route.title), route.file)
		assert.ok(description?.length > 50, route.file)
		assert.match(html, /name="robots" content="index, follow/)
		titles.push(title)
		descriptions.push(description)

		if (canonicalOrigin) {
			assert.ok(html.includes(`rel="canonical" href="${canonicalOrigin}${route.path}"`), route.file)
			assert.ok(html.includes(`property="og:image" content="${canonicalOrigin}/og-blend-burger.png"`), route.file)
		}
	}

	assert.equal(new Set(titles).size, routes.length)
	assert.equal(new Set(descriptions).size, routes.length)
})

test("menu structured data matches the source catalog and uses ARS prices", async () => {
	const html = await readOutput("menu/index.html")
	const json = html.match(/<script id="seo-structured-data" type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
	assert.ok(json, "Menu JSON-LD must exist in initial HTML")
	const graph = JSON.parse(json)["@graph"]
	const menu = graph.find(entry => entry["@type"] === "Menu")
	assert.ok(menu)
	const items = menu.hasMenuSection.flatMap(section => section.hasMenuItem)
	// Compare the published catalog to the TypeScript source instead of freezing a product count.
	const ts = await import("typescript")
	const source = await readProjectFile("src/data/menuData.ts")
	const compiled = ts.transpileModule(source, {
		compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
	}).outputText
	const { menuCategories } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`)
	const expected = menuCategories.flatMap(category => category.items)
	assert.equal(items.length, expected.length)
	assert.deepEqual(items.map(item => item.name), expected.map(item => item.name))
	assert.ok(items.every(item => item.name && item.offers?.price > 0 && item.offers.priceCurrency === "ARS"))
})

test("404 does not advertise itself to search engines", async () => {
	const html = await readOutput("404.html")
	assert.match(html, /name="robots" content="noindex, follow"/)
	assert.doesNotMatch(html, /rel="canonical"/)
})

test("Vercel redirects the legacy endpoint and maps the real routes", async () => {
	const config = JSON.parse(await readProjectFile("vercel.json"))
	assert.ok(config.redirects.some(rule => rule.source === "/ordernow" && rule.destination === "/order" && rule.permanent === true))
	assert.ok(config.rewrites.some(rule => rule.source === "/menu" && rule.destination === "/menu/index.html"))
	assert.ok(config.rewrites.some(rule => rule.source === "/order" && rule.destination === "/order/index.html"))
})

test("social image and robots are present in the production output", async () => {
	const image = await stat(new URL("../dist/og-blend-burger.png", import.meta.url))
	assert.ok(image.size > 10000)
	const robots = await readOutput("robots.txt")
	assert.match(robots, /User-agent: \*/)

	if (canonicalOrigin) {
		const sitemap = await readOutput("sitemap.xml")
		for (const route of routes) assert.ok(sitemap.includes(`${canonicalOrigin}${route.path}`))
	}
})
