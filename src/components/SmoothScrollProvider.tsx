"use client";

import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const handleRefresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const scheduleRefresh = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleRefresh, 150);
    };

    window.addEventListener("load", handleRefresh);
    document.fonts?.ready.then(handleRefresh);

    const resizeObserver = new ResizeObserver(scheduleRefresh);
    resizeObserver.observe(document.body);

    // Refresh after dynamic sections hydrate
    const t1 = setTimeout(handleRefresh, 300);
    const t2 = setTimeout(handleRefresh, 1000);

    if (prefersReducedMotion) {
      const handleScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("load", handleRefresh);
        resizeObserver.disconnect();
        if (resizeTimer) clearTimeout(resizeTimer);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      anchors: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener("load", handleRefresh);
      resizeObserver.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
