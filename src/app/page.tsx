"use client";

import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { ContactSection } from '@/components/ContactSection';
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-background flex flex-col items-center justify-center">
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}