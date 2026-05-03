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
import { motion } from "framer-motion";
import SkillCard from "./SkillCard";
import React from "react";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-5 w-5 text-emerald-600" />,
  Monitor: <Monitor className="h-5 w-5 text-emerald-600" />,
  FileText: <FileText className="h-5 w-5 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
  Folder: <Folder className="h-5 w-5 text-emerald-600" />,
  UserCog: <UserCog className="h-5 w-5 text-emerald-600" />,
  BarChart: <BarChart className="h-5 w-5 text-emerald-600" />,
  MessageSquare: <MessageSquare className="h-5 w-5 text-emerald-600" />,
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden py-24 sm:py-28 scroll-mt-24"
      style={{ background: "#f8fdfb" }}
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
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.div>

          {/* Heading — matches the bold emerald-green hero heading style */}
          <motion.h2
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ color: "#064e3b" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {skillsData.title}
          </motion.h2>

          {/* Underline accent */}
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-[3px] w-14 rounded-full"
              style={{ background: "linear-gradient(90deg, #10b981, #a7f3d0)" }}
              initial={{ scaleX: 0, originX: "0%" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.32 }}
            />
            <motion.div
              className="h-[3px] w-5 rounded-full"
              style={{ background: "rgba(16,185,129,0.2)" }}
              initial={{ scaleX: 0, originX: "0%" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base max-w-xl"
            style={{ color: "#4b5563", lineHeight: "1.8" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            A curated overview of my professional capabilities, refined through
            hands-on experience across HR operations and organizational management.
          </motion.p>
        </div>

        {/* ── Skills grid ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillsData.skillsList.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={
                iconMap[skill.icon] ?? (
                  <Users className="h-5 w-5 text-emerald-600" />
                )
              }
              level={skill.level}
              index={index}
            />
          ))}
        </div>

        {/* ── Bottom stats bar — matches hero stat strip ── */}
        <motion.div
          className="mt-14 grid grid-cols-3 overflow-hidden rounded-2xl bg-white"
          style={{
            border: "1px solid rgba(16,185,129,0.15)",
            boxShadow: "0 4px 20px rgba(16,185,129,0.07)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { label: "Skills", value: `${skillsData.skillsList.length}+` },
            {
              label: "Expert Level",
              value: `${skillsData.skillsList.filter((s) => s.level === 5).length}`,
            },
            { label: "Years Experience", value: "1+" },
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
                {stat.value}
              </span>
              <span
                className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ color: "#6b7280" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}