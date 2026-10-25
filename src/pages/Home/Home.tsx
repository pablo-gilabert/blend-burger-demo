import { Link } from "react-router-dom";
import { useDisplay } from "../../context/DisplayContext";
import bbqDesktop from "../../assets/images/hamb-bbq.png";
import bbqMobile from "../../assets/images/hamb-bbq-mobile.png";
import stacker from "../../assets/images/mila-stacker.png";
import armado from "../../assets/images/hamb-armado.png";
import produccion from "../../assets/images/hamb-producc.png";
import papas from "../../assets/images/papas-sazonadas.png";
import styles from "./home.module.css";

// The original image layout is preserved; all promotional text follows the selected language.
const images = [
    { src: armado, alt: { es: "Armado de hamburguesas", en: "Burger preparation" } },
    { src: papas, alt: { es: "Papas sazonadas", en: "Seasoned fries" } },
    { src: produccion, alt: { es: "Hamburguesas en la cocina", en: "Burgers prepared in the kitchen" } },
];

export default function Home() {
    const { language, t } = useDisplay();
    return (
        <div className={styles.homePage}>
            <section className={styles.hero} aria-labelledby="home-title">
                <h1 id="home-title">{t("homeHero")}<br />{t("homeHeroSecond")}</h1>
                <div className={styles.baseline} aria-hidden="true" />
                <p>{t("homeLead")}</p>
                <picture className={styles.heroPicture}>
                    <source media="(min-width: 1024px)" srcSet={bbqDesktop} />
                    <img src={bbqMobile} alt={language === "es" ? "Hamburguesa con cheddar y salsa barbacoa" : "Burger with cheddar and barbecue sauce"} fetchPriority="high" decoding="async" />
                </picture>
            </section>
            <section className={styles.featured} aria-labelledby="featured-title">
                <div className={styles.featuredBand}><p>BLEND - BURGER - GUERNICA</p></div>
                <h2 id="featured-title">{t("featured")}</h2>
                <img className={styles.featuredImage} src={stacker} alt={language === "es" ? "Milanesa stacker con papas" : "Stacker schnitzel with fries"} loading="lazy" decoding="async" />
                <div className={styles.baseline} aria-hidden="true" />
                <h2>{t("featuredLead")}</h2>
                <div className={styles.imageGrid}>{images.map((image) => <img key={image.src} src={image.src} alt={image.alt[language]} loading="lazy" decoding="async" />)}</div>
                <Link className={styles.menuLink} to="/menu">{t("viewMenu")}</Link>
            </section>
        </div>
    );
}
