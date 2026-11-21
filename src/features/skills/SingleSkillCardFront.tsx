"use client";

import React from "react";
import {
  Users,
  Monitor,
  FileText,
  ShieldCheck,
  Folder,
  UserCog,
  BarChart,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { SkillItem } from "./data";

interface SingleSkillCardFrontProps {
  skill: SkillItem;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-4 w-4 text-emerald-400" />,
  Monitor: <Monitor className="h-4 w-4 text-emerald-400" />,
  FileText: <FileText className="h-4 w-4 text-emerald-400" />,
  ShieldCheck: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
  Folder: <Folder className="h-4 w-4 text-emerald-400" />,
  UserCog: <UserCog className="h-4 w-4 text-emerald-400" />,
  BarChart: <BarChart className="h-4 w-4 text-emerald-400" />,
  MessageSquare: <MessageSquare className="h-4 w-4 text-emerald-400" />,
};

const levelLabels: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export function SingleSkillCardFront({
  skill,
  index,
}: SingleSkillCardFrontProps) {
  const maxLevel = 5;

  return (
    <div className="skill-card-face skill-card-front relative w-full h-full bg-white rounded-2xl border border-emerald-200/70 shadow-lg flex flex-col justify-between p-3.5 lg:p-4 overflow-hidden select-none">
      {/* ── Background subtle gradient & watermark ── */}
      <div className="pointer-events-none absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-emerald-100/40 blur-xl z-0" />
      <div className="pointer-events-none absolute top-1 right-3 font-mono text-3xl font-black text-slate-100/90 select-none z-0">
        0{index + 1}
      </div>

      {/* ── Top Header Row: Icon Capsule, Category Pill & Status ── */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 lg:gap-2">
          {/* Dark Navy Icon Capsule */}
          <div className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-lg bg-slate-950 text-emerald-400 shadow-xs shrink-0">
            {iconMap[skill.icon] ?? <Users className="h-4 w-4 text-emerald-400" />}
          </div>

          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 truncate max-w-[130px] lg:max-w-[160px]">
            {skill.category}
          </span>
        </div>

        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
          <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
          <span>{levelLabels[skill.level] || "Expert"}</span>
        </div>
      </div>

      {/* ── Middle: Skill Name & Mastery Percentage ── */}
      <div className="relative z-10 my-0.5">
        <div className="flex items-baseline justify-between gap-1.5 mb-1">
          <h3 className="text-xs sm:text-sm lg:text-base font-bold font-sans text-slate-900 leading-snug tracking-tight truncate">
            {skill.name}
          </h3>
          <span className="shrink-0 text-[10px] lg:text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/40 font-mono">
            {skill.masteryText}
          </span>
        </div>

        {/* Segmented 5-Point Proficiency Bar */}
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < skill.level
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_6px_rgba(16,185,129,0.3)]"
                  : "bg-slate-200/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom: Tags Pills ── */}
      <div className="relative z-10 flex flex-wrap gap-1 pt-1.5 border-t border-slate-100">
        {skill.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            className="text-[9px] sm:text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-1.5 lg:px-2 py-0.5 rounded-md truncate max-w-[110px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
