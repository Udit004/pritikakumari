"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

export type ContactAnimationStatus = "idle" | "sending" | "success";

type ClipKey = "entrance" | "idle-a" | "idle-b" | "sending" | "success";

const CLIPS: ClipKey[] = ["entrance", "idle-a", "idle-b", "sending", "success"];

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
  const instancesRef = useRef<Partial<Record<ClipKey, DotLottie | null>>>({});
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [idleClip, setIdleClip] = useState<"entrance" | "idle-a" | "idle-b">("entrance");

  const activeClip: ClipKey =
    status === "sending"
      ? "sending"
      : status === "success"
        ? "success"
        : idleClip;

  const refCallbacks = useMemo(
    () =>
      Object.fromEntries(
        CLIPS.map((clip) => [
          clip,
          (instance: DotLottie | null) => {
            instancesRef.current[clip] = instance;
          },
        ]),
      ) as Record<ClipKey, (instance: DotLottie | null) => void>,
    [],
  );

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

  // Play the active clip seamlessly from frame 0 without unmounting/remounting,
  // and pause inactive clips so all canvases stay pre-loaded and ready.
  useEffect(() => {
    if (!hasEnteredView) return;

    let cancelled = false;
    let loadCleanup: (() => void) | undefined;

    for (const clip of CLIPS) {
      const instance = instancesRef.current[clip];
      if (!instance) continue;

      if (clip === activeClip) {
        const startClip = () => {
          if (cancelled) return;
          instance.setFrame(0);
          instance.play();
        };

        if (instance.isLoaded) {
          startClip();
        } else {
          instance.addEventListener("load", startClip);
          loadCleanup = () => instance.removeEventListener("load", startClip);
        }
      } else {
        instance.pause();
      }
    }

    return () => {
      cancelled = true;
      loadCleanup?.();
    };
  }, [hasEnteredView, activeClip]);

  // Advance through entrance -> idle-a <-> idle-b, and return from success -> idle-a.
  useEffect(() => {
    if (!hasEnteredView) return;
    const instance = instancesRef.current[activeClip];
    if (!instance) return;

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

    instance.addEventListener("complete", handleComplete);
    return () => {
      instance.removeEventListener("complete", handleComplete);
    };
  }, [hasEnteredView, activeClip, onSuccessComplete]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center"
      aria-label="Contact message journey animation"
    >
      {hasEnteredView &&
        CLIPS.map((clip) => (
          <DotLottieReact
            key={clip}
            src={CLIP_SRCS[clip]}
            loop={clip === "sending"}
            autoplay={clip === "entrance"}
            speed={clip === "sending" ? 1.35 : 1}
            dotLottieRefCallback={refCallbacks[clip]}
            className={`absolute inset-0 w-full h-full object-contain ${
              activeClip === clip
                ? "opacity-100 z-10"
                : "opacity-0 pointer-events-none z-0"
            }`}
          />
        ))}
    </div>
  );
}
