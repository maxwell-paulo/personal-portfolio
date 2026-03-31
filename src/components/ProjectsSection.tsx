'use client'

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, ExternalLink, Lock } from 'lucide-react';
import Image from 'next/image';
import { projectItems } from '@/data';
import { ProjectCaseStudyContent, ProjectItem, ProjectTranslationContent } from '@/types';

type ProjectContent = ProjectTranslationContent;

export function ProjectsSection() {
    const t = useTranslations('projectsSection');
    const tHeader = useTranslations('header');
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const getProjectContent = (projectId: string) =>
        tHeader.raw(`projects.${projectId}`) as ProjectContent;

    const getRoleBadgeLabel = (project: ProjectItem) =>
        project.roleBadgeKey ? t(`roleBadges.${project.roleBadgeKey}`) : null;

    const renderCaseStudySection = (title: string, content: string) => (
        <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            <p className="text-sm leading-6 text-muted-foreground whitespace-pre-line">{content}</p>
        </div>
    );

    const renderPrivateCaseStudyContent = (caseStudy: ProjectCaseStudyContent) => (
        <div className="space-y-5 mt-5">
            {renderCaseStudySection(t('caseStudySections.summary'), caseStudy.summary)}
            {renderCaseStudySection(t('caseStudySections.problem'), caseStudy.problem)}
            {renderCaseStudySection(t('caseStudySections.role'), caseStudy.role)}
            {renderCaseStudySection(t('caseStudySections.solution'), caseStudy.solution)}
            {renderCaseStudySection(t('caseStudySections.stack'), caseStudy.stack)}
            {renderCaseStudySection(t('caseStudySections.impact'), caseStudy.impact)}
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {t('caseStudySections.confidentiality')}
                </p>
                <p className="text-sm leading-6 text-muted-foreground whitespace-pre-line">
                    {caseStudy.confidentialityNote}
                </p>
            </div>
        </div>
    );

    return (
        <motion.section
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
            className="container mx-auto px-4 py-16 md:py-24 text-center"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
                {t('title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectItems.map((project) => {
                    const content = getProjectContent(project.id);
                    const roleBadgeLabel = getRoleBadgeLabel(project);
                    const confidentialityBadgeLabel = project.visibility === 'privateCaseStudy'
                        ? t(`confidentialityBadges.${project.confidentialityBadgeKey}`)
                        : null;

                    return (
                    <motion.div key={project.id} variants={itemVariants}>
                        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/20">
                            <CardHeader className="p-0 relative h-48">
                                <Image
                                    src={project.imageSrc}
                                    alt={content.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"
                                />
                                {confidentialityBadgeLabel && (
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className="bg-background/90 backdrop-blur text-foreground">
                                            <Lock className="size-3" />
                                            {confidentialityBadgeLabel}
                                        </Badge>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="flex-grow p-6">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {roleBadgeLabel && (
                                        <Badge variant="outline">{roleBadgeLabel}</Badge>
                                    )}
                                    {confidentialityBadgeLabel && (
                                        <Badge variant="secondary">{confidentialityBadgeLabel}</Badge>
                                    )}
                                </div>
                                <CardTitle className="text-xl font-semibold mb-2 text-left">
                                    {content.title}
                                </CardTitle>
                                <CardDescription className="text-left text-muted-foreground">
                                    {content.shortDescription}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Dialog onOpenChange={(open) => !open && setSelectedProject(null)}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            {project.visibility === 'privateCaseStudy' ? t('viewCaseStudyButton') : t('viewProjectButton')}
                                        </Button>
                                    </DialogTrigger>
                                    {selectedProject && selectedProject.id === project.id && (
                                        <DialogContent className="sm:max-w-[600px] p-0">
                                            <DialogHeader className="p-6 pb-0">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {selectedProject.roleBadgeKey && (
                                                        <Badge variant="outline">
                                                            {t(`roleBadges.${selectedProject.roleBadgeKey}`)}
                                                        </Badge>
                                                    )}
                                                    {selectedProject.visibility === 'privateCaseStudy' && (
                                                        <Badge variant="secondary">
                                                            {t(`confidentialityBadges.${selectedProject.confidentialityBadgeKey}`)}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <DialogTitle className="text-2xl font-semibold">
                                                    {getProjectContent(selectedProject.id).title}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="px-6 pb-6 max-h-[calc(70vh-theme(spacing.24))] overflow-y-auto">
                                                <div className="my-4 relative w-full max-h-[40vh]">
                                                    <Image
                                                        src={selectedProject.imageSrc}
                                                        alt={getProjectContent(selectedProject.id).title}
                                                        width={selectedProject.width}
                                                        height={selectedProject.height}
                                                        layout="responsive"
                                                        objectFit="contain"
                                                        className="rounded-md"
                                                    />
                                                </div>
                                                {selectedProject.visibility === 'privateCaseStudy' ? (
                                                    renderPrivateCaseStudyContent(getProjectContent(selectedProject.id).caseStudy!)
                                                ) : (
                                                    <>
                                                        <DialogDescription className="text-left text-md text-muted-foreground mb-4 whitespace-pre-line">
                                                            {getProjectContent(selectedProject.id).fullDescription}
                                                        </DialogDescription>
                                                        <div className="flex justify-start">
                                                            <Button asChild>
                                                                <a href={selectedProject.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                                                                    {t('viewLiveSiteButton')}
                                                                    <ExternalLink className="w-4 h-4 ml-2" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Close</span>
                                            </DialogClose>
                                        </DialogContent>
                                    )}
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )})}
            </div>
        </motion.section>
    );
} 
