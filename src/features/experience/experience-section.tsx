"use client";

import { useRef } from "react";
import { experienceData } from "./data";
import Image from "next/image";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineBeamRef = useRef<HTMLDivElement>(null);

  useSectionTracking("experience");

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (timelineBeamRef.current) {
        gsap.fromTo(
          timelineBeamRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".experience-timeline-container",
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.8,
            },
          }
        );
      }

      const timelineCards = gsap.utils.toArray<HTMLElement>(".exp-desktop-card");
      timelineCards.forEach((card) => {
        const isLeft = card.classList.contains("exp-card-left");
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -35 : 35,
            scale: 0.94,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const nodes = gsap.utils.toArray<HTMLElement>(".exp-timeline-node");
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="scene-section relative w-full min-h-[100svh] flex flex-col justify-center py-20 lg:py-28 bg-[#f8faf9] z-10"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45, 90, 108, 0.25) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header - styled consistently with Project section */}
        <div className="mb-12 lg:mb-16 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shrink-0">
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Career History
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              {experienceData.title}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <div className="w-5 h-1 rounded-full bg-emerald-200" />
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Demonstrated hands-on experience in full employee lifecycle management, HRMS operations, payroll validation, and statutory compliance.
            </p>
          </div>

          {/* Header image - matching Project section image size */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Image
                src="/assests/images/workExpreince/workExpreince_headerImage.png"
                alt="Work Experience Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="experience-timeline-container relative shrink-0">
          <div className="hidden lg:block absolute left-1/2 top-2 bottom-4 w-1 bg-slate-200 -translate-x-1/2 rounded-full" />
          <div
            ref={timelineBeamRef}
            className="hidden lg:block absolute left-1/2 top-2 bottom-4 w-1 bg-gradient-to-b from-emerald-500 via-emerald-400 to-teal-400 -translate-x-1/2 rounded-full origin-top shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          />

          <div className="space-y-8 lg:space-y-12">
            {experienceData.experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div key={exp.id} className="relative">
                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-center gap-8">
                    {/* LEFT SLOT */}
                    <div className="flex-1 flex justify-end">
                      {isLeft ? (
                        <div
                          className="exp-desktop-card exp-card-left relative w-full max-w-xl rounded-3xl overflow-hidden bg-white border border-emerald-200/50 shadow-sm p-6 sm:p-7 transition-all duration-300 hover:shadow-md group"
                        >
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3.5">
                              <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${exp.logoColor} font-bold text-xs shrink-0 shadow-xs`}>
                                <Image src={exp.logoImage} alt={`${exp.company} Logo`} width={36} height={36} className="rounded-lg object-contain" />
                              </div>
                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-sans">
                                  {exp.position}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                                  {exp.company}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shrink-0">
                              {exp.durationText}
                            </span>
                          </div>

                          <ul className="space-y-2.5 pt-3.5 mt-3.5 border-t border-slate-100">
                            {exp.responsibilities.map((resp, respIdx) => (
                              <li key={respIdx} className="flex gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-right space-y-1.5 pr-6">
                          <p className="text-base sm:text-lg font-extrabold text-slate-900">{exp.date}</p>
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block">
                            {exp.durationText}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CENTER NODE */}
                    <div className="exp-timeline-node relative flex items-center justify-center shrink-0 z-20">
                      <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-white shadow-md flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                    </div>

                    {/* RIGHT SLOT */}
                    <div className="flex-1 pl-2">
                      {!isLeft ? (
                        <div
                          className="exp-desktop-card exp-card-right relative w-full max-w-xl rounded-3xl overflow-hidden bg-white border border-emerald-200/50 shadow-sm p-6 sm:p-7 transition-all duration-300 hover:shadow-md group"
                        >
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3.5">
                              <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${exp.logoColor} font-bold text-xs shrink-0 shadow-xs`}>
                                <Image src={exp.logoImage} alt={`${exp.company} Logo`} width={36} height={36} className="rounded-lg object-contain" />
                              </div>
                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-sans">
                                  {exp.position}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                                  {exp.company}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shrink-0">
                              {exp.durationText}
                            </span>
                          </div>

                          <ul className="space-y-2.5 pt-3.5 mt-3.5 border-t border-slate-100">
                            {exp.responsibilities.map((resp, respIdx) => (
                              <li key={respIdx} className="flex gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-left space-y-1.5 pl-6">
                          <p className="text-base sm:text-lg font-extrabold text-slate-900">{exp.date}</p>
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block">
                            {exp.durationText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden relative pl-6 border-l-2 border-emerald-400/50 ml-3">
                    <div className="exp-timeline-node absolute -left-[7px] top-4 w-3 h-3 rounded-full bg-emerald-500 shadow-md ring-4 ring-white" />
                    <div className="relative rounded-2xl overflow-hidden bg-white border border-emerald-200/50 p-5 sm:p-6 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl ${exp.logoColor} font-bold text-xs shrink-0`}>
                          <Image src={exp.logoImage} alt={`${exp.company} Logo`} width={32} height={32} className="rounded object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-sans">
                            {exp.position}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-slate-500">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-2 border-y border-slate-100 my-2.5 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                          {exp.date}
                        </span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50 text-[11px]">
                          {exp.durationText}
                        </span>
                      </div>

                      <ul className="space-y-2 mt-2.5">
                        {exp.responsibilities.map((resp, respIdx) => (
                          <li key={respIdx} className="flex gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
