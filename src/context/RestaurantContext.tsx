import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createRestaurantSeed } from "../data/RestaurantSeed";
import { ADMIN_EMAIL, ADMIN_PASSWORD, type DemoOrder, type OpeningDay, type Product, type RestaurantDatabase } from "../data/RestaurantTypes";

const STORAGE_KEY = "blend-burger-admin-demo-v1";
const SESSION_KEY = "blend-burger-admin-session-v1";

type RestaurantContextValue = {
    database: RestaurantDatabase;
    loggedIn: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    saveProduct: (categoryId: string, product: Product) => void;
    deleteProduct: (categoryId: string, productId: string) => void;
    setHours: (weekday: number, hours: OpeningDay) => void;
    createOrder: (details: Omit<DemoOrder, "id" | "createdAt">) => void;
    updateOrder: (id: string, update: Partial<DemoOrder>) => void;
    deleteOrder: (id: string) => void;
    reset: () => void;
};

const Context = createContext<RestaurantContextValue | null>(null);

// Reject obsolete or corrupted local records rather than crashing the public website.
function loadDatabase(): RestaurantDatabase {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return createRestaurantSeed();
        const data: unknown = JSON.parse(stored);
        if (!data || typeof data !== "object") return createRestaurantSeed();
        const database = data as Partial<RestaurantDatabase>;
        if (database.version !== 1 || !Array.isArray(database.categories) || !Array.isArray(database.orders) || !database.hours) return createRestaurantSeed();
        if (database.categories.some((category) => !Array.isArray(category.items))) return createRestaurantSeed();
        return database as RestaurantDatabase;
    } catch {
        return createRestaurantSeed();
    }
}

function sessionExists(): boolean {
    try { return sessionStorage.getItem(SESSION_KEY) === "yes"; } catch { return false; }
}

export function RestaurantProvider({ children }: { children: ReactNode }) {
    const [database, setDatabase] = useState<RestaurantDatabase>(loadDatabase);
    const [loggedIn, setLoggedIn] = useState<boolean>(sessionExists);

    // Only browser storage is used: this is NOT secure authentication or a real database.
    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(database)); } catch { /* storage disabled */ }
    }, [database]);

    const login = (email: string, password: string): boolean => {
        const valid = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
        if (valid) {
            setLoggedIn(true);
            try { sessionStorage.setItem(SESSION_KEY, "yes"); } catch { /* storage disabled */ }
        }
        return valid;
    };
    const logout = () => {
        setLoggedIn(false);
        try { sessionStorage.removeItem(SESSION_KEY); } catch { /* storage disabled */ }
    };

    const saveProduct = (categoryId: string, product: Product) => {
        if (!product.name.es.trim() || !product.name.en.trim() || !Number.isFinite(product.price) || product.price < 0) return;
        setDatabase((current) => ({ ...current, categories: current.categories.map((category) => {
            if (category.id !== categoryId) return category;
            const exists = category.items.some((item) => item.id === product.id);
            return { ...category, items: exists ? category.items.map((item) => item.id === product.id ? product : item) : [...category.items, product] };
        }) }));
    };
    const deleteProduct = (categoryId: string, productId: string) => setDatabase((current) => ({
        ...current, categories: current.categories.map((category) => category.id === categoryId
            ? { ...category, items: category.items.filter((item) => item.id !== productId) } : category),
    }));
    const setHours = (day: number, value: OpeningDay) => {
        if (value.enabled && value.open >= value.close) return;
        setDatabase((current) => ({ ...current, hours: { ...current.hours, [day]: value } }));
    };
    const createOrder = (details: Omit<DemoOrder, "id" | "createdAt">) => setDatabase((current) => ({
        ...current,
        orders: [{ ...details, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...current.orders],
    }));
    const updateOrder = (id: string, patch: Partial<DemoOrder>) => setDatabase((current) => ({
        ...current, orders: current.orders.map((order) => order.id === id ? { ...order, ...patch, id, createdAt: order.createdAt } : order),
    }));
    const deleteOrder = (id: string) => setDatabase((current) => ({ ...current, orders: current.orders.filter((order) => order.id !== id) }));
    const reset = () => setDatabase(createRestaurantSeed());

    const value = useMemo<RestaurantContextValue>(() => ({
        database, loggedIn, login, logout, saveProduct, deleteProduct, setHours, createOrder, updateOrder, deleteOrder, reset,
    // All callbacks intentionally close over the state of the current render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [database, loggedIn]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useRestaurant(): RestaurantContextValue {
    const context = useContext(Context);
    if (!context) throw new Error("useRestaurant requires RestaurantProvider");
    return context;
}
