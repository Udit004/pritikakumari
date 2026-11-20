"use client";

import { useState } from "react";
import { projectsData } from "./data";
import { Briefcase, Database, Code, Users, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectFooter } from "./ProjectFooter";
import { Analysis1 } from "./project1/Analysis1";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useSectionTracking("projects");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-6 w-6 text-emerald-400" />;
      case "Database":
        return <Database className="h-6 w-6 text-emerald-400" />;
      case "Code":
        return <Code className="h-6 w-6 text-emerald-400" />;
      default:
        return <Briefcase className="h-6 w-6 text-emerald-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="projects"
      className="scene-section relative w-full min-h-[100svh] py-20 lg:py-28"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45, 90, 108, 0.25) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Full Rich Project Header (includes headline, subtitle, 3 stat cards, and illustration) */}
        <ProjectHeader />

        {/* Projects Grid showcasing all projects with complete data */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projectsData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => {
                if (index === 0) setSelectedProject(1);
              }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                rotateX: -3,
                rotateY: 3,
                boxShadow:
                  "0 24px 48px rgba(15, 23, 42, 0.12), 0 8px 20px rgba(16, 185, 129, 0.12)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="relative rounded-3xl overflow-hidden bg-white border border-emerald-200/50 p-7 shadow-sm transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header row: Icon & Case Study tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400 shadow-md transition-transform duration-300 group-hover:scale-105">
                      {getIcon(project.icon)}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest">
                        Case Study 0{index + 1}
                      </span>
                      <p className="text-[11px] text-slate-400 font-medium">Workforce Intelligence</p>
                    </div>
                  </div>

                  {index === 0 ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
                      Interactive Analysis
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      Case Study
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-extrabold text-slate-950 leading-snug mb-3 group-hover:text-emerald-950 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                  {project.description}
                </p>
              </div>

              {/* Bottom footer: Tools tags & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {index === 0 ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Footer Banner */}
        <ProjectFooter />
      </div>

      {/* Interactive Analysis Modal for Project 1 */}
      <Analysis1
        isOpen={selectedProject === 1}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
