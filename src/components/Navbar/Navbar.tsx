import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDisplay } from "../../context/DisplayContext";
import DisplayControls from "../DisplayControls/DisplayControls";
import styles from "./Navbar.module.css";

// A single responsive navigation prevents bilingual labels and controls from overlapping.
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const { t } = useDisplay();
    useEffect(() => { setMenuOpen(false); }, [pathname]);
    useEffect(() => {
        if (!menuOpen) return;
        const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
        window.addEventListener("keydown", onEscape);
        return () => window.removeEventListener("keydown", onEscape);
    }, [menuOpen]);

    const links = [
        { to: "/", title: t("home") },
        { to: "/menu", title: t("menu") },
        { to: "/order", title: t("order") },
        { to: "/admin/login", title: t("login") },
    ];
    return (
        <header className={styles.header}>
            <nav className={styles.nav} aria-label={t("menu")}>
                <Link to="/" className={styles.brand} aria-label="Blend Burger">
                    <span>BLEND</span><strong>BURGER</strong>
                </Link>
                <div className={styles.actions}>
                    <DisplayControls />
                    <button className={styles.menuButton} type="button" aria-label={menuOpen ? t("menuClose") : t("menuOpen")} aria-expanded={menuOpen} aria-controls="blend-primary-nav" onClick={() => setMenuOpen((value) => !value)}>
                        <span /><span /><span />
                    </button>
                </div>
                <div id="blend-primary-nav" className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
                    {links.map(({ to, title }) => (
                        <NavLink key={to} to={to} end={to === "/"} className={({ isActive }: { isActive: boolean }) => `${styles.link} ${isActive ? styles.active : ""}`} onClick={() => setMenuOpen(false)}>
                            {title}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    );
}
