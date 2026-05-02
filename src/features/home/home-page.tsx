"use client";

import { HeroSection } from "@/features/hero";
import { AboutSection } from "@/features/about";
import { SkillsSection } from "@/features/skills";
import { ExperienceSection } from "@/features/experience";
import { EducationSection } from "@/features/education";
import { ContactSection } from "@/features/contact";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
