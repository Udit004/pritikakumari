import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AnimatedCustomIcon() {
  useGSAP(() => {
    // Floating robot head with more pronounced motion
    gsap.to(".ai-robot-svg", {
      y: -4,
      rotation: 5,
      scale: 1.05,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
    
    // Glowing/pulsing eyes with stronger effect
    gsap.to(".ai-eye", {
      scale: 1.5,
      opacity: 0.4,
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      stagger: 0.15
    });
  });

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="ai-robot-svg text-emerald-400">
        <rect x="4" y="9" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 9V5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="2" className="ai-eye"/>
        <circle cx="8" cy="14" r="1.5" stroke="currentColor" strokeWidth="2" className="ai-eye"/>
        <circle cx="16" cy="14" r="1.5" stroke="currentColor" strokeWidth="2" className="ai-eye"/>
        <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function AnimatedTextIcon() {
  useGSAP(() => {
    // Main sparkle rotation
    gsap.to(".ai-sparkle-main", {
      rotation: 180,
      scale: 1.15,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
    
    // Small extra sparkles floating around
    gsap.to(".ai-sparkle-small", {
      rotation: -180,
      y: -2,
      scale: 1.3,
      opacity: 0.4,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      stagger: 0.4,
      ease: "sine.inOut"
    });
  });

  return (
    <div className="relative flex items-center gap-2 px-1">
      {/* <Sparkles className="ai-sparkle-small absolute -top-1 -left-2 h-2 w-2 text-emerald-300 opacity-80" /> */}
      <Sparkles className="ai-sparkle-main h-4 w-4 text-emerald-400" />
      <span>AI Chat</span>
      <Sparkles className="ai-sparkle-small absolute -bottom-1 -right-2 h-2 w-2 text-emerald-300 opacity-80" />
    </div>
  );
}
