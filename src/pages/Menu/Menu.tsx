import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { money } from "../../data/RestaurantTypes";
import styles from "./menu.module.css";

// The public catalog uses the browser's editable data while retaining the source menu for SEO.
export default function Menu() {
    const { database } = useRestaurant();
    const { language, t } = useDisplay();
    return (
        <div className={styles.menuPage}>
            <header className={styles.intro}>
                <h1>{t("menuTitle")}</h1>
                <p>{t("menuIntro")}</p>
                <p>{t("menuIntroTwo")}</p>
            </header>
            <div className={styles.categoryGrid}>
                {database.categories.map((category) => (
                    <section className={styles.category} aria-labelledby={`category-${category.id}`} key={category.id}>
                        <header className={styles.categoryHeader}>
                            <h2 id={`category-${category.id}`}>{category.title[language]}</h2>
                            <p>{category.subtitle[language]}</p>
                        </header>
                        <ul className={styles.itemList}>
                            {category.items.filter((product) => product.active).map((product) => (
                                <li key={product.id} className={styles.itemCard}>
                                    <div className={styles.itemHeading}>
                                        <h3 className={styles.itemName}>{product.name[language]}</h3>
                                        <data className={styles.price} value={product.price}>{money(product.price)}</data>
                                    </div>
                                    {product.description[language] && <p className={styles.description}>{product.description[language]}</p>}
                                </li>
                            ))}
                            {category.items.every((product) => !product.active) && <li>{t("noItems")}</li>}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
}
