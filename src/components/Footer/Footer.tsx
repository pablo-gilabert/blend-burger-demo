import { Link } from "react-router-dom"

import logo from "../../assets/icons/logo.jpg"
import styles from "./footer.module.css"

const Footer = () => {
	return (
		<footer>
			<section className={styles.redFooter} aria-label="Realizá tu pedido">
				<h2>¿TENÉS HAMBRE?</h2>
				<Link to="/order">PEDÍ AHORA</Link>
			</section>

			<div className={styles.darkFooter}>
				<div className={styles.brandDetails}>
					<p>BLEND BURGER</p>
					<p>GUERNICA</p>
				</div>

				<img src={logo} alt="Logo de Blend Burger" width="100" height="100" loading="lazy" decoding="async" />
			</div>
		</footer>
	)
}

export default Footer
