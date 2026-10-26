import { useMemo, useState } from "react";
import CatalogFilters from "../../components/CatalogFilters/CatalogFilters";
import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { money } from "../../data/RestaurantTypes";
import { DEFAULT_CATALOG_FILTERS, filterCatalog, isCatalogSorted, type CatalogEntry } from "../../lib/CatalogFilters";
import styles from "./menu.module.css";

// Public filtering is read-only; edits still come from RestaurantContext/localStorage.
export default function Menu() {
    const { database } = useRestaurant();
    const { language, t } = useDisplay();
    const [filters, setFilters] = useState({ ...DEFAULT_CATALOG_FILTERS });
    const products = useMemo(() => filterCatalog(database.categories, filters, language, true), [database.categories, filters, language]);
    const sorted = isCatalogSorted(filters);

    const productCard = ({ category, product }: CatalogEntry, showCategory = false) => (
        <li key={`${category.id}-${product.id}`} className={styles.itemCard}>
            {showCategory && <span className={styles.categoryBadge}>{category.title[language]}</span>}
            <div className={styles.itemHeading}>
                <h3 className={styles.itemName}>{product.name[language]}</h3>
                {product.price > 0 && <data className={styles.price} value={product.price}>{money(product.price)}</data>}
            </div>
            {product.description[language] && <p className={styles.description}>{product.description[language]}</p>}
        </li>
    );

    return (
        <div className={styles.menuPage}>
            <header className={styles.intro}>
                <h1>{t("menuTitle")}</h1>
                <p>{t("menuIntro")}</p>
                <p>{t("menuIntroTwo")}</p>
            </header>
            <CatalogFilters categories={database.categories} value={filters} onChange={setFilters} resultCount={products.length} />

            <div className={styles.categoryGrid}>
                {products.length === 0 && <p className={styles.empty}>{t("catalogNoMatches")}</p>}

                {products.length > 0 && sorted && (
                    <section className={styles.category} aria-label={t("catalogResults")}>
                        <ul className={styles.itemList}>
                            {products.map(entry => productCard(entry, true))}
                        </ul>
                    </section>
                )}

                {!sorted && database.categories.map(category => {
                    const categoryProducts = products.filter(entry => entry.category.id === category.id);
                    if (!categoryProducts.length) return null;
                    return (
                        <section className={styles.category} aria-labelledby={`category-${category.id}`} key={category.id}>
                            <header className={styles.categoryHeader}>
                                <h2 id={`category-${category.id}`}>{category.title[language]}</h2>
                                <p>{category.subtitle[language]}</p>
                            </header>
                            <ul className={styles.itemList}>
                                {categoryProducts.map(entry => productCard(entry))}
                            </ul>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
