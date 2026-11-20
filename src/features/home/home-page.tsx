"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

const SkillsSection = dynamic(
  () => import("@/features/skills").then((mod) => mod.SkillsSection),
  { loading: () => <div className="py-20 min-h-[50vh]" /> }
);

const ExperienceSection = dynamic(
  () => import("@/features/experience").then((mod) => mod.ExperienceSection),
  { ssr: false, loading: () => <div className="py-20 min-h-[50vh]" /> }
);

const ProjectsSection = dynamic(
  () => import("@/features/projects").then((mod) => mod.ProjectsSection),
  { ssr: false, loading: () => <div className="py-20 min-h-[50vh]" /> }
);

const CertificationsSection = dynamic(
  () => import("@/features/certifications/components/certifications-section").then((mod) => mod.CertificationsSection),
  { loading: () => <div className="py-20 min-h-[50vh]" /> }
);

const EducationSection = dynamic(
  () => import("@/features/education").then((mod) => mod.EducationSection),
  { ssr: false, loading: () => <div className="py-20 min-h-[50vh]" /> }
);

const ResumeSection = dynamic(
  () => import("@/features/resume").then((mod) => mod.ResumeSection),
  { loading: () => <div className="py-20 min-h-[50vh]" /> }
);

const ContactSection = dynamic(
  () => import("@/features/contact").then((mod) => mod.ContactSection),
  { ssr: false, loading: () => <div className="py-20 min-h-[50vh]" /> }
);

const AiChatSection = dynamic(
  () => import("@/features/aiChat").then((mod) => mod.AiChatSection),
  { ssr: false, loading: () => null }
);

export function HomePage() {
  return (
    <main className="relative bg-surface-secondary selection:bg-emerald-500/20 selection:text-emerald-950">
      {/* ── Top Cinematic Scroll Progress Bar ── */}
      <ScrollProgress />

      {/* ── Persistent Floating HUD Navigation ── */}
      <Header />

      {/* ── Scene 01: Hero Scene ── */}
      <HeroSection />

      {/* ── Scene 02: About Scene ── */}
      <AboutSection />

      {/* ── Scene 03: Skills Scene ── */}
      <SkillsSection />

      {/* ── Scene 04: Experience Scrollytelling Timeline ── */}
      <ExperienceSection />

      {/* ── Scene 05: Projects Horizontal Showcase ── */}
      <ProjectsSection />

      {/* ── Scene 06: Certifications Gallery ── */}
      <CertificationsSection />

      {/* ── Scene 07: Education Timeline ── */}
      <EducationSection />

      {/* ── Scene 08: Resume Showcase ── */}
      <ResumeSection />

      {/* ── Final Scene: Contact & Connect ── */}
      <ContactSection />

      {/* ── Persistent Floating AI Chat Assistant ── */}
      <AiChatSection />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
