import type { IconType } from 'react-icons';

export interface Project {
    id: string;
    href: string;
    imageSrc: string;
    width: number;
    height: number;
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    typeKey: 'fullTime' | 'internship' | 'freelance';
    technologies: string[];
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