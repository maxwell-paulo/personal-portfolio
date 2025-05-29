'use client'

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
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
import { X } from 'lucide-react';
import Image from 'next/image';

// Re-using the projectItems from Header for now
// Consider moving this to a shared location or a dedicated data file later
const projectItems = [
    { id: "project1", href: "/projects/project1", imageSrc: "https://via.placeholder.com/400x200?text=Project+1", width: 400, height: 200 },
    { id: "project2", href: "/projects/project2", imageSrc: "https://via.placeholder.com/400x200?text=Project+2", width: 400, height: 200 },
    { id: "project3", href: "/projects/project3", imageSrc: "https://via.placeholder.com/400x200?text=Project+3", width: 400, height: 200 },
    { id: "project4", href: "/projects/project4", imageSrc: "https://via.placeholder.com/400x200?text=Project+4", width: 400, height: 200 },
];

export function ProjectsSection() {
    const t = useTranslations('projectsSection');
    const tHeader = useTranslations('header');
    const [selectedProject, setSelectedProject] = useState<typeof projectItems[0] | null>(null);

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.section
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            className="container mx-auto px-4 py-16 md:py-24 text-center"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
                {t('title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectItems.map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/20">
                            <CardHeader className="p-0 relative h-48">
                                <Image
                                    src={project.imageSrc}
                                    alt={tHeader(`projects.${project.id}.title`)}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"
                                />
                            </CardHeader>
                            <CardContent className="flex-grow p-6">
                                <CardTitle className="text-xl font-semibold mb-2 text-left">
                                    {tHeader(`projects.${project.id}.title`)}
                                </CardTitle>
                                <CardDescription className="text-left text-muted-foreground">
                                    {tHeader(`projects.${project.id}.description`)}
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
                                            {t('viewProjectButton')}
                                        </Button>
                                    </DialogTrigger>
                                    {selectedProject && selectedProject.id === project.id && (
                                        <DialogContent className="sm:max-w-[600px] p-0">
                                            <DialogHeader className="p-6 pb-0">
                                                <DialogTitle className="text-2xl font-semibold">
                                                    {tHeader(`projects.${selectedProject.id}.title`)}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="px-6 max-h-[calc(70vh-theme(spacing.24))] overflow-y-auto">
                                                <div className="my-4 relative w-full max-h-[40vh]">
                                                    <Image
                                                        src={selectedProject.imageSrc}
                                                        alt={tHeader(`projects.${selectedProject.id}.title`)}
                                                        width={selectedProject.width}
                                                        height={selectedProject.height}
                                                        layout="responsive"
                                                        objectFit="contain"
                                                        className="rounded-md"
                                                    />
                                                </div>
                                                <DialogDescription className="text-left text-md text-muted-foreground mb-4">
                                                    {tHeader(`projects.${selectedProject.id}.description`)}
                                                </DialogDescription>
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
                ))}
            </div>
        </motion.section>
    );
} 