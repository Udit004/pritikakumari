"use client";

import Link from "next/link";
import { heroData } from "./data";
import { FileText, Briefcase, Users, BarChart2, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { HeroCanvas } from "./hero-canvas";

export function HeroSection() {
    return (
        <section
            id="hero"
            className="group/hero relative w-full min-h-[100dvh] lg:h-[100dvh] lg:min-h-[700px] flex items-center justify-center overflow-hidden pt-24 pb-12 lg:py-0"
        >
            <HeroCanvas />

            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-2 md:gap-8 lg:items-center lg:h-full">

                {/* ── Left Content ── */}
                <div className="flex flex-col justify-center w-full order-2 lg:order-1 flex-1 lg:h-full z-20">

                    {/* Badge */}
                    <div className="group inline-flex w-fit items-center gap-2 rounded-full border border-green-200/80 bg-green-50/50 backdrop-blur-md mt-4 px-4 py-1.5 shadow-sm transition-all hover:bg-green-100/50">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                            HR Professional
                        </p>
                    </div>

                    {/* Headings */}
                    <div className="mt-4 space-y-3">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                                {heroData.name}
                            </span>
                        </h1>
                        <h2 className="text-lg sm:text-2xl font-semibold text-slate-700 max-w-xl">
                            {heroData.title}
                        </h2>
                    </div>

                    {/* Description - Subtitle removed to avoid text repetition */}
                    <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                        {heroData.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full max-w-sm sm:max-w-none">
                        <Link
                            href="#contact"
                            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5"
                        >
                            <FileText className="text-white h-4 w-4" />
                            <span className="text-white">{heroData.cta.primary}</span>
                            <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href={heroData.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:bg-white hover:text-emerald-600"
                        >
                            <ExternalLink className="h-4 w-4" />
                            <span>{heroData.cta.secondary}</span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
                        {heroData.stats.map((stat, idx) => {
                            const Icons = [Briefcase, Users, BarChart2];
                            const Icon = Icons[idx] || Briefcase;
                            return (
                                <div key={idx} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-600 shrink-0">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight">{stat.value}</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Right Image ── */}
                <div className="relative w-full min-h-[300px] h-[40vh] sm:h-[45vh] lg:h-[90vh] md:pt-4 flex items-center justify-center order-1 lg:order-2">
                    {/* Abstract Circle behind Image */}

                    <Image
                        src="/assests/images/profile_image.png"
                        alt={`${heroData.name} - Profile`}
                        width={600}
                        height={800}
                        priority
                        className="relative z-10 object-fit object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] h-[100%] w-auto lg:h-[85%] rounded-md"
                    />


                    {/* Floating Glassmorphic Tag (Desktop Only) */}
                    <div className="hidden lg:flex absolute top-1/4 lg:-left-6 z-20 cursor-default">
                        <div className="flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/50 shadow-xl p-3 pr-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <BarChart2 className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider tabular-nums">Expertise</p>
                                <p className="text-sm font-extrabold text-slate-900">HR Analytics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}