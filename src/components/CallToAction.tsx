'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React from 'react';

const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        if (id === 'contact') {
            const formElement = document.getElementById('contact-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return; // Exit after scrolling to form
            }
        }
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export function CallToAction({ variant }: { variant: 'cta1' | 'cta2' | 'cta3' }) {
    const t = useTranslations('callToContact');

    return (
        <section className="container mx-auto flex flex-col items-center justify-center text-center py-4 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-3xl"
            >
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                    {t(`${variant}.text`)}
                </h2>
                <Button size="lg" className="text-lg px-8 py-6" onClick={(e) => handleScroll(e, 'contact')}>
                    {t(`${variant}.button`)}
                </Button>
            </motion.div>
        </section>
    );
} 