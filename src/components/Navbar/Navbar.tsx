import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import logo from "../../assets/icons/logo.jpg"

import styles from "./navbar.module.css"

const navigationLinks = [
	{
		to: "/",
		label: "INICIO"
	},
	{
		to: "/menu",
		label: "MENU"
	},
	{
		to: "/about",
		label: "NOSOTROS"
	},
	{
		to: "/contact",
		label: "CONTACTO"
	},
	{
		to: "/ordernow",
		label: "PEDIR AHORA"
	}
]

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	const [isDesktop, setIsDesktop] = useState(() =>
		window.matchMedia("(min-width: 1024px)").matches
	)

	const menuRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev)
	}

	const closeMenu = () => {
		setMenuOpen(false)
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1024px)")

		const handleViewportChange = (event: MediaQueryListEvent) => {
			setIsDesktop(event.matches)

			if (event.matches) {
				setMenuOpen(false)
			}
		}

		mediaQuery.addEventListener("change", handleViewportChange)

		return () => {
			mediaQuery.removeEventListener("change", handleViewportChange)
		}
	}, [])

	useEffect(() => {
		if (!menuOpen || isDesktop) {
			return
		}

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node

			const clickedOutsideMenu =
				menuRef.current && !menuRef.current.contains(target)

			const clickedOutsideButton =
				buttonRef.current && !buttonRef.current.contains(target)

			if (clickedOutsideMenu && clickedOutsideButton) {
				setMenuOpen(false)
			}
		}

		const handleScroll = () => {
			setMenuOpen(false)
		}

		document.addEventListener("mousedown", handleClickOutside)
		window.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
			window.removeEventListener("scroll", handleScroll)
		}
	}, [menuOpen, isDesktop])

	return (
		<header>
			<nav className={styles.nav}>
				<Link
					to="/"
					className={styles.logoLink}
					onClick={closeMenu}
				>
					<img
						src={logo}
						alt="Blend Burger"
						className={styles.logo}
					/>
				</Link>

				{isDesktop ? (
					navigationLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={styles.desktopLink}
						>
							{link.label}
						</Link>
					))
				) : (
					<>
						<button
							ref={buttonRef}
							className={`${styles.menuButton} ${
								menuOpen ? styles.menuButtonOpen : ""
							}`}
							type="button"
							onClick={toggleMenu}
							aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
							aria-expanded={menuOpen}
						>
							<span></span>
							<span></span>
							<span></span>
						</button>

						<div
							ref={menuRef}
							className={`${styles.menu} ${
								menuOpen ? styles.menuOpen : ""
							}`}
						>
							{navigationLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									onClick={closeMenu}
								>
									{link.label}
								</Link>
							))}
						</div>
					</>
				)}
			</nav>
		</header>
	)
}

export default Navbar