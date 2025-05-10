import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
    base: "absolute top-[3px] left-[4px] size-6 rounded-full flex items-center justify-center shadow-md transform transition duration-300 ease-in-out",
    variants: {
        variant: {
            dark: "translate-x-0 bg-primary/20",
            light: "translate-x-6 bg-primary/20",
        },
    },
    defaultVariants: {
        variant: "dark",
    },
});

export default function ThemeSwitcher() {
    const [theme, setStateTheme] = useState("dark");
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(theme);
    }, [, setTheme, theme]);

    return (
        <div className="flex items-center justify-center">
            <label
                className="flex items-center cursor-pointer"
                htmlFor="theme-toggle"
            >
                <div className="w-14 h-8 relative rounded-3xl bg-card border border-border shadow-sm transition-colors">
                    <input
                        type="checkbox"
                        id="theme-toggle"
                        className="hidden"
                        onChange={() => setStateTheme(theme === "light" ? "dark" : "light")}
                        checked={theme === "light"}
                    />
                    <div
                        className={inputVariants({
                            variant: theme === "light" ? "light" : "dark",
                        })}
                    >
                        {theme === "light" ? (
                            <SunIcon className="text-primary size-4" />
                        ) : (
                            <MoonIcon className="text-primary size-4" />
                        )}
                    </div>
                </div>
            </label>
        </div>
    );
}