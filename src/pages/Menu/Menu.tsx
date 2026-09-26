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

type MenuItemsProps = {
	items: MenuItem[]
}

const MenuItems = ({ items }: MenuItemsProps) => {
	return (
		<>
			{items.map((item) => (
				<div key={item.name}>
					<p>{item.name}</p>

					{item.description && (
						<p>{item.description}</p>
					)}
				</div>
			))}
		</>
	)
}

import styles from "./menu.module.css"

const Menu = () => {
	return (
		<div>
			<Navbar />

			<main className={styles.main}>
				<section>

					<p>Descubrí nuestras opciones</p>

					<p>BURGERS - TODAS INCLUYEN PAPAS</p>

					<div>

						<div>
							<MenuItems items={burgers} />
						</div>

						<p>ADICIONALES</p>

						<div>
							<MenuItems items={addons} />
						</div>

						<p>TOPPINGS</p>

						<div>
							<MenuItems items={toppings} />
						</div>

						<p>PAPAS BLEND</p>

						<div>
							<MenuItems items={fries} />
						</div>

            			<p>MILANESAS</p>

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