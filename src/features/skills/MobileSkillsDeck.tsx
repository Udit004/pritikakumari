"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
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
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isAnimatingRef = useRef(false);

  const totalCards = skillCards.length;
  // 3 duplicate sets enable infinite, seamless forward motion without any backward rewinding
  const displaySkillCards = useMemo(() => {
    if (totalCards <= 1) return skillCards;
    return [...skillCards, ...skillCards, ...skillCards];
  }, [skillCards, totalCards]);

  // Card dimensions tailored for mobile screens (360px - 430px)
  const cardWidth = 290;
  const cardGap = 16;
  const step = cardWidth + cardGap;

  const initialV = totalCards <= 1 ? 0 : totalCards;
  const vIndexRef = useRef(initialV);
  const [currentVirtual, setCurrentVirtual] = useState(initialV);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [manualFlipped, setManualFlipped] = useState<Record<string, boolean>>({});
  const { play } = useSound();

  // Position track at Set 1 on mount & set initial card face rotations
  useEffect(() => {
    cardInnersRef.current.forEach((inner, idx) => {
      if (inner) {
        gsap.set(inner, {
          rotateY: idx === initialV ? 180 : 0,
          transformOrigin: "center center",
        });
      }
    });

    if (trackRef.current) {
      gsap.set(trackRef.current, { x: -initialV * step });
    }

    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [initialV, step]);

  // Touch & Hold interactions to pause/resume
  const handleInteractionStart = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2200);
  }, []);

  // Smoothly advances 1 card FORWARD with domino turnover in the same continuous direction
  const advanceForward = useCallback(() => {
    if (!trackRef.current || totalCards <= 1 || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const currentV = vIndexRef.current;
    const nextV = currentV + 1;
    const targetX = -nextV * step;

    setActiveIndex(nextV % totalCards);
    setCurrentVirtual(nextV);

    // 1. Glide track forward to next card
    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.85,
      ease: "power2.inOut",
      onComplete: () => {
        // When reaching Set 2 (>= 2 * totalCards), instantly reset to Set 1 in 0 seconds.
        // Because the cards are identical, this reset is 100% invisible!
        if (nextV >= 2 * totalCards) {
          const resetV = nextV - totalCards;
          vIndexRef.current = resetV;
          setCurrentVirtual(resetV);
          if (trackRef.current) {
            gsap.set(trackRef.current, { x: -resetV * step });
          }
          const activeInner = cardInnersRef.current[resetV];
          if (activeInner) gsap.set(activeInner, { rotateY: 180 });

          // Reset Set 2 card inners back to 0 offscreen
          for (let k = 2 * totalCards; k < 3 * totalCards; k++) {
            const inner = cardInnersRef.current[k];
            if (inner) gsap.set(inner, { rotateY: 0 });
          }
        } else {
          vIndexRef.current = nextV;
          // Reset card that is far offscreen to the left back to 0
          const oldInner = cardInnersRef.current[nextV - 2];
          if (oldInner) gsap.set(oldInner, { rotateY: 0 });
        }
        isAnimatingRef.current = false;
      },
    });

    // 2. Perform domino 3D turnover on approaching card
    const nextInner = cardInnersRef.current[nextV];
    if (nextInner) {
      gsap.to(nextInner, {
        rotateY: 180,
        duration: 0.75,
        ease: "back.out(1.15)",
        delay: 0.15,
      });
    }
  }, [step, totalCards]);

  // Smoothly retreats 1 card BACKWARD (for manual swipe/prev button)
  const retreatBackward = useCallback(() => {
    if (!trackRef.current || totalCards <= 1 || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const currentV = vIndexRef.current;
    const prevV = currentV - 1;
    const targetX = -prevV * step;

    setActiveIndex(((prevV % totalCards) + totalCards) % totalCards);
    setCurrentVirtual(prevV);

    // Ensure target card is flipped to front
    const prevInner = cardInnersRef.current[prevV];
    if (prevInner) {
      gsap.to(prevInner, {
        rotateY: 180,
        duration: 0.6,
        ease: "back.out(1.15)",
      });
    }

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.65,
      ease: "power2.out",
      onComplete: () => {
        if (prevV < totalCards) {
          const resetV = prevV + totalCards;
          vIndexRef.current = resetV;
          setCurrentVirtual(resetV);
          if (trackRef.current) {
            gsap.set(trackRef.current, { x: -resetV * step });
          }
          const activeInner = cardInnersRef.current[resetV];
          if (activeInner) gsap.set(activeInner, { rotateY: 180 });
        } else {
          vIndexRef.current = prevV;
        }
        isAnimatingRef.current = false;
      },
    });
  }, [step, totalCards]);

  // Jump directly to specific dot index
  const goToDot = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= totalCards || totalCards <= 1) return;
    try {
      play("click");
    } catch {
      // safe fallback
    }

    handleInteractionStart();

    const currentV = vIndexRef.current;
    const currentNorm = currentV % totalCards;
    const diff = targetIdx - currentNorm;

    let targetV = currentV + diff;
    if (targetV < totalCards) targetV += totalCards;
    if (targetV >= 2 * totalCards) targetV -= totalCards;

    setActiveIndex(targetIdx);
    setCurrentVirtual(targetV);
    vIndexRef.current = targetV;

    const inner = cardInnersRef.current[targetV];
    if (inner) {
      gsap.to(inner, { rotateY: 180, duration: 0.6, ease: "back.out(1.15)" });
    }

    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -targetV * step,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    handleInteractionEnd();
  };

  // Continuous forward auto-advance loop
  useEffect(() => {
    if (totalCards <= 1 || isPaused) return;

    const interval = setInterval(() => {
      advanceForward();
    }, 3200);

    return () => clearInterval(interval);
  }, [advanceForward, isPaused, totalCards]);

  // Manual Card Click Flip
  const handleCardClick = (cardKey: string) => {
    try {
      play("click");
    } catch {
      // safe fallback
    }

    setManualFlipped((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));

    handleInteractionStart();
    handleInteractionEnd();
  };

  // Touch handlers with swipe detection
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: e.timeStamp,
    };
    handleInteractionStart();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < -40) {
          advanceForward();
          handleInteractionEnd();
          return;
        } else if (dx > 40) {
          retreatBackward();
          handleInteractionEnd();
          return;
        }
      }
    }

    handleInteractionEnd();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center select-none pt-2 pb-10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
    >
      {/* ── Status Header Indicator ── */}
      <div className="flex items-center justify-between w-full max-w-sm px-6 mb-3">
        {/* Play/Pause state pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300 ${
            isPaused
              ? "bg-amber-500/15 text-amber-700 border border-amber-500/30"
              : "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
          }`}
        >
          {isPaused ? (
            <>
              <Pause className="w-3 h-3 text-amber-600" />
              <span>Paused · Release to resume</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Auto Domino Flip · Hold to pause</span>
            </>
          )}
        </div>

        {/* Card Counter */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-2xs text-xs font-mono font-bold text-slate-700">
          <span className="text-emerald-600">
            {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
          </span>
          <span className="text-slate-400">/</span>
          <span>
            {totalCards < 10 ? `0${totalCards}` : totalCards}
          </span>
        </div>
      </div>

      {/* ── Horizontal 3D Card Stage ── */}
      <div className="relative w-full overflow-hidden py-3 flex items-center justify-start">
        {/* Soft edge fade masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-30"
          style={{
            background:
              "linear-gradient(to right, rgba(245, 243, 240, 0.95) 0%, rgba(245, 243, 240, 0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-30"
          style={{
            background:
              "linear-gradient(to left, rgba(245, 243, 240, 0.95) 0%, rgba(245, 243, 240, 0) 100%)",
          }}
        />

        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{
            paddingLeft: `calc(50vw - ${cardWidth / 2}px)`,
            paddingRight: `calc(50vw - ${cardWidth / 2}px)`,
            gap: `${cardGap}px`,
          }}
        >
          {displaySkillCards.map((card, i) => {
            const cardKey = `${card.id}-${i}`;
            const isManualFlipped = manualFlipped[cardKey] || false;
            const isCentered = totalCards > 1 ? i === currentVirtual : true;

            return (
              <div
                key={cardKey}
                onClick={() => handleCardClick(cardKey)}
                className={`relative shrink-0 cursor-pointer select-none transition-all duration-300 ${
                  isCentered
                    ? "scale-100 opacity-100 z-20 shadow-lg"
                    : "scale-95 opacity-80 z-10"
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: "175px",
                  perspective: "1200px",
                }}
              >
                {/* 3D Inner Flipper (Controlled by GSAP domino turnover) */}
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
          onClick={() => {
            retreatBackward();
            handleInteractionStart();
            handleInteractionEnd();
          }}
          disabled={totalCards <= 1}
          aria-label="Previous skill card"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 disabled:opacity-30 active:scale-95 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dynamic Dot Navigation */}
        <div className="flex items-center gap-1.5">
          {skillCards.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToDot(dotIdx)}
              aria-label={`Go to skill card 0${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex
                  ? "w-6 bg-emerald-500 shadow-xs shadow-emerald-500/40"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            advanceForward();
            handleInteractionStart();
            handleInteractionEnd();
          }}
          disabled={totalCards <= 1}
          aria-label="Next skill card"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 disabled:opacity-30 active:scale-95 transition-transform cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default MobileSkillsDeck;
