import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translate, type UiKey } from "../i18n/Ui";
import type { Language } from "../data/RestaurantTypes";

export type Theme = "dark" | "light";
type DisplayContextValue = {
    language: Language;
    theme: Theme;
    setLanguage: (value: Language) => void;
    toggleTheme: () => void;
    t: (key: UiKey) => string;
};
const Context = createContext<DisplayContextValue | null>(null);

// Restore user preferences while defaulting to Spanish and the dark appearance.
function initialValue<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
    try {
        const stored = localStorage.getItem(key);
        return allowed.find((value) => value === stored) ?? fallback;
    } catch {
        return fallback;
    }
}

export function DisplayProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => initialValue("blend-demo-language", ["es", "en"], "es"));
    const [theme, setTheme] = useState<Theme>(() => initialValue("blend-demo-theme", ["dark", "light"], "dark"));

    useEffect(() => {
        document.documentElement.lang = language === "es" ? "es-AR" : "en";
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem("blend-demo-language", language);
            localStorage.setItem("blend-demo-theme", theme);
        } catch {
            // The demo also runs when browser storage is disabled.
        }
    }, [language, theme]);

    const value = useMemo<DisplayContextValue>(() => ({
        language, theme, setLanguage,
        toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
        t: (key) => translate(language, key),
    }), [language, theme]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useDisplay(): DisplayContextValue {
    const context = useContext(Context);
    if (!context) throw new Error("useDisplay must be used inside DisplayProvider");
    return context;
}
