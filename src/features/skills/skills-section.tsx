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
import Image from "next/image";
import { motion, Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" as const },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
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
          gsap.delayedCall(3, animate);
        },
      });
    };
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      once: true,
      onEnter: () => animate(),
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

  return (
    <motion.section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Dot grid */}
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

      {/* Ambient glow */}
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
        {/* Section header */}
        <div className="mb-14 w-full flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <motion.div
              className="skill-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              variants={itemVariants}
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "#059669" }}>
                My Skills
              </span>
            </motion.div>

            <motion.h2 className="skill-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900" variants={itemVariants}>
              {skillsData.title}
            </motion.h2>

            <div className="flex items-center gap-2.5">
              <motion.div
                className="skill-underline-1 h-[3px] w-14 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{ background: "linear-gradient(90deg, #10b981, #a7f3d0)", transformOrigin: "0% 50%" }}
              />
              <motion.div
                className="skill-underline-2 h-[3px] w-5 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ background: "rgba(16,185,129,0.2)", transformOrigin: "0% 50%" }}
              />
            </div>

            <motion.p className="skill-subtitle text-base max-w-xl text-gray-600 leading-relaxed" variants={itemVariants}>
              A curated overview of my professional capabilities, refined through hands-on experience across HR operations and organizational management.
            </motion.p>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Image
                src="/assests/images/skills/skill_headerImage.png"
                alt="Skills Header"
                width={500}
                height={500}
                className="w-full h-auto object-contain rounded-xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
          {skillsData.skillsList.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={iconMap[skill.icon] ?? <Users className="h-5 w-5 text-black" />}
              level={skill.level}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom stats bar */}
        <motion.div
          className="skill-stats mt-14 grid grid-cols-3 overflow-hidden rounded-2xl bg-white"
          variants={containerVariants}
          style={{ border: "1px solid rgba(16,185,129,0.15)", boxShadow: "0 4px 20px rgba(16,185,129,0.07)" }}
        >
          {[
            { label: "Skills", numericValue: skillsData.skillsList.length, suffix: "+" },
            {
              label: "Expert Level",
              numericValue: skillsData.skillsList.filter((s) => s.level === 5).length,
              suffix: "",
            },
            { label: "Years Experience", numericValue: 1, suffix: "+" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-7 px-4 text-center relative">
              {i > 0 && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-px" style={{ background: "rgba(16,185,129,0.15)" }} />
              )}
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: "#10b981" }} />
              <span className="text-3xl font-bold" style={{ color: "#064e3b" }}>
                <Counter to={stat.numericValue} />{stat.suffix}
              </span>
              <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "#6b7280" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}