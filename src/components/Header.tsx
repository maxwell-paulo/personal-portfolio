"use client";

import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LangSwitcher } from "./langSwitcher";

// Define project identifiers and their routes for internationalization
const projectItems = [
    { id: "project1", href: "/projects/project1" },
    { id: "project2", href: "/projects/project2" },
    { id: "project3", href: "/projects/project3" },
    { id: "project4", href: "/projects/project4" },
];

export default function Header() {
    const t = useTranslations("header");

    return (
        <header className="w-full py-5 px-6 border-b border-border/40 bg-background/95 backdrop-blur-sm fixed top-0 z-50 transition-all duration-200">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <Link href="/" className="text-xl font-bold text-foreground relative group">
                        {t("title")}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary transition-colors")}>
                                {t("nav.home")}
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-foreground hover:text-primary transition-colors">
                                {t("nav.projects")}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {projectItems.map((item) => (
                                        <ListItem
                                            key={item.id}
                                            title={t(`projects.${item.id}.title`)}
                                            href={item.href}
                                        >
                                            {t(`projects.${item.id}.description`)}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/about" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary transition-colors")}>
                                {t("nav.about")}
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary transition-colors")}>
                                {t("nav.contact")}
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

// Remove the old hardcoded projects array
// const projects = [
//     {
//         title: "Projeto 1",
//         href: "/projects/project1",
//         description:
//             "Descrição do Projeto 1.",
//     },
//     {
//         title: "Projeto 2",
//         href: "/projects/project2",
//         description:
//             "Descrição do Projeto 2.",
//     },
//     {
//         title: "Projeto 3",
//         href: "/projects/project3",
//         description:
//             "Descrição do Projeto 3.",
//     },
//     {
//         title: "Projeto 4",
//         href: "/projects/project4",
//         description:
//             "Descrição do Projeto 4.",
//     },
// ]; 