import { Link } from "react-router-dom";
import { useDisplay } from "../../context/DisplayContext";
import logo from "../../assets/icons/logo.jpg";
import styles from "./footer.module.css";

// Preserve the restaurant's branded footer while localizing its call to action.
export default function Footer() {
    const { t } = useDisplay();
    return (
        <footer>
            <section className={styles.redFooter} aria-label={t("orderNow")}>
                <h2>{t("hungry")}</h2>
                <Link to="/order">{t("orderNow")}</Link>
            </section>
            <div className={styles.darkFooter}>
                <div className={styles.brandDetails}><p>BLEND BURGER</p><p>GUERNICA</p></div>
                <img src={logo} alt="Blend Burger" width="100" height="100" loading="lazy" decoding="async" />
            </div>
        </footer>
    );
}
