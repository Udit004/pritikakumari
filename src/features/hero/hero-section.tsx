"use client";

import Link from "next/link";
import { heroData } from "./data";
import { FileText, Briefcase, Users, BarChart2, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    return (
        <section
            id="hero"
            className="relative w-full h-[100dvh] min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50/50"
        >
            {/* Ambient Background Glows - static */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-green-200/40 blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-200/30 blur-[120px] mix-blend-multiply" />
            </div>

            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center h-full pt-16 sm:pt-20 lg:pt-0">

                {/* ── Left Content ── */}
                <div className="flex flex-col justify-center w-full max-lg:pt-8 order-2 lg:order-1 flex-1 lg:h-full pb-8 lg:pb-0 z-20">

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
                    <div className="mt-8 flex flex-wrap gap-4 items-center">
                        <Link
                            href="#contact"
                            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5"
                        >
                            <FileText className="h-4 w-4" />
                            <span>{heroData.cta.primary}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href={heroData.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:bg-white hover:text-emerald-600"
                        >
                            <ExternalLink className="h-4 w-4" />
                            <span>{heroData.cta.secondary}</span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 lg:mt-12 grid grid-cols-3 gap-2 lg:gap-6 border-t border-slate-200/80 pt-6">
                        {heroData.stats.map((stat, idx) => {
                            const Icons = [Briefcase, Users, BarChart2];
                            const Icon = Icons[idx] || Briefcase;
                            return (
                                <div key={idx} className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100/80 text-emerald-600 shrink-0">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <span className="text-lg lg:text-2xl font-bold text-slate-900">{stat.value}</span>
                                    </div>
                                    <span className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Right Image ── */}
                <div className="relative w-full h-[40vh] sm:h-[45vh] lg:h-full flex items-end justify-center order-1 lg:order-2">
                    {/* Abstract Circle behind Image */}
                    <div className="absolute top-[45%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] lg:w-[450px] aspect-square rounded-full bg-gradient-to-tr from-green-300/30 to-emerald-100/40 border border-white/60 backdrop-blur-2xl shadow-xl" />

                    <Image
                        src="/assests/images/hero_Image2.png"
                        alt={`${heroData.name} - Profile`}
                        width={600}
                        height={800}
                        priority
                        className="relative z-10 object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] h-[100%] w-auto lg:h-[85%]"
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