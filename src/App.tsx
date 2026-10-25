import { useLayoutEffect, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AdminShell from "./components/AdminShell/AdminShell";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import NotFound from "./pages/NotFound/NotFound";
import Order from "./pages/Order/Order";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminCatalog from "./pages/AdminCatalog/AdminCatalog";
import AdminHours from "./pages/AdminHours/AdminHours";
import { DisplayProvider, useDisplay } from "./context/DisplayContext";
import { RestaurantProvider, useRestaurant } from "./context/RestaurantContext";
import Seo from "./seo/Seo";
import styles from "./app.module.css";

// Scroll reset follows route changes and respects the existing public SEO implementation.
function RouteEffects() {
    const { pathname } = useLocation();
    useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);
    return null;
}

function RequireAdmin({ children }: { children: ReactNode }) {
    const { loggedIn } = useRestaurant();
    return loggedIn ? children : <Navigate to="/admin/login" replace />;
}

function ApplicationRoutes() {
    const { pathname } = useLocation();
    const { t } = useDisplay();
    const adminArea = pathname.startsWith("/admin");
    return <div className={styles.app}>
        <RouteEffects />
        <Seo />
        {adminArea ? (
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<RequireAdmin><Navigate to="/admin/pedidos" replace /></RequireAdmin>} />
                <Route element={<RequireAdmin><AdminShell /></RequireAdmin>}>
                    <Route path="/admin/pedidos" element={<AdminDashboard />} />
                    <Route path="/admin/productos" element={<AdminCatalog />} />
                    <Route path="/admin/horarios" element={<AdminHours />} />
                </Route>
                <Route path="*" element={<Navigate to="/admin/login" replace />} />
            </Routes>
        ) : <>
            <a href="#main-content" className={styles.skipLink}>{t("skip")}</a>
            <Navbar />
            <main className={styles.content} id="main-content" tabIndex={-1}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/ordernow" element={<Navigate to="/order" replace />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>}
    </div>;
}

export default function App() {
    return <DisplayProvider><RestaurantProvider><ApplicationRoutes /></RestaurantProvider></DisplayProvider>;
}
