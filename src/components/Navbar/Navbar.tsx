import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"

import styles from "./navbar.module.css"

const navigationLinks = [
	{ to: "/", label: "INICIO", end: true },
	{ to: "/menu", label: "CARTA", end: false },
	{ to: "/order", label: "PEDIDOS", end: false }
]

const desktopQuery = "(min-width: 1024px)"

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(desktopQuery).matches)
	const menuRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const mediaQuery = window.matchMedia(desktopQuery)

		const handleViewportChange = (event: MediaQueryListEvent) => {
			setIsDesktop(event.matches)

			if (event.matches) {
				setMenuOpen(false)
			}
		}

		mediaQuery.addEventListener("change", handleViewportChange)

		return () => mediaQuery.removeEventListener("change", handleViewportChange)
	}, [])

	useEffect(() => {
		if (!menuOpen || isDesktop) return

		const handleClickOutside = (event: PointerEvent) => {
			const target = event.target as Node

			if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
				setMenuOpen(false)
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMenuOpen(false)
				buttonRef.current?.focus()
			}
		}

		const closeOnScroll = () => setMenuOpen(false)

		document.addEventListener("pointerdown", handleClickOutside)
		document.addEventListener("keydown", handleEscape)
		window.addEventListener("scroll", closeOnScroll, { passive: true })

		return () => {
			document.removeEventListener("pointerdown", handleClickOutside)
			document.removeEventListener("keydown", handleEscape)
			window.removeEventListener("scroll", closeOnScroll)
		}
	}, [menuOpen, isDesktop])

	return (
		<header className={styles.header}>
			<nav className={styles.nav} aria-label="Navegación principal">
				<div className={styles.titleContainer} aria-label="Blend Burger">
					<span className={styles.titleBlend}>BLEND</span>
					<span className={styles.titleBurger}>BURGER</span>
					<span className={styles.baseline} aria-hidden="true" />
				</div>

			{isDesktop ? (
					<>
						{navigationLinks.map(({ to, label, end }) => (
							<NavLink
								key={to}
								to={to}
								end={end}
								className={({ isActive }) => `${styles.desktopLink} ${isActive ? styles.activeLink : ""}`}
							>
								{label}
							</NavLink>
						))}
					</>
				) : (
					<>
						<button
							ref={buttonRef}
							className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ""}`}
							type="button"
							aria-controls="mobile-navigation"
							aria-expanded={menuOpen}
							aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
							onClick={() => setMenuOpen(previous => !previous)}
						>
							<span />
							<span />
							<span />
						</button>

						<div
							id="mobile-navigation"
							ref={menuRef}
							className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
							inert={!menuOpen}
						>
							{navigationLinks.map(({ to, label, end }) => (
								<NavLink
									key={to}
									to={to}
									end={end}
									className={({ isActive }) => isActive ? styles.activeLink : ""}
									onClick={() => setMenuOpen(false)}
								>
									{label}
								</NavLink>
							))}
						</div>
					</>
				)}
			</nav>
		</header>
	)
}

export default Navbar
