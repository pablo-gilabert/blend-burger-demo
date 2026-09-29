import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { getStructuredData } from "./jsonLd"
import pages from "./pages.json"

type Metadata = { title: string, description: string }

const getProductionOrigin = () => {
	const configured = import.meta.env.VITE_SITE_URL?.trim()
	const vercel = import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL?.trim()
	const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href

	try {
		if (configured) return new URL(configured).origin
		if (vercel) return new URL(`https://${vercel.replace(/^https?:\/\//, "")}`).origin
		if (canonical) return new URL(canonical).origin
	} catch {
		return null
	}

	return null
}

const initialOrigin = getProductionOrigin()

const setMeta = (field: "name" | "property", key: string, content: string) => {
	let element = document.querySelector<HTMLMetaElement>(`meta[${field}="${key}"]`)

	if (!element) {
		element = document.createElement("meta")
		element.setAttribute(field, key)
		document.head.appendChild(element)
	}

	element.content = content
}

const Seo = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		const path = pathname === "/ordernow" ? "/order" : pathname
		const valid = path === "/" || path === "/menu" || path === "/order"
		const metadata: Metadata = path === "/" ? pages["/"] : path === "/menu" ? pages["/menu"] : path === "/order" ? pages["/order"] : pages.notFound
		const url = initialOrigin && valid ? `${initialOrigin}${path === "/" ? "/" : path}` : null
		const image = initialOrigin ? `${initialOrigin}/og-blend-burger.png` : null
		const preview = document.querySelector<HTMLMetaElement>('meta[name="seo-preview"]')?.content === "true"

		document.title = metadata.title
		setMeta("name", "description", metadata.description)
		setMeta("name", "robots", !valid || preview ? "noindex, follow" : "index, follow, max-image-preview:large")
		setMeta("property", "og:title", metadata.title)
		setMeta("property", "og:description", metadata.description)
		setMeta("property", "og:type", "website")
		setMeta("property", "og:locale", "es_AR")
		setMeta("property", "og:site_name", "Blend Burger")
		setMeta("name", "twitter:card", "summary_large_image")
		setMeta("name", "twitter:title", metadata.title)
		setMeta("name", "twitter:description", metadata.description)

		let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

		if (url) {
			if (!canonical) {
				canonical = document.createElement("link")
				canonical.rel = "canonical"
				document.head.appendChild(canonical)
			}
			canonical.href = url
			setMeta("property", "og:url", url)
		} else {
			canonical?.remove()
			document.querySelector('meta[property="og:url"]')?.remove()
		}

		if (image) {
			setMeta("property", "og:image", image)
			setMeta("property", "og:image:width", "1200")
			setMeta("property", "og:image:height", "630")
			setMeta("property", "og:image:alt", "Blend Burger: hamburguesas y milanesas en Guernica")
			setMeta("name", "twitter:image", image)
		}

		let schema = document.getElementById("seo-structured-data") as HTMLScriptElement | null

		if (valid) {
			if (!schema) {
				schema = document.createElement("script")
				schema.id = "seo-structured-data"
				schema.type = "application/ld+json"
				document.head.appendChild(schema)
			}
			schema.textContent = JSON.stringify(getStructuredData(path, initialOrigin)).replace(/</g, "\\u003c")
		} else {
			schema?.remove()
		}
	}, [pathname])

	return null
}

export default Seo
