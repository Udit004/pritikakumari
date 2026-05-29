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
      className="group relative overflow-hidden rounded-2xl cursor-default"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f4faf6 100%)",
        border: "1px solid rgba(16, 185, 129, 0.14)",
        boxShadow:
          "0 16px 30px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(16, 185, 129, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -8,
        rotateX: -6,
        rotateY: 6,
        boxShadow:
          "0 22px 42px rgba(15, 23, 42, 0.14), 0 10px 24px rgba(16, 185, 129, 0.16), 0 0 0 1px rgba(16, 185, 129, 0.18)",
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, #10b981, #34d399)" }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at top left, rgba(167, 243, 208, 0.26), transparent 56%)" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-2 h-5 rounded-full opacity-70 blur-xl"
        style={{ background: "rgba(16,185,129,0.22)" }}
      />

      <div className="relative p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-emerald-400 transition-all duration-300 group-hover:scale-105"
            style={{
              border: "1px solid rgba(16,185,129,0.18)",
              boxShadow:
                "0 8px 18px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            }}
          >
            {icon}
          </div>

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

        {/* Skill name */}
        <p
          className="text-sm font-semibold leading-snug"
          style={{ color: "#163021" }}
        >
          {name}
        </p>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <motion.div
              key={i}
              className="h-0.75 flex-1 rounded-full"
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