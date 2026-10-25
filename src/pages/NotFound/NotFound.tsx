import { Link } from "react-router-dom";
import { useDisplay } from "../../context/DisplayContext";
import styles from "./notFound.module.css";

// Both locales share the original branded 404 styling and navigation.
export default function NotFound() {
    const { t } = useDisplay();
    return <section className={styles.notFound} aria-labelledby="not-found-title">
        <p className={styles.errorCode}>404</p>
        <h1 id="not-found-title">{t("notFound")}</h1>
        <p className={styles.description}>{t("notFoundHint")}</p>
        <Link to="/" className={styles.homeLink}>{t("backHome")} →</Link>
    </section>;
}
