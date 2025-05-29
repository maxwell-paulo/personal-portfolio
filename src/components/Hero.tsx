'use client'

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
    const t = useTranslations('hero');

    return (
        <section className="container mx-auto flex flex-col items-center justify-center text-center py-10">
            <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-muted-foreground mb-2">
                    {t('greeting')}
                </p>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400">
                        {t('name')}
                    </span>
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                    {t('title')}
                </h2>
                <p className="text-md md:text-lg text-muted-foreground mb-10">
                    {t('subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/#projects" passHref>
                        <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                            {t('ctaButton')}
                        </Button>
                    </Link>
                    <Link href="/contact" passHref>
                        <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                            {t('ctaContactButton')}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
