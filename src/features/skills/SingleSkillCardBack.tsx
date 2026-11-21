"use client";

import React from "react";
import Image from "next/image";
import { SkillItem } from "./data";
import { Sparkles } from "lucide-react";

interface SingleSkillCardBackProps {
  skill: SkillItem;
  index: number;
  svgSrc: string;
}

export function SingleSkillCardBack({
  skill,
  index,
  svgSrc,
}: SingleSkillCardBackProps) {
  return (
    <div className="skill-card-face skill-card-back relative w-full h-full rounded-2xl bg-[#030E17] border border-emerald-500/30 shadow-2xl flex flex-col justify-between p-3 lg:p-3.5 overflow-hidden select-none">
      {/* ── Raw Figma SVG Artwork Layer ── */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <Image
          src={svgSrc}
          alt={`${skill.name} card artwork`}
          fill
          unoptimized
          priority
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover object-center scale-[1.25] pointer-events-none select-none"
        />
      </div>

      {/* ── Holographic Sheen Layer ── */}
      <div className="card-specular-glow absolute inset-0 z-10 rounded-2xl" />

      {/* ── Top Header Brand Strip ── */}
      <div className="relative z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-300">
            0{index + 1}
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-200 font-mono drop-shadow">
            PK · HR
          </span>
        </div>

        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-bold text-emerald-300 backdrop-blur-xs">
          <Sparkles className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
          <span className="truncate max-w-[100px]">{skill.category}</span>
        </div>
      </div>

      {/* ── Bottom Deck Identity Label ── */}
      <div className="relative z-20 text-left pointer-events-none bg-gradient-to-t from-[#020A11]/95 via-[#020A11]/60 to-transparent pt-3 pb-0.5">
        <p className="text-[9px] font-mono tracking-widest text-emerald-400/80 uppercase">
          Skill 0{index + 1}
        </p>
        <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight drop-shadow truncate">
          {skill.name}
        </h4>
      </div>
    </div>
  );
}
