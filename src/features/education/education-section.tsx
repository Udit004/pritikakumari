"use client";

import { educationData } from "./data";
import { motion } from "framer-motion";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import Image from "next/image";
import { GraduationCap, MapPin, Calendar, Award, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerImgRef = useRef<HTMLDivElement>(null);
  useSectionTracking("education");

  useGSAP(() => {
    if (headerImgRef.current) {
      gsap.to(headerImgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -25,
        ease: "none",
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="scene-section relative w-full min-h-[100svh] flex flex-col justify-center py-20 lg:py-28"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-10 w-96 h-72 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(16, 185, 129, 0.35) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-80 h-60 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 100% 100%, rgba(45, 90, 108, 0.25) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header - styled consistently with Project and Experience sections */}
        <div className="mb-12 lg:mb-16 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shrink-0">
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Academic Background
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              {educationData.title}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <div className="w-5 h-1 rounded-full bg-emerald-200" />
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Foundational knowledge in Human Resource Management, business strategy, and people dynamics.
            </p>
          </div>

          {/* Header image - matching Project section image size */}
          <div
            ref={headerImgRef}
            className="flex-1 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/assests/images/education/Education_headerImage.png"
                alt="Education Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Education Qualifications Card - expanded horizontally and vertically */}
        <div className="max-w-4xl mx-auto w-full shrink-0">
          {educationData.qualifications.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden bg-white border border-emerald-200/50 shadow-md p-7 sm:p-9 lg:p-10 transition-all hover:shadow-lg group"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400 shrink-0 shadow-sm">
                    <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug font-sans">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base font-bold text-emerald-700">
                      Specialization in {edu.specialization}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 self-start shrink-0">
                  <Award className="h-3.5 w-3.5 text-emerald-600" />
                  Graduating 2025
                </span>
              </div>

              <div className="h-px bg-slate-100 my-6 sm:my-8" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 text-sm sm:text-base text-slate-600 mb-6 sm:mb-8">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                  <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{edu.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                  <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{edu.duration}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4">
                  Key Academic Focus
                </p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {edu.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
