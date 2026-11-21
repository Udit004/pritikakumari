"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about";
import { SkillsSection } from "@/features/skills";
import { ExperienceSection } from "@/features/experience";
import { ProjectsSection } from "@/features/projects";
import { CertificationsSection } from "@/features/certifications/components/certifications-section";
import { EducationSection } from "@/features/education";
import { ResumeSection } from "@/features/resume";
import { ContactSection } from "@/features/contact";
import { Footer } from "@/features/home/components/footer";
import { Header } from "./components/header";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AiChatSection = dynamic(
  () => import("@/features/aiChat").then((mod) => mod.AiChatSection),
  { ssr: false, loading: () => null }
);

export function HomePage() {
  useEffect(() => {
    // When all page sections and assets are mounted, ensure ScrollTrigger calculates all pin spacers in natural top-down sequence
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

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
