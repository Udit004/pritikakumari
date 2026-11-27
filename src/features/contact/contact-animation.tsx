"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

export type ContactAnimationStatus = "idle" | "sending" | "success";

type ClipKey = "entrance" | "idle-a" | "idle-b" | "sending" | "success";

const CLIP_SRCS: Record<ClipKey, string> = {
  entrance: "/animations/contactSection/entrance.lottie",
  "idle-a": "/animations/contactSection/idle-a.lottie",
  "idle-b": "/animations/contactSection/idle-b.lottie",
  sending: "/animations/contactSection/sending.lottie",
  success: "/animations/contactSection/success.lottie",
};

interface ContactAnimationProps {
  status: ContactAnimationStatus;
  onSuccessComplete?: () => void;
}

export function ContactAnimation({
  status,
  onSuccessComplete,
}: ContactAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [idleClip, setIdleClip] = useState<"entrance" | "idle-a" | "idle-b">("entrance");
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const activeClip: ClipKey =
    status === "sending"
      ? "sending"
      : status === "success"
        ? "success"
        : idleClip;

  // Preload all .lottie clips so transitions between states are instant.
  useEffect(() => {
    Object.values(CLIP_SRCS).forEach((src) => {
      fetch(src).catch(() => {});
    });
  }, []);

  // Start the entrance animation once the container scrolls into view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasEnteredView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  // Advance through entrance -> idle-a <-> idle-b, and return from success -> idle-a.
  useEffect(() => {
    if (!dotLottie) return;

    const handleComplete = () => {
      if (activeClip === "entrance") {
        setIdleClip("idle-a");
      } else if (activeClip === "idle-a") {
        setIdleClip("idle-b");
      } else if (activeClip === "idle-b") {
        setIdleClip("idle-a");
      } else if (activeClip === "success") {
        setIdleClip("idle-a");
        onSuccessComplete?.();
      }
    };

    dotLottie.addEventListener("complete", handleComplete);
    return () => {
      dotLottie.removeEventListener("complete", handleComplete);
    };
  }, [dotLottie, activeClip, onSuccessComplete]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center"
      aria-label="Contact message journey animation"
    >
      {hasEnteredView && (
        <DotLottieReact
          key={activeClip}
          src={CLIP_SRCS[activeClip]}
          loop={activeClip === "sending"}
          autoplay
          dotLottieRefCallback={setDotLottie}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}
