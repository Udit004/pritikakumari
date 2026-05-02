"use client";

import { HeroSection } from "@/features/hero";
import { AboutSection } from "@/features/about";
import { SkillsSection } from "@/features/skills";
import { ExperienceSection } from "@/features/experience";
import { ProjectsSection } from "@/features/projects";
import { ContactSection } from "@/features/contact";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function HomePage() {
  return (
    <main className="relative overflow-hidden bg-surface-secondary">
      {/* ── Global Ambient Background ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* We can add a subtle dotted pattern here if needed, or just let the background color handle it */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        {/* Top-right green glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-green-200/35 blur-[130px] mix-blend-multiply" />
        {/* Bottom-left emerald glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-200/25 blur-[130px] mix-blend-multiply" />
      </div>

      <Header />
      <HeroSection />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
