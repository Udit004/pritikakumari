"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";

type Props = {
  title: string;
  platform: string;
  year: string;
  category: string;
  icon: ReactNode;
  href?: string;
  index?: number;
  onClick?: () => void;
};

export default function CertificateListCard({
  title,
  platform,
  year,
  category,
  icon,
  href = "#",
  index = 0,
  onClick,
}: Props) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 cursor-pointer h-full w-full flex-1"
      style={{
        border: "1px solid rgba(16, 185, 129, 0.14)",
        boxShadow:
          "0 10px 25px rgba(15, 23, 42, 0.04), 0 4px 10px rgba(16, 185, 129, 0.04)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 40px rgba(15, 23, 42, 0.08), 0 8px 20px rgba(16, 185, 129, 0.12), 0 0 0 1px rgba(16, 185, 129, 0.18)",
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex gap-4 mb-6">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black text-emerald-400 transition-all duration-300 group-hover:scale-105"
          style={{
            border: "1px solid rgba(16,185,129,0.18)",
            boxShadow:
              "0 8px 18px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-bold leading-tight text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{platform}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 mt-auto">
        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
          <BadgeCheck size={16} className="fill-emerald-100 text-emerald-600" />
          <span>Verified</span>
        </div>
        <span className="text-sm font-bold text-gray-800">{year}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50/0">
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            color: "#059669",
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.15)",
          }}
        >
          {category}
        </span>
        
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors"
        >
          View <span className="hidden sm:inline">Certificate</span> <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}
