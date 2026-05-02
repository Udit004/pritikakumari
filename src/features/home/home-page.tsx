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
      {/* ── Global Ambient Background ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Top-right green glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-green-200/35 blur-[130px] mix-blend-multiply" />
        {/* Bottom-left emerald glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-200/25 blur-[130px] mix-blend-multiply" />
        {/* Center soft accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-green-100/15 blur-[150px]" />
      </div>

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
