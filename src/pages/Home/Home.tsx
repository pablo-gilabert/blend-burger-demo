import { Link } from "react-router-dom"

import bbqDesktop from "../../assets/images/hamb-bbq.png"
import bbqMobile from "../../assets/images/hamb-bbq-mobile.png"
import stacker from "../../assets/images/mila-stacker.png"
import armado from "../../assets/images/hamb-armado.png"
import produccion from "../../assets/images/hamb-producc.png"
import papas from "../../assets/images/papas-sazonadas.png"

import styles from "./home.module.css"

const featuredImages = [
	{ src: armado, alt: "Armado en producción de hamburguesas." },
	{ src: papas, alt: "Papas sazonadas." },
	{ src: produccion, alt: "Hamburguesas preparadas en la cocina de Blend Burger." }
]

const Home = () => {
	return (
		<div className={styles.homePage}>
			<section className={styles.hero} aria-labelledby="home-title">
				<h1 id="home-title">VENÍS POR LA BURGER.<br />TE QUEDÁS POR EL PLAN.</h1>
				<div className={styles.baseline} aria-hidden="true" />
				<p>Smash burgers, milanesas, patio, cumples, eventos y karaoke.</p>

				<picture className={styles.heroPicture}>
					<source media="(min-width: 1024px)" srcSet={bbqDesktop} />
					<img
						src={bbqMobile}
						alt="Hamburguesa con queso cheddar y salsa barbacoa."
						fetchPriority="high"
						decoding="async"
					/>
				</picture>
			</section>

			<section className={styles.featured} aria-labelledby="featured-title">
				<div className={styles.featuredBand}>
					<p>BLEND - BURGER - GUERNICA</p>
				</div>

				<h2 id="featured-title">COMBO DESTACADO</h2>
				<img
					className={styles.featuredImage}
					src={stacker}
					alt="Milanesa de ternera con salsa stacker, pepino, bacon y papas fritas."
					loading="lazy"
					decoding="async"
				/>
				<div className={styles.baseline} aria-hidden="true" />
				<h2>Difícil resistirse.</h2>

				<div className={styles.imageGrid}>
					{featuredImages.map(image => (
						<img key={image.src} src={image.src} alt={image.alt} loading="lazy" decoding="async" />
					))}
				</div>

				<Link className={styles.menuLink} to="/menu">VER CARTA</Link>
			</section>
		</div>
	)
}

export default Home
