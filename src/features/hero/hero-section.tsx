"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { heroData } from "./data";
import { FileText, Briefcase, Users, BarChart2, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
    const [typedTitle, setTypedTitle] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const titles = heroData.titleRotations;
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId: number;

        const tick = () => {
            const currentTitle = titles[titleIndex];

            if (isDeleting) {
                charIndex -= 1;
                setTypedTitle(currentTitle.slice(0, charIndex));
            } else {
                charIndex += 1;
                setTypedTitle(currentTitle.slice(0, charIndex));
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                timeoutId = window.setTimeout(() => {
                    isDeleting = true;
                    tick();
                }, 1200);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }

            timeoutId = window.setTimeout(tick, isDeleting ? 35 : 65);
        };

        tick();

        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const frameId = window.requestAnimationFrame(() => {
            setIsMounted(true);
        });

        return () => window.cancelAnimationFrame(frameId);
    }, []);

    const leftPanel = (
        <>
            {/* Badge */}
            <div className="group inline-flex w-fit items-center gap-2 rounded-full border border-green-200/80 bg-green-50/50 backdrop-blur-md mt-2 px-4 py-1.5 shadow-sm transition-all hover:bg-green-100/50">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                    HR Professional
                </p>
            </div>

            {/* Headings */}
            <div className="mt-4 space-y-3">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 drop-shadow-sm">
                    <span className="text-slate-950">
                        {heroData.name}
                    </span>
                </h1>
                <h2 className="text-lg sm:text-2xl font-semibold max-w-xl">
                    <span className="inline-block min-h-[1.5em] bg-linear-to-r from-emerald-700 via-green-500 to-lime-500 bg-clip-text text-transparent">
                        {typedTitle}
                        <span className="ml-0.5 inline-block animate-pulse text-emerald-600">|</span>
                    </span>
                </h2>
            </div>

            {/* Description - Subtitle removed to avoid text repetition */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                {heroData.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full max-w-sm sm:max-w-none">
                <Link
                    href="#resume"
                    className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5"
                >
                    <FileText className="text-green-500 h-4 w-4" />
                    <span className="text-green-500">{heroData.cta.primary}</span>
                    <ArrowRight className="h-4 w-4 text-green-500 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                    href={heroData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-500 hover:bg-white hover:text-emerald-600"
                >
                    <ExternalLink className="h-4 w-4 transition-colors group-hover:text-green-500" />
                    {heroData.cta.secondary}
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
        </>
    );

    const rightPanel = (
        <>
            <div className="relative z-10 h-full w-full overflow-hidden rounded-4xl border border-white/50 bg-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                <Image
                    src="/assests/images/hero/profile_image.png"
                    alt={`${heroData.name} - Profile`}
                    priority
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 55vw, 90vw"
                    fill
                    className="object-cover object-center"
                />
            </div>
        </>
    );

    return (
        <section
            id="hero"
            className="group/hero relative w-full min-h-dvh lg:h-dvh lg:min-h-175 flex items-center justify-center overflow-hidden pt-12 pb-12 lg:pt-24 lg:py-0"
        >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10 lg:min-h-full">
                <div className="relative flex min-h-[calc(100vh-6rem)] flex-col justify-center gap-10 lg:gap-0">
                    <div className="absolute inset-y-6 right-0 -z-10 hidden w-[72vw] rounded-[3rem] bg-[radial-gradient(circle_at_18%_24%,rgba(167,243,208,0.38),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(186,230,253,0.42),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.75),rgba(240,249,255,0.38))] blur-3xl lg:block" />

                    {isMounted ? (
                        <motion.div
                            className="pointer-events-none relative z-10 w-full lg:absolute lg:-right-8 lg:top-1/2 lg:w-[76%] lg:-translate-y-1/2"
                            initial={{ opacity: 0, y: 22, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.85, delay: 0.1 }}
                        >
                            <div className="relative ml-30 h-[40vh] w-full max-w-170 sm:h-[46vh] lg:h-[82vh] lg:max-w-200">
                                <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-emerald-300/30 blur-3xl lg:block" />
                                <div className="absolute -right-8 bottom-12 hidden h-36 w-36 rounded-full bg-sky-300/30 blur-3xl lg:block" />
                                {rightPanel}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="pointer-events-none relative z-10 w-full lg:absolute lg:-right-4 lg:top-1/2 lg:w-[76%] lg:-translate-y-1/2">
                            <div className="relative ml-auto h-[40vh] w-full max-w-170 sm:h-[46vh] lg:h-[82vh] lg:max-w-none">
                                <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-emerald-300/30 blur-3xl lg:block" />
                                <div className="absolute -right-8 bottom-12 hidden h-36 w-36 rounded-full bg-sky-300/30 blur-3xl lg:block" />
                                {rightPanel}
                            </div>
                        </div>
                    )}

                    {isMounted ? (
                        <motion.div
                            className="relative z-20 w-full max-w-2xl bg-transparent p-0 sm:max-w-3xl lg:max-w-[54%] lg:pr-10"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75 }}
                        >
                            {leftPanel}
                        </motion.div>
                    ) : (
                        <div className="relative z-20 w-full max-w-2xl bg-transparent p-0 sm:max-w-3xl lg:max-w-[54%] lg:pr-10">
                            {leftPanel}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}