'use client'

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Re-using the projectItems from Header for now
// Consider moving this to a shared location or a dedicated data file later
const projectItems = [
    { id: "project1", href: "/projects/project1", imageSrc: "https://via.placeholder.com/400x200?text=Project+1" }, // Added placeholder image
    { id: "project2", href: "/projects/project2", imageSrc: "https://via.placeholder.com/400x200?text=Project+2" },
    { id: "project3", href: "/projects/project3", imageSrc: "https://via.placeholder.com/400x200?text=Project+3" },
    { id: "project4", href: "/projects/project4", imageSrc: "https://via.placeholder.com/400x200?text=Project+4" },
];

export function ProjectsSection() {
    const t = useTranslations('projectsSection');
    const tHeader = useTranslations('header'); // For project titles and descriptions

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
                            <CardHeader className="p-0">
                                <img
                                    src={project.imageSrc}
                                    alt={tHeader(`projects.${project.id}.title`)}
                                    className="w-full h-48 object-cover"
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
                                <Link href={project.href} passHref className="w-full">
                                    <Button variant="outline" className="w-full">
                                        {t('viewProjectButton')}
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
} 