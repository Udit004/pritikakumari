"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[3px] bg-emerald-500/10"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 shadow-[0_0_12px_rgba(16,185,129,0.7)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
