"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useSectionTracking(sectionId: string) {
  useEffect(() => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    let tracked = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          tracked = true;

          window.gtag?.("event", "section_view", {
            section_name: sectionId,
          });
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [sectionId]);
}