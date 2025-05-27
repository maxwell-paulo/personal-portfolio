'use client'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTranslations } from 'next-intl';

import { useLocaleStore } from "@/providers/use-locale-store"
import brFlag from '../assets/images/br.png';
import usFlag from '../assets/images/en.png';

export function LangSwitcher() {
    const { locale, setLocale } = useLocaleStore()
    const t = useTranslations('langSwitcher');

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <ToggleGroup
                    type="single"
                    className="rounded-full bg-ds-neutral-50 p-1"
                    defaultValue={locale}
                    onValueChange={(l: "pt" | "en") => {
                        if (!l || l === locale) return
                        setLocale(l)
                    }}
                >
                    <ToggleGroupItem
                        type="submit"
                        name="locale"
                        value="pt"
                        className={`size-9 rounded-full transition-opacity ${locale !== "pt" ? "opacity-50" : ""}`}
                    >
                        <Avatar className="size-7">
                            <AvatarImage fetchPriority="high" src={brFlag.src} />
                            <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        type="submit"
                        name="locale"
                        value="en"
                        className={`size-9 rounded-full transition-opacity ${locale !== "en" ? "opacity-50" : ""}`}
                    >
                        <Avatar className="size-7">
                            <AvatarImage fetchPriority="high" src={usFlag.src} />
                            <AvatarFallback>EN</AvatarFallback>
                        </Avatar>
                    </ToggleGroupItem>

                    <TooltipContent>
                        <p>{t('tooltip')}</p>
                    </TooltipContent>
                </ToggleGroup>
            </TooltipTrigger>
        </Tooltip>
    )
}