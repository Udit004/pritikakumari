"use client";

import { useState, useRef, useCallback } from "react";
import { projectsData } from "./data";
import {
  Briefcase,
  Database,
  Code,
  Users,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectFooter } from "./ProjectFooter";
import { Analysis1 } from "./project1/Analysis1";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectHighlights: Record<number, string[]> = {
  1: [
    "Interactive Attrition Breakdown by Department & Age",
    "Employee Headcount & Tenure Demographic Metrics",
    "Executive Level Decision-Making KPI Dashboard",
    "Real-Time Filterable HR Performance Metrics",
  ],
  2: [
    "SQL Relational Queries for Employee Records",
    "Advanced Excel Pivot Tables and Cohort Models",
    "Data-Driven Turnover & Retention Pattern Insights",
    "Compensation & Performance Trend Benchmarking",
  ],
  3: [
    "Automated HR Data Pipeline & Scripted Ingestion",
    "Pandas and NumPy Data Cleaning & Transformation",
    "Automated Statistical Reporting for People Operations",
    "Scheduled Workflow Generation for HR Operations",
  ],
};

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  // Mobile Touch gesture refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useSectionTracking("projects");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-6 w-6 text-emerald-400" />;
      case "Database":
        return <Database className="h-6 w-6 text-emerald-400" />;
      case "Code":
        return <Code className="h-6 w-6 text-emerald-400" />;
      default:
        return <Briefcase className="h-6 w-6 text-emerald-400" />;
    }
  };

  // ── Desktop GSAP ScrollTrigger: Overlapping Slide-Over Stacking ──
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pinWrapper = pinWrapperRef.current;
        if (!pinWrapper) return;

        const cards = gsap.utils.toArray<HTMLElement>(".desktop-stack-card");
        if (cards.length < 3) return;

        // Base Initial Setup:
        // Card 0: in center, sharp, on top
        gsap.set(cards[0], {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 10,
        });

        // Card 1: waiting on the right, fully sharp & ready to slide over
        gsap.set(cards[1], {
          xPercent: 110,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 20,
        });

        // Card 2: waiting further on the right, fully sharp & ready to slide over
        gsap.set(cards[2], {
          xPercent: 220,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 30,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "projects-pin",
            trigger: pinWrapper,
            start: "top 12%",
            end: "+=1600",
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(2, Math.round(self.progress * 2));
              setDesktopActiveIndex(idx);
            },
          },
        });

        // ── Phase 1: Card 1 slides over Card 0 (progress 0 to 0.5) ──
        // Card 1 slides in from right to center (stays sharp at blur 0px)
        tl.to(
          cards[1],
          {
            xPercent: 0,
            ease: "power1.inOut",
            duration: 1,
          },
          0
        );

        // Card 0 moves to left underneath, scales down slightly, and blurs
        tl.to(
          cards[0],
          {
            xPercent: -20,
            scale: 0.92,
            opacity: 0.45,
            filter: "blur(4px)",
            ease: "power1.inOut",
            duration: 1,
          },
          0
        );

        // ── Phase 2: Card 2 slides over Card 1 (progress 0.5 to 1.0) ──
        // Card 2 slides in from right to center (stays sharp at blur 0px)
        tl.to(
          cards[2],
          {
            xPercent: 0,
            ease: "power1.inOut",
            duration: 1,
          },
          1
        );

        // Card 1 moves to left underneath, scales down slightly, and blurs
        tl.to(
          cards[1],
          {
            xPercent: -20,
            scale: 0.92,
            opacity: 0.45,
            filter: "blur(4px)",
            ease: "power1.inOut",
            duration: 1,
          },
          1
        );

        // Card 0 moves further left
        tl.to(
          cards[0],
          {
            xPercent: -36,
            scale: 0.85,
            opacity: 0.2,
            filter: "blur(6px)",
            ease: "power1.inOut",
            duration: 1,
          },
          1
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Desktop programmatic scroll to project card
  const goToDesktopCard = (targetIndex: number) => {
    const st = ScrollTrigger.getAll().find(
      (t) => t.trigger === pinWrapperRef.current
    );
    if (st) {
      const targetProgress = targetIndex / 2; // 0, 0.5, or 1.0
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // ── Mobile Touch Swipe Handlers ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> Next card slides over from right
        setMobileActiveIndex((prev) => Math.min(projectsData.projects.length - 1, prev + 1));
      } else {
        // Swiped right -> Previous card revealed
        setMobileActiveIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scene-section relative w-full min-h-[100svh] py-16 lg:py-24 overflow-x-clip"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45, 90, 108, 0.25) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Full Rich Project Header */}
        <ProjectHeader />
      </div>

      {/* ── Slide-Over Stack Showcase Container ── */}
      <div
        ref={pinWrapperRef}
        className="relative w-full my-6 lg:my-10 flex flex-col items-center justify-center"
      >
        {/* ── DESKTOP STACK STAGE (Visible on lg: >= 1024px) ── */}
        <div className="hidden lg:block relative w-full max-w-[680px] h-[490px] mx-auto">
          {projectsData.projects.map((project, index) => {
            const isFocused = desktopActiveIndex === index;
            const highlights = projectHighlights[project.id] || [];
            const isInteractive = index === 0;

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (isFocused) {
                    if (isInteractive) setSelectedProject(1);
                  } else {
                    goToDesktopCard(index);
                  }
                }}
                className="desktop-stack-card absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white border border-emerald-200/60 shadow-xl p-8 sm:p-9 flex flex-col justify-between cursor-pointer select-none will-change-transform"
                style={{
                  transformOrigin: "center center",
                }}
              >
                {/* Top Accent Gradient Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 transition-opacity duration-300 ${
                    isFocused ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div>
                  {/* Header row: Icon, Category & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400 shadow-md shrink-0">
                        {getIcon(project.icon)}
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                          Case Study 0{index + 1}
                        </span>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          Workforce Intelligence
                        </p>
                      </div>
                    </div>

                    {isInteractive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/70 shadow-2xs">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                        Interactive Analysis
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200/60">
                        Case Study
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 leading-snug mb-3 hover:text-emerald-950 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-5">
                    {project.description}
                  </p>

                  {/* Key Deliverables & Focus points */}
                  <div className="space-y-2 mb-4 pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Deliverables & Methodology
                    </p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom footer: Tools tags & Action CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {isInteractive ? (
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 group-hover:translate-x-1 transition-transform shrink-0">
                      <span>Inspect Live Analysis</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 shrink-0">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE STACK STAGE (Visible on < 1024px) ── */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="lg:hidden relative w-full max-w-[370px] h-[500px] mx-auto px-4"
        >
          {projectsData.projects.map((project, index) => {
            const isFocused = mobileActiveIndex === index;
            const isPast = index < mobileActiveIndex;
            const isFuture = index > mobileActiveIndex;
            const highlights = projectHighlights[project.id] || [];
            const isInteractive = index === 0;

            // Compute mobile stacking position
            let cardTransform = "translateX(0%) scale(1)";
            let cardOpacity = 1;
            let cardBlur = "blur(0px)";
            let cardZIndex = 20;

            if (isPast) {
              // Old card pushed to the left underneath
              cardTransform = `translateX(-${(mobileActiveIndex - index) * 16}%) scale(${
                1 - (mobileActiveIndex - index) * 0.08
              })`;
              cardOpacity = 0.45;
              cardBlur = "blur(3px)";
              cardZIndex = 10 + index;
            } else if (isFuture) {
              // Future card waiting on the right above
              cardTransform = "translateX(calc(100% + 24px)) scale(1)";
              cardOpacity = 1;
              cardBlur = "blur(0px)";
              cardZIndex = 30 + index;
            } else {
              // Active focused card on top
              cardTransform = "translateX(0%) scale(1)";
              cardOpacity = 1;
              cardBlur = "blur(0px)";
              cardZIndex = 25;
            }

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (isFocused) {
                    if (isInteractive) setSelectedProject(1);
                  } else {
                    setMobileActiveIndex(index);
                  }
                }}
                className={`mobile-stack-card absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white border p-6 flex flex-col justify-between cursor-pointer select-none ${
                  isFocused
                    ? "border-emerald-300 ring-2 ring-emerald-500/25 shadow-xl"
                    : "border-slate-200/60 shadow-md"
                }`}
                style={{
                  transform: cardTransform,
                  opacity: cardOpacity,
                  filter: cardBlur,
                  zIndex: cardZIndex,
                  transition:
                    "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, filter 0.45s ease",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Top Accent Gradient Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 transition-opacity duration-300 ${
                    isFocused ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div>
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-emerald-400 shadow-md shrink-0">
                        {getIcon(project.icon)}
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-emerald-600 uppercase tracking-widest block">
                          Case 0{index + 1}
                        </span>
                        <p className="text-[11px] text-slate-400 font-medium">Intelligence</p>
                      </div>
                    </div>

                    {isInteractive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70 shadow-2xs">
                        <Sparkles className="h-3 w-3 text-emerald-600" />
                        Interactive
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                        Case Study
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-sans text-slate-900 leading-snug mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                    {project.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-1.5 mb-4 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Deliverables
                    </p>
                    <ul className="space-y-1">
                      {highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {isInteractive ? (
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 shrink-0">
                      <span>Inspect</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  ) : (
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Minimal Controls & Stepper Dots ── */}
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 mt-6 flex items-center justify-center gap-4">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth >= 1024) {
                goToDesktopCard(Math.max(0, desktopActiveIndex - 1));
              } else {
                setMobileActiveIndex((prev) => Math.max(0, prev - 1));
              }
            }}
            disabled={
              (typeof window !== "undefined" && window.innerWidth >= 1024
                ? desktopActiveIndex
                : mobileActiveIndex) === 0
            }
            aria-label="Previous project card"
            className="p-2 sm:p-2.5 rounded-full bg-white border border-slate-200/80 shadow-xs hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2">
            {projectsData.projects.map((_, idx) => {
              const active =
                typeof window !== "undefined" && window.innerWidth >= 1024
                  ? desktopActiveIndex === idx
                  : mobileActiveIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (window.innerWidth >= 1024) {
                      goToDesktopCard(idx);
                    } else {
                      setMobileActiveIndex(idx);
                    }
                  }}
                  aria-label={`Jump to project ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    active ? "w-8 bg-emerald-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth >= 1024) {
                goToDesktopCard(Math.min(projectsData.projects.length - 1, desktopActiveIndex + 1));
              } else {
                setMobileActiveIndex((prev) =>
                  Math.min(projectsData.projects.length - 1, prev + 1)
                );
              }
            }}
            disabled={
              (typeof window !== "undefined" && window.innerWidth >= 1024
                ? desktopActiveIndex
                : mobileActiveIndex) ===
              projectsData.projects.length - 1
            }
            aria-label="Next project card"
            className="p-2 sm:p-2.5 rounded-full bg-white border border-slate-200/80 shadow-xs hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Project Footer Banner */}
        <ProjectFooter />
      </div>

      {/* Interactive Analysis Modal for Project 1 */}
      <Analysis1
        isOpen={selectedProject === 1}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
