import { useDisplay } from "../../context/DisplayContext";
import type { ProductCategory } from "../../data/RestaurantTypes";
import type { CatalogFilterState } from "../../lib/CatalogFilters";
import styles from "./CatalogFilters.module.css";

type Props = {
    categories: ProductCategory[];
    value: CatalogFilterState;
    onChange: (value: CatalogFilterState) => void;
    resultCount: number;
};

// Shared controls keep public and admin catalog filtering behavior consistent.
export default function CatalogFilters({ categories, value, onChange, resultCount }: Props) {
    const { language, t } = useDisplay();
    const set = <Key extends keyof CatalogFilterState>(key: Key, next: CatalogFilterState[Key]) => {
        onChange({ ...value, [key]: next });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.filters} role="search" aria-label={t("catalogSearchLabel")}>
                <label className={styles.field}>
                    <span>{t("catalogSearchLabel")}</span>
                    <input
                        className={styles.input}
                        type="search"
                        value={value.search}
                        placeholder={t("catalogSearchPlaceholder")}
                        onChange={event => set("search", event.target.value)}
                    />
                </label>
                <label className={styles.field}>
                    <span>{t("catalogAlphabetLabel")}</span>
                    <select
                        className={styles.input}
                        value={value.alphabetical}
                        onChange={event => set("alphabetical", event.target.value as CatalogFilterState["alphabetical"])}
                    >
                        <option value="none">{t("catalogUnsorted")}</option>
                        <option value="asc">{t("catalogAlphabetAsc")}</option>
                        <option value="desc">{t("catalogAlphabetDesc")}</option>
                    </select>
                </label>
                <label className={styles.field}>
                    <span>{t("catalogPriceLabel")}</span>
                    <select
                        className={styles.input}
                        value={value.price}
                        onChange={event => set("price", event.target.value as CatalogFilterState["price"])}
                    >
                        <option value="none">{t("catalogUnsorted")}</option>
                        <option value="asc">{t("catalogPriceAsc")}</option>
                        <option value="desc">{t("catalogPriceDesc")}</option>
                    </select>
                </label>
                <label className={styles.field}>
                    <span>{t("category")}</span>
                    <select className={styles.input} value={value.category} onChange={event => set("category", event.target.value)}>
                        <option value="all">{t("catalogAllCategories")}</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.title[language]}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div className={styles.summary} role="status" aria-live="polite">
                <span>{t("catalogResults")}: <strong>{resultCount}</strong></span>
                <button
                    type="button"
                    className={styles.reset}
                    onClick={() => onChange({ search: "", category: "all", alphabetical: "none", price: "none" })}
                >
                    {t("catalogClearFilters")}
                </button>
            </div>
        </div>
    );
}
