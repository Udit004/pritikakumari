"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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

function SkillCard({ name, icon, level, index = 0 }: Props) {
  const maxLevel = 5;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white cursor-default"
      style={{
        border: "1px solid rgba(16, 185, 129, 0.12)",
        boxShadow: "0 2px 12px rgba(16,185,129,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 32px rgba(16,185,129,0.14), 0 4px 12px rgba(0,0,0,0.06)",
        transition: { duration: 0.22 },
      }}
    >
      {/* Top emerald accent line — appears on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #10b981, #34d399)" }}
      />

      {/* Subtle hover background tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(160deg, rgba(240,253,244,0.7) 0%, transparent 60%)" }}
      />

      <div className="relative p-6 flex flex-col gap-4">
        {/* Icon + level badge row */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-emerald-500 transition-all duration-300 group-hover:scale-105"
            // style={{
            //   background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
            //   border: "1px solid rgba(16,185,129,0.2)",
            //   color: "#000000",
            // }}
          >
            {icon}
          </div>

          <span
            className="text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
            style={{
              color: "#059669",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.15)",
            }}
          >
            {levelLabels[level]}
          </span>
        </div>

        {/* Skill name */}
        <p
          className="text-sm font-semibold leading-snug"
          style={{ color: "#1a2e1f" }}
        >
          {name}
        </p>

        {/* Animated progress segments */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <motion.div
              key={i}
              className="h-[3px] flex-1 rounded-full"
              style={{
                background:
                  i < level
                    ? "linear-gradient(90deg, #10b981, #34d399)"
                    : "rgba(16,185,129,0.1)",
              }}
              initial={{ scaleX: 0, originX: "0%" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.07 + i * 0.055 + 0.25,
              }}
            />
          ))}
        </div>
      </div>

      {/* Shine sweep on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%)",
        }}
        initial={{ x: "-100%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

export default SkillCard;