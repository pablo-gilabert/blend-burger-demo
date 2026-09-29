export type MenuItem = {
	name: string
	description?: string
	price?: number
}

export const burgers: MenuItem[] = [
	{
		name: "Clásica",
		description: "Medallón, Doble Cheddar, Lechuga, Tomate, Cebolla, Salsa Jack.",
		price: 15000
	},
	{
		name: "Cheese Burger",
		description: "Medallón, Doble Cheddar.",
		price: 14000
	},
	{
		name: "Doble Cheese Burger",
		description: "Doble Medallón, Cuádruple Cheddar.",
		price: 16500
	},
	{
		name: "Triple Cheese Burger",
		description: "Triple Medallón, Cuádruple Cheddar.",
		price: 18500
	},
	{
		name: "Cuádruple Cheese Burger",
		description: "Cuádruple Medallón, Octuple Cheddar.",
		price: 21000
	},
	{
		name: "Quintuple Cheese Burger",
		description: "Quintuple Medallón, Diez Veces Cheddar.",
		price: 22500
	},
	{
		name: "Oklahoma",
		description: "Doble Medallón, Cuádruple Cheddar, Cebolla a la Plancha.",
		price: 17500
	},
	{
		name: "Blend Muzza",
		description: "Doble Medallón, Cuádruple Cheddar, Pan de Papas, Tres Bastones de Muzzarella, Salsa de la Casa.",
		price: 18500
	},
	{
		name: "Blend Tasty",
		description: "Medallón, Cheddar, Lechuga, Tomate, Cebolla, Salsa Tasty.",
		price: 18000
	},
	{
		name: "Blend Tasty Bacon",
		description: "Medallón, Cheddar, Lechuga, Tomate, Cebolla, Salsa Tasty, Crispy.",
		price: 19000
	},
	{
		name: "Not Burger",
		description: "Doble Medallón Vegano, Cuádruple Cheddar.",
		price: 17000
	},
	{
		name: "Michigan",
		description: "Doble Medallón, Cuádruple Cheddar, Bacon en Fetas, Huevos Fritos, Cebolla Caramelizada, Salsa BBQ.",
		price: 18500
	},
	{
		name: "Bacon and Pickles",
		description: "Medallón, Doble Cheddar, Pickles, Lechuga, Cebolla, Bacon, Mayonesa.",
		price: 16000
	},
	{
		name: "Doble Libra",
		description: "Doble Medallón, Cuádruple Cheddar, Salsa Libra, Cebolla en Cubos.",
		price: 17000
	},
	{
		name: "Stacker",
		description: "Doble Medallón, Cuádruple Cheddar, Bacon, Aroz Trizados.",
		price: 17500
	},
	{
		name: "Krispy Burger",
		description: "Medallón, Doble Muzza, Papas Pay, Cebolla Crispy, Salsa BBQ.",
		price: 18500
	},
	{
		name: "Perky's",
		description: "Doble Medallón, Cuádruple Cheddar, Bondiola Desmenuzada, Salsa BBQ.",
		price: 18500
	},
	{
		name: "Perky's Onion",
		description: "Doble Medallón, Cuádruple Cheddar, Bondiola Desmenuzada, Aros de Cebolla, Salsa BBQ.",
		price: 19000
	},
	{
		name: "Blend Pollo Clásica",
		description: "Medallón de Maryland, Lechuga, Tomate, Salsas a Elección.",
		price: 17000
	},
	{
		name: "Blend Pollo",
		description: "Medallón de Pollo, Pan de Papas.",
		price: 15000
	},
	{
		name: "Not Burger Clásica",
		description: "Medallón de Not Chicken, Mayonesa, Cebolla, Lechuga, Tomate.",
		price: 16500
	}
]

export const addons: MenuItem[] = [
	{ 
		name: "Medallón.",
		price: 4000
	},
	{ 
		name: "Not Medallón.",
		price: 5000
	},
	{ 
		name: "Cheddar Fetas x2.",
		price: 2500
	},
	{ 
		name: "Extra de Papas.",
		price: 4000
	},
	{ 
		name: "Bacon Ahumado.",
		price: 3000
	},
	{ 
		name: "Huevo Frito.",
		price: 2000
	},
	{ 
		name: "Lechuga y Tomate.",
		price: 2000
	}
]

export const toppings: MenuItem[] = [
	{ 
		name: "Cheddar.",
		price: 4000
	},
	{ 
		name: "Lluvia de Bacon.",
		price: 4000
	}
]

export const fries: MenuItem[] = [
	{
		name: "Blend de Papas Simple",
		description: "Porción de Papas Fritas.",
		price: 12000
	},
	{
		name: "Blend de Papas Sazonadas",
		description: "Papas Fritas más Sazón a Elección.",
		price: 13000
	},
	{
		name: "Blend de Papas Completas",
		description: "Papas Fritas, Papas Trizadas, Cheddar, Bacon y Verdeo.",
		price: 14000
	},
	{
		name: "Nuggets",
		description: "Diez Unidades con Papas y Salsas a Elección.",
		price: 15500
	},
	{
		name: "Aros de Cebolla",
		description: "Diez Unidades con Papas y Salsas a Elección.",
		price: 15500
	},
	{
		name: "Bastones de Muzza",
		description: "Diez Unidades con Papas y Salsas a Elección.",
		price: 15500
	}
]

export const milanesas: MenuItem[] = [
	{
		name: "Mila a Caballo",
		description: "Milanesa de Ternera, Huevos Fritos y Papas Fritas.",
		price: 26000
	},
	{
		name: "Mila Napo",
		description: "Milanesa de Ternera, Salsa de Tomate Blend, Muzarella, Tomates Frescos y Papas Fritas.",
		price: 26000
	},
	{
		name: "Mila Blend",
		description: "Milanesa de Ternera, Queso Cheddar, Panceta, Verdeo y Papas Fritas.",
		price: 26000
	},
	{
		name: "Mila Americana",
		description: "Milanesa de Ternera, Cebolla Caramelizada, Bacon en Fetas, Huevo Frito y Papas Fritas.",
		price: 26000
	},
	{
		name: "Mila Suiza",
		description: "Milanesa de Ternera, Salsa Blanca, Muzarella Gratinada y Papas Fritas.",
		price: 40000
	},
	{
		name: "Mila a Caballo XXXL",
		description: "Milanesa de Ternera, Huevos Fritos y Papas Fritas.",
		price: 40000
	},
	{
		name: "Mila Napo XXXL",
		description: "Milanesa de Ternera, Salsa de Tomate Blend, Muzarella, Tomates Frescos y Papas Fritas.",
		price: 40000
	},
	{
		name: "Mila Blend XXXL",
		description: "Milanesa de Ternera, Queso Cheddar, Panceta, Verdeo y Papas Fritas.",
		price: 40000
	},
	{
		name: "Mila Americana XXXL",
		description: "Milanesa de Ternera, Cebolla Caramelizada, Bacon en Fetas, Huevo Frito y Papas Fritas.",
		price: 40000
	},
	{
		name: "Mila Suiza XXXL",
		description: "Milanesa de Ternera, Salsa Blanca, Muzarella Gratinada y Papas Fritas.",
		price: 40000
	}
]