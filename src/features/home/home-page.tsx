"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@/components/SmoothScrollProvider";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AiChatSection = dynamic(
  () => import("@/features/aiChat").then((mod) => mod.AiChatSection),
  { ssr: false, loading: () => null }
);

export function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis();

  // Boundary-aware full-section slide transitions on wheel
  useEffect(() => {
    if (!mainRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isTransitioning = false;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;

    const getOuterEl = (section: HTMLElement) =>
      section.parentElement?.classList.contains("pin-spacer")
        ? section.parentElement
        : section;

    const unlockAfterDelay = (ms: number) => {
      if (safetyTimer) clearTimeout(safetyTimer);
      safetyTimer = setTimeout(() => {
        isTransitioning = false;
      }, ms);
    };

    const handleWheel = (e: WheelEvent) => {
      const lenis = lenisRef?.current;
      if (!lenis) return;
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaY) < 4) return;

      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-lenis-prevent]")) return;

      if (isTransitioning) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (!mainRef.current) return;
      const sections = Array.from(
        mainRef.current.querySelectorAll<HTMLElement>(".scene-section")
      );
      if (sections.length === 0) return;

      const vh = window.innerHeight;
      const midY = vh * 0.5;
      const goingDown = e.deltaY > 0;
      const tolerance = 14;

      // Locate the section currently occupying the viewport center
      let currentIdx = -1;
      for (let i = 0; i < sections.length; i++) {
        const rect = getOuterEl(sections[i]).getBoundingClientRect();
        if (rect.top <= midY && rect.bottom >= midY) {
          currentIdx = i;
          break;
        }
      }

      if (currentIdx === -1) return;

      const currentSection = sections[currentIdx];
      const currentRect = getOuterEl(currentSection).getBoundingClientRect();

      // Never intercept while scrubbing inside an active pinned ScrollTrigger
      const hasActiveInnerPin = ScrollTrigger.getAll().some(
        (st) =>
          st.pin &&
          st.isActive &&
          st.trigger &&
          currentSection.contains(st.trigger as Node) &&
          st.progress > 0.01 &&
          st.progress < 0.99
      );
      if (hasActiveInnerPin) return;

      const atBottom = currentRect.bottom <= vh + tolerance;
      const atTop = currentRect.top >= -tolerance;

      if (goingDown && atBottom && currentIdx < sections.length - 1) {
        const nextOuter = getOuterEl(sections[currentIdx + 1]);
        const targetY = Math.round(window.scrollY + nextOuter.getBoundingClientRect().top);

        e.preventDefault();
        e.stopPropagation();
        isTransitioning = true;
        unlockAfterDelay(1100);

        lenis.scrollTo(targetY, {
          duration: 0.9,
          lock: true,
          force: true,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: () => {
            unlockAfterDelay(90);
          },
        });
      } else if (!goingDown && atTop && currentIdx > 0) {
        const prevOuter = getOuterEl(sections[currentIdx - 1]);
        const prevRect = prevOuter.getBoundingClientRect();
        const targetY =
          prevRect.height <= vh + tolerance
            ? Math.round(window.scrollY + prevRect.top)
            : Math.round(window.scrollY + prevRect.bottom - vh);

        e.preventDefault();
        e.stopPropagation();
        isTransitioning = true;
        unlockAfterDelay(1100);

        lenis.scrollTo(targetY, {
          duration: 0.9,
          lock: true,
          force: true,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: () => {
            unlockAfterDelay(90);
          },
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [lenisRef]);

  useGSAP(
    () => {
      if (!mainRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(
          ".scene-section",
          mainRef.current
        );

        // Snap only across section-to-section transition zones ("top bottom" -> "top top")
        // so tall sections and internally pinned sections remain freely scrollable.
        for (let i = 1; i < sections.length; i++) {
          ScrollTrigger.create({
            id: `section-slide-${sections[i].id || i}`,
            trigger: sections[i],
            start: "top bottom",
            end: "top top",
            refreshPriority: -1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: [0, 1],
              directional: true,
              duration: { min: 0.35, max: 0.7 },
              delay: 0.08,
              ease: "power2.inOut",
            },
          });
        }

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: mainRef }
  );

  return (
    <main
      ref={mainRef}
      className="relative bg-surface-secondary selection:bg-emerald-500/20 selection:text-emerald-950"
    >
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
