"use client";

import React, { forwardRef, useState } from "react";
import { SingleSkillCardData } from "./types";
import { SingleSkillCardBack } from "./SingleSkillCardBack";
import { SingleSkillCardFront } from "./SingleSkillCardFront";
import { useSound } from "@/components/SoundProvider";

interface SingleSkillCardProps {
  card: SingleSkillCardData;
  isInteractive?: boolean;
  isMobile?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SingleSkillCard = forwardRef<HTMLDivElement, SingleSkillCardProps>(
  function SingleSkillCard(
    { card, isInteractive = false, isMobile = false, className = "", style },
    ref
  ) {
    const [manualFlipped, setManualFlipped] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });
    const { play } = useSound();

    const handleCardClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setManualFlipped((prev) => !prev);
      play("click");
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive || isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      setTilt({
        x: rotateX,
        y: rotateY,
        isHovered: true,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0, isHovered: false });
    };

    return (
      <div
        ref={ref}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`single-skill-card-item select-none cursor-pointer group ${
          isMobile ? "relative" : ""
        } ${className}`}
        style={style}
        title="Click to flip card"
        data-skill-index={card.index}
        data-row={card.row}
        data-col={card.col}
      >
        {/* Flippable 3D Card Inner (animated by GSAP scroll) */}
        <div
          className="single-skill-card-inner group w-full h-full"
          style={{
            transform: tilt.isHovered
              ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
              : undefined,
            transition: tilt.isHovered
              ? "transform 0.12s ease-out"
              : "transform 0.4s ease-out",
          }}
        >
          {/* Manual Flipper Layer (Toggled individually on click) */}
          <div
            className={`manual-flipper w-full h-full ${
              manualFlipped ? "is-manual-flipped" : ""
            }`}
          >
            {/* Card Back Face (0deg initially, showing Figma SVG artwork) */}
            <SingleSkillCardBack
              skill={card.skill}
              index={card.index}
              svgSrc={card.svgSrc}
            />

            {/* Card Front Face (180deg initially, revealed after 3D flip) */}
            <SingleSkillCardFront skill={card.skill} index={card.index} />
          </div>
        </div>

        {/* Mobile flip helper hint */}
        {isMobile && (
          <div className="mt-1 text-center text-[9px] font-mono text-emerald-600/70">
            {manualFlipped ? "Tap to view artwork" : "Tap to view skill"}
          </div>
        )}
      </div>
    );
  }
);
