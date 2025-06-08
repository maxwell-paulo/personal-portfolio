'use client'

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Link as LinkIcon } from 'lucide-react'; // Added LinkIcon
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link'; // For certificate links
import { educationItemKeys } from '@/data';

interface EducationItem {
    id: string;
    title: string;
    institution: string;
    period: string;
    description: string;
    type: 'degree' | 'bootcamp' | 'course' | 'certification';
    certificateLink?: string; // Optional link
}

export function EducationSection() {
    const t = useTranslations('educationSection');

    const educationItems: EducationItem[] = educationItemKeys.map(key => {
        const certificateLinkPath = `items.${key}.certificateLink`; // Construct the path to the translation
        const translatedLink = t(certificateLinkPath); // Attempt to get the translation

        return {
            id: key,
            title: t(`items.${key}.title`),
            institution: t(`items.${key}.institution`),
            period: t(`items.${key}.period`),
            description: t(`items.${key}.description`),
            type: t(`items.${key}.type`) as EducationItem['type'],
            // If translatedLink is different from the path, it means an actual URL was found
            certificateLink: translatedLink !== certificateLinkPath ? translatedLink : undefined,
        };
    });

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 } }, // Added staggerChildren
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 }, // Simpler variant without height animation now
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        // No exit variant needed as items are not removed from the list dynamically
    };

    const getItemIcon = (type: EducationItem['type']) => {
        switch (type) {
            case 'degree':
            case 'bootcamp':
            case 'course':
                return <GraduationCap className="mr-2 h-5 w-5 text-primary" />;
            case 'certification':
                return <Award className="mr-2 h-5 w-5 text-primary" />;
            default:
                return null;
        }
    };

    return (
        <motion.section
            id="education"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants} // sectionVariants will handle staggering
            className="container mx-auto px-4 py-16 md:py-24"
        >
            <motion.h2
                // variants={itemVariants} // Title can be part of section stagger or have its own if needed
                className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3"
            >
                <GraduationCap className="size-8 md:size-10" /> {t('title')}
            </motion.h2>

            <motion.div // Changed to motion.div for staggerChildren from sectionVariants
                variants={sectionVariants} // Apply sectionVariants for children staggering
                className="max-w-3xl mx-auto space-y-8"
            >
                {educationItems.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants} // Each item animates individually
                        className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                        <div className="flex flex-col-reverse items-start gap-2 mb-3 md:flex-row md:items-center md:justify-between md:gap-0 md:mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                            <Badge variant="outline" className="text-xs shrink-0">
                                {getItemIcon(item.type)}
                                {t(`type.${item.type}`)}
                            </Badge>
                        </div>
                        <p className="text-md font-medium text-muted-foreground mb-1">{item.institution}</p>
                        <p className="text-sm text-muted-foreground/80 mb-3">{item.period}</p>
                        <p className="text-muted-foreground text-sm md:text-base mb-4 whitespace-pre-line">
                            {item.description}
                        </p>
                        {item.certificateLink && (
                            <div className="mt-4">
                                <Link href={item.certificateLink} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="text-xs">
                                        <LinkIcon className="mr-2 h-3.5 w-3.5" />
                                        {t('viewCertificateButton')}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
} 