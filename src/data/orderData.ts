import type { IconName } from "../components/Icon/Icon"

export const whatsappUrl = "https://api.whatsapp.com/message/IMJQVRCZBSSWN1?autoload=1&app_absent=0&utm_source=ig"

export const benefits: { icon: IconName, title: string }[] = [
	{ icon: "lightning", title: "Pedido directo" },
	{ icon: "burger", title: "Carta completa" },
	{ icon: "payment", title: "Consultá medios de pago" }
]

export const orderOptions: { icon: IconName, title: string, description: string }[] = [
	{ icon: "delivery", title: "ENVÍO A DOMICILIO", description: "Consultá zonas de envío y tiempos estimados por WhatsApp." },
	{ icon: "pickup", title: "RETIRO EN LOCAL", description: "Hacé tu pedido y coordiná para pasar a retirarlo." },
	{ icon: "events", title: "PEDIDOS PARA EVENTOS", description: "Cumples, reuniones y más. Consultanos por WhatsApp." }
]

export const orderSteps = [
	"Hacé clic en el botón de WhatsApp.",
	"Contanos qué querés pedir.",
	"Te confirmamos el pedido y el tiempo estimado.",
	"¡Listo! A disfrutar."
]

export const orderInformation: { icon: IconName, title: string, description: string }[] = [
	{ icon: "clock", title: "NUESTROS HORARIOS", description: "Consultá nuestros días y horarios de atención por WhatsApp." },
	{ icon: "location", title: "ZONAS DE ENVÍO", description: "Consultá zonas de cobertura y tiempos de entrega por WhatsApp." }
]
