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

    const handleRefresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleRefresh);

    // Refresh after dynamic sections hydrate
    const t1 = setTimeout(handleRefresh, 300);
    const t2 = setTimeout(handleRefresh, 1000);
    const t3 = setTimeout(handleRefresh, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleRefresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return <>{children}</>;
}
