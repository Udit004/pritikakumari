"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleRefresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleRefresh);

    // Refresh after dynamic sections hydrate
    const t1 = setTimeout(handleRefresh, 300);
    const t2 = setTimeout(handleRefresh, 1000);
    const t3 = setTimeout(handleRefresh, 2000);

    if (prefersReducedMotion) {
      const handleScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("load", handleRefresh);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.removeEventListener("load", handleRefresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return <>{children}</>;
}
