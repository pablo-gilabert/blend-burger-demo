import Icon from "../../components/Icon/Icon"
import { benefits, orderInformation, orderOptions, orderSteps, whatsappUrl } from "../../data/orderData"
import styles from "./order.module.css"

const Order = () => {
	return (
		<div className={styles.orderPage}>
			<section className={styles.heroSection} aria-labelledby="order-title">
				<div className={styles.heroContainer}>
					<div className={styles.heroContent}>
						<p className={styles.eyebrow}>PEDÍ DE FORMA FÁCIL</p>
						<h1 className={styles.heroTitle} id="order-title">TU BURGER<br />EN MINUTOS</h1>
						<p className={styles.heroDescription}>
							Hacé tu pedido por WhatsApp y coordinamos todo directamente con vos.
						</p>

						<a
							href={whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Pedir por WhatsApp (se abre en una pestaña nueva)"
							className={styles.whatsappButton}
						>
							<Icon name="whatsapp" className={styles.icon} />
							<span>PEDIR POR WHATSAPP</span>
							<Icon name="arrow" className={styles.icon} />
						</a>

						<div className={styles.benefits}>
							{benefits.map(benefit => (
								<div className={styles.benefitItem} key={benefit.title}>
									<Icon name={benefit.icon} className={styles.icon} />
									<p>{benefit.title}</p>
								</div>
							))}
						</div>
					</div>

					<aside className={styles.servicePanel} aria-labelledby="order-methods-title">
						<div className={styles.serviceHeading}>
							<span className={styles.baseline} aria-hidden="true" />
							<h2 id="order-methods-title">DISFRUTÁ<br />DONDE QUIERAS</h2>
						</div>

						<div className={styles.serviceList}>
							{orderOptions.map(option => (
								<div className={styles.serviceCard} key={option.title}>
									<div className={styles.serviceIcon}>
										<Icon name={option.icon} className={styles.icon} />
									</div>
									<div className={styles.serviceText}>
										<h3>{option.title}</h3>
										<p>{option.description}</p>
									</div>
								</div>
							))}
						</div>
					</aside>
				</div>
			</section>

			<section className={styles.stepsSection} aria-labelledby="order-steps-title">
				<div className={styles.stepsContainer}>
					<h2 id="order-steps-title">¿CÓMO PEDIR?</h2>

					<ol className={styles.stepsList}>
						{orderSteps.map((description, index) => (
							<li className={styles.stepItem} key={description}>
								<span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
								<p>{description}</p>
							</li>
						))}
					</ol>
				</div>

				<div className={styles.informationGrid}>
					{orderInformation.map(info => (
						<div className={styles.informationCard} key={info.title}>
							<div className={styles.informationIcon}>
								<Icon name={info.icon} className={styles.icon} />
							</div>
							<div>
								<h3>{info.title}</h3>
								<p>{info.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default Order
