import type { ChangeEvent } from "react";
import { useDisplay } from "../../context/DisplayContext";
import styles from "./DisplayControls.module.css";

// Compact controls shared by public pages and the admin interface.
export default function DisplayControls() {
    const { language, theme, setLanguage, toggleTheme, t } = useDisplay();
    return (
        <div className={styles.controls}>
            <label className={styles.language}>
                <img className={styles.flag} src={language === "es" ? "/flags/Spain.svg" : "/flags/UnitedKingdom.svg"} alt="" />
                <select aria-label={t("language")} value={language} onChange={(event: ChangeEvent<HTMLSelectElement>) => setLanguage(event.target.value as "es" | "en")}>
                    <option value="es">ESP</option>
                    <option value="en">EN</option>
                </select>
            </label>
            <button type="button" className={styles.theme} onClick={toggleTheme} aria-label={t("theme")} title={theme === "dark" ? t("light") : t("dark")}>
                <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
                <span className={styles.track}><span className={styles.thumb} /></span>
            </button>
        </div>
    );
}
