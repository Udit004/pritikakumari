"use client";

import { educationData } from "./data";
import { motion } from "framer-motion";
import { useSectionTracking } from "@/hooks/useSectionTracking";

export function EducationSection() {

  useSectionTracking("education");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const hoverEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -8,
      rotateX: -5,
      rotateY: 5,
      transition: { duration: 0.22, ease: hoverEase },
    },
  };

  return (
    <section id="education" className="relative w-full overflow-hidden py-20 md:py-28">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute top-0 left-0 w-96 h-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(ellipse at 0% 0%, rgba(16, 185, 129, 0.4) 0%, transparent 65%)",
          }}
        />
        {/* Bottom-right glow */}
        <div className="absolute bottom-0 right-0 w-80 h-60 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(ellipse at 100% 100%, rgba(16, 185, 129, 0.3) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 space-y-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Learning
            </p>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-black" 
          // style={{ color: "#064e3b" }}
          >
            {educationData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-linear-to-r from-emerald-500 to-emerald-300" />
            <div className="w-5 h-1 rounded-full bg-emerald-200" />
          </div>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {educationData.qualifications.map((edu) => (
            <motion.div
              key={edu.id}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #f4faf6 100%)",
                border: "1px solid rgba(16, 185, 129, 0.14)",
                boxShadow:
                  "0 16px 30px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(16, 185, 129, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                transformStyle: "preserve-3d",
                transformPerspective: 1200,
              }}
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 bottom-2 h-5 rounded-full opacity-70 blur-xl"
                style={{ background: "rgba(16,185,129,0.18)" }}
              />
              
              <div className="p-6 sm:p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-emerald-600">
                      {edu.specialization}
                    </p>
                  </div>
                  <span className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/15 px-4 py-1.5 text-xs font-bold text-emerald-600 whitespace-nowrap">
                    Active
                  </span>
                </div>

                <div className="h-px bg-emerald-200/20 my-4" />

                <p className="font-semibold text-slate-900">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.location}</p>
                <p className="text-sm text-gray-600 mt-1">{edu.duration}</p>

                <ul className="mt-4 space-y-2.5">
                  {edu.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
