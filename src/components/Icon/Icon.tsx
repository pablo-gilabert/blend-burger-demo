import type { ReactNode } from "react"

export type IconName =
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
	className?: string
}

const icons: Record<IconName, ReactNode> = {
	whatsapp: (
		<>
			<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
			<path d="M9 8.5c.3-.4.6-.4.8 0l1 1.5c.2.3.1.5-.2.8l-.5.5a6 6 0 0 0 2.6 2.6l.5-.5c.3-.3.5-.4.8-.2l1.5 1c.4.2.4.5 0 .8-.5.6-1.2.9-1.9.7-2.8-.6-5.1-2.9-5.7-5.7-.2-.7.1-1.4.7-1.9Z" />
		</>
	),
	arrow: (
		<>
			<path d="M4 12h16" />
			<path d="m14 6 6 6-6 6" />
		</>
	),
	lightning: <path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z" />,
	burger: (
		<>
			<path d="M4 10a8 8 0 0 1 16 0H4Z" />
			<path d="M3 13h18" />
			<path d="M4 16h16" />
			<path d="M5 19h14" />
			<path d="M8 7h.01M12 6h.01M16 7h.01" />
		</>
	),
	payment: (
		<>
			<rect x="2" y="5" width="20" height="14" rx="2" />
			<path d="M2 10h20" />
			<path d="M6 15h4" />
		</>
	),
	delivery: (
		<>
			<path d="M3 7h11v9H3Z" />
			<path d="M14 10h4l3 3v3h-7" />
			<circle cx="7" cy="18" r="2" />
			<circle cx="18" cy="18" r="2" />
		</>
	),
	pickup: (
		<>
			<path d="M4 9h16l-1 12H5L4 9Z" />
			<path d="M9 10V7a3 3 0 0 1 6 0v3" />
		</>
	),
	events: (
		<>
			<circle cx="12" cy="7" r="3" />
			<path d="M6 21v-3a6 6 0 0 1 12 0v3" />
			<circle cx="4" cy="10" r="2" />
			<circle cx="20" cy="10" r="2" />
			<path d="M1 19v-2a4 4 0 0 1 4-4" />
			<path d="M23 19v-2a4 4 0 0 0-4-4" />
		</>
	),
	clock: (
		<>
			<circle cx="12" cy="12" r="9" />
			<path d="M12 7v5l3 2" />
		</>
	),
	location: (
		<>
			<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
			<circle cx="12" cy="10" r="3" />
		</>
	)
}

const Icon = ({ name, className }: IconProps) => {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			focusable="false"
			aria-hidden="true"
		>
			{icons[name]}
		</svg>
	)
}

export default Icon
