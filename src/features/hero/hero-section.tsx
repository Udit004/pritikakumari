"use client";

import { useState } from "react";
import Link from "next/link";
import { heroData } from "./data";
import { FileText, Briefcase, Users, BarChart2, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { trackEvent } from "@/lib/analytics";
import { useSound } from "@/components/SoundProvider";

export function HeroSection() {
    const [titleIndex, setTitleIndex] = useState(0);
    const containerRef = useRef<HTMLElement>(null);
    const { play } = useSound();

    useSectionTracking("hero");

    useGSAP(() => {
        // Professional GSAP entrance animation for text content
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(".hero-left-elem", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
        );


        // Reel animation for FileText icon
        const fileTl = gsap.timeline({ repeat: -1, delay: 2 });
        fileTl.to(".cta-file-icon", { y: -30, duration: 0.4, ease: "power2.in" })
              .set(".cta-file-icon", { y: 30 })
              .to(".cta-file-icon", { y: 0, duration: 0.5, ease: "back.out(1.5)" })
              .to({}, { duration: 3 }); // Pause before repeating

        // Left-right animation for ExternalLink icon
        gsap.to(".cta-external-icon", {
            x: 4,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.7
        });
    }, { scope: containerRef });

    const handleCtaEnter = (e: React.MouseEvent) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)", overwrite: "auto" });
    };

    const handleCtaLeave = (e: React.MouseEvent) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    useGSAP(() => {
        const chars = gsap.utils.toArray(".reveal-char");
        
        if (chars.length === 0) return;

        const tl = gsap.timeline();
        
        tl.fromTo(chars, 
            { y: 20, opacity: 0, rotationX: -90 },
            { y: 0, opacity: 1, rotationX: 0, duration: 0.4, stagger: 0.04, ease: "back.out(2)" }
        )
        .to({}, { duration: 1.8 }) // Pause to read
        .to(chars, 
            { y: -20, opacity: 0, rotationX: 90, duration: 0.3, stagger: 0.02, ease: "power2.in" }
        )
        .call(() => {
            setTitleIndex(prev => (prev + 1) % heroData.titleRotations.length);
        });

    }, { dependencies: [titleIndex], scope: containerRef });

    const leftPanel = (
        <>
            {/* Badge */}
            <div className="hero-left-elem group inline-flex w-fit items-center gap-2 rounded-full border border-green-200/80 bg-green-50/50 backdrop-blur-md mt-2 px-4 py-1.5 shadow-sm transition-all hover:bg-green-100/50">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                    HR Professional
                </p>
            </div>

            {/* Headings */}
            <div className="hero-left-elem mt-4 space-y-3">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 drop-shadow-sm">
                    <span className="text-slate-950">
                        {heroData.name}
                    </span>
                </h1>
                <h2 className="text-lg sm:text-2xl font-semibold max-w-xl perspective-1000">
                    <span className="inline-flex flex-wrap min-h-[1.5em] text-emerald-600 overflow-hidden py-1 drop-shadow-sm">
                        {heroData.titleRotations[titleIndex].split("").map((char, idx) => (
                            <span key={`${titleIndex}-${idx}`} className="reveal-char inline-block whitespace-pre origin-bottom">
                                {char}
                            </span>
                        ))}
                    </span>
                </h2>
            </div>

            {/* Description - Subtitle removed to avoid text repetition */}
            <p className="hero-left-elem mt-5 text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                {heroData.description}
            </p>

            {/* CTA Buttons */}
            <div className="hero-left-elem mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full max-w-sm sm:max-w-none">
                <Link
                    href="#resume"
                    onMouseEnter={handleCtaEnter}
                    onMouseLeave={handleCtaLeave}
                    onClick={() => {
                        play("heroPrimary");
                        trackEvent("click_view_resume", { section: "hero" });
                    }}
                    className="hero-cta-primary group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                    <FileText className="cta-file-icon text-green-500 h-4 w-4 shrink-0" />
                    <span className="text-green-500">{heroData.cta.primary}</span>
                    <ArrowRight className="h-4 w-4 text-green-500 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                    href={heroData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleCtaEnter}
                    onMouseLeave={handleCtaLeave}
                    onClick={() => {
                        play("heroSecondary");
                        trackEvent("click_linkedin", { section: "hero" });
                    }}
                    className="hero-cta-secondary group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-black bg-white/50 backdrop-blur-sm px-7 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-500 hover:bg-white hover:text-emerald-600"
                >
                    <ExternalLink className="cta-external-icon h-4 w-4 transition-colors group-hover:text-green-500 shrink-0" />
                    {heroData.cta.secondary}
                </Link>
            </div>

            {/* Stats */}
            <div className="hero-left-elem mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
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
        <div className="relative z-10 h-full w-full flex items-center justify-center">
            <Image
                src="/assests/images/hero/heroImage.svg"
                alt={`${heroData.name} - Professional Overview`}
                priority
                unoptimized
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 70vw, 95vw"
                fill
                className="object-contain object-center"
            />
        </div>
    );

    return (
        <section
            id="hero"
            ref={containerRef}
            className="scene-section group/hero relative w-full min-h-[100svh] flex items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-20"
        >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10 lg:min-h-full">
                <div className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center gap-10 lg:gap-0">
                    <div className="absolute inset-y-6 right-0 -z-10 hidden w-[72vw] rounded-[3rem] bg-[radial-gradient(circle_at_18%_24%,rgba(167,243,208,0.38),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(186,230,253,0.42),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.75),rgba(240,249,255,0.38))] blur-3xl lg:block" />

                    <div className="pointer-events-none relative z-10 w-full lg:absolute lg:-right-8 lg:top-1/2 lg:w-[76%] lg:-translate-y-1/2">
                        <div className="relative mx-auto h-[40vh] w-full max-w-170 sm:h-[46vh] lg:ml-30 lg:mr-0 lg:h-[72vh] lg:max-h-[640px] lg:max-w-200">
                            <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-emerald-300/30 blur-3xl lg:block" />
                            <div className="absolute -right-8 bottom-12 hidden h-36 w-36 rounded-full bg-sky-300/30 blur-3xl lg:block" />
                            {rightPanel}
                        </div>
                    </div>

                    <div className="relative z-20 w-full max-w-2xl bg-transparent p-0 sm:max-w-3xl lg:max-w-[54%] lg:pr-10">
                        {leftPanel}
                    </div>
                </div>
            </div>
        </section>
    );
}