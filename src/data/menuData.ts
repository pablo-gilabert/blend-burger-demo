export type MenuItem = {
	name: string
	description?: string
}

export const burgers: MenuItem[] = [
	{
		name: "Clásica",
		description: "Medallón, Doble Cheddar, Lechuga, Tomate, Cebolla, Salsa Jack."
	},
	{
		name: "Cheese Burger",
		description: "Medallón, Doble Cheddar."
	},
	{
		name: "Doble Cheese Burger",
		description: "Doble Medallón, Cuádruple Cheddar."
	},
	{
		name: "Triple Cheese Burger",
		description: "Triple Medallón, Cuádruple Cheddar."
	},
	{
		name: "Cuádruple Cheese Burger",
		description: "Cuádruple Medallón, Octuple Cheddar."
	},
	{
		name: "Quintuple Cheese Burger",
		description: "Quintuple Medallón, Diez Veces Cheddar."
	},
	{
		name: "Oklahoma",
		description: "Doble Medallón, Cuádruple Cheddar, Cebolla a la Plancha."
	},
	{
		name: "Blend Muzza",
		description: "Doble Medallón, Cuádruple Cheddar, Pan de Papas, Tres Bastones de Muzzarella, Salsa de la Casa."
	},
	{
		name: "Blend Tasty",
		description: "Medallón, Cheddar, Lechuga, Tomate, Cebolla, Salsa Tasty."
	},
	{
		name: "Blend Tasty Bacon",
		description: "Medallón, Cheddar, Lechuga, Tomate, Cebolla, Salsa Tasty, Crispy."
	},
	{
		name: "Not Burger",
		description: "Doble Medallón Vegano, Cuádruple Cheddar."
	},
	{
		name: "Michigan",
		description: "Doble Medallón, Cuádruple Cheddar, Bacon en Fetas, Huevos Fritos, Cebolla Caramelizada, Salsa BBQ."
	},
	{
		name: "Bacon and Pickles",
		description: "Medallón, Doble Cheddar, Pickles, Lechuga, Cebolla, Bacon, Mayonesa."
	},
	{
		name: "Doble Libra",
		description: "Doble Medallón, Cuádruple Cheddar, Salsa Libra, Cebolla en Cubos."
	},
	{
		name: "Stacker",
		description: "Doble Medallón, Cuádruple Cheddar, Bacon, Aroz Trizados."
	},
	{
		name: "Krispy Burger",
		description: "Medallón, Doble Muzza, Papas Pay, Cebolla Crispy, Salsa BBQ."
	},
	{
		name: "Perky's",
		description: "Doble Medallón, Cuádruple Cheddar, Bondiola Desmenuzada, Salsa BBQ."
	},
	{
		name: "Perky's Onion",
		description: "Doble Medallón, Cuádruple Cheddar, Bondiola Desmenuzada, Aros de Cebolla, Salsa BBQ."
	},
	{
		name: "Blend Pollo Clásica",
		description: "Medallón de Maryland, Lechuga, Tomate, Salsas a Elección."
	},
	{
		name: "Blend Pollo",
		description: "Medallón de Pollo, Pan de Papas."
	},
	{
		name: "Not Burger Clásica",
		description: "Medallón de Not Chicken, Mayonesa, Cebolla, Lechuga, Tomate."
	}
]

export const addons: MenuItem[] = [
	{ name: "Medallón." },
	{ name: "Not Medallón." },
	{ name: "Cheddar Fetas x2." },
	{ name: "Extra de Papas." },
	{ name: "Bacon Ahumado." },
	{ name: "Huevo Frito." },
	{ name: "Lechuga y Tomate." }
]

export const toppings: MenuItem[] = [
	{ name: "Cheddar." },
	{ name: "Lluvia de Bacon." }
]

export const fries: MenuItem[] = [
	{
		name: "Blend de Papas Simple",
		description: "Porción de Papas Fritas."
	},
	{
		name: "Blend de Papas Sazonadas",
		description: "Papas Fritas más Sazón a Elección."
	},
	{
		name: "Blend de Papas Completas",
		description: "Papas Fritas, Papas Trizadas, Cheddar, Bacon y Verdeo."
	},
	{
		name: "Nuggets",
		description: "Diez Unidades con Papas y Salsas a Elección."
	},
	{
		name: "Aros de Cebolla",
		description: "Diez Unidades con Papas y Salsas a Elección."
	},
	{
		name: "Bastones de Muzza",
		description: "Diez Unidades con Papas y Salsas a Elección."
	}
]

export const milanesas: MenuItem[] = [
	{
		name: "Mila a Caballo XL / XXXL",
		description: "Milanesa de Ternera, Huevos Fritos y Papas Fritas."
	},
	{
		name: "Mila Napo XL / XXXL",
		description: "Milanesa de Ternera, Salsa de Tomate Blend, Muzarella, Tomates Frescos y Papas Fritas."
	},
	{
		name: "Mila Blend XL / XXXL",
		description: "Milanesa de Ternera, Queso Cheddar, Panceta, Verdeo y Papas Fritas."
	},
	{
		name: "Mila Americana XXXL",
		description: "Milanesa de Ternera, Cebolla Caramelizada, Bacon en Fetas, Huevo Frito y Papas Fritas."
	},
	{
		name: "Mila Suiza XXXL",
		description: "Milanesa de Ternera, Salsa Blanca, Muzarella Gratinada y Papas Fritas."
	}
]