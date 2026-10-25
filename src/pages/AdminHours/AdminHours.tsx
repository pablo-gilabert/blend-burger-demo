import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { escapeHtml, confirmAction, notifySaved, showDialog, inputField, inputValue } from "../../lib/Dialogs";
import type { OpeningDay } from "../../data/RestaurantTypes";
import styles from "../../styles/AdminShared.module.css";

// The admin can adjust each fictional business day through a SweetAlert2 modal.
export default function AdminHours() {
    const { database, setHours, reset } = useRestaurant();
    const { language, t } = useDisplay();

    const edit = async (day: number) => {
        const original = database.hours[day];
        const dialog = showDialog(language);
        const result = await dialog.fire({
            title: `${t("editHours")} — ${t(`weekday${day}` as Parameters<typeof t>[0])}`,
            html: `
                <label class="blend-dialog-checkbox"><input type="checkbox" data-field="enabled" ${original.enabled ? "checked" : ""}> ${escapeHtml(t("enabled"))}</label>
                ${inputField("open", t("open"), original.open, "time")}
                ${inputField("close", t("close"), original.close, "time")}
            `,
            focusConfirm: false,
            preConfirm: () => {
                const current: OpeningDay = {
                    enabled: Boolean(document.querySelector<HTMLInputElement>(".blend-dialog [data-field='enabled']")?.checked),
                    open: inputValue("open"),
                    close: inputValue("close"),
                };
                if (current.enabled && (!current.open || !current.close || current.open >= current.close)) {
                    dialog.showValidationMessage(t("invalidHours"));
                    return false;
                }
                return current;
            },
        });
        if (result.isConfirmed && result.value) {
            setHours(day, result.value);
            await notifySaved(language);
        }
    };
    const resetAll = async () => {
        if (!await confirmAction(language, t("confirmReset"))) return;
        reset();
        await notifySaved(language);
    };
    return (
        <section>
            <div className={styles.heading}>
                <div><h1>{t("openingHours")}</h1><p>{t("hoursHint")}</p></div>
                <button type="button" className={styles.danger} onClick={() => void resetAll()}>{t("reset")}</button>
            </div>
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead><tr><th>{t("day")}</th><th>{t("status")}</th><th>{t("open")}</th><th>{t("close")}</th><th>{t("actions")}</th></tr></thead>
                    <tbody>{Array.from({ length: 7 }, (_, day) => {
                        const entry = database.hours[day];
                        return <tr key={day}>
                            <td>{t(`weekday${day}` as Parameters<typeof t>[0])}</td>
                            <td>{entry.enabled ? t("enabled") : t("closed")}</td>
                            <td>{entry.enabled ? entry.open : "—"}</td>
                            <td>{entry.enabled ? entry.close : "—"}</td>
                            <td><button type="button" className={styles.ghost} onClick={() => void edit(day)}>{t("editHours")}</button></td>
                        </tr>;
                    })}</tbody>
                </table>
            </div>
        </section>
    );
}
