// Shared browser-only records used by the menu, ordering demo, and administration pages.
export type Language = "es" | "en";
export type Localized = Record<Language, string>;
export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid";
export type ServiceType = "delivery" | "pickup";

export type Product = {
    id: string;
    name: Localized;
    description: Localized;
    price: number;
    active: boolean;
};

export type ProductCategory = {
    id: string;
    title: Localized;
    subtitle: Localized;
    items: Product[];
};

export type OpeningDay = { enabled: boolean; open: string; close: string };
export type OpeningHours = Record<number, OpeningDay>;
export type OrderLine = { productId: string; name: string; price: number; quantity: number };
export type DemoOrder = {
    id: string;
    customerName: string;
    customerPhone: string;
    type: ServiceType;
    lines: OrderLine[];
    note: string;
    status: OrderStatus;
    payment: PaymentStatus;
    createdAt: string;
};

export type RestaurantDatabase = {
    version: 1;
    categories: ProductCategory[];
    hours: OpeningHours;
    orders: DemoOrder[];
};

export const ADMIN_EMAIL = "admin@demo.blendburger";
export const ADMIN_PASSWORD = "Demo2026!";

export function money(value: number): string {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}

export function orderTotal(order: DemoOrder): number {
    return order.lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
