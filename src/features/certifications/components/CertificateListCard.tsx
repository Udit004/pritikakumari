"use client";

import { ReactNode, useState } from "react";
import { BadgeCheck, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

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
  url,
  onClick,
  priority,
}: Props) {
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX,
      glareY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cert-card-inner group relative flex flex-col overflow-hidden rounded-3xl cursor-pointer h-full w-full flex-1 transition-all duration-300 shadow-md hover:shadow-2xl select-none"
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #f4faf6 50%, #ecfdf5 100%)",
        border: "1px solid rgba(16, 185, 129, 0.16)",
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
        transition: tilt.isHovered ? "transform 0.12s ease-out" : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
        willChange: "transform",
      }}
    >
      {/* Specular Glare Reflection on 3D Tilt */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-20"
        style={{
          opacity: tilt.isHovered ? 0.35 : 0,
          background: `radial-gradient(circle 260px at ${tilt.glareX}% ${tilt.glareY}%, rgba(16, 185, 129, 0.28), transparent 70%)`,
        }}
      />

      {/* Subtle hover gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Image Section */}
      {image && (
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-emerald-50/30 overflow-hidden border-b border-emerald-100/50 p-4 flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-700 group-hover:scale-105 p-2"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
        <div className="flex gap-4 mb-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-2 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
              boxShadow: "0 8px 18px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <span className="text-emerald-100">{icon}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-bold font-sans leading-snug text-slate-900 mb-1 line-clamp-2 group-hover:text-emerald-800 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-slate-500 font-semibold">{platform}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
            <BadgeCheck size={16} className="fill-emerald-100 text-emerald-600" />
            <span>Verified Credential</span>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs">
            {year}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span
            className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{
              color: "#059669",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
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
                className="group/verify flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-emerald-700 font-bold text-xs transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-xs hover:-translate-y-0.5 border border-emerald-200/60 cursor-pointer whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Verify</span>
                <ExternalLink size={12} className="transition-transform group-hover/verify:translate-x-0.5" />
              </a>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
              className="group/details flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 text-white font-bold text-xs transition-all duration-300 hover:bg-emerald-950 hover:shadow-md hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            >
              <span>Details</span>
              <ArrowRight size={12} className="transition-transform text-emerald-400 group-hover/details:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
