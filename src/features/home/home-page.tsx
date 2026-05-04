"use client";

import { HeroCanvas } from "@/features/home/home-canvas";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about";
import { SkillsSection } from "@/features/skills";
import { ExperienceSection } from "@/features/experience";
import { ProjectsSection } from "@/features/projects";
import { EducationSection } from "@/features/education";
import { ContactSection } from "@/features/contact";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function HomePage() {
  return (
    <main className="relative overflow-hidden bg-surface-secondary">
      {/* ── Global Ambient Background ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* We can add a subtle dotted pattern here if needed, or just let the background color handle it */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>
        {/* Top-right green glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-green-200/35 blur-[130px] mix-blend-multiply" />
        {/* Bottom-left emerald glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-200/25 blur-[130px] mix-blend-multiply" />
      </div>

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <HeroCanvas />
      </div>

      <Header />
      <HeroSection />

      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
