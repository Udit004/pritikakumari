"use client";

import { useState, useRef } from "react";
import { skillsData, SkillItem } from "./data";
import {
  Users,
  Monitor,
  FileText,
  ShieldCheck,
  Folder,
  UserCog,
  BarChart,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import SkillCard from "./SkillCard";
import React from "react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.floor(counter.val).toString();
          },
        });
      },
    });
  });
  return <span ref={ref}>0</span>;
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-5 w-5 text-emerald-400" />,
  Monitor: <Monitor className="h-5 w-5 text-emerald-400" />,
  FileText: <FileText className="h-5 w-5 text-emerald-400" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
  Folder: <Folder className="h-5 w-5 text-emerald-400" />,
  UserCog: <UserCog className="h-5 w-5 text-emerald-400" />,
  BarChart: <BarChart className="h-5 w-5 text-emerald-400" />,
  MessageSquare: <MessageSquare className="h-5 w-5 text-emerald-400" />,
};

const filterCategories = [
  "All Capabilities",
  "People Operations",
  "HR Systems",
  "Compliance & Payroll",
  "Analytics & Strategy",
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All Capabilities");

  const sectionRef = useRef<HTMLElement>(null);
  const headerImageRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useSectionTracking("skills");

  const filteredSkills = skillsData.skillsList.filter(
    (skill) => activeCategory === "All Capabilities" || skill.category === activeCategory
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Header illustration subtle parallax
      if (headerImageRef.current) {
        gsap.to(headerImageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
          y: -25,
          ease: "none",
        });
      }

      // Desktop: 3D Stagger Wave Reveal + Column Parallax Scrub
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".skill-card-wrapper");
        if (cards.length === 0 || !skillsGridRef.current) return;

        // 1. Initial 3D Scroll Reveal Wave with spring settle
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            rotateX: 16,
            rotateY: -8,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 2. Center Column Upward Float Parallax Scrub
        const centerCol = gsap.utils.toArray<HTMLElement>(".skill-card-col-center");
        if (centerCol.length > 0) {
          gsap.to(centerCol, {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // 3. Side Columns Downward Complementary Drift Parallax Scrub
        const sideCol = gsap.utils.toArray<HTMLElement>(".skill-card-col-side");
        if (sideCol.length > 0) {
          gsap.to(sideCol, {
            y: 15,
            ease: "none",
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      // Mobile / Tablet: Smooth staggered entrance
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".skill-card-wrapper");
        if (cards.length === 0 || !skillsGridRef.current) return;

        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="scene-section relative w-full min-h-[100svh] flex flex-col justify-center py-16 lg:py-24"
    >
      {/* Background radial atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Section Header - styled consistently with Project section */}
        <div className="mb-10 lg:mb-14 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shrink-0">
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Core Competencies
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              {skillsData.title}
            </h2>

            <div className="flex items-center gap-2">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <div className="w-5 h-1 rounded-full bg-emerald-200" />
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              A curated overview of my professional capabilities across HR operations, talent lifecycle management, and organizational data analytics.
            </p>
          </div>

          {/* Header Illustration - matching Project section image size */}
          <div
            ref={headerImageRef}
            className="flex-1 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/assests/images/skills/skill_headerImage.png"
                alt="Skills Overview Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Creative Interactive Domain Filter Tabs ── */}
        <div className="mb-8 w-full flex items-center justify-center">
          <div className="hidden sm:flex flex-wrap items-center justify-center p-1.5 bg-white border border-emerald-100 shadow-sm rounded-full gap-1.5">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === category
                    ? "bg-slate-950 text-white shadow-md scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Select dropdown */}
          <div className="sm:hidden w-full max-w-[260px]">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-emerald-200 text-slate-900 text-sm font-bold rounded-full px-5 py-2.5 pr-10 shadow-sm focus:outline-none"
            >
              {filterCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Skills Cards Matrix with 3D Parallax & Kinetic Organic Float ── */}
        <div
          ref={skillsGridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 shrink-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const isCenterCol = index % 3 === 1;
              const colClass = isCenterCol ? "skill-card-col-center" : "skill-card-col-side";

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`skill-card-wrapper ${colClass} animate-skill-float w-full h-full`}
                  style={{
                    animationDelay: `${(index % 3) * 0.75}s`,
                  }}
                >
                  <SkillCard
                    name={skill.name}
                    icon={iconMap[skill.icon] ?? <Users className="h-5 w-5 text-emerald-400" />}
                    level={skill.level}
                    index={index}
                    category={skill.category}
                    tags={skill.tags}
                    masteryText={skill.masteryText}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Numerical Metrics Bar */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white border border-emerald-200/50 shadow-sm overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-100 shrink-0">
          {[
            { label: "Core Skills", value: skillsData.skillsList.length, suffix: "+" },
            {
              label: "High Proficiency",
              value: skillsData.skillsList.filter((s) => s.level >= 4).length,
              suffix: " Disciplines",
            },
            { label: "Hands-on Experience", value: 1, suffix: "+ Year" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-4 px-4 text-center">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  <Counter to={stat.value} />
                </span>
                <span className="text-base sm:text-lg font-bold text-emerald-600">{stat.suffix}</span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
