import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { escapeHtml, inputField, inputValue, confirmAction, notifySaved, showDialog } from "../../lib/Dialogs";
import type { Product } from "../../data/RestaurantTypes";
import { money } from "../../data/RestaurantTypes";
import styles from "../../styles/AdminShared.module.css";

// Every product modification is performed through SweetAlert2 rather than an inline form.
export default function AdminCatalog() {
    const { database, saveProduct, deleteProduct } = useRestaurant();
    const { language, t } = useDisplay();
    const dialog = showDialog(language);

    const editProduct = async (categoryId: string, original?: Product) => {
        const html = [
            inputField("nameEs", t("nameEs"), original?.name.es ?? "", "text", true),
            inputField("nameEn", t("nameEn"), original?.name.en ?? "", "text", true),
            inputField("descEs", t("descriptionEs"), original?.description.es ?? ""),
            inputField("descEn", t("descriptionEn"), original?.description.en ?? ""),
            inputField("price", t("price"), String(original?.price ?? 0), "number", true),
            `<label class="blend-dialog-checkbox"><input type="checkbox" data-field="active" ${original?.active !== false ? "checked" : ""}>${escapeHtml(t("active"))}</label>`,
        ].join("");
        const result = await dialog.fire({
            title: original ? t("editProduct") : t("addProduct"),
            html,
            focusConfirm: false,
            preConfirm: () => {
                const nameEs = inputValue("nameEs");
                const nameEn = inputValue("nameEn");
                const price = Number(inputValue("price"));
                if (!nameEs || !nameEn || !Number.isFinite(price) || price < 0) {
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

    const removeProduct = async (categoryId: string, id: string) => {
        if (!await confirmAction(language, t("confirmDelete"))) return;
        deleteProduct(categoryId, id);
        await notifySaved(language, t("removed"));
    };

    return (
        <section>
            <div className={styles.heading}>
                <div><h1>{t("products")}</h1><p>{t("productHint")}</p></div>
            </div>
            {database.categories.map((category) => (
                <div key={category.id} className={styles.card} style={{ marginBottom: 22 }}>
                    <div className={styles.heading}>
                        <h2>{category.title[language]}</h2>
                        <button type="button" className={styles.button} onClick={() => void editProduct(category.id)}>+ {t("addProduct")}</button>
                    </div>
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead><tr><th>{t("name")}</th><th>{t("price")}</th><th>{t("active")}</th><th>{t("actions")}</th></tr></thead>
                            <tbody>{category.items.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name[language]}</td>
                                    <td>{money(product.price)}</td>
                                    <td>{product.active ? "✓" : "—"}</td>
                                    <td><div className={styles.inlineActions}>
                                        <button type="button" className={styles.ghost} onClick={() => void editProduct(category.id, product)}>{t("editProduct")}</button>
                                        <button type="button" className={styles.danger} onClick={() => void removeProduct(category.id, product.id)}>{t("delete")}</button>
                                    </div></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            ))}
        </section>
    );
}
