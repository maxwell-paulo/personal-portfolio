'use client'

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
// Lucide icons for form button will remain
import { Send } from 'lucide-react';
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si';
import { IoMailOutline } from 'react-icons/io5';
import type { IconType } from 'react-icons';
// Button is only needed for the form now
import { Button } from '@/components/ui/button';
// Card components are no longer used for contact items
import Link from 'next/link';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// REPLACE WITH YOUR ACTUAL DATA
const contactDetails = {
    email: "your.email@example.com",
    linkedinUrl: "https://linkedin.com/in/yourprofile",
    githubUrl: "https://github.com/yourusername",
    whatsappNumber: "YOUR_WHATSAPP_NUMBER", // <-- REPLACE THIS!
};

// Renamed and refactored from ContactCard
interface ContactLinkItemProps {
    IconComponent: IconType;
    title: string; // This will be the clickable text
    href: string;
    isMail?: boolean;
    isWhatsApp?: boolean;
}

const ContactLinkItem: React.FC<ContactLinkItemProps> = ({ IconComponent, title, href, isMail, isWhatsApp }) => {
    let fullHref = href;
    if (isMail) {
        fullHref = `mailto:${href}`;
    } else if (isWhatsApp) {
        const numericWhatsApp = href.replace(/\D/g, '');
        fullHref = `https://wa.me/${numericWhatsApp}`;
    }

    return (
        <Link href={fullHref} target="_blank" rel="noopener noreferrer" className="w-full group">
            <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-accent/50 transition-colors duration-200 space-y-2"
            >
                <div className="bg-primary/10 text-primary p-3 rounded-full group-hover:bg-primary/20 transition-colors duration-200">
                    <IconComponent className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <p className="text-sm md:text-base font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {title}
                </p>
            </motion.div>
        </Link>
    );
};

interface FormData {
    name: string;
    email: string;
    message: string;
}

export function ContactSection() {
    const t = useTranslations('contactSection');
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const numericWhatsApp = contactDetails.whatsappNumber.replace(/\D/g, '');
        const whatsappMessage = `Hello, my name is ${formData.name}. My email is ${formData.email}. Message: ${formData.message}`;
        const whatsappUrl = `https://wa.me/${numericWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }, // Adjusted stagger
    };

    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }; // Kept for title/subtitle/form

    return (
        <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
            className="container mx-auto px-4 py-16 md:py-24 text-center"
        >
            <motion.h2
                variants={itemVariants} // itemVariants can be used for individual elements like titles
                className="text-3xl md:text-4xl font-bold mb-4"
            >
                {t('title')}
            </motion.h2>
            <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
                {t('subtitle')}
            </motion.p>

            {/* The grid will now lay out the more compact ContactLinkItems */}
            <motion.div
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }} // Stagger for the link items themselves
                className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 mb-16 max-w-2xl mx-auto"
            >
                <ContactLinkItem
                    IconComponent={IoMailOutline}
                    title={t('email')} // Using the direct translation for email label
                    href={contactDetails.email}
                    isMail
                />
                <ContactLinkItem
                    IconComponent={SiLinkedin}
                    title={t('linkedin')} // Using direct translation for LinkedIn label
                    href={contactDetails.linkedinUrl}
                />
                <ContactLinkItem
                    IconComponent={SiGithub}
                    title={t('github')} // Using direct translation for GitHub label
                    href={contactDetails.githubUrl}
                />
                <ContactLinkItem
                    IconComponent={SiWhatsapp}
                    title={t('whatsapp')} // Using direct translation for WhatsApp label
                    href={contactDetails.whatsappNumber}
                    isWhatsApp
                />
            </motion.div>

            <motion.div id="contact-form" variants={itemVariants} className="max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-semibold mb-8">{t('formTitle')}</h3>
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name" className="mb-2 block text-sm font-medium">{t('formNameLabel')}</Label>
                            <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} placeholder={t('formNamePlaceholder')} required />
                        </div>
                        <div>
                            <Label htmlFor="email" className="mb-2 block text-sm font-medium">{t('formEmailLabel')}</Label>
                            <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} placeholder={t('formEmailPlaceholder')} required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="message" className="mb-2 block text-sm font-medium">{t('formMessageLabel')}</Label>
                        <Textarea name="message" id="message" rows={4} value={formData.message} onChange={handleInputChange} placeholder={t('formMessagePlaceholder')} required />
                    </div>
                    <div className="text-center">
                        <Button type="submit" size="lg">
                            <Send className="mr-2 h-5 w-5" />
                            {t('formSubmitButton')}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.section>
    );
} 