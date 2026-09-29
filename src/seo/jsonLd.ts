import { menuCategories } from "../data/menuData"
import business from "./business.json"
import pages from "./pages.json"

const restaurant = (origin: string | null) => ({
	"@type": "Restaurant",
	...(origin && { "@id": `${origin}/#restaurant`, url: `${origin}/`, hasMenu: `${origin}/menu`, image: `${origin}/og-blend-burger.png` }),
	...business
})

const menuSchema = (origin: string | null) => ({
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
				offers: {
					"@type": "Offer",
					price: item.price,
					priceCurrency: "ARS"
				}
			})
		}))
	}))
})

export const getStructuredData = (pathname: string, origin: string | null) => {
	const path = pathname === "/menu" || pathname === "/order" ? pathname : "/"
	const currentPage = path === "/menu" ? pages["/menu"] : path === "/order" ? pages["/order"] : pages["/"]

	return {
		"@context": "https://schema.org",
		"@graph": [
			restaurant(origin),
			{
				"@type": "WebSite",
				name: business.name,
				...(origin && { "@id": `${origin}/#website`, url: `${origin}/` }),
				inLanguage: "es-AR"
			},
			{
				"@type": "WebPage",
				name: currentPage.title,
				description: currentPage.description,
				inLanguage: "es-AR",
				...(origin && { about: { "@id": `${origin}/#restaurant` } }),
				...(origin && { url: `${origin}${path === "/" ? "/" : path}` })
			},
			...(pathname === "/menu" ? [menuSchema(origin)] : [])
		]
	}
}
