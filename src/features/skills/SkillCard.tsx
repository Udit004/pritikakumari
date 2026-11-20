"use client";

import { motion, Variants } from "framer-motion";
import React, { ReactNode } from "react";

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function SkillCard({ name, icon, level, index = 0 }: Props) {
  const maxLevel = 5;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: -6,
        rotateX: -4,
        rotateY: 4,
        boxShadow:
          "0 20px 35px rgba(15, 23, 42, 0.12), 0 8px 16px rgba(16, 185, 129, 0.14)",
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className="skill-card group relative overflow-hidden rounded-2xl cursor-default bg-white border border-emerald-200/50 p-5 sm:p-5.5 flex flex-col justify-between shadow-xs hover:border-emerald-300/60 transition-all"
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-emerald-500 to-teal-400"
      />

      {/* Subtle background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(167,243,208,0.3),transparent_65%)]"
      />

      <div>
        <div className="flex items-start justify-between mb-3.5">
          <div
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-slate-950 text-emerald-400 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
          >
            {icon}
          </div>

          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60"
          >
            {levelLabels[level] || "Proficient"}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {name}
        </h3>
      </div>

      {/* Progress level indicators */}
      <div className="mt-4 flex items-center gap-1.5">
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
            className={`h-1 flex-1 rounded-full origin-left ${
              i < level
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : "bg-slate-100"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
