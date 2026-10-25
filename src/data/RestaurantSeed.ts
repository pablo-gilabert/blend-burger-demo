import { menuCategories } from "./menuData";
import type { OpeningHours, RestaurantDatabase } from "./RestaurantTypes";

// Preserve the original Spanish catalog and original prices as the initial seed.
// Editable copies are stored per-browser; this source remains unchanged for SEO generation.
const categoryEnglish: Record<string, [string, string]> = {
    burgers: ["BURGERS", "All include fries."],
    addons: ["EXTRAS", "Customize your order."],
    toppings: ["TOPPINGS", "Customize your order."],
    fries: ["BLEND FRIES", "Sides and snacks."],
    milanesas: ["SCHNITZELS", "XL and XXXL"],
};

// Complete English menu descriptions correspond by index to the original Spanish seed.
// Brand-specific product names remain unchanged where they are proper names.
const englishItems: Record<string, [string, string][]> = {
    burgers: [
        ["Classic", "Beef patty, double cheddar, lettuce, tomato, onion, Jack sauce."],
        ["Cheese Burger", "Beef patty and double cheddar."],
        ["Double Cheese Burger", "Two beef patties and four layers of cheddar."],
        ["Triple Cheese Burger", "Three beef patties and four layers of cheddar."],
        ["Quadruple Cheese Burger", "Four beef patties and eight layers of cheddar."],
        ["Quintuple Cheese Burger", "Five beef patties and ten layers of cheddar."],
        ["Oklahoma", "Two beef patties, four layers of cheddar and grilled onion."],
        ["Blend Mozza", "Two beef patties, cheddar, potato bun, three mozzarella sticks and house sauce."],
        ["Blend Tasty", "Beef patty, cheddar, lettuce, tomato, onion and Tasty sauce."],
        ["Blend Tasty Bacon", "Beef patty, cheddar, lettuce, tomato, onion, Tasty sauce and crispy topping."],
        ["Not Burger", "Two plant-based patties and four layers of cheddar."],
        ["Michigan", "Two beef patties, cheddar, bacon, fried eggs, caramelized onion and BBQ sauce."],
        ["Bacon and Pickles", "Beef patty, double cheddar, pickles, lettuce, onion, bacon and mayonnaise."],
        ["Double Libra", "Two beef patties, cheddar, Libra sauce and diced onion."],
        ["Stacker", "Two beef patties, cheddar, bacon and crispy potato topping."],
        ["Krispy Burger", "Beef patty, mozzarella, shoestring fries, crispy onion and BBQ sauce."],
        ["Perky's", "Two beef patties, cheddar, pulled pork and BBQ sauce."],
        ["Perky's Onion", "Two beef patties, cheddar, pulled pork, onion rings and BBQ sauce."],
        ["Classic Blend Chicken", "Breaded chicken patty, lettuce, tomato and choice of sauces."],
        ["Blend Chicken", "Chicken patty on a potato bun."],
        ["Classic Not Burger", "Plant-based chicken-style patty, mayonnaise, onion, lettuce and tomato."],
    ],
    addons: [
        ["Extra beef patty", ""], ["Plant-based patty", ""], ["Two cheddar slices", ""],
        ["Extra fries", ""], ["Smoked bacon", ""], ["Fried egg", ""], ["Lettuce and tomato", ""],
    ],
    toppings: [
        ["Cheddar", ""], ["Bacon crumble", ""],
    ],
    fries: [
        ["Blend Fries", "Portion of French fries."],
        ["Seasoned Blend Fries", "French fries with your choice of seasoning."],
        ["Loaded Blend Fries", "French fries, crispy potato topping, cheddar, bacon and spring onion."],
        ["Nuggets", "Ten nuggets with fries and choice of sauces."],
        ["Onion Rings", "Ten onion rings with fries and choice of sauces."],
        ["Mozzarella Sticks", "Ten mozzarella sticks with fries and choice of sauces."],
    ],
    milanesas: [
        ["Schnitzel with Eggs", "Beef schnitzel, fried eggs and French fries."],
        ["Neapolitan Schnitzel", "Beef schnitzel, Blend tomato sauce, mozzarella, fresh tomatoes and fries."],
        ["Blend Schnitzel", "Beef schnitzel, cheddar, bacon, spring onion and French fries."],
        ["American Schnitzel", "Beef schnitzel, caramelized onions, bacon, fried egg and fries."],
        ["Swiss Schnitzel", "Beef schnitzel, white sauce, gratinated mozzarella and French fries."],
        ["Schnitzel with Eggs XXXL", "Beef schnitzel, fried eggs and French fries."],
        ["Neapolitan Schnitzel XXXL", "Beef schnitzel, Blend tomato sauce, mozzarella, fresh tomatoes and fries."],
        ["Blend Schnitzel XXXL", "Beef schnitzel, cheddar, bacon, spring onion and French fries."],
        ["American Schnitzel XXXL", "Beef schnitzel, caramelized onions, bacon, fried egg and fries."],
        ["Swiss Schnitzel XXXL", "Beef schnitzel, white sauce, gratinated mozzarella and French fries."],
    ],
};

// Food names are retained as proper names where appropriate. Translate recurring menu terms
// and ingredients so English visitors can understand the original offerings.
function englishCopy(value: string): string {
    const words: [RegExp, string][] = [
        [/Medallón(?:es)?/gi, "beef patty"], [/Doble/gi, "Double"], [/Triple/gi, "Triple"],
        [/Cuádruple/gi, "Quadruple"], [/Quintuple/gi, "Quintuple"], [/Cheddar/gi, "cheddar"],
        [/Lechuga/gi, "lettuce"], [/Tomate(?:s)?/gi, "tomato"], [/Cebolla/gi, "onion"],
        [/Salsa/gi, "sauce"], [/Pan de Papas/gi, "potato bun"], [/Milanesa de Ternera/gi, "beef schnitzel"],
        [/Papas Fritas/gi, "French fries"], [/Papas/gi, "fries"], [/Huevos? Fritos?/gi, "fried egg"],
        [/Mayonesa/gi, "mayonnaise"], [/Bacon/gi, "bacon"], [/Panceta/gi, "bacon"],
        [/Muzzarella|Muzarella|Muzza/gi, "mozzarella"], [/Aros de Cebolla/gi, "onion rings"],
        [/Verdeo/gi, "spring onion"], [/Caramelizada/gi, "caramelized"],
        [/a la Plancha/gi, "grilled"], [/De la Casa/gi, "house"], [/Clásica/gi, "Classic"],
        [/Porción de/gi, "Serving of"], [/Completas/gi, "Loaded"], [/Sazonadas/gi, "Seasoned"],
        [/Nuggets/gi, "Nuggets"], [/Fetas/gi, "slices"], [/Cuádruple/gi, "quadruple"],
        [/Medallón de Pollo/gi, "chicken patty"], [/Medallón Vegano/gi, "plant-based patty"],
        [/Bondiola Desmenuzada/gi, "pulled pork"], [/Pepino/gi, "pickles"],
        [/Queso/gi, "cheese"], [/Crispy/gi, "crispy"], [/Papas Pay/gi, "shoestring fries"],
        [/Papas Trizadas/gi, "crushed fries"], [/Hasta/gi, "up to"], [/Salsas a Elección/gi, "choice of sauces"],
        [/Con /gi, "with "], [/ y /gi, " and "], [/ más /gi, " plus "], [/ de /gi, " of "],
        [/Diez Unidades/gi, "Ten pieces"], [/Tres Bastones/gi, "Three sticks"],
        [/Corte/gi, "Cut"], [/Simple/gi, "Regular"], [/Lluvia/gi, "Sprinkle"],
        [/Extra/gi, "Extra"], [/Fetas x2/gi, "two slices"], [/Napo/gi, "Neapolitan"],
        [/Completa/gi, "Loaded"], [/Cuadruple/gi, "Quadruple"],
    ];
    return words.reduce((result, [pattern, translation]) => result.replace(pattern, translation), value);
}

// These opening hours are fictional and may be edited from the local admin demo.
const defaultHours: OpeningHours = {
    0: { enabled: true, open: "19:00", close: "23:30" },
    1: { enabled: false, open: "19:00", close: "23:30" },
    2: { enabled: true, open: "19:00", close: "23:30" },
    3: { enabled: true, open: "19:00", close: "23:30" },
    4: { enabled: true, open: "19:00", close: "23:30" },
    5: { enabled: true, open: "19:00", close: "23:30" },
    6: { enabled: true, open: "19:00", close: "23:30" },
};

export function createRestaurantSeed(): RestaurantDatabase {
    const categories = menuCategories.map((category) => ({
        id: category.id,
        title: { es: category.title, en: categoryEnglish[category.id]?.[0] ?? category.title },
        subtitle: { es: category.subtitle, en: categoryEnglish[category.id]?.[1] ?? category.subtitle },
        items: category.items.map((item, index) => ({
            id: `${category.id}-${index}`,
            name: { es: item.name, en: englishItems[category.id]?.[index]?.[0] ?? englishCopy(item.name) },
            description: { es: item.description ?? "", en: englishItems[category.id]?.[index]?.[1] ?? englishCopy(item.description ?? "") },
            price: item.price ?? 0,
            active: true,
        })),
    }));
    const featured = categories[0]?.items[0];
    const makeLine = (id: string, quantity: number) => {
        const p = categories.flatMap((category) => category.items).find((item) => item.id === id) ?? featured;
        return p ? { productId: p.id, name: p.name.es, quantity, price: p.price } : null;
    };
    const sampleOne = makeLine("burgers-0", 2);
    const sampleTwo = makeLine("fries-1", 1);
    const now = new Date();
    return {
        version: 1,
        categories,
        hours: structuredClone(defaultHours),
        orders: sampleOne && sampleTwo ? [
            { id: "demo-order-001", customerName: "Cliente Demo", customerPhone: "11 0000 0000", type: "pickup", lines: [sampleOne], note: "Pedido de ejemplo", status: "preparing", payment: "pending", createdAt: new Date(now.getTime() - 40 * 60000).toISOString() },
            { id: "demo-order-002", customerName: "Persona de Prueba", customerPhone: "11 1111 1111", type: "delivery", lines: [sampleTwo], note: "", status: "pending", payment: "paid", createdAt: new Date(now.getTime() - 15 * 60000).toISOString() },
        ] : [],
    };
}
