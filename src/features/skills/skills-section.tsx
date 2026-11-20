"use client";

import { skillsData } from "./data";
import {
  Users,
  Monitor,
  FileText,
  ShieldCheck,
  Folder,
  UserCog,
  BarChart,
  MessageSquare,
} from "lucide-react";
import SkillCard from "./SkillCard";
import React, { useRef } from "react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerImageRef = useRef<HTMLDivElement>(null);
  useSectionTracking("skills");

  useGSAP(() => {
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
  }, { scope: sectionRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="scene-section relative w-full min-h-[100svh] flex flex-col justify-center py-16 lg:py-20"
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
        <div className="mb-12 lg:mb-16 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shrink-0">
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

        {/* Skills Cards Grid - 3x3 layout with clean balanced spacing */}
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 shrink-0">
          {skillsData.skillsList.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={iconMap[skill.icon] ?? <Users className="h-5 w-5 text-emerald-400" />}
              level={skill.level}
              index={index}
            />
          ))}
        </div>

        {/* Numerical Metrics Bar */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white border border-emerald-200/50 shadow-sm overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-100 shrink-0">
          {[
            { label: "Core Skills", value: skillsData.skillsList.length, suffix: "+" },
            {
              label: "High Proficiency",
              value: skillsData.skillsList.filter((s) => s.level >= 4).length,
              suffix: " Disciplines",
            },
            { label: "Hands-on Experience", value: 1, suffix: "+ Year" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-3.5 sm:py-4 px-4 text-center">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  <Counter to={stat.value} />
                </span>
                <span className="text-base sm:text-lg font-bold text-emerald-600">{stat.suffix}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
