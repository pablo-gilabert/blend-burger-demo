import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DisplayControls from "../DisplayControls/DisplayControls";
import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import styles from "../../styles/AdminShared.module.css";

// All administrative pages share this navigation, sign-out action, and demo warning.
export default function AdminShell() {
    const { t } = useDisplay();
    const { logout } = useRestaurant();
    const navigate = useNavigate();
    return (
        <div className={styles.shell}>
            <header className={styles.topbar}>
                <NavLink to="/" className={styles.brand}><span>BLEND</span> BURGER</NavLink>
                <div className={styles.topActions}>
                    <DisplayControls />
                    <button type="button" className={styles.ghost} onClick={() => { logout(); navigate("/admin/login", { replace: true }); }}>{t("logout")}</button>
                </div>
            </header>
            <div className={styles.layout}>
                <aside className={styles.sidebar} aria-label={t("adminTitle")}>
                    <NavLink to="/admin/pedidos" className={({ isActive }: { isActive: boolean }) => isActive ? styles.active : ""}>{t("orders")}</NavLink>
                    <NavLink to="/admin/productos" className={({ isActive }: { isActive: boolean }) => isActive ? styles.active : ""}>{t("products")}</NavLink>
                    <NavLink to="/admin/horarios" className={({ isActive }: { isActive: boolean }) => isActive ? styles.active : ""}>{t("openingHours")}</NavLink>
                    <NavLink to="/" className="">{t("publicSite")} ↗</NavLink>
                </aside>
                <main className={styles.content} id="main-content">
                    <Outlet />
                    <p className={styles.notice}>{t("localOnly")}</p>
                </main>
            </div>
        </div>
    );
}
