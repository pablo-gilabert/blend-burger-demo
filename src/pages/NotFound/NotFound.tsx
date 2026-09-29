import { Link } from "react-router-dom"

import styles from "./notFound.module.css"

const NotFound = () => {
	return (
		<section className={styles.notFound} aria-labelledby="not-found-title">
			<p className={styles.errorCode}>404</p>
			<h1 id="not-found-title">ESTA PÁGINA NO ESTÁ EN LA CARTA.</h1>
			<p className={styles.description}>
				La dirección que buscás no existe. Volvé al inicio para seguir navegando.
			</p>
			<Link to="/" className={styles.homeLink}>VOLVER AL INICIO <span aria-hidden="true">→</span></Link>
		</section>
	)
}

export default NotFound
