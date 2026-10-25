import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DisplayControls from "../../components/DisplayControls/DisplayControls";
import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../data/RestaurantTypes";
import styles from "./AdminLogin.module.css";

// A two-column demo sign-in follows the academic demo's familiar account-preview flow.
export default function AdminLogin() {
    const { t } = useDisplay();
    const { loggedIn, login } = useRestaurant();
    const navigate = useNavigate();
    const [email, setEmail] = useState(ADMIN_EMAIL);
    const [password, setPassword] = useState(ADMIN_PASSWORD);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    if (loggedIn) return <Navigate to="/admin/pedidos" replace />;
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (login(email, password)) navigate("/admin/pedidos", { replace: true });
        else setError(true);
    };
    const quickLogin = () => {
        if (login(ADMIN_EMAIL, ADMIN_PASSWORD)) navigate("/admin/pedidos", { replace: true });
    };
    return (
        <div className={styles.page}>
            <aside className={styles.story}>
                <div className={styles.storyContent}>
                    <Link className={styles.brand} to="/"><span>BLEND</span> BURGER</Link>
                    <div className={styles.storyBody}>
                        <p className={styles.eyebrow}>{t("demo")}</p>
                        <h1>{t("loginStory")}<br /><em>{t("loginStoryAccent")}</em></h1>
                        <p>{t("loginStoryIntro")}</p>
                        <div className={styles.featureGrid}>
                            <div><strong>▣ {t("loginOrders")}</strong><small>{t("loginOrdersText")}</small></div>
                            <div><strong>☰ {t("loginProducts")}</strong><small>{t("loginProductsText")}</small></div>
                            <div><strong>◷ {t("loginHours")}</strong><small>{t("loginHoursText")}</small></div>
                        </div>
                    </div>
                    <span className={styles.storyFooter}>{t("prototype")}</span>
                </div>
            </aside>
            <main className={styles.login} id="main-content">
                <div className={styles.top}><span>{t("prototype")}</span><DisplayControls /></div>
                <div className={styles.wrap}>
                    <div className={styles.lock}>♧</div>
                    <h2>{t("loginTitle")}<br /><em>{t("loginAccent")}</em></h2>
                    <p className={styles.intro}>{t("loginIntro")}</p>
                    <form className={styles.form} onSubmit={submit}>
                        <label>{t("email")}<input type="email" autoComplete="username" required value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); setError(false); }} /></label>
                        <label>{t("password")}
                            <div className={styles.passwordWrap}>
                                <input type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); setError(false); }} />
                                <button type="button" aria-label={showPassword ? t("hidePassword") : t("showPassword")} onClick={() => setShowPassword((value) => !value)}>{showPassword ? "◉" : "◎"}</button>
                            </div>
                        </label>
                        {error && <p role="alert" className={styles.error}>{t("loginError")}</p>}
                        <button type="submit" className={styles.submit}>{t("signIn")} ↗</button>
                    </form>
                    <div className={styles.demoCard}>
                        <strong>{t("demoAccount")}</strong>
                        <p>{t("demoAccountNote")}</p>
                        <code>{ADMIN_EMAIL}</code>
                        <code>{ADMIN_PASSWORD}</code>
                        <button type="button" onClick={quickLogin}>{t("quickLogin")} ↗</button>
                    </div>
                    <Link to="/" className={styles.back}>← {t("publicSite")}</Link>
                </div>
                <footer className={styles.footer}>{t("demoFooter")}</footer>
            </main>
        </div>
    );
}
