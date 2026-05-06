"use client";

import dynamic from "next/dynamic";
import { HeroCanvas } from "@/features/home/home-canvas";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const SkillsSection = dynamic(
  () => import("@/features/skills").then((mod) => mod.SkillsSection),
  { ssr: false, loading: () => null }
);

const ExperienceSection = dynamic(
  () => import("@/features/experience").then((mod) => mod.ExperienceSection),
  { ssr: false, loading: () => null }
);

const ProjectsSection = dynamic(
  () => import("@/features/projects").then((mod) => mod.ProjectsSection),
  { ssr: false, loading: () => null }
);

const EducationSection = dynamic(
  () => import("@/features/education").then((mod) => mod.EducationSection),
  { ssr: false, loading: () => null }
);

const ContactSection = dynamic(
  () => import("@/features/contact").then((mod) => mod.ContactSection),
  { ssr: false, loading: () => null }
);

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
