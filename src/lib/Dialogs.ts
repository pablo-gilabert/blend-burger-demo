import Swal from "sweetalert2";
import { translate } from "../i18n/Ui";
import type { Language } from "../data/RestaurantTypes";

// A single SweetAlert2 facade keeps confirmation buttons and theming consistent.
export function showDialog(language: Language) {
    const t = (key: Parameters<typeof translate>[1]) => translate(language, key);
    return Swal.mixin({
        customClass: { popup: "blend-dialog", confirmButton: "blend-dialog-confirm", cancelButton: "blend-dialog-cancel" },
        buttonsStyling: false,
        confirmButtonText: t("save"),
        cancelButtonText: t("cancel"),
        showCancelButton: true,
        reverseButtons: true,
        width: "min(95vw, 600px)",
    });
}

// Untrusted client-entered text is escaped before inclusion in dialog HTML.
export function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character] ?? character);
}

export function inputField(key: string, label: string, value: string, type = "text", required = false): string {
    return `<label class="blend-dialog-field"><span>${escapeHtml(label)}</span><input data-field="${key}" type="${type}" value="${escapeHtml(value)}" ${required ? "required" : ""}></label>`;
}

export function inputValue(key: string): string {
    return (Swal.getPopup()?.querySelector<HTMLInputElement>(`[data-field="${key}"]`)?.value ?? "").trim();
}

export async function confirmAction(language: Language, title: string): Promise<boolean> {
    const result = await showDialog(language).fire({
        title, icon: "warning", confirmButtonColor: "#d92e19", confirmButtonText: translate(language, "delete"),
    });
    return result.isConfirmed;
}

export async function notifySaved(language: Language, message: string = translate(language, "saved")): Promise<void> {
    await Swal.fire({ title: message, icon: "success", timer: 1500, showConfirmButton: false, customClass: { popup: "blend-dialog" } });
}
