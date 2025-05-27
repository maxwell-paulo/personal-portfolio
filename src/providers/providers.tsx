"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { useLocaleStore } from "./use-locale-store";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";

export const Providers = ({ children }: { children: React.ReactNode }) => {

    const { locale } = useLocaleStore();
    const [messages, setMessages] = useState<AbstractIntlMessages | null>(null);

    useEffect(() => {
        import(`../locales/${locale}.json`)
            .then((mod) => setMessages(mod.default))
            .catch((err) => console.error("Failed to load locale files", err));
    }, [locale]);

    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        </ThemeProvider>
    );
};
