"use client";

import { motion } from "framer-motion";
import React, { ReactNode, useState } from "react";

type Props = {
  name: string;
  icon: ReactNode;
  level: number;
  index?: number;
  category?: string;
  tags?: string[];
  masteryText?: string;
};

const levelLabels: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export default function SkillCard({
  name,
  icon,
  level,
  index = 0,
  tags = [],
  masteryText = "Proficient",
}: Props) {
  const maxLevel = 5;

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX,
      glareY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="skill-card group relative rounded-3xl cursor-default h-full w-full select-none"
      style={{
        transform: tilt.isHovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.02)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
        transition: tilt.isHovered
          ? "transform 0.12s ease-out"
          : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
        willChange: "transform",
      }}
    >
      {/* ── Perimeter Border-Beam Rotating Light Streak ── */}
      <div className="pointer-events-none absolute -inset-[1.5px] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden z-0">
        <div className="absolute -inset-[150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.95)_340deg,rgba(56,189,248,0.95)_360deg)]" />
      </div>

      {/* ── Main Card Body ── */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full bg-white rounded-3xl border border-emerald-200/50 p-6 sm:p-7 shadow-xs hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Giant Watermark Index */}
        <span className="pointer-events-none absolute top-3 right-5 text-4xl sm:text-5xl font-mono font-black text-slate-100 group-hover:text-emerald-50 transition-colors select-none z-0">
          0{index + 1}
        </span>

        {/* Specular Glare Reflection on 3D Tilt */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-20"
          style={{
            opacity: tilt.isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 240px at ${tilt.glareX}% ${tilt.glareY}%, rgba(16, 185, 129, 0.28), transparent 70%)`,
          }}
        />

        {/* Hover Radial Glow Backdrop */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(167,243,208,0.35),transparent_65%)] z-0" />

        <div className="relative z-10">
          {/* Header Row: Icon & Status Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shrink-0">
              {icon}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/70 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{levelLabels[level] || "Expert"}</span>
            </div>
          </div>

          {/* Skill Title */}
          <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 leading-snug group-hover:text-emerald-950 transition-colors mb-2">
            {name}
          </h3>

          {/* Methodology / Tool Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 my-3.5">
              {tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px] font-semibold text-slate-600 transition-colors group-hover:bg-emerald-50 group-hover:border-emerald-200/80 group-hover:text-emerald-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Segmented Proficiency Bar + Percentage */}
        <div className="relative z-10 mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Proficiency Level</span>
            <span className="text-emerald-700 font-extrabold">{masteryText}</span>
          </div>

          {/* Segmented Level Indicators */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxLevel }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.1 + i * 0.08,
                  ease: "easeOut",
                }}
                className={`h-1.5 flex-1 rounded-full origin-left ${
                  i < level
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                    : "bg-slate-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
