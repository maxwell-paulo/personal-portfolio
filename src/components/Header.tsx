"use client";

import ThemeSwitcher from "./ThemeSwitcher";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LangSwitcher } from "./langSwitcher";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "./ui/dialog";
import { Menu } from "lucide-react";

export default function Header() {
    const t = useTranslations("header");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();

        // Check if on the home page. For this app, we assume paths like `/` or `/[locale]` are home.
        // A simple check is for the absence of other path segments.
        const isHomePage = window.location.pathname.split('/').filter(p => p).length <= 1;

        if (!isHomePage) {
            // If not on the home page, navigate to the home page with a hash.
            // This will cause a page load and then scroll to the element.
            window.location.href = `/#${id}`;
        } else {
            // If on the home page, scroll smoothly.
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        handleScroll(e, id);
        setIsMobileMenuOpen(false);
    };

    const navItems = ["home", "projects", "about", "experience", "education", "contact"];

    return (
        <header className="w-full py-5 px-6 border-b border-border/40 bg-background/95 backdrop-blur-sm fixed top-0 z-50 transition-all duration-200">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-xl font-bold text-foreground relative group">
                        {t("title")}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </a>
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item}>
                                <a href={`#${item}`} onClick={(e) => handleScroll(e, item)} className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary transition-colors")}>
                                    {t(`nav.${item}`)}
                                </a>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex-1 flex items-center justify-end gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <LangSwitcher />
                        <ThemeSwitcher />
                    </div>

                    <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <DialogTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full h-full flex flex-col items-center justify-center">
                            <DialogTitle className="sr-only">{t('nav.title')}</DialogTitle>
                            <DialogDescription className="sr-only">{t('nav.description')}</DialogDescription>
                            <nav className="flex flex-col items-center gap-8">
                                {navItems.map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item}`}
                                        onClick={(e) => handleMobileLinkClick(e, item)}
                                        className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                                    >
                                        {t(`nav.${item}`)}
                                    </a>
                                ))}
                            </nav>
                            <div className="absolute top-8 right-8 flex items-center gap-4">
                                <LangSwitcher />
                                <ThemeSwitcher />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
    );
}

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