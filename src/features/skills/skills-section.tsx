"use client";

import { skillsData } from "./data";
import {
  BookOpen,
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

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    if (!ref.current) return;

    const counter = { val: from };

    const animate = () => {
      counter.val = from;

      gsap.to(counter, {
        val: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.floor(counter.val).toString();
        },
        onComplete: () => {
          gsap.delayedCall(3, animate); // wait 3 sec then restart
        }
      });
    };

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      once: true,
      onEnter: () => animate()
    });

  });

  return <span ref={ref}>{from}</span>;
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
  useSectionTracking("skills");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(".skill-badge", 
        { opacity: 0, y: 12 }, 
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      )
      .fromTo(".skill-heading", 
        { opacity: 0, y: 16 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 
        "-=0.2"
      )
      .fromTo(".skill-underline-1", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 0.55, ease: "power3.out", transformOrigin: "0% 50%" }, 
        "-=0.3"
      )
      .fromTo(".skill-underline-2", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 0.4, ease: "power3.out", transformOrigin: "0% 50%" }, 
        "-=0.4"
      )
      .fromTo(".skill-subtitle", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 
        "-=0.3"
      )
      .fromTo(".skill-card", 
        { opacity: 0, y: 24 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, 
        "-=0.2"
      )
      .fromTo(".skill-level-bar", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 0.4, stagger: 0.02, ease: "power2.out", transformOrigin: "0% 50%" }, 
        "-=0.5"
      )
      .fromTo(".skill-stats", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 
        "-=0.3"
      );
  }, { scope: sectionRef });
  
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 sm:py-28"
    >
      {/* ── Dot grid — matches hero section pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          opacity: 0.55,
        }}
      />

      {/* ── Subtle ambient glow ── */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(167,243,208,0.35) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(167,243,208,0.2) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="mb-14 space-y-4">
          {/* Badge — same style as hero "HR PROFESSIONAL" badge */}
          <div
            className="skill-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 opacity-0"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
              transform: "translateY(12px)"
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "#10b981" }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ color: "#059669" }}
            >
              My Skills
            </span>
          </div>

          {/* Heading — matches the bold emerald-green hero heading style */}
          <h2
            className="skill-heading text-4xl sm:text-5xl font-bold tracking-tight opacity-0"
            style={{ color: "#fffff", transform: "translateY(16px)" }}
          >
            {skillsData.title}
          </h2>

          {/* Underline accent */}
          <div className="flex items-center gap-2.5">
            <div
              className="skill-underline-1 h-[3px] w-14 rounded-full"
              style={{ background: "linear-gradient(90deg, #10b981, #a7f3d0)", transform: "scaleX(0)" }}
            />
            <div
              className="skill-underline-2 h-[3px] w-5 rounded-full"
              style={{ background: "rgba(16,185,129,0.2)", transform: "scaleX(0)" }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="skill-subtitle text-base max-w-xl opacity-0"
            style={{ color: "#4b5563", lineHeight: "1.8", transform: "translateY(10px)" }}
          >
            A curated overview of my professional capabilities, refined through
            hands-on experience across HR operations and organizational management.
          </p>
        </div>

        {/* ── Skills grid ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillsData.skillsList.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={
                iconMap[skill.icon] ?? (
                  <Users className="h-5 w-5 text-black" />
                )
              }
              level={skill.level}
              index={index}
            />
          ))}
        </div>

        {/* ── Bottom stats bar — matches hero stat strip ── */}
        <div
          className="skill-stats mt-14 grid grid-cols-3 overflow-hidden rounded-2xl bg-white opacity-0"
          style={{
            border: "1px solid rgba(16,185,129,0.15)",
            boxShadow: "0 4px 20px rgba(16,185,129,0.07)",
            transform: "translateY(20px)"
          }}
        >
          {[
            { label: "Skills", numericValue: skillsData.skillsList.length, suffix: "+" },
            {
              label: "Expert Level",
              numericValue: skillsData.skillsList.filter((s) => s.level === 5).length,
              suffix: ""
            },
            { label: "Years Experience", numericValue: 1, suffix: "+" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-7 px-4 text-center relative"
            >
              {/* Vertical divider */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/4 bottom-1/4 w-px"
                  style={{ background: "rgba(16,185,129,0.15)" }}
                />
              )}

              {/* Emerald icon dot */}
              <div
                className="w-2 h-2 rounded-full mb-3"
                style={{ background: "#10b981" }}
              />

              <span
                className="text-3xl font-bold"
                style={{ color: "#064e3b" }}
              >
                <Counter to={stat.numericValue} />{stat.suffix}
              </span>
              <span
                className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ color: "#6b7280" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}