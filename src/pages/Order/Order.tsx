import Icon from "../../components/Icon/Icon";
import { useDisplay } from "../../context/DisplayContext";
import { useRestaurant } from "../../context/RestaurantContext";
import { whatsappUrl } from "../../data/orderData";
import { money, type ServiceType } from "../../data/RestaurantTypes";
import { escapeHtml, inputField, inputValue, notifySaved, showDialog } from "../../lib/Dialogs";
import styles from "./order.module.css";

// WhatsApp ordering remains intact; the extra demo order flow is local-only.
export default function Order() {
    const { language, t } = useDisplay();
    const { database, createOrder } = useRestaurant();
    const products = database.categories.flatMap((category) => category.items).filter((item) => item.active && item.price > 0);
    const benefits = ["benefitOne", "benefitTwo", "benefitThree"] as const;
    const icons = ["lightning", "burger", "payment"] as const;
    const services = [
        { icon: "delivery", title: t("serviceDelivery"), description: t("serviceDeliveryDescription") },
        { icon: "pickup", title: t("servicePickup"), description: t("servicePickupDescription") },
        { icon: "events", title: t("serviceEvents"), description: t("serviceEventsDescription") },
    ] as const;
    const steps = [t("stepOne"), t("stepTwo"), t("stepThree"), t("stepFour")];
    const demoOrder = async () => {
        const dialog = showDialog(language);
        const options = products.map((product) => `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name[language])} — ${money(product.price)}</option>`).join("");
        const result = await dialog.fire({
            title: t("orderDemo"),
            html: [
                `<p class="blend-dialog-note">${escapeHtml(t("orderDemoHint"))}</p>`,
                inputField("name", t("customer"), "", "text", true),
                inputField("phone", t("phone"), "", "tel", true),
                `<label class="blend-dialog-field"><span>${escapeHtml(t("item"))}</span><select data-field="product">${options}</select></label>`,
                inputField("quantity", t("quantity"), "1", "number", true),
                `<label class="blend-dialog-field"><span>${escapeHtml(t("kind"))}</span><select data-field="type"><option value="pickup">${t("pickup")}</option><option value="delivery">${t("delivery")}</option></select></label>`,
                inputField("note", t("note"), ""),
                `<small class="blend-dialog-note">${escapeHtml(t("contactDisclaimer"))}</small>`,
            ].join(""),
            focusConfirm: false,
            preConfirm: () => {
                const name = inputValue("name");
                const phone = inputValue("phone");
                const product = products.find((item) => item.id === inputValue("product"));
                const quantity = Number(inputValue("quantity"));
                if (!name || !phone || !product || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
                    dialog.showValidationMessage(t("invalid"));
                    return false;
                }
                return {
                    customerName: name,
                    customerPhone: phone,
                    type: inputValue("type") as ServiceType,
                    lines: [{ productId: product.id, name: product.name.es, price: product.price, quantity }],
                    note: inputValue("note"),
                    status: "pending" as const,
                    payment: "pending" as const,
                };
            },
        });
        if (!result.isConfirmed || !result.value) return;
        createOrder(result.value);
        await notifySaved(language, t("orderSuccess"));
    };
    return (
        <div className={styles.orderPage}>
            <section className={styles.heroSection} aria-labelledby="order-title">
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <p className={styles.eyebrow}>{t("orderEyebrow")}</p>
                        <h1 className={styles.heroTitle} id="order-title">{t("orderTitle")}<br />{t("orderTitleSecond")}</h1>
                        <p className={styles.heroDescription}>{t("orderLead")}</p>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={t("whatsapp")} className={styles.whatsappButton}>
                            <Icon name="whatsapp" className={styles.icon} />
                            <span>{t("whatsapp")}</span>
                            <Icon name="arrow" className={styles.icon} />
                        </a>
                        <button type="button" className="blend-demo-order-button" onClick={() => void demoOrder()}>{t("orderDemo")}</button>
                        <p className="blend-demo-order-note">{t("orderDemoHint")}</p>
                        <div className={styles.benefits}>{benefits.map((key, index) => (
                            <div key={key} className={styles.benefitItem}><Icon name={icons[index]} className={styles.icon} /><p>{t(key)}</p></div>
                        ))}</div>
                    </div>
                    <aside className={styles.servicePanel} aria-labelledby="order-methods-title">
                        <div className={styles.serviceHeading}><span className={styles.baseline} aria-hidden="true" /><h2 id="order-methods-title">{t("orderServicesTitle")}<br />{t("orderServicesSecond")}</h2></div>
                        <div className={styles.serviceList}>{services.map((option) => <div className={styles.serviceCard} key={option.title}>
                            <div className={styles.serviceIcon}><Icon name={option.icon} className={styles.icon} /></div>
                            <div className={styles.serviceText}><h3>{option.title}</h3><p>{option.description}</p></div>
                        </div>)}</div>
                    </aside>
                </div>
            </section>
            <section className={styles.stepsSection} aria-labelledby="order-steps-title">
                <div className={styles.stepsContainer}><h2 id="order-steps-title">{t("howOrder")}</h2>
                    <ol className={styles.stepsList}>{steps.map((description, index) => <li key={index} className={styles.stepItem}><span className={styles.stepNumber} aria-hidden="true">{index + 1}</span><p>{description}</p></li>)}</ol>
                </div>
                <div className={styles.informationGrid}>
                    {[{ icon: "clock" as const, title: t("hours"), description: t("hoursDescription") }, { icon: "location" as const, title: t("deliveryArea"), description: t("deliveryAreaDescription") }].map((info) => <div className={styles.informationCard} key={info.title}>
                        <div className={styles.informationIcon}><Icon name={info.icon} className={styles.icon} /></div>
                        <div><h3>{info.title}</h3><p>{info.description}</p></div>
                    </div>)}
                </div>
            </section>
            <section className="blend-opening-hours" aria-label={t("openingHours")}>
                <h3>{t("openingHours")}</h3>
                <dl>{Array.from({ length: 7 }, (_, day) => {
                    const hours = database.hours[day];
                    return <div key={day}>
                        <dt>{t(`weekday${day}` as Parameters<typeof t>[0])}</dt>
                        <dd>{hours.enabled ? `${hours.open}–${hours.close}` : t("closed")}</dd>
                    </div>;
                })}</dl>
            </section>
        </div>
    );
}
