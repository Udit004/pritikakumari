"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProjectFooter() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="mt-16 w-full"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-full rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-6">
          {/* Icon Area */}
          <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-emerald-100 text-emerald-600">
            <Briefcase size={32} />
          </div>
          
          {/* Text Content */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                More Projects Coming Soon
              </h3>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              I'm constantly working on new projects to solve real-world HR challenges and deliver data-driven solutions.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          href="#contact"
          className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#0a251c] text-white text-sm font-semibold rounded-xl hover:bg-[#12392c] transition-colors"
        >
          <span className="text-white">Let's Work Together</span>
          <ArrowRight size={16} className="text-emerald-400" />
        </Link>
      </div>
    </motion.div>
  );
}
