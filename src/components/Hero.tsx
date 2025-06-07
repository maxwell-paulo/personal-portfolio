'use client'

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React from 'react';

export function Hero() {
    const t = useTranslations('hero');

    const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <section id="home" className="container mx-auto flex flex-col items-center justify-center text-center py-10">
            <div className="max-w-3xl">
                <motion.p
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.2 }}
                    variants={textVariants}
                    className="text-lg md:text-xl text-muted-foreground mb-2"
                >
                    {t('greeting')}
                </motion.p>
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.4 }}
                    variants={textVariants}
                    className="text-5xl md:text-7xl font-bold mb-4"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400">
                        {t('name')}
                    </span>
                </motion.h1>
                <motion.h2
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    variants={textVariants}
                    className="text-3xl md:text-4xl font-semibold text-foreground mb-6"
                >
                    {t('title')}
                </motion.h2>
                <motion.p
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.8 }}
                    variants={textVariants}
                    className="text-md md:text-lg text-muted-foreground mb-10"
                >
                    {t('subtitle')}
                </motion.p>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.0, staggerChildren: 0.2 }}
                    variants={{ visible: { opacity: 1 } }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.div variants={buttonVariants} className="w-60 sm:w-auto">
                        <Button size="lg" className="text-lg px-8 py-6 w-full" onClick={(e) => handleScroll(e, 'projects')}>
                            {t('ctaButton')}
                        </Button>
                    </motion.div>
                    <motion.div variants={buttonVariants} className="w-60 sm:w-auto">
                        <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full" onClick={(e) => handleScroll(e, 'contact')}>
                            {t('ctaContactButton')}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
