import { useMemo, useState } from "react";
import CatalogFilters from "../../components/CatalogFilters/CatalogFilters";
import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { escapeHtml, inputField, inputValue, confirmAction, notifySaved, showDialog } from "../../lib/Dialogs";
import type { Product } from "../../data/RestaurantTypes";
import { money } from "../../data/RestaurantTypes";
import { DEFAULT_CATALOG_FILTERS, filterCatalog, isCatalogSorted, type CatalogEntry } from "../../lib/CatalogFilters";
import styles from "../../styles/AdminShared.module.css";

// Administration and public catalog share filtering rules but use different visibility scopes.
export default function AdminCatalog() {
    const { database, saveProduct, deleteProduct } = useRestaurant();
    const { language, t } = useDisplay();
    const [filters, setFilters] = useState({ ...DEFAULT_CATALOG_FILTERS });
    const products = useMemo(() => filterCatalog(database.categories, filters, language), [database.categories, filters, language]);
    const sorted = isCatalogSorted(filters);
    const dialog = showDialog(language);

    const editProduct = async (categoryId: string, original?: Product) => {
        const html = [
            inputField("nameEs", t("nameEs"), original?.name.es ?? "", "text", true),
            inputField("nameEn", t("nameEn"), original?.name.en ?? "", "text", true),
            inputField("descEs", t("descriptionEs"), original?.description.es ?? ""),
            inputField("descEn", t("descriptionEn"), original?.description.en ?? ""),
            `<label class="blend-dialog-field"><span>${escapeHtml(t("price"))}</span><small class="blend-dialog-note">${escapeHtml(t("catalogZeroPriceHint"))}</small><input data-field="price" type="number" min="0" step="1" required value="${escapeHtml(String(original?.price ?? 0))}"></label>`,
            `<label class="blend-dialog-checkbox"><input type="checkbox" data-field="active" ${original?.active !== false ? "checked" : ""}>${escapeHtml(t("active"))}</label>`,
        ].join("");
        const result = await dialog.fire({
            title: original ? t("editProduct") : t("addProduct"),
            html,
            focusConfirm: false,
            preConfirm: () => {
                const nameEs = inputValue("nameEs");
                const nameEn = inputValue("nameEn");
                const priceText = inputValue("price");
                const price = Number(priceText);
                if (!nameEs || !nameEn || priceText === "" || !Number.isInteger(price) || price < 0) {
                    dialog.showValidationMessage(t("invalid"));
                    return false;
                }
                return {
                    id: original?.id ?? crypto.randomUUID(),
                    name: { es: nameEs, en: nameEn },
                    description: { es: inputValue("descEs"), en: inputValue("descEn") },
                    price,
                    active: Boolean(document.querySelector<HTMLInputElement>(".blend-dialog [data-field='active']")?.checked),
                } satisfies Product;
            },
        });
        if (result.isConfirmed && result.value) {
            saveProduct(categoryId, result.value);
            await notifySaved(language);
        }
    };

    const addProduct = async () => {
        let categoryId = filters.category;
        if (categoryId === "all") {
            const result = await dialog.fire({
                title: t("catalogChooseCategory"),
                input: "select",
                inputOptions: Object.fromEntries(database.categories.map(category => [category.id, category.title[language]])),
                inputPlaceholder: t("catalogChooseCategory"),
                inputValidator: value => value ? undefined : t("invalid"),
            });
            if (!result.isConfirmed || typeof result.value !== "string") return;
            categoryId = result.value;
        }
        await editProduct(categoryId);
    };

    const removeProduct = async (categoryId: string, id: string) => {
        if (!await confirmAction(language, t("confirmDelete"))) return;
        deleteProduct(categoryId, id);
        await notifySaved(language, t("removed"));
    };

    const renderRow = ({ category, product }: CatalogEntry, showCategory: boolean) => (
        <tr key={`${category.id}-${product.id}`}>
            <td>{product.name[language]}</td>
            {showCategory && <td>{category.title[language]}</td>}
            <td>{money(product.price)}</td>
            <td>{product.active ? "✓" : "—"}</td>
            <td>
                <div className={styles.inlineActions}>
                    <button type="button" className={styles.ghost} onClick={() => void editProduct(category.id, product)}>{t("editProduct")}</button>
                    <button type="button" className={styles.danger} onClick={() => void removeProduct(category.id, product.id)}>{t("delete")}</button>
                </div>
            </td>
        </tr>
    );

    return (
        <section>
            <div className={styles.heading}>
                <div><h1>{t("products")}</h1><p>{t("productHint")}</p></div>
                <button type="button" className={styles.button} onClick={() => void addProduct()}>+ {t("addProduct")}</button>
            </div>

            <div className={styles.catalogFilters}>
                <CatalogFilters categories={database.categories} value={filters} onChange={setFilters} resultCount={products.length} />
            </div>

            {products.length === 0 && <p className={styles.catalogEmpty}>{t("catalogNoMatches")}</p>}

            {products.length > 0 && sorted && (
                <div className={styles.card}>
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead><tr><th>{t("name")}</th><th>{t("category")}</th><th>{t("price")}</th><th>{t("active")}</th><th>{t("actions")}</th></tr></thead>
                            <tbody>{products.map(entry => renderRow(entry, true))}</tbody>
                        </table>
                    </div>
                </div>
            )}

            {!sorted && database.categories.map(category => {
                const matches = products.filter(entry => entry.category.id === category.id);
                if (!matches.length) return null;
                return (
                    <div key={category.id} className={styles.card} style={{ marginBottom: 22 }}>
                        <div className={styles.heading}>
                            <h2>{category.title[language]}</h2>
                            <button type="button" className={styles.button} onClick={() => void editProduct(category.id)}>+ {t("addProduct")}</button>
                        </div>
                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead><tr><th>{t("name")}</th><th>{t("price")}</th><th>{t("active")}</th><th>{t("actions")}</th></tr></thead>
                                <tbody>{matches.map(entry => renderRow(entry, false))}</tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
