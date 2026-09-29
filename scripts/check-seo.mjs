import assert from "node:assert/strict"
import { readFile, access } from "node:fs/promises"

const getPage = async filename => await readFile(new URL(`../dist/${filename}`, import.meta.url), "utf8")
const routes = [
	["index.html", "Blend Burger en Guernica"],
	["menu/index.html", "Carta, menú y precios"],
	["order/index.html", "Pedidos por WhatsApp"]
]

for (const [file, title] of routes) {
	const html = await getPage(file)
	assert.ok(html.includes(`<title>${title}`), `${file} has the wrong title`)
	assert.equal((html.match(/<title>/g) || []).length, 1, `${file} has multiple titles`)
	assert.equal((html.match(/<meta name="description"/g) || []).length, 1, `${file} has multiple descriptions`)
	assert.ok(html.includes('application/ld+json'), `${file} is missing structured data`)
	assert.ok(html.includes('og:title'), `${file} is missing Open Graph`)
	assert.ok(html.includes('name="robots"'), `${file} is missing robots metadata`)
}

const menu = await getPage("menu/index.html")
assert.ok(menu.includes('"@type":"Menu"'), "Menu structured data is missing")
assert.ok(menu.includes('"priceCurrency":"ARS"'), "Prices must identify the ARS currency")
const notFound = await getPage("404.html")
assert.ok(notFound.includes('noindex, follow'), "The 404 page must not be indexed")
assert.ok(!notFound.includes('rel="canonical"'), "404 cannot point to a canonical URL")
await access(new URL("../dist/robots.txt", import.meta.url))
await access(new URL("../dist/og-blend-burger.png", import.meta.url))

console.log("SEO checks: 3 unique route titles/descriptions, structured data, menu prices, 404 noindex, robots, and OG image passed.")
