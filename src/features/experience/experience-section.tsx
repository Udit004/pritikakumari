"use client";

import { experienceData } from "./data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSectionTracking } from "@/hooks/useSectionTracking";

export function ExperienceSection() {

  useSectionTracking("experience");

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
      transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="experience" className="relative w-full overflow-hidden py-20 md:py-28">
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
              Experience
            </p>
          </div>
          <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#fffff" }}>
            {experienceData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-linear-to-r from-emerald-500 to-emerald-300" />
            <div className="w-5 h-1 rounded-full bg-emerald-200" />
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-12 bottom-0 w-0.5 bg-linear-to-b from-transparent via-emerald-500/40 to-transparent -translate-x-1/2 hidden lg:block" />

          <div className="space-y-12 lg:space-y-16">
            {experienceData.experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  className="relative"
                  variants={itemVariants}
                >
                  {/* Desktop layout */}
                  <div className="hidden lg:flex items-center gap-8">
                    {/* LEFT SIDE */}
                    <div className="flex-1 flex justify-end pr-16">
                      {isLeft ? (
                        <motion.div
                          className="relative w-full max-w-lg rounded-2xl overflow-hidden group"
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

                          {/* Arrow pointer */}
                          <div className="absolute -right-3.5 top-6 w-3 h-3 bg-white border-r border-b border-emerald-200/30 rotate-45" />

                          <div className="p-5">
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${exp.logoColor} font-bold text-sm shrink-0`}>
                                <Image src={exp.logoImage} alt={`${exp.company} Logo`} width={44} height={44} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                                  {exp.position}
                                </h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5">
                                  {exp.company}
                                </p>
                              </div>
                            </div>

                            <div className="h-px bg-emerald-200/20 my-3.5" />

                            <ul className="space-y-2.5">
                              {exp.responsibilities.map((resp, respIdx) => (
                                <li key={respIdx} className="flex gap-2.5 text-xs text-gray-600 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="text-right space-y-1"
                          variants={cardVariants}
                        >
                          <p className="text-sm font-bold text-slate-900">{exp.date}</p>
                          <div className="inline-flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20">
                              {exp.durationText}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* CENTER DOT */}
                    <motion.div
                      className="relative flex items-center justify-center shrink-0 z-20"
                      variants={dotVariants}
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40">
                        <div className="absolute inset-1 rounded-full bg-white/80" />
                      </div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <div className="flex-1 pl-16">
                      {!isLeft ? (
                        <motion.div
                          className="relative w-full max-w-lg rounded-2xl overflow-hidden group"
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

                          {/* Arrow pointer */}
                          <div className="absolute -left-3.5 top-6 w-3 h-3 bg-white border-l border-t border-emerald-200/30 rotate-45" />

                          <div className="p-5">
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${exp.logoColor} font-bold text-sm shrink-0`}>
                                <Image src={exp.logoImage} alt={`${exp.company} Logo`} width={44} height={44} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                                  {exp.position}
                                </h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5">
                                  {exp.company}
                                </p>
                              </div>
                            </div>

                            <div className="h-px bg-emerald-200/20 my-3.5" />

                            <ul className="space-y-2.5">
                              {exp.responsibilities.map((resp, respIdx) => (
                                <li key={respIdx} className="flex gap-2.5 text-xs text-gray-600 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="text-left space-y-1"
                          variants={cardVariants}
                        >
                          <p className="text-sm font-bold text-slate-900">{exp.date}</p>
                          <div className="inline-flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20">
                              {exp.durationText}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="lg:hidden">
                    <div className="relative pl-8 flex">
                      <motion.div
                        className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 absolute -left-1.5 top-5 z-10 shrink-0"
                        variants={dotVariants}
                      />
                      <motion.div
                        className="flex-1 relative rounded-2xl overflow-hidden group"
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

                        <div className="p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${exp.logoColor} font-bold text-sm shrink-0`}>
                              <Image src={exp.logoImage} alt={`${exp.company} Logo`} width={44} height={44} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                                {exp.position}
                              </h3>
                              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5">
                                {exp.company}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1 mb-3.5">
                            <p className="text-xs font-bold text-slate-900">{exp.date}</p>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
                              {exp.durationText}
                            </span>
                          </div>

                          <div className="h-px bg-emerald-200/20 my-3.5" />

                          <ul className="space-y-2.5">
                            {exp.responsibilities.map((resp, respIdx) => (
                              <li key={respIdx} className="flex gap-2.5 text-xs text-gray-600 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* End dot */}
            <motion.div
              className="relative flex justify-center mt-8"
              variants={dotVariants}
            >
              <div className="w-3 h-3 rounded-full bg-emerald-500/40 shadow-lg" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
