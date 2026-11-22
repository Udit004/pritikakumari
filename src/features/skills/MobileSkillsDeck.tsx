"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { SingleSkillCardData } from "./types";
import { SingleSkillCardFront } from "./SingleSkillCardFront";
import { SingleSkillCardBack } from "./SingleSkillCardBack";
import { useSound } from "@/components/SoundProvider";
import { ChevronLeft, ChevronRight, Pause, Sparkles } from "lucide-react";

interface MobileSkillsDeckProps {
  skillCards: SingleSkillCardData[];
}

export function MobileSkillsDeck({ skillCards }: MobileSkillsDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [manualFlipped, setManualFlipped] = useState<Record<string, boolean>>({});
  const { play } = useSound();

  const totalCards = skillCards.length;
  // Card dimensions tailored for mobile screens (360px - 430px)
  const cardWidth = 290;
  const cardGap = 16;
  const step = cardWidth + cardGap;

  // Initialize auto-playing domino turnover timeline
  const setupTimeline = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;

    // Reset card rotations to artwork face
    cardInnersRef.current.forEach((inner) => {
      if (inner) {
        gsap.set(inner, { rotateY: 0, transformOrigin: "center center" });
      }
    });

    // Master looping timeline
    const tl = gsap.timeline({
      repeat: -1,
      onUpdate: () => {
        const prog = tl.progress();
        const currentCard = Math.min(
          totalCards - 1,
          Math.max(0, Math.floor(prog * totalCards))
        );
        setActiveIndex(currentCard);
      },
    });

    timelineRef.current = tl;

    // ── Phase 1: Domino Flip Cascade with Smooth Left-to-Right Gliding ──
    skillCards.forEach((_, i) => {
      const inner = cardInnersRef.current[i];
      const targetX = -i * step;

      // 1. Glide track horizontally so card i is centered
      tl.to(
        trackRef.current,
        {
          x: targetX,
          duration: 0.85,
          ease: "power2.inOut",
        },
        i === 0 ? 0.3 : `+=0.35`
      );

      // 2. Perform domino 3D turnover on card i (Back -> Front)
      if (inner) {
        tl.to(
          inner,
          {
            rotateY: 180,
            duration: 0.8,
            ease: "back.out(1.15)",
          },
          "<+=0.15"
        );
      }
    });

    // ── Phase 2: Dwell on All Revealed Cards (2.8s) ──
    tl.to({}, { duration: 2.8 });

    // ── Phase 3: Smooth Domino Reset (Front -> Back) ──
    skillCards.forEach((_, i) => {
      const inner = cardInnersRef.current[i];
      if (inner) {
        tl.to(
          inner,
          {
            rotateY: 0,
            duration: 0.55,
            ease: "power2.inOut",
          },
          i === 0 ? "+=0.1" : "<+=0.12"
        );
      }
    });

    // Glide track back to start
    tl.to(
      trackRef.current,
      {
        x: 0,
        duration: 1.1,
        ease: "power2.inOut",
      },
      "<"
    );

    // Brief breath before repeating
    tl.to({}, { duration: 0.8 });
  }, [skillCards, step, totalCards]);

  useEffect(() => {
    setupTimeline();

    return () => {
      timelineRef.current?.kill();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [setupTimeline]);

  // Touch & Hold interactions to pause/resume
  const handleInteractionStart = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    timelineRef.current?.pause();
    setIsPaused(true);
  };

  const handleInteractionEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      timelineRef.current?.resume();
      setIsPaused(false);
    }, 2000);
  };

  // Manual Card Click Flip
  const handleCardClick = (cardId: string) => {
    play("click");
    setManualFlipped((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
    handleInteractionStart();
    handleInteractionEnd();
  };

  // Manual step button click
  const goToCard = (index: number) => {
    if (index < 0 || index >= totalCards) return;
    handleInteractionStart();
    setActiveIndex(index);
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -index * step,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    const inner = cardInnersRef.current[index];
    if (inner) {
      gsap.to(inner, { rotateY: 180, duration: 0.6, ease: "back.out(1.15)" });
    }
    handleInteractionEnd();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center select-none pt-2 pb-10"
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
    >

      {/* ── Horizontal 3D Card Stage ── */}
      <div className="relative w-full overflow-hidden py-3 flex items-center justify-start">
        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{
            paddingLeft: `calc(50vw - ${cardWidth / 2}px)`,
            paddingRight: `calc(50vw - ${cardWidth / 2}px)`,
            gap: `${cardGap}px`,
          }}
        >
          {skillCards.map((card, i) => {
            const isManualFlipped = manualFlipped[card.id] || false;
            const isActive = activeIndex === i;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`relative shrink-0 cursor-pointer select-none transition-all duration-300 ${
                  isActive
                    ? "scale-100 opacity-100 z-20 shadow-lg"
                    : "scale-95 opacity-80 z-10"
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: "175px",
                  perspective: "1200px",
                }}
              >
                {/* 3D Inner Flipper (Controlled by GSAP domino timeline) */}
                <div
                  ref={(el) => {
                    cardInnersRef.current[i] = el;
                  }}
                  className="single-skill-card-inner w-full h-full relative"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* Manual click override wrapper */}
                  <div
                    className={`manual-flipper w-full h-full ${
                      isManualFlipped ? "is-manual-flipped" : ""
                    }`}
                  >
                    {/* Card Back Face (Figma SVG Artwork) */}
                    <SingleSkillCardBack
                      skill={card.skill}
                      index={card.index}
                      svgSrc={card.svgSrc}
                    />

                    {/* Card Front Face (Skill Competency details) */}
                    <SingleSkillCardFront
                      skill={card.skill}
                      index={card.index}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Step Navigation & Dot Indicators ── */}
      <div className="flex items-center justify-between w-full max-w-sm px-6 mt-4">
        <button
          onClick={() => goToCard(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous skill card"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 disabled:opacity-30 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 9 Card Dot Navigation */}
        <div className="flex items-center gap-1.5">
          {skillCards.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToCard(dotIdx)}
              aria-label={`Go to skill card 0${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex
                  ? "w-6 bg-emerald-500 shadow-xs shadow-emerald-500/40"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goToCard(activeIndex + 1)}
          disabled={activeIndex === totalCards - 1}
          aria-label="Next skill card"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 disabled:opacity-30 active:scale-95 transition-transform"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default MobileSkillsDeck;
