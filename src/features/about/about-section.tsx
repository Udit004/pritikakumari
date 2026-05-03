"use client";

import { aboutData } from "./data";
import Image from "next/image";

export function AboutSection() {
  const paragraphs = aboutData.summary.split("\n\n");
  
  return (
    <section
      id="about"
      className="group/about relative w-full min-h-dvh lg:h-dvh lg:min-h-175 flex items-center justify-center overflow-hidden pt-24 pb-12 lg:py-0"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-2 md:gap-8 lg:items-center lg:h-full">

        {/* ── Left Content ── */}
        <div className="flex flex-col justify-center w-full order-2 lg:order-1 flex-1 lg:h-full z-20">

          {/* Badge */}
          <div className="group inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/80 bg-accent-primary-50/50 backdrop-blur-md mt-4 px-4 py-1.5 shadow-sm transition-all hover:bg-blue-100/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-primary"></span>
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-primary">
              About Me
            </p>
          </div>

          {/* Headings */}
          <div className="mt-4 space-y-3">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-green-700">
                Who I Am
              </span>
            </h1>
            {/* <h2 className="text-lg sm:text-2xl font-semibold text-slate-700 max-w-xl">
              {aboutData.title}
            </h2> */}
          </div>

          {/* Description */}
          <div className="mt-5 space-y-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? "text-slate-900 font-semibold" : ""}>{paragraph}</p>
            ))}
          </div>

          {/* Stats */}
          {/* <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight">1+</span>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Years Experience</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 shrink-0">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight">End to End</span>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Employee Lifecycle</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 shrink-0">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight">Data Driven</span>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">HR Professional</span>
            </div>
          </div> */}
        </div>

        {/* ── Right Image ── */}
        <div className="relative flex w-full min-h-85 h-[44vh] sm:h-[48vh] lg:h-[78vh] items-center justify-center order-1 lg:order-2 lg:justify-end md:pt-4">
          <div className="relative aspect-[4/5] w-full max-w-[min(86vw,420px)] lg:max-w-[440px]">
            <div className="about-ring-track absolute inset-0 rounded-[32px]" />
            <div className="absolute inset-[1.5px] overflow-hidden rounded-[30px] ">
              <Image
                src="/assests/images/hero_Image2.png"
                alt="About"
                fill
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 420px, 86vw"
                className="object-contain object-center p-3 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
