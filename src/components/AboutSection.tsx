'use client'

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiNodedotjs, SiExpress,
    SiPython, SiDjango, SiPostgresql, SiMongodb, SiHtml5, SiCss3,
    SiTailwindcss, SiGit
} from 'react-icons/si';
import { TbSql, TbApi } from 'react-icons/tb';
import { MdImportantDevices } from 'react-icons/md';
import { IconType } from 'react-icons';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface Technology {
    name: string;
    IconComponent: IconType;
}

const technologies: Technology[] = [
    { name: "NextJS", IconComponent: SiNextdotjs },
    { name: "Typescript", IconComponent: SiTypescript },
    { name: "Javascript", IconComponent: SiJavascript },
    { name: "React", IconComponent: SiReact },
    { name: "NodeJS", IconComponent: SiNodedotjs },
    { name: "Express", IconComponent: SiExpress },
    { name: "Python", IconComponent: SiPython },
    { name: "Django", IconComponent: SiDjango },
    { name: "SQL", IconComponent: TbSql },
    { name: "Postgres", IconComponent: SiPostgresql },
    { name: "MongoDB", IconComponent: SiMongodb },
    { name: "HTML", IconComponent: SiHtml5 },
    { name: "CSS", IconComponent: SiCss3 },
    { name: "Tailwind", IconComponent: SiTailwindcss },
    { name: "Rest API", IconComponent: TbApi },
    { name: "Git", IconComponent: SiGit },
    { name: "Responsive Designer", IconComponent: MdImportantDevices },
];

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
        <TooltipProvider>
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
                    className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
                >
                    {technologies.map((tech) => (
                        <Tooltip key={tech.name} delayDuration={100}>
                            <TooltipTrigger asChild>
                                <motion.div
                                    variants={itemVariants}
                                    className="p-2 flex flex-col items-center text-center cursor-pointer"
                                >
                                    <tech.IconComponent size={48} className="text-muted-foreground hover:text-foreground transition-colors" />
                                </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{tech.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </motion.div>
            </motion.section>
        </TooltipProvider>
    );
} 