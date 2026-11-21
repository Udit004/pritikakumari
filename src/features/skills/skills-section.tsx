"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { skillsData } from "./data";
import { getNineSkillCards } from "./types";
import { SingleSkillCard } from "./SingleSkillCard";
import "./skills-animation.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const [isFlippedState, setIsFlippedState] = useState(false);

  useSectionTracking("skills");

  const skillCards = getNineSkillCards();

  // Ensure ScrollTrigger refreshes coordinates after initial client mount & lazy chunks settle
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      // ── DESKTOP SCROLLTRIGGER TIMELINE: FULL-SCREEN 3x3 MATRIX ROW-BY-ROW (min-width: 1024px) ──
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          ".desktop-single-card",
          sectionRef.current
        );
        const innerRotators = gsap.utils.toArray<HTMLElement>(
          ".single-skill-card-inner",
          sectionRef.current
        );

        if (cards.length < 9) return;

        // Dynamic responsive geometry:
        const vh = window.innerHeight;
        const isXL = window.innerWidth >= 1280;

        // =========================================================================
        // 🎛️ 3×3 MATRIX POSITION & SPACING CONTROLS (Tweak these values anytime)
        // =========================================================================
        // 1. VERTICAL POSITION OF ENTIRE GRID:
        //    - More negative (e.g. -85, -95, -110) = shifts all cards HIGHER up
        //    - Less negative (e.g. -50, -40, 0)    = shifts all cards LOWER down
        const gridVerticalShift = isXL ? -90 : -80;

        // 2. HORIZONTAL SPACING BETWEEN COLUMNS (Col 1, Col 2, Col 3):
        //    - Higher (e.g. 380, 400) = wider horizontal gap
        //    - Lower  (e.g. 340, 320) = tighter horizontal gap
        const colSpacing = isXL ? 375 : 345;

        // 3. VERTICAL SPACING BETWEEN ROWS (Row 1, Row 2, Row 3):
        //    - Higher (e.g. 200, 210) = taller vertical gap between rows
        //    - Lower  (e.g. 180, 170) = tighter vertical gap between rows
        const rowSpacing = Math.min(200, Math.max(178, Math.round(vh * 0.22)));

        const colX = [-colSpacing, 0, colSpacing];
        const rowY = [-rowSpacing, 0, rowSpacing];

        const arenaTargetY = gridVerticalShift;

        // 1. Initial Stacked Deck Layout Setup (All 9 cards stacked centrally in arena)
        const stackConfig = [
          { x: -8, y: 6, rot: -4.0, scale: 0.95, z: 10 },
          { x: 6, y: -5, rot: 3.0, scale: 0.955, z: 15 },
          { x: -5, y: 3, rot: -2.0, scale: 0.96, z: 20 },
          { x: 4, y: -4, rot: 2.5, scale: 0.965, z: 25 },
          { x: -3, y: 2, rot: -1.5, scale: 0.97, z: 30 },
          { x: 5, y: -3, rot: 2.0, scale: 0.975, z: 35 },
          { x: -4, y: 3, rot: -2.5, scale: 0.98, z: 40 },
          { x: 3, y: -2, rot: 1.5, scale: 0.985, z: 45 },
          { x: 0, y: 0, rot: 0.5, scale: 1.0, z: 50 },
        ];

        cards.forEach((card, i) => {
          const cfg = stackConfig[i] || { x: 0, y: 0, rot: 0, scale: 1, z: 10 + i * 5 };
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: cfg.x,
            y: cfg.y,
            rotationZ: cfg.rot,
            scale: cfg.scale,
            zIndex: cfg.z,
            opacity: 1,
          });
        });

        // Ensure all 9 inner rotators start with card backs facing camera
        gsap.set(innerRotators, { rotateY: 0, transformOrigin: "center center" });

        // Master Timeline pinned over generous 3,200px scroll distance
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3200",
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setIsFlippedState(self.progress > 0.8);
            },
          },
        });

        // ── 0. As scrolling starts, move the section header text & image ABOVE ──
        if (headerRef.current) {
          masterTl.to(
            headerRef.current,
            {
              y: -300,
              opacity: 0,
              scale: 0.95,
              duration: 1.4,
              ease: "power2.inOut",
            },
            0.1
          );
        }

        if (arenaRef.current) {
          masterTl.to(
            arenaRef.current,
            {
              y: arenaTargetY,
              duration: 1.4,
              ease: "power2.inOut",
            },
            0.1
          );
        }

        // ── ACT 1: ROW 1 (Cards 0, 1, 2) ──
        // 1.1 Deal out Row 1
        masterTl.to(
          cards[0],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[0],
            y: rowY[0],
            rotationZ: -4,
            rotationY: 4,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          1.5
        );
        masterTl.to(
          cards[1],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[1],
            y: rowY[0],
            rotationZ: 0,
            rotationY: 0,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          1.5
        );
        masterTl.to(
          cards[2],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[2],
            y: rowY[0],
            rotationZ: 4,
            rotationY: -4,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          1.5
        );

        // 1.2 Straighten Row 1
        masterTl.to(
          [cards[0], cards[1], cards[2]],
          {
            rotationZ: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power1.inOut",
          },
          3.5
        );

        // 1.3 Sequential 3D Flip Row 1
        masterTl.to(
          innerRotators[0],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          4.0
        );
        masterTl.to(
          cards[0],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          4.0
        );

        masterTl.to(
          innerRotators[1],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          4.5
        );
        masterTl.to(
          cards[1],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          4.5
        );

        masterTl.to(
          innerRotators[2],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          5.0
        );
        masterTl.to(
          cards[2],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          5.0
        );

        // ── ACT 2: ROW 2 (Cards 3, 4, 5) ──
        // 2.1 Deal out Row 2
        masterTl.to(
          cards[3],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[0],
            y: rowY[1],
            rotationZ: -4,
            rotationY: 4,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          5.9
        );
        masterTl.to(
          cards[4],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[1],
            y: rowY[1],
            rotationZ: 0,
            rotationY: 0,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          5.9
        );
        masterTl.to(
          cards[5],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[2],
            y: rowY[1],
            rotationZ: 4,
            rotationY: -4,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          5.9
        );

        // 2.2 Straighten Row 2
        masterTl.to(
          [cards[3], cards[4], cards[5]],
          {
            rotationZ: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power1.inOut",
          },
          7.9
        );

        // 2.3 Sequential 3D Flip Row 2
        masterTl.to(
          innerRotators[3],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          8.4
        );
        masterTl.to(
          cards[3],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          8.4
        );

        masterTl.to(
          innerRotators[4],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          8.9
        );
        masterTl.to(
          cards[4],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          8.9
        );

        masterTl.to(
          innerRotators[5],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          9.4
        );
        masterTl.to(
          cards[5],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          9.4
        );

        // ── ACT 3: ROW 3 (Cards 6, 7, 8) ──
        // 3.1 Deal out Row 3
        masterTl.to(
          cards[6],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[0],
            y: rowY[2],
            rotationZ: -4,
            rotationY: 4,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          10.3
        );
        masterTl.to(
          cards[7],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[1],
            y: rowY[2],
            rotationZ: 0,
            rotationY: 0,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          10.3
        );
        masterTl.to(
          cards[8],
          {
            xPercent: -50,
            yPercent: -50,
            x: colX[2],
            y: rowY[2],
            rotationZ: 4,
            rotationY: -4,
            scale: 1.0,
            duration: 2.0,
            ease: "power2.inOut",
          },
          10.3
        );

        // 3.2 Straighten Row 3
        masterTl.to(
          [cards[6], cards[7], cards[8]],
          {
            rotationZ: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power1.inOut",
          },
          12.3
        );

        // 3.3 Sequential 3D Flip Row 3
        masterTl.to(
          innerRotators[6],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          12.8
        );
        masterTl.to(
          cards[6],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          12.8
        );

        masterTl.to(
          innerRotators[7],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          13.3
        );
        masterTl.to(
          cards[7],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          13.3
        );

        masterTl.to(
          innerRotators[8],
          { rotateY: 180, duration: 1.1, ease: "power2.inOut" },
          13.8
        );
        masterTl.to(
          cards[8],
          { z: 35, scale: 1.03, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1 },
          13.8
        );

        // ── ACT 4: Full-Screen 3×3 Grid Reading Dwell (14.5 to 16.5) ──
        masterTl.to({}, { duration: 2.0 });
      });

      // ── TABLET SCROLLTRIGGER TIMELINE (768px - 1023px) ──
      mm.add(
        "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            ".desktop-single-card",
            sectionRef.current
          );
          const innerRotators = gsap.utils.toArray<HTMLElement>(
            ".single-skill-card-inner",
            sectionRef.current
          );

          if (cards.length < 9) return;

          const tabVh = window.innerHeight;
          const tabColSpacing = 265;
          const tabRowSpacing = Math.min(185, Math.max(165, Math.round(tabVh * 0.21)));
          const tabColX = [-tabColSpacing, 0, tabColSpacing];
          const tabRowY = [-tabRowSpacing, 0, tabRowSpacing];

          // Tablet vertical shift (higher):
          const tabArenaTargetY = -Math.round(tabVh * 0.08);

          cards.forEach((card, i) => {
            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,
              x: (i % 2 === 0 ? -4 : 4),
              y: (i % 2 === 0 ? 3 : -3),
              rotationZ: (i % 2 === 0 ? -2 : 2),
              scale: 0.95,
              zIndex: 10 + i * 5,
              opacity: 1,
            });
          });
          gsap.set(innerRotators, { rotateY: 0 });

          const tabletTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=2600",
              pin: true,
              pinSpacing: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (headerRef.current) {
            tabletTl.to(headerRef.current, { y: -260, opacity: 0, duration: 1.2 }, 0.1);
          }

          if (arenaRef.current) {
            tabletTl.to(arenaRef.current, { y: tabArenaTargetY, duration: 1.2 }, 0.1);
          }

          // Row 1
          tabletTl.to(cards[0], { xPercent: -50, yPercent: -50, x: tabColX[0], y: tabRowY[0], rotationZ: 0, scale: 0.95, duration: 1.8 }, 1.2);
          tabletTl.to(cards[1], { xPercent: -50, yPercent: -50, x: tabColX[1], y: tabRowY[0], rotationZ: 0, scale: 0.95, duration: 1.8 }, 1.2);
          tabletTl.to(cards[2], { xPercent: -50, yPercent: -50, x: tabColX[2], y: tabRowY[0], rotationZ: 0, scale: 0.95, duration: 1.8 }, 1.2);
          tabletTl.to([innerRotators[0], innerRotators[1], innerRotators[2]], { rotateY: 180, duration: 1.0, stagger: 0.3 }, 3.0);

          // Row 2
          tabletTl.to(cards[3], { xPercent: -50, yPercent: -50, x: tabColX[0], y: tabRowY[1], rotationZ: 0, scale: 0.95, duration: 1.8 }, 4.4);
          tabletTl.to(cards[4], { xPercent: -50, yPercent: -50, x: tabColX[1], y: tabRowY[1], rotationZ: 0, scale: 0.95, duration: 1.8 }, 4.4);
          tabletTl.to(cards[5], { xPercent: -50, yPercent: -50, x: tabColX[2], y: tabRowY[1], rotationZ: 0, scale: 0.95, duration: 1.8 }, 4.4);
          tabletTl.to([innerRotators[3], innerRotators[4], innerRotators[5]], { rotateY: 180, duration: 1.0, stagger: 0.3 }, 6.2);

          // Row 3
          tabletTl.to(cards[6], { xPercent: -50, yPercent: -50, x: tabColX[0], y: tabRowY[2], rotationZ: 0, scale: 0.95, duration: 1.8 }, 7.6);
          tabletTl.to(cards[7], { xPercent: -50, yPercent: -50, x: tabColX[1], y: tabRowY[2], rotationZ: 0, scale: 0.95, duration: 1.8 }, 7.6);
          tabletTl.to(cards[8], { xPercent: -50, yPercent: -50, x: tabColX[2], y: tabRowY[2], rotationZ: 0, scale: 0.95, duration: 1.8 }, 7.6);
          tabletTl.to([innerRotators[6], innerRotators[7], innerRotators[8]], { rotateY: 180, duration: 1.0, stagger: 0.3 }, 9.4);

          tabletTl.to({}, { duration: 1.8 });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="scene-section relative w-full h-[100svh] min-h-[100svh] bg-[#f8faf9] z-20 overflow-hidden flex flex-col justify-between"
    >
      {/* ── Background radial atmosphere consistent with portfolio identity ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      {/* ── Section Header (Recovered Original Layout with Laptop Illustration at Top Right) ── */}
      <div
        ref={headerRef}
        className="relative w-full max-w-7xl mx-auto pt-16 md:pt-20 lg:pt-22 px-6 lg:px-8 shrink-0 z-20 will-change-transform"
      >
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Text */}
          <div className="flex-1 space-y-3 lg:space-y-4 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3.5 py-1.5 border border-emerald-500/25">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Core Competencies
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              {skillsData.title}
            </h2>

            <div className="flex items-center gap-2">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <div className="w-5 h-1 rounded-full bg-emerald-200" />
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              A curated overview of my professional capabilities across HR operations, talent lifecycle management, and organizational data analytics.
            </p>
          </div>

          {/* Right Header Illustration - Recovered Original Position and Scale */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <Image
                src="/assests/images/skills/skill_headerImage.png"
                alt="Skills Overview Illustration"
                width={500}
                height={500}
                className="w-full h-auto max-h-[200px] lg:max-h-[220px] object-contain rounded-xl drop-shadow-sm"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3D Card Arena for Desktop / Tablet (Occupies space below header, centers on scroll) ── */}
      <div
        ref={arenaRef}
        className="hidden md:flex relative flex-1 w-full items-center justify-center skills-deck-arena z-10 will-change-transform"
      >
        {skillCards.map((card) => (
          <SingleSkillCard
            key={card.id}
            card={card}
            isInteractive={isFlippedState}
            className="desktop-single-card w-[290px] lg:w-[315px] xl:w-[340px] h-[155px] lg:h-[165px] xl:h-[172px]"
          />
        ))}
      </div>

      {/* ── Mobile Layout (< 768px): Responsive Interactive Cards (No Scroll Lock) ── */}
      <div className="md:hidden flex flex-col gap-4 w-full max-w-md mx-auto my-4 px-4 z-10 overflow-y-auto max-h-[85vh]">
        {/* <div className="p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-center text-xs text-emerald-800 flex items-center justify-center gap-2">
          <RotateCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
          <span>Tap any of the 9 cards to flip between artwork and skills!</span>
        </div> */}

        {skillCards.map((card) => (
          <div key={card.id} className="w-full h-[200px] relative">
            <SingleSkillCard
              card={card}
              isMobile={true}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
