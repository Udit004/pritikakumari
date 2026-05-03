"use client";

import { projectsData } from "./data";
import { Briefcase, Database, Code, Users } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users": return <Users className="h-6 w-6 text-emerald-600" />;
      case "Database": return <Database className="h-6 w-6 text-emerald-600" />;
      case "Code": return <Code className="h-6 w-6 text-emerald-600" />;
      default: return <Briefcase className="h-6 w-6 text-emerald-600" />;
    }
  };

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
      y: -4,
      transition: { duration: 0.22 },
    },
  };

  return (
    <section id="projects" className="relative w-full overflow-hidden py-20 md:py-28 scroll-mt-24">
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
              Projects
            </p>
          </div>
          <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#064e3b" }}>
            {projectsData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
            <div className="w-5 h-1 rounded-full bg-emerald-200" />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsData.projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative bg-white rounded-2xl border border-emerald-200/30 shadow-sm overflow-hidden group"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-6">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-200/30">
                  {getIcon(project.icon)}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-base font-bold text-slate-900 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  {project.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-emerald-200/20 mb-4" />

                {/* Tools/Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-500/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
