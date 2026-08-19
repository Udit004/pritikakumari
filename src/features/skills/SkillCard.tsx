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
  initial: { opacity: 0, y: 24 },
  hover: {
    y: -8,
    rotateX: -6,
    rotateY: 6,
    boxShadow:
      "0 22px 42px rgba(15, 23, 42, 0.14), 0 10px 24px rgba(16, 185, 129, 0.16), 0 0 0 1px rgba(16, 185, 129, 0.18)",
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
  rest: {
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow:
      "0 16px 30px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(16, 185, 129, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
};

const iconHover = {
  scale: 1.15,
  rotate: 8,
  transition: { duration: 0.4, ease: "backOut" as const },
};

const shineHover = {
  x: "120%",
  transition: { duration: 0.6, ease: "easeInOut" as const },
};

export default function SkillCard({ name, icon, level, index = 0 }: Props) {
  const maxLevel = 5;
  const shineRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="skill-card group relative overflow-hidden rounded-2xl cursor-default border border-emerald-200/30"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Top overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, #10b981, #34d399)" }}
      />

      {/* Background overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at top left, rgba(167, 243, 208, 0.26), transparent 56%)" }}
      />

      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-2 h-5 rounded-full opacity-70 blur-xl"
        style={{ background: "rgba(16,185,129,0.22)" }}
      />

      <div className="relative p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <motion.div
            ref={iconRef}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-emerald-400"
            style={{
              border: "1px solid rgba(16,185,129,0.18)",
              boxShadow: "0 8px 18px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            }}
            whileHover={iconHover}
          >
            {icon}
          </motion.div>

          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              color: "#059669",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.15)",
            }}
          >
            {levelLabels[level]}
          </span>
        </div>

        <p className="text-sm font-semibold leading-snug" style={{ color: "#163021" }}>
          {name}
        </p>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <div
              key={i}
              className="h-0.75 flex-1 rounded-full skill-level-bar"
              style={{
                background: i < level ? "linear-gradient(90deg, #10b981, #34d399)" : "rgba(16,185,129,0.1)",
                transform: "scaleX(0)",
                transformOrigin: "0% 50%",
              }}
            />
          ))}
        </div>
      </div>

      {/* Shine sweep */}
      <motion.div
        ref={shineRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%)",
          transform: "translateX(-100%)",
        }}
        whileHover={shineHover}
      />
    </motion.div>
  );
}