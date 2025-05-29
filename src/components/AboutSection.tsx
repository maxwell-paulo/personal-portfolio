'use client'

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const technologies = [
    "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript",
    "React", "Next.js", "Tailwind CSS", "Framer Motion",
    "Node.js", "Git", "Figma", "Responsive Design"
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
                className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            >
                {technologies.map((tech) => (
                    <motion.div key={tech} variants={itemVariants}>
                        <Badge variant="secondary" className="px-4 py-2 text-sm md:text-md rounded-md shadow-sm">
                            {tech}
                        </Badge>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
} 