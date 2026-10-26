import type { Language, Product, ProductCategory } from "../data/RestaurantTypes";

export type AlphabetOrder = "none" | "asc" | "desc";
export type PriceOrder = "none" | "asc" | "desc";

export type CatalogFilterState = {
    search: string;
    category: string;
    alphabetical: AlphabetOrder;
    price: PriceOrder;
};

export type CatalogEntry = {
    category: ProductCategory;
    product: Product;
    originalIndex: number;
};

export const DEFAULT_CATALOG_FILTERS: CatalogFilterState = {
    search: "",
    category: "all",
    alphabetical: "none",
    price: "none",
};

// Normalize accents and whitespace to make Spanish/English searches forgiving.
function normalize(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

export function filterCatalog(
    categories: ProductCategory[],
    filters: CatalogFilterState,
    language: Language,
    publicOnly = false,
): CatalogEntry[] {
    const query = normalize(filters.search);
    const entries: CatalogEntry[] = [];
    let index = 0;

    for (const category of categories) {
        for (const product of category.items) {
            const originalIndex = index++;
            if (filters.category !== "all" && category.id !== filters.category) continue;
            if (publicOnly && !product.active) continue;

            const haystack = normalize([
                product.name.es, product.name.en,
                product.description.es, product.description.en,
                category.title.es, category.title.en,
            ].join(" "));
            if (query && !haystack.includes(query)) continue;
            entries.push({ category, product, originalIndex });
        }
    }

    if (filters.price === "none" && filters.alphabetical === "none") return entries;

    const collator = new Intl.Collator(language === "es" ? "es-AR" : "en", { sensitivity: "base", numeric: true });
    const alphabeticalDirection = filters.alphabetical === "desc" ? -1 : 1;
    const priceDirection = filters.price === "desc" ? -1 : 1;

    return entries.sort((left, right) => {
        if (filters.price !== "none") {
            const byPrice = (left.product.price - right.product.price) * priceDirection;
            if (byPrice) return byPrice;
        }
        if (filters.alphabetical !== "none") {
            const byName = collator.compare(left.product.name[language], right.product.name[language]) * alphabeticalDirection;
            if (byName) return byName;
        }
        return left.originalIndex - right.originalIndex;
    });
}

export function isCatalogSorted(filters: CatalogFilterState): boolean {
    return filters.price !== "none" || filters.alphabetical !== "none";
}
