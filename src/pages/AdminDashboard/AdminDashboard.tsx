import { useMemo, useState, type ChangeEvent } from "react";
import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { confirmAction, escapeHtml, inputField, inputValue, notifySaved, showDialog } from "../../lib/Dialogs";
import { money, orderTotal, type DemoOrder, type OrderStatus, type PaymentStatus, type ServiceType } from "../../data/RestaurantTypes";
import styles from "../../styles/AdminShared.module.css";

const statusValues: OrderStatus[] = ["pending", "preparing", "ready", "delivered", "cancelled"];
const paymentValues: PaymentStatus[] = ["pending", "paid"];

// The same modal handles customer details and order state changes without inline editors.
export default function AdminDashboard() {
    const { database, createOrder, updateOrder, deleteOrder } = useRestaurant();
    const { language, t } = useDisplay();
    const [filter, setFilter] = useState("all");
    const products = database.categories.flatMap((category) => category.items).filter((product) => product.active);
    const visibleOrders = useMemo(() => database.orders.filter((order) => filter === "all" || order.status === filter), [database.orders, filter]);

    const edit = async (original?: DemoOrder) => {
        const dialog = showDialog(language);
        const selection = (selected: string, values: { id: string; label: string }[]) => values.map((option) => `<option value="${escapeHtml(option.id)}" ${option.id === selected ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
        const chosenProduct = original?.lines[0]?.productId ?? products[0]?.id ?? "";
        const html = [
            inputField("customer", t("customer"), original?.customerName ?? "", "text", true),
            inputField("phone", t("phone"), original?.customerPhone ?? "", "tel", true),
            `<label class="blend-dialog-field"><span>${escapeHtml(t("item"))}</span><select data-field="item">${selection(chosenProduct, products.map((p) => ({ id: p.id, label: `${p.name[language]} — ${money(p.price)}` })))}</select></label>`,
            inputField("quantity", t("quantity"), String(original?.lines[0]?.quantity ?? 1), "number", true),
            `<label class="blend-dialog-field"><span>${escapeHtml(t("kind"))}</span><select data-field="type">${selection(original?.type ?? "pickup", ["pickup", "delivery"].map((id) => ({ id, label: t(id as "pickup" | "delivery") })))}</select></label>`,
            inputField("note", t("note"), original?.note ?? ""),
            `<label class="blend-dialog-field"><span>${escapeHtml(t("status"))}</span><select data-field="status">${selection(original?.status ?? "pending", statusValues.map((id) => ({ id, label: t(id) })))}</select></label>`,
            `<label class="blend-dialog-field"><span>${escapeHtml(t("payment"))}</span><select data-field="payment">${selection(original?.payment ?? "pending", paymentValues.map((id) => ({ id, label: t(id) })))}</select></label>`,
        ].join("");
        const result = await dialog.fire({
            title: original ? t("editOrder") : t("createOrder"),
            html,
            focusConfirm: false,
            preConfirm: () => {
                const productId = inputValue("item");
                const selectedProduct = products.find((product) => product.id === productId);
                const quantity = Number(inputValue("quantity"));
                const name = inputValue("customer");
                const phone = inputValue("phone");
                if (!name || !phone || !selectedProduct || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
                    dialog.showValidationMessage(t("invalid"));
                    return false;
                }
                const details = {
                    customerName: name,
                    customerPhone: phone,
                    type: inputValue("type") as ServiceType,
                    lines: [{ productId, name: selectedProduct.name.es, price: selectedProduct.price, quantity }],
                    note: inputValue("note"),
                    status: inputValue("status") as OrderStatus,
                    payment: inputValue("payment") as PaymentStatus,
                };
                return details;
            },
        });
        if (!result.isConfirmed || !result.value) return;
        if (original) updateOrder(original.id, result.value);
        else createOrder(result.value);
        await notifySaved(language);
    };

    const remove = async (id: string) => {
        if (!await confirmAction(language, t("confirmDelete"))) return;
        deleteOrder(id);
        await notifySaved(language, t("removed"));
    };
    const updateStatus = async (order: DemoOrder, status: OrderStatus) => {
        if (!await confirmAction(language, t("confirmStatus"))) return;
        updateOrder(order.id, { status });
        await notifySaved(language);
    };
    const countActive = database.orders.filter((order) => order.status !== "cancelled").length;
    return (
        <section>
            <div className={styles.heading}>
                <div><h1>{t("ordersTitle")}</h1><p>{t("ordersHint")}</p></div>
                <button className={styles.button} type="button" onClick={() => void edit()}>+ {t("createOrder")}</button>
            </div>
            <div className={styles.stats}>
                <div className={styles.stat}><small>{t("orders")}</small><strong>{countActive}</strong></div>
                <div className={styles.stat}><small>{t("preparing")}</small><strong>{database.orders.filter((order) => order.status === "preparing").length}</strong></div>
                <div className={styles.stat}><small>{t("paid")}</small><strong>{database.orders.filter((order) => order.payment === "paid").length}</strong></div>
            </div>
            <div className={styles.heading}>
                <label>{t("filter")}: <select className={styles.select} value={filter} onChange={(event: ChangeEvent<HTMLSelectElement>) => setFilter(event.target.value)}><option value="all">{t("all")}</option>{statusValues.map((s) => <option key={s} value={s}>{t(s)}</option>)}</select></label>
            </div>
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead><tr><th>{t("date")}</th><th>{t("customer")}</th><th>{t("phone")}</th><th>{t("total")}</th><th>{t("status")}</th><th>{t("payment")}</th><th>{t("actions")}</th></tr></thead>
                    <tbody>{visibleOrders.map((order) => <tr key={order.id}>
                        <td>{new Date(order.createdAt).toLocaleString(language === "es" ? "es-AR" : "en-US")}</td>
                        <td>{order.customerName}</td>
                        <td>{order.customerPhone}</td>
                        <td>{money(orderTotal(order))}</td>
                        <td><select aria-label={t("status")} className={styles.select} value={order.status} onChange={(event: ChangeEvent<HTMLSelectElement>) => void updateStatus(order, event.target.value as OrderStatus)}>{statusValues.map((value) => <option value={value} key={value}>{t(value)}</option>)}</select></td>
                        <td>{t(order.payment)}</td>
                        <td><div className={styles.inlineActions}>
                            <button type="button" className={styles.ghost} onClick={() => void edit(order)}>{t("editOrder")}</button>
                            <button type="button" className={styles.danger} onClick={() => void remove(order.id)}>{t("delete")}</button>
                        </div></td>
                    </tr>)}</tbody>
                </table>
                {visibleOrders.length === 0 && <p className={styles.card}>{t("noOrders")}</p>}
            </div>
        </section>
    );
}
