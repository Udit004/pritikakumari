"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Expand, FileText, X } from "lucide-react";

const resumePdfHref = "/assests/resume/Pritika%20Kumari_HR%20Analytics_%20Resume.pdf";

export function ResumeSection() {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="resume" className="relative w-full overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 h-72 w-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(45, 90, 108, 0.35) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-60 w-80 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 100% 100%, rgba(184, 134, 11, 0.22) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-16 space-y-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Resume
            </p>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Resume
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Quick preview, full-page open, and download.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 rounded-full bg-linear-to-r from-emerald-500 to-emerald-300" />
            <div className="h-1 w-5 rounded-full bg-emerald-200" />
          </div>
        </motion.div>

        <motion.div
          className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-emerald-300/60 bg-white shadow-sm"
          style={{
            boxShadow:
              "0 18px 40px rgba(15, 23, 42, 0.08), 0 4px 14px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)",
          }}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-slate-50 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Pritika Kumari Resume</p>
                <p className="text-xs text-slate-500">Preview, open, or download</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreenOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"
            >
              <Expand className="h-4 w-4" />
              Full screen
            </button>
          </div>

          <div className="bg-slate-100 px-3 py-3 sm:px-4 sm:py-4">
            <iframe
              src={`${resumePdfHref}#view=FitH&toolbar=0&navpanes=0`}
              title="Pritika Kumari resume preview"
              className="h-[min(62vh,680px)] min-h-105 w-full rounded-2xl border-0 bg-white"
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200/70 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-600">Use the buttons to download or open the PDF in a new tab.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={resumePdfHref}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 cursor-pointer"
              >
                <Download className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Download</span>
              </a>
              <a
                href={resumePdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:border-emerald-300 cursor-pointer"
              >
                <Eye className="h-4 w-4 text-emerald-600" />
                Full page
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {isFullscreenOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/90 p-4 sm:p-8">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-4xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
              <div>
                <p className="text-sm font-semibold text-slate-950">Full screen resume preview</p>
                <p className="text-xs text-slate-500">Close to return to the section</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFullscreenOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"
                aria-label="Close full screen preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe
              src={`${resumePdfHref}#view=FitH&toolbar=0&navpanes=0`}
              title="Pritika Kumari resume full screen preview"
              className="h-full w-full flex-1 border-0 bg-white"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}