import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import {
	addons,
	burgers,
	fries,
	milanesas,
	toppings,
	type MenuItem
} from "../../data/menuData"
import styles from "./menu.module.css"

type MenuItemsProps = {
	items: MenuItem[]
}

const MenuItems = ({ items }: MenuItemsProps) => {
	return (
		<>
			{items.map((item) => (
				<div className={styles.itemContainer} key={item.name}>

					<div>
						<p className={styles.name}>{item.name}</p>

						{item.price != null && (
							<p className={styles.price}>
								${item.price.toLocaleString("es-AR")}
							</p>
						)}
					</div>

					{item.description && (
						<p className={styles.description}>{item.description}</p>
					)}

				</div>
			))}
		</>
	)
}

const Menu = () => {
	return (
		<div>
			<Navbar />

			<header className={styles.header}>
				<p className={styles.title}>NUESTRO MENÚ</p>
				<p className={styles.subtitle}>Smash burgers, milanesas y mucho más.</p>
				<p className={styles.subtitle}>Elegí tu próximo favorito.</p>
			</header>

			<main className={styles.main}>
				<section className={styles.menuSection}>

					<div>

						<p className={styles.foodTitle}>BURGERS</p>
						<p>Todas incluyen papas.</p>

						<div>
							<MenuItems items={burgers} />
						</div>

						<p className={styles.foodTitle}>ADICIONALES</p>
						<p>Personalizá tu pedido.</p>

						<div>
							<MenuItems items={addons} />
						</div>

						<p className={styles.foodTitle}>TOPPINGS</p>
						<p>Personalizá tu pedido.</p>

						<div>
							<MenuItems items={toppings} />
						</div>

						<p className={styles.foodTitle}>PAPAS BLEND</p>
						<p>Acompañamientos.</p>

						<div>
							<MenuItems items={fries} />
						</div>

						<p className={styles.foodTitle}>MILANESAS</p>
						<p>XL y XXXL</p>

						<div>
							<MenuItems items={milanesas} />
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	)
}

export default Menu