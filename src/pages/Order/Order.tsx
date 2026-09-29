import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

import styles from "./order.module.css"

const whatsappUrl = "https://api.whatsapp.com/message/IMJQVRCZBSSWN1?autoload=1&app_absent=0&utm_source=ig"

type IconName =
	| "whatsapp"
	| "arrow"
	| "lightning"
	| "burger"
	| "payment"
	| "delivery"
	| "pickup"
	| "events"
	| "clock"
	| "location"

type IconProps = {
	name: IconName
}

const Icon = ({ name }: IconProps) => {
	return (
		<svg
			className={styles.icon}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{name === "whatsapp" && (
				<>
					<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
					<path d="M9 8.5c.3-.4.6-.4.8 0l1 1.5c.2.3.1.5-.2.8l-.5.5a6 6 0 0 0 2.6 2.6l.5-.5c.3-.3.5-.4.8-.2l1.5 1c.4.2.4.5 0 .8-.5.6-1.2.9-1.9.7-2.8-.6-5.1-2.9-5.7-5.7-.2-.7.1-1.4.7-1.9Z" />
				</>
			)}

			{name === "arrow" && (
				<>
					<path d="M4 12h16" />
					<path d="m14 6 6 6-6 6" />
				</>
			)}

			{name === "lightning" && (
				<path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z" />
			)}

			{name === "burger" && (
				<>
					<path d="M4 10a8 8 0 0 1 16 0H4Z" />
					<path d="M3 13h18" />
					<path d="M4 16h16" />
					<path d="M5 19h14" />
					<path d="M8 7h.01M12 6h.01M16 7h.01" />
				</>
			)}

			{name === "payment" && (
				<>
					<rect x="2" y="5" width="20" height="14" rx="2" />
					<path d="M2 10h20" />
					<path d="M6 15h4" />
				</>
			)}

			{name === "delivery" && (
				<>
					<path d="M3 7h11v9H3Z" />
					<path d="M14 10h4l3 3v3h-7" />
					<circle cx="7" cy="18" r="2" />
					<circle cx="18" cy="18" r="2" />
				</>
			)}

			{name === "pickup" && (
				<>
					<path d="M4 9h16l-1 12H5L4 9Z" />
					<path d="M9 10V7a3 3 0 0 1 6 0v3" />
				</>
			)}

			{name === "events" && (
				<>
					<circle cx="12" cy="7" r="3" />
					<path d="M6 21v-3a6 6 0 0 1 12 0v3" />
					<circle cx="4" cy="10" r="2" />
					<circle cx="20" cy="10" r="2" />
					<path d="M1 19v-2a4 4 0 0 1 4-4" />
					<path d="M23 19v-2a4 4 0 0 0-4-4" />
				</>
			)}

			{name === "clock" && (
				<>
					<circle cx="12" cy="12" r="9" />
					<path d="M12 7v5l3 2" />
				</>
			)}

			{name === "location" && (
				<>
					<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
					<circle cx="12" cy="10" r="3" />
				</>
			)}
		</svg>
	)
}

const benefits: { icon: IconName, title: string }[] = [
	{
		icon: "lightning",
		title: "Pedido directo"
	},
	{
		icon: "burger",
		title: "Carta completa"
	},
	{
		icon: "payment",
		title: "Consultá medios de pago"
	}
]

const orderOptions: {
	icon: IconName
	title: string
	description: string
}[] = [
	{
		icon: "delivery",
		title: "ENVÍO A DOMICILIO",
		description: "Consultá zonas de envío y tiempos estimados por WhatsApp."
	},
	{
		icon: "pickup",
		title: "RETIRO EN LOCAL",
		description: "Hacé tu pedido y coordiná para pasar a retirarlo."
	},
	{
		icon: "events",
		title: "PEDIDOS PARA EVENTOS",
		description: "Cumples, reuniones y más. Consultanos por WhatsApp."
	}
]

const orderSteps = [
	{
		number: "1",
		description: "Hacé clic en el botón de WhatsApp."
	},
	{
		number: "2",
		description: "Contanos qué querés pedir."
	},
	{
		number: "3",
		description: "Te confirmamos el pedido y el tiempo estimado."
	},
	{
		number: "4",
		description: "¡Listo! A disfrutar."
	}
]

const Order = () => {
	return (
		<div className={styles.orderPage}>
			<Navbar />

			<main>
				<section className={styles.heroSection}>
					<div className={styles.heroContainer}>

						<div className={styles.heroContent}>
							<p className={styles.eyebrow}>
								PEDÍ DE FORMA FÁCIL
							</p>

							<h1 className={styles.heroTitle}>
								TU BURGER
								<br />
								EN MINUTOS
							</h1>

							<p className={styles.heroDescription}>
								Hacé tu pedido por WhatsApp y coordinamos todo directamente con vos.
							</p>

							<a
								href={whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.whatsappButton}
							>
								<Icon name="whatsapp" />

								<span>PEDIR POR WHATSAPP</span>

								<Icon name="arrow" />
							</a>

							<div className={styles.benefits}>
								{benefits.map((benefit) => (
									<div
										className={styles.benefitItem}
										key={benefit.title}
									>
										<Icon name={benefit.icon} />

										<p>{benefit.title}</p>
									</div>
								))}
							</div>
						</div>

						<aside className={styles.servicePanel}>
							<div className={styles.serviceHeading}>
								<span className={styles.baseline}></span>

								<h2>
									DISFRUTÁ
									<br />
									DONDE QUIERAS
								</h2>
							</div>

							<div className={styles.serviceList}>
								{orderOptions.map((option) => (
									<div
										className={styles.serviceCard}
										key={option.title}
									>
										<div className={styles.serviceIcon}>
											<Icon name={option.icon} />
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

				<section className={styles.stepsSection}>
					<div className={styles.stepsContainer}>
						<h2>¿CÓMO PEDIR?</h2>

						<ol className={styles.stepsList}>
							{orderSteps.map((step) => (
								<li
									className={styles.stepItem}
									key={step.number}
								>
									<span className={styles.stepNumber}>
										{step.number}
									</span>

									<p>{step.description}</p>
								</li>
							))}
						</ol>
					</div>

					<div className={styles.informationGrid}>

						<div className={styles.informationCard}>
							<div className={styles.informationIcon}>
								<Icon name="clock" />
							</div>

							<div>
								<h3>NUESTROS HORARIOS</h3>

								<p>
									Consultá nuestros días y horarios de atención por WhatsApp.
								</p>
							</div>
						</div>

						<div className={styles.informationCard}>
							<div className={styles.informationIcon}>
								<Icon name="location" />
							</div>

							<div>
								<h3>ZONAS DE ENVÍO</h3>

								<p>
									Consultá zonas de cobertura y tiempos de entrega por WhatsApp.
								</p>
							</div>
						</div>

					</div>
				</section>
			</main>

			<Footer />
		</div>
	)
}

export default Order