"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { useLocaleStore } from "./use-locale-store";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";

export const Providers = ({ children }: { children: React.ReactNode }) => {

    const { locale } = useLocaleStore();
    const [messages, setMessages] = useState<AbstractIntlMessages | null>(null);

    useEffect(() => {
        // Reset messages to null when locale changes to show loading state
        setMessages(null);
        import(`../locales/${locale}.json`)
            .then((mod) => setMessages(mod.default))
            .catch((err) => {
                console.error("Failed to load locale files for:", locale, err);
                // Optionally, set to some default/fallback messages or handle error appropriately
            });
    }, [locale]);

    // Render children only when messages are loaded
    if (!messages) {
        // You might want to render a loading spinner or some fallback UI here
        return null;
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        </ThemeProvider>
    );
};
