"use client";

import { ReactNode, useRef } from "react";
import { BadgeCheck, ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  title: string;
  platform: string;
  year: string;
  category: string;
  icon: ReactNode;
  image?: string;
  href?: string;
  url?: string;
  index?: number;
  onClick?: () => void;
  priority?: boolean;
  Skills?: string[];
  Description?: string;
};

export default function CertificateListCard({
  title,
  platform,
  year,
  category,
  icon,
  image,
  href = "#",
  url,
  index = 0,
  onClick,
  priority,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        cardRef.current,
        { 
          opacity: 0, 
          y: 30, 
          scale: 0.95,
          duration: 0.7, 
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, cardRef);
    
    // Fallback: ensure visibility if ScrollTrigger doesn't fire
    const fallback = setTimeout(() => {
      if (cardRef.current) {
        gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
      }
    }, 2000);
    
    return () => clearTimeout(fallback);
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer h-full w-full flex-1 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(15,23,42,0.1),_0_10px_25px_rgba(16,185,129,0.15),_0_0_0_1px_rgba(16,185,129,0.2)]"
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #f4faf6 50%, #ecfdf5 100%)",
        border: "1px solid rgba(16, 185, 129, 0.12)",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.04), 0 4px 10px rgba(16, 185, 129, 0.04)",
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
      
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Section */}
      {image && (
        <div className="relative w-full h-44 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden border-b border-gray-100/50 p-4 flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-700 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex gap-4 mb-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-2"
            style={{
              background: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
              boxShadow: "0 8px 18px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <span className="text-emerald-100">{icon}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-bold leading-tight text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-700 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-gray-500 font-medium">{platform}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
            <BadgeCheck size={14} className="fill-emerald-100 text-emerald-600" />
            <span>Verified</span>
          </div>
          <span className="text-xs font-bold text-gray-800 bg-white/80 px-2 py-1 rounded-full border border-gray-100">{year}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              color: "#059669",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.15)",
            }}
          >
            {category}
          </span>
          
          <div className="flex items-center gap-2">
            {url && (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/verify flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-emerald-700 font-semibold text-xs transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 border border-emerald-200/50 cursor-pointer whitespace-nowrap backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="hidden sm:inline">Verify</span>
                <ExternalLink size={12} className="transition-transform group-hover/verify:translate-x-0.5" />
              </a>
            )}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
              className="group/details flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold text-xs transition-all duration-300 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">View Details</span>
              <ArrowRight size={12} className="transition-transform group-hover/details:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
