import type { IconType } from 'react-icons';

export interface Project {
    id: string;
    href: string;
    imageSrc: string;
    width: number;
    height: number;
}

export type ExperienceTypeKey = 'fullTime' | 'internship' | 'freelance';

export interface ExperienceRoleItem {
    id: string;
    role: string;
    period: string;
    description: string;
    technologies: string[];
}

export interface ExperienceItem {
    id: string;
    company: string;
    period: string;
    typeKey: ExperienceTypeKey;
    roles: ExperienceRoleItem[];
}

export interface EducationItem {
    id: string;
    title: string;
    institution: string;
    period: string;
    description: string;
    type: 'degree' | 'bootcamp' | 'course' | 'certification';
    certificateLink?: string;
}

export interface ContactLinkItemProps {
    IconComponent: IconType;
    title: string;
    href: string;
    isMail?: boolean;
    isWhatsApp?: boolean;
}

export interface FormData {
    name: string;
    email: string;
    message: string;
} 
