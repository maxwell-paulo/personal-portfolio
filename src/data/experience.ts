type ExperienceTechnologyMap = string[] | Record<string, string[]>;

// Use a string array for single-role experiences and a nested object for role progressions.
export const experienceTechnologies: Record<string, ExperienceTechnologyMap> = {
    exp0: {
        headOfTechnology: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Supabase", "Railway", "Vercel", "n8n", "Software Architecture", "DevSecOps", "Process Structuring"],
        techLead: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Supabase", "Railway", "Vercel", "n8n",],
        fullStackDeveloper: ["TypeScript", "Next.js", "React", "NestJS", "PostgreSQL", "Prisma", "Supabase", "REST APIs"],
    },
    exp1: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    exp2: ["React", "Python", "Django", "Postgres", "Rest API"],
    exp3: ["React", "JavaScript", "HTML", "CSS"],
    exp4: [],
    exp5: [],
    exp6: [],
    exp7: [],
    exp8: []
};

export function getExperienceTechnologies(experienceId: string, roleId?: string) {
    const technologies = experienceTechnologies[experienceId];

    if (!technologies) {
        return [];
    }

    if (Array.isArray(technologies)) {
        return technologies;
    }

    if (!roleId) {
        return [];
    }

    return technologies[roleId] || [];
}
