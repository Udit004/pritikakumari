"use client";

import { ReactNode, useRef } from "react";
import { BadgeCheck, ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.7, 
        delay: index * 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: cardRef, dependencies: [index] });

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white cursor-pointer h-full w-full flex-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08),_0_8px_20px_rgba(16,185,129,0.12),_0_0_0_1px_rgba(16,185,129,0.18)]"
      style={{
        border: "1px solid rgba(16, 185, 129, 0.14)",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.04), 0 4px 10px rgba(16, 185, 129, 0.04)",
      }}
    >
      {/* Image Section */}
      {image && (
        <div className="w-full h-44 bg-gray-50/50 overflow-hidden border-b border-gray-100 relative p-4 flex items-center justify-center">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-300"></div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex gap-4 mb-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-emerald-400 transition-all duration-300 group-hover:scale-105"
            style={{
              border: "1px solid rgba(16,185,129,0.18)",
              boxShadow: "0 8px 18px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            }}
          >
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold leading-tight text-gray-900 mb-1 line-clamp-2">
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
          <span className="text-xs font-bold text-gray-800">{year}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50/0">
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
          
          <div className="flex items-center gap-3">
            {url && (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                Verify Credential
                <ExternalLink size={12} />
              </a>
            )}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
              className="flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              View Details <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
