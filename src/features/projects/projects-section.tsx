"use client";

import { useState, useRef } from "react";
import { projectsData } from "./data";
import { Briefcase, Database, Code, Users, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: GSAP ScrollTrigger Pinned Horizontal Scroll
      mm.add("(min-width: 1024px)", () => {
        const pinWrapper = pinWrapperRef.current;
        const track = scrollTrackRef.current;
        if (!pinWrapper || !track) return;

        const getDistance = () => Math.max(0, track.scrollWidth - pinWrapper.clientWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top 15%",
            end: () => `+=${getDistance() + 200}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const count = projectsData.projects.length;
              const idx = Math.min(count - 1, Math.round(self.progress * (count - 1)));
              setActiveIndex(idx);
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scene-section relative w-full min-h-[100svh] py-20 lg:py-28"
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

      {/* Horizontal Scroll Showcase Container - Simple, Clean, Attractive */}
      <div
        ref={pinWrapperRef}
        className="relative w-full overflow-hidden my-4 lg:my-8"
      >
        {/* Scroll Track: Desktop transforms via GSAP; Mobile scrolls natively */}
        <div className="w-full overflow-hidden px-6 lg:px-16 py-3">
          <div
            ref={scrollTrackRef}
            className="flex gap-8 lg:gap-12 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-none pb-6 pt-2 will-change-transform"
            style={{ width: "max-content" }}
          >
            {projectsData.projects.map((project, index) => {
              const highlights = projectHighlights[project.id] || [];
              const isInteractive = index === 0;

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (isInteractive) setSelectedProject(1);
                  }}
                  className={`relative rounded-3xl overflow-hidden bg-white border border-emerald-200/60 shadow-md hover:shadow-xl p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between group cursor-pointer w-[90vw] sm:w-[560px] lg:w-[680px] shrink-0 snap-center select-none ${
                    activeIndex === index
                      ? "ring-2 ring-emerald-500/40 shadow-emerald-500/10"
                      : "opacity-95"
                  }`}
                >
                  {/* Top Accent Gradient Line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header row: Icon, Category & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400 shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0">
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
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 leading-snug mb-3 group-hover:text-emerald-950 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-6">
                      {project.description}
                    </p>

                    {/* Key Deliverables & Focus points - laid out sideways in a 2-column grid */}
                    <div className="space-y-2 mb-6 pt-5 border-t border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Key Deliverables & Methodology
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                        {highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom footer: Tools tags & Action CTA */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
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
