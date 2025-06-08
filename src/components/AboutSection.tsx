'use client'

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
// Icons are now part of the imported technologiesList, so direct imports here are not needed.
// import {
//     SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiNodedotjs, SiExpress,
//     SiPython, SiDjango, SiPostgresql, SiMongodb, SiHtml5, SiCss3,
//     SiTailwindcss, SiGit
// } from 'react-icons/si';
// import { TbSql, TbApi } from 'react-icons/tb';
// import { MdImportantDevices } from 'react-icons/md';
// import { IconType } from 'react-icons'; // IconType is now in technologies.ts
import { technologiesList } from '@/data/technologies';

export function AboutSection() {
    const t = useTranslations('aboutSection');

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const staggerContainer = {
        visible: {
            transition: {
                staggerChildren: 0.07,
            },
        },
    };

    return (
        <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={sectionVariants}
            className="container mx-auto px-4 py-16 md:py-24 text-left md:text-center"
        >
            <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
                {t('title')}
            </motion.h2>

            <motion.div variants={staggerContainer} className="max-w-3xl mx-auto space-y-6 mb-12 text-lg text-muted-foreground text-left">
                <motion.p variants={itemVariants}>{t('paragraph1')}</motion.p>
                <motion.p variants={itemVariants}>{t('paragraph2')}</motion.p>
            </motion.div>

            <motion.h3
                variants={itemVariants}
                className="text-2xl md:text-3xl font-semibold mb-8 text-center"
            >
                {t('skillsTitle')}
            </motion.h3>

            <motion.div
                variants={staggerContainer}
                className="grid grid-flow-col grid-rows-2 md:flex md:flex-wrap md:justify-center gap-4 max-w-4xl mx-auto overflow-x-auto pb-4"
            >
                {technologiesList.map((tech) => (
                    <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        className="p-2 flex flex-col items-center justify-center text-center cursor-pointer w-24 h-24 rounded-md hover:bg-accent group transition-colors"
                    >
                        <tech.IconComponent size={48} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        <p className="mt-1 text-sm text-center text-muted-foreground">{tech.name}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
} 