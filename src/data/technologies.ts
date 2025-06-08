import {
    SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiNodedotjs, SiExpress,
    SiPython, SiDjango, SiPostgresql, SiMongodb, SiHtml5, SiCss3,
    SiTailwindcss, SiGit
} from 'react-icons/si';
import { TbSql, TbApi } from 'react-icons/tb';
import { MdImportantDevices } from 'react-icons/md';
import { IconType } from 'react-icons';

export interface Technology {
    name: string;
    IconComponent: IconType;
}

export const technologiesList: Technology[] = [
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
    { name: "Tailwind", IconComponent: SiTailwindcss }, // Assuming Tailwind CSS from AboutSection means this
    { name: "Rest API", IconComponent: TbApi },
    { name: "Git", IconComponent: SiGit },
    { name: "Responsive Design", IconComponent: MdImportantDevices },
];

// Helper function to get technology details by name
export const getTechnologyByName = (name: string): Technology | undefined => {
    return technologiesList.find(tech => tech.name.toLowerCase() === name.toLowerCase());
}; 