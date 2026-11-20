"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Synchronize window scrolling with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <>{children}</>;
}
