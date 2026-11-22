"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CertificateItem } from "./CertificateList";
import { useSound } from "@/components/SoundProvider";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Sparkles,
  BadgeCheck,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

interface MobileCertificatesDeckProps {
  certificates: CertificateItem[];
  onSelectCert: (cert: CertificateItem) => void;
}

export function MobileCertificatesDeck({
  certificates,
  onSelectCert,
}: MobileCertificatesDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isAnimatingRef = useRef(false);

  const totalCards = certificates.length;
  // Use 3 sets of cards to allow seamless, infinite forward looping without any backward rewinding
  const displayCertificates = useMemo(() => {
    if (totalCards <= 1) return certificates;
    return [...certificates, ...certificates, ...certificates];
  }, [certificates, totalCards]);

  // Card dimensions tailored for mobile viewports (360px - 430px)
  const cardWidth = 300;
  const cardGap = 16;
  const step = cardWidth + cardGap;

  const initialV = totalCards <= 1 ? 0 : totalCards;
  const vIndexRef = useRef(initialV);
  const [currentVirtual, setCurrentVirtual] = useState(initialV);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { play } = useSound();

  // Position track at Set 1 on mount
  useEffect(() => {
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

  // Smoothly advances 1 card FORWARD in the same continuous direction
  const advanceForward = useCallback(() => {
    if (!trackRef.current || totalCards <= 1 || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const currentV = vIndexRef.current;
    const nextV = currentV + 1;
    const targetX = -nextV * step;

    setActiveIndex(nextV % totalCards);
    setCurrentVirtual(nextV);

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.85,
      ease: "power2.inOut",
      onComplete: () => {
        // When reaching the duplicate in Set 2 (>= 2 * totalCards),
        // instantly reposition track back to Set 1 in 0 seconds.
        // Because the cards are identical, this reset is 100% invisible!
        if (nextV >= 2 * totalCards) {
          const resetV = nextV - totalCards;
          vIndexRef.current = resetV;
          setCurrentVirtual(resetV);
          if (trackRef.current) {
            gsap.set(trackRef.current, { x: -resetV * step });
          }
        } else {
          vIndexRef.current = nextV;
        }
        isAnimatingRef.current = false;
      },
    });
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

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.65,
      ease: "power2.out",
      onComplete: () => {
        // If moved into Set 0 (< totalCards), seamlessly reposition into Set 1
        if (prevV < totalCards) {
          const resetV = prevV + totalCards;
          vIndexRef.current = resetV;
          setCurrentVirtual(resetV);
          if (trackRef.current) {
            gsap.set(trackRef.current, { x: -resetV * step });
          }
        } else {
          vIndexRef.current = prevV;
        }
        isAnimatingRef.current = false;
      },
    });
  }, [step, totalCards]);

  // Jump to specific dot index
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

    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -targetV * step,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    handleInteractionEnd();
  };

  // Auto-advance loop: continuously moves forward in one direction
  useEffect(() => {
    if (totalCards <= 1 || isPaused) return;

    const interval = setInterval(() => {
      advanceForward();
    }, 3200);

    return () => clearInterval(interval);
  }, [advanceForward, isPaused, totalCards]);

  // Touch Handlers with swipe detection
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
      const elapsed = e.timeStamp - touchStartRef.current.time;

      // Detect horizontal swipe
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

      // Detect quick tap on card
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12 && elapsed < 350) {
        const targetCert = certificates[activeIndex];
        if (targetCert) {
          try {
            play("click");
          } catch {
            // safe fallback
          }
          onSelectCert(targetCert);
        }
      }
    }

    handleInteractionEnd();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center select-none pt-2 pb-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
    >
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
              <span>Auto Moving · Hold to pause</span>
            </>
          )}
        </div>

      {/* ── Horizontal Track Stage ── */}
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
          className="flex items-stretch will-change-transform"
          style={{
            paddingLeft: `calc(50vw - ${cardWidth / 2}px)`,
            paddingRight: `calc(50vw - ${cardWidth / 2}px)`,
            gap: `${cardGap}px`,
          }}
        >
          {displayCertificates.map((cert, i) => {
            const isCentered = totalCards > 1 ? i === currentVirtual : true;

            return (
              <div
                key={`${cert.title}-${i}`}
                onClick={() => {
                  try {
                    play("click");
                  } catch {
                    // safe fallback
                  }
                  onSelectCert(cert);
                }}
                className={`relative shrink-0 cursor-pointer select-none transition-all duration-300 rounded-3xl flex flex-col overflow-hidden ${
                  isCentered
                    ? "scale-100 opacity-100 z-20 shadow-xl ring-2 ring-emerald-500/40"
                    : "scale-95 opacity-75 z-10 shadow-md"
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: "440px",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f4faf6 50%, #ecfdf5 100%)",
                  border: "1px solid rgba(16, 185, 129, 0.18)",
                }}
              >
                {/* Top accent gradient bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 shrink-0" />

                {/* Certificate Image Box */}
                <div className="relative w-full h-[180px] bg-gradient-to-br from-gray-50 to-emerald-50/40 overflow-hidden border-b border-emerald-100/50 p-3 flex items-center justify-center shrink-0">
                  {cert.image && (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="300px"
                      className="object-contain p-2"
                      priority={i < 4}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  {/* Header Row: Icon + Title + Platform */}
                  <div>
                    <div className="flex gap-3 items-start mb-2">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-emerald-100 shadow-sm"
                        style={{
                          background:
                            "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                        }}
                      >
                        <span className="scale-75">{cert.icon}</span>
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="text-sm font-bold font-sans leading-snug text-slate-900 line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                          {cert.platform}
                        </p>
                      </div>
                    </div>

                    {/* Verified Credential & Year */}
                    <div className="flex items-center justify-between my-2">
                      <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                        <BadgeCheck
                          size={15}
                          className="fill-emerald-100 text-emerald-600 shrink-0"
                        />
                        <span className="text-[11px]">Verified Credential</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                        {cert.year}
                      </span>
                    </div>

                    {/* Key Skills Pills */}
                    <div className="flex flex-wrap gap-1 mt-1 mb-2">
                      {cert.Skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium text-slate-600 bg-emerald-50/70 border border-emerald-100/60 px-2 py-0.5 rounded-md truncate max-w-[120px]"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.Skills.length > 3 && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded-md">
                          +{cert.Skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/50 max-w-[110px] truncate"
                    >
                      {cert.tag}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-white text-emerald-700 border border-emerald-200/60 hover:bg-emerald-50 transition-colors shadow-2xs active:scale-95 cursor-pointer"
                          aria-label="Verify credential external link"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          try {
                            play("click");
                          } catch {
                            // safe fallback
                          }
                          onSelectCert(cert);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-emerald-950 active:scale-95 transition-all shadow-xs cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight
                          size={12}
                          className="text-emerald-400"
                        />
                      </button>
                    </div>
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
          aria-label="Previous certificate card"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 disabled:opacity-30 active:scale-95 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dynamic Dot Navigation */}
        <div className="flex items-center gap-1.5">
          {certificates.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToDot(dotIdx)}
              aria-label={`Go to certificate card 0${dotIdx + 1}`}
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
          aria-label="Next certificate card"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 disabled:opacity-30 active:scale-95 transition-transform cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] font-mono text-slate-400 mt-2 text-center">
        Tap any certificate to view credential details
      </p>
    </div>
  );
}

export default MobileCertificatesDeck;
