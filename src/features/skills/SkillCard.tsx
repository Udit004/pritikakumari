"use client";

import { motion } from "framer-motion";
import React, { ReactNode, useState } from "react";

type Props = {
  name: string;
  icon: ReactNode;
  level: number;
  index?: number;
};

const levelLabels: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export default function SkillCard({ name, icon, level }: Props) {
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
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
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
      className="skill-card group relative overflow-hidden rounded-3xl cursor-default bg-white border border-emerald-200/50 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-emerald-300/80 hover:shadow-xl transition-all h-full select-none"
      style={{
        transform: tilt.isHovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.02)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
        transition: tilt.isHovered ? "transform 0.12s ease-out" : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
        willChange: "transform",
      }}
    >
      {/* Specular Glare Reflection on 3D Tilt */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-20"
        style={{
          opacity: tilt.isHovered ? 0.35 : 0,
          background: `radial-gradient(circle 220px at ${tilt.glareX}% ${tilt.glareY}%, rgba(16, 185, 129, 0.28), transparent 70%)`,
        }}
      />

      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-emerald-500 to-teal-400 z-10" />

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(167,243,208,0.35),transparent_65%)]" />

      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shrink-0">
            {icon}
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
            {levelLabels[level] || "Proficient"}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 leading-snug group-hover:text-emerald-950 transition-colors">
          {name}
        </h3>
      </div>

      {/* Progress level indicators */}
      <div className="mt-5 flex items-center gap-1.5">
        {Array.from({ length: maxLevel }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.08,
              ease: "easeOut",
            }}
            className={`h-1.5 flex-1 rounded-full origin-left ${
              i < level
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : "bg-slate-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
