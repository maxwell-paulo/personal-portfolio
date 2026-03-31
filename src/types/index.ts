import type { IconType } from 'react-icons';

export interface Project {
    id: string;
    imageSrc: string;
    width: number;
    height: number;
    groupKeys: ProjectGroupKey[];
    roleBadgeKey?: ProjectRoleBadgeKey;
}

export type ProjectVisibility = 'public' | 'privateCaseStudy';
export type ProjectGroupKey = 'featured' | 'alpha' | 'public';
export type ProjectFilterKey = ProjectGroupKey | 'all';

export type ProjectRoleBadgeKey =
    | 'productLeadership'
    | 'ideationLeadership'
    | 'technicalLeadershipExecution';

export interface PublicProject extends Project {
    visibility: 'public';
    href: string;
}

export interface PrivateCaseStudyProject extends Project {
    visibility: 'privateCaseStudy';
    confidentialityBadgeKey: 'privateCaseStudy';
}

export type ProjectItem = PublicProject | PrivateCaseStudyProject;

export interface ProjectCaseStudyContent {
    summary: string;
    problem: string;
    role: string;
    solution: string;
    stack: string;
    impact: string;
    confidentialityNote: string;
}

export interface ProjectTranslationContent {
    title: string;
    shortDescription: string;
    fullDescription?: string;
    caseStudy?: ProjectCaseStudyContent;
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
