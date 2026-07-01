"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, LineChart, Lightbulb } from "lucide-react";

export function ProjectHeader() {
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
      className="mb-16 w-full flex flex-col lg:flex-row items-center gap-12"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left side: Text and Stats */}
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Projects
          </p>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Impact Through Data & People
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
          <div className="w-5 h-1 rounded-full bg-emerald-200" />
        </div>

        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          A showcase of my practical work in HR Operations, Analytics, and Compliance. Each project reflects my problem-solving approach and commitment to driving people-centric solutions.
        </p>

        {/* Stats Cards */}
        <div className="flex flex-col md:flex-row gap-4 pt-4 w-full">
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-emerald-100 shadow-sm flex-1">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 whitespace-nowrap">3+</p>
              <p className="text-xs text-gray-500 whitespace-nowrap">Projects Completed</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-emerald-100 shadow-sm flex-1">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <LineChart className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 whitespace-nowrap">HR Analytics</p>
              <p className="text-xs text-gray-500 whitespace-nowrap">Core Strength</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-emerald-100 shadow-sm flex-1">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Lightbulb className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 whitespace-nowrap">Data Driven</p>
              <p className="text-xs text-gray-500 whitespace-nowrap">Decision Making</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 w-full flex justify-center lg:justify-end">
        <div className="relative w-full max-w-lg">
          <Image
            src="/assests/images/project/headerImage.png"
            alt="Projects Header - Impact Through Data & People"
            width={600}
            height={600}
            className="w-full h-auto object-contain rounded-lg"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}
