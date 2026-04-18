import {
    SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiNodedotjs, SiExpress,
    SiPython, SiDjango, SiPostgresql, SiMongodb, SiHtml5, SiCss3,
    SiTailwindcss, SiGit, SiNestjs, SiSupabase, SiRailway, SiVercel,
    SiN8N, SiPrisma
} from 'react-icons/si';
import { TbSql, TbApi } from 'react-icons/tb';
import { MdImportantDevices } from 'react-icons/md';
import type { IconType } from 'react-icons';

export interface Technology {
    name: string;
    IconComponent: IconType;
    aliases?: string[];
}

export const technologiesList: Technology[] = [
    { name: "Next.js", aliases: ["NextJS"], IconComponent: SiNextdotjs },
    { name: "TypeScript", aliases: ["Typescript"], IconComponent: SiTypescript },
    { name: "JavaScript", aliases: ["Javascript"], IconComponent: SiJavascript },
    { name: "React", IconComponent: SiReact },
    { name: "Node.js", aliases: ["NodeJS"], IconComponent: SiNodedotjs },
    { name: "NestJS", IconComponent: SiNestjs },
    { name: "Express", IconComponent: SiExpress },
    { name: "Python", IconComponent: SiPython },
    { name: "Django", IconComponent: SiDjango },
    { name: "SQL", IconComponent: TbSql },
    { name: "PostgreSQL", aliases: ["Postgres"], IconComponent: SiPostgresql },
    { name: "Supabase", IconComponent: SiSupabase },
    { name: "Prisma", IconComponent: SiPrisma },
    { name: "MongoDB", IconComponent: SiMongodb },
    { name: "HTML", IconComponent: SiHtml5 },
    { name: "CSS", IconComponent: SiCss3 },
    { name: "Tailwind CSS", aliases: ["Tailwind"], IconComponent: SiTailwindcss },
    { name: "REST API", aliases: ["Rest API", "REST APIs"], IconComponent: TbApi },
    { name: "Railway", IconComponent: SiRailway },
    { name: "Vercel", IconComponent: SiVercel },
    { name: "n8n", IconComponent: SiN8N },
    { name: "Git", IconComponent: SiGit },
    { name: "Responsive Design", IconComponent: MdImportantDevices },
];

const normalizeTechnologyName = (name: string) =>
    name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '');

export const getTechnologyByName = (name: string): Technology | undefined => {
    const normalizedName = normalizeTechnologyName(name);

    return technologiesList.find(tech => {
        if (normalizeTechnologyName(tech.name) === normalizedName) {
            return true;
        }

        return tech.aliases?.some(alias => normalizeTechnologyName(alias) === normalizedName);
    });
};
