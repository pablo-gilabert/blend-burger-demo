import { menuCategories, type MenuCategory, type MenuItem } from "../../data/menuData"
import styles from "./menu.module.css"

const MenuCard = ({ item }: { item: MenuItem }) => {
	return (
		<li className={styles.itemCard}>
			<div className={styles.itemHeading}>
				<h3 className={styles.itemName}>{item.name}</h3>

				{item.price != null && (
					<data className={styles.price} value={item.price}>${item.price.toLocaleString("es-AR")}</data>
				)}
			</div>

			{item.description && <p className={styles.description}>{item.description}</p>}
		</li>
	)
}

const MenuSection = ({ category }: { category: MenuCategory }) => {
	return (
		<section className={styles.category} aria-labelledby={`category-${category.id}`}>
			<header className={styles.categoryHeader}>
				<h2 id={`category-${category.id}`}>{category.title}</h2>
				<p>{category.subtitle}</p>
			</header>

			<ul className={styles.itemList}>
				{category.items.map(item => <MenuCard key={item.name} item={item} />)}
			</ul>
		</section>
	)
}

const Menu = () => {
	return (
		<div className={styles.menuPage}>
			<header className={styles.intro}>
				<h1>NUESTRO MENÚ</h1>
				<p>Smash burgers, milanesas y mucho más.</p>
				<p>Elegí tu próximo favorito.</p>
			</header>

			<div className={styles.categoryGrid}>
				{menuCategories.map(category => <MenuSection key={category.id} category={category} />)}
			</div>
		</div>
	)
}

export default Menu
