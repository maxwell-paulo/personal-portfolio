'use client'

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { getExperienceTechnologies, getTechnologyByName } from '@/data';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ExperienceItem, ExperienceRoleItem, ExperienceTypeKey } from '@/types';
import { sortExperienceKeysByPeriod } from '@/lib/experience';

const INITIAL_ITEMS_TO_SHOW = 3;

type ExperienceTranslationRoleEntry = {
    role: string;
    period: string;
    description: string;
};

type ExperienceTranslationEntry = {
    company: string;
    period: string;
    type: ExperienceTypeKey;
    role?: string;
    description?: string;
    roles?: Record<string, ExperienceTranslationRoleEntry>;
};

export function ExperienceSection() {
    const t = useTranslations('experienceSection');
    const [showAllExperiences, setShowAllExperiences] = useState(false);

    const experienceEntries = t.raw('experiences') as Record<string, ExperienceTranslationEntry>;
    const experienceKeys = sortExperienceKeysByPeriod(experienceEntries);

    const buildExperienceRoles = (experienceId: string, entry: ExperienceTranslationEntry): ExperienceRoleItem[] => {
        if (entry.roles) {
            const roleKeys = sortExperienceKeysByPeriod(entry.roles);

            return roleKeys.map(roleKey => ({
                id: `${experienceId}.${roleKey}`,
                role: entry.roles![roleKey].role,
                period: entry.roles![roleKey].period,
                description: entry.roles![roleKey].description,
                technologies: getExperienceTechnologies(experienceId, roleKey)
            }));
        }

        return [{
            id: `${experienceId}.primary`,
            role: entry.role || '',
            period: entry.period,
            description: entry.description || '',
            technologies: getExperienceTechnologies(experienceId)
        }];
    };

    const experiences: ExperienceItem[] = experienceKeys.map(key => ({
        id: key,
        company: experienceEntries[key].company,
        period: experienceEntries[key].period,
        typeKey: experienceEntries[key].type,
        roles: buildExperienceRoles(key, experienceEntries[key])
    }));

    const itemsToDisplay = showAllExperiences ? experiences : experiences.slice(0, INITIAL_ITEMS_TO_SHOW);

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30, height: 0 },
        visible: { opacity: 1, x: 0, height: 'auto', transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, x: 30, height: 0, transition: { duration: 0.3, ease: "easeIn" } },
    };

    return (
        <TooltipProvider>
            <motion.section
                id="experience"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
                className="container mx-auto px-4 py-16 md:py-24"
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3"
                >
                    <Briefcase className="size-8 md:size-10" /> {t('title')}
                </motion.h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line for timeline effect */}
                    <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden sm:block"></div>

                    <AnimatePresence initial={false}>
                        {itemsToDisplay.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={`mb-12 sm:mb-16 flex sm:items-center w-full ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                            >
                                <div className="hidden sm:flex w-1/2"></div> {/* Spacer for timeline layout */}
                                <div className="sm:w-1/2 sm:pl-8 pr-4 relative">
                                    <div className={`absolute top-1 size-4 bg-primary rounded-full border-4 border-background left-[-6px] ${index % 2 === 0 ? 'sm:left-[-40px]' : 'sm:right-[-24px] sm:left-auto'}`}></div>
                                    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 mb-2">{exp.company}</p>
                                        <p className="text-sm text-muted-foreground/80 mb-5">{exp.period} - <span className="font-medium">{t(`type.${exp.typeKey}`)}</span></p>

                                        <div className="divide-y divide-border/70">
                                            {exp.roles.map((role, roleIndex) => (
                                                <div
                                                    key={role.id}
                                                    className={roleIndex === 0 ? '' : 'pt-5 mt-5'}
                                                >
                                                    <h3 className="text-xl md:text-2xl font-semibold text-primary mb-1">{role.role}</h3>
                                                    {exp.roles.length > 1 && (
                                                        <p className="text-sm text-muted-foreground/80 mb-3">{role.period}</p>
                                                    )}
                                                    <p className="text-muted-foreground text-sm md:text-base mb-4 whitespace-pre-line">
                                                        {role.description}
                                                    </p>
                                                    {role.technologies.length > 0 && (
                                                        <>
                                                            <h4 className="text-sm font-semibold text-foreground mb-2">{t('technologiesUsed')}</h4>
                                                            <div className="flex flex-wrap gap-3 items-center">
                                                                {role.technologies.map(techName => {
                                                                    const techDetail = getTechnologyByName(techName);

                                                                    if (techDetail) {
                                                                        return (
                                                                            <Tooltip key={techDetail.name} delayDuration={100}>
                                                                                <TooltipTrigger asChild>
                                                                                    <motion.div className="cursor-pointer">
                                                                                        <techDetail.IconComponent size={24} className="text-muted-foreground hover:text-foreground transition-colors" />
                                                                                    </motion.div>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent>
                                                                                    <p>{techDetail.name}</p>
                                                                                </TooltipContent>
                                                                            </Tooltip>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <span key={techName} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-sm">
                                                                            {techName}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {experiences.length > INITIAL_ITEMS_TO_SHOW && (
                    <div className="mt-10 text-center">
                        <Button
                            variant="ghost"
                            onClick={() => setShowAllExperiences(!showAllExperiences)}
                            className="text-primary hover:text-primary/90 group text-md"
                        >
                            {showAllExperiences ? t('showLessButton') : t('showMoreButton')}
                            {showAllExperiences ?
                                <ChevronUp className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" /> :
                                <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                            }
                        </Button>
                    </div>
                )}
            </motion.section>
        </TooltipProvider>
    );
} 
