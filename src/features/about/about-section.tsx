"use client";

import { useRef, useState } from "react";
import { aboutData } from "./data";
import Image from "next/image";
import { BarChart2, X } from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";

// GSAP Imports
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const paragraphs = aboutData.summary.split("\n\n");

    useSectionTracking("about");

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });

        // Text animations
        tl.from(".about-badge", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" })
          .from(".about-heading", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .fromTo(".about-word", 
              { opacity: 0, filter: "blur(4px)", y: 5 }, 
              { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.2, stagger: 0.015, ease: "power1.out" }, 
              "-=0.4"
          )
          .from(".about-stats", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.2");

        // Image animation
        gsap.from(imageRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            },
            opacity: 0,
            x: 50,
            scale: 0.9,
            duration: 1.2,
            ease: "power3.out",
        });

        // Floating card animation
        gsap.from(".floating-card", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
            },
            opacity: 0,
            x: 20,
            y: 20,
            duration: 1,
            ease: "back.out(1.5)",
            delay: 0.5
        });

    }, { scope: sectionRef });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="group/about relative w-full min-h-dvh lg:h-dvh lg:min-h-175 flex items-center justify-center overflow-hidden pt-24 pb-12 lg:py-0"
        >
            {/* ── CSS keyframes ── */}
            <style>{`
                @keyframes about-ring-spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes about-glow-breathe {
                    0%, 100% { opacity: 0.38; transform: scale(1.07); }
                    50%       { opacity: 0.70; transform: scale(1.13); }
                }
                @keyframes about-badge-ping {
                    0%, 100% { box-shadow: 0 0 0 0   rgba(16,185,129,0.55); }
                    50%       { box-shadow: 0 0 0 7px rgba(16,185,129,0);    }
                }
                .about-ring-spin    { animation: about-ring-spin    10s linear      infinite; }
                .about-glow-breathe { animation: about-glow-breathe  4s ease-in-out infinite; }
                .about-badge-ping   { animation: about-badge-ping   2.2s ease-in-out infinite; }
            `}</style>

            {/* Radial depth tint */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 65% 55% at 78% 50%, rgba(16,185,129,0.06) 0%, transparent 68%)," +
                        "radial-gradient(ellipse 40% 35% at 20% 75%, rgba(99,102,241,0.03) 0%, transparent 60%)",
                }}
            />

            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center lg:h-full">

                {/* LEFT — Text content */}
                <div className="flex flex-col justify-center w-full order-2 lg:order-1 flex-1 lg:h-full z-20">
                    <div className="about-badge w-fit">
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-200/80 bg-green-50/50 backdrop-blur-md mt-4 px-4 py-1.5 shadow-sm transition-all hover:bg-green-100/50">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="about-badge-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                                About Me
                            </p>
                        </div>
                    </div>

                    <div className="about-heading mt-4">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 drop-shadow-sm">
                            <span className="text-4xl font-bold tracking-tight" style={{ color: "#fffff" }}>
                                Who I Am
                            </span>
                        </h2>
                    </div>

                    <div className="about-text mt-5 space-y-4 max-w-lg">
                        {paragraphs.map((p, i) => (
                            <p
                                key={i}
                                className={`text-base sm:text-lg leading-relaxed font-medium ${
                                    i === 0
                                        ? "text-slate-900 font-semibold"
                                        : "text-slate-600"
                                }`}
                            >
                                {p.split(" ").map((word, wordIndex) => (
                                    <span key={wordIndex} className="about-word inline-block mr-[0.25em]">
                                        {word}
                                    </span>
                                ))}
                            </p>
                        ))}
                    </div>

                    <div className="about-stats mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
                        {/* Stats go here */}
                    </div>
                </div>

                {/* RIGHT — Circular image */}
                <div
                    ref={imageRef}
                    className="relative flex w-full h-[44vh] sm:h-[50vh] lg:h-[78vh] items-center justify-center order-1 lg:order-2 cursor-pointer group/img"
                    onClick={() => setIsImageOpen(true)}
                >
                    <div className="relative flex items-center justify-center transition-transform duration-500 group-hover/img:scale-105">
                        {/* Layer 1: Ambient glow */}
                        <div
                            aria-hidden="true"
                            className="about-glow-breathe absolute rounded-full pointer-events-none"
                            style={{
                                inset: "-22%",
                                background:
                                    "radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.06) 55%, transparent 75%)",
                                filter: "blur(22px)",
                            }}
                        />

                        {/* Layer 2: Spinning conic-gradient ring */}
                        <div
                            aria-hidden="true"
                            className="about-ring-spin absolute rounded-full pointer-events-none"
                            style={{
                                inset: "-5px",
                                background:
                                    "conic-gradient(from 0deg, #10b981 0%, #6ee7b7 28%, #d1fae5 48%, #f0fdf4 52%, #d1fae5 56%, #6ee7b7 72%, #10b981 100%)",
                            }}
                        />

                        {/* Layer 3: Slate-50 gap */}
                        <div
                            aria-hidden="true"
                            className="absolute rounded-full bg-slate-50 pointer-events-none"
                            style={{ inset: "-1.5px" }}
                        />

                        {/* Layer 4: Circular image */}
                        <div
                            className="relative overflow-hidden rounded-full shadow-2xl shadow-emerald-300/40"
                            style={{
                                width:  "clamp(230px, 33vw, 375px)",
                                height: "clamp(230px, 33vw, 375px)",
                            }}
                        >
                            <Image
                                src="/assests/images/about/image.png"
                                alt={`${aboutData.title} profile`}
                                fill
                                loading="lazy"
                                sizes="(min-width: 1024px) 375px, (min-width: 640px) 33vw, 230px"
                                className="object-cover object-top"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 rounded-full pointer-events-none"
                                style={{ boxShadow: "inset 0 0 38px 7px rgba(0,0,0,0.10)" }}
                            />
                        </div>

                        {/* Floating glassmorphic card: bottom-right */}
                        <div className="floating-card hidden sm:flex absolute -right-8 bottom-[11%] lg:-right-14 z-20 cursor-default">
                            <div className="flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/50 shadow-xl p-3 pr-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                                    <BarChart2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider tabular-nums">
                                        Stack
                                    </p>
                                    <p className="text-sm font-extrabold text-slate-900 whitespace-nowrap">
                                        Power BI · SQL · Python
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Lightbox / Popup Modal */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <button 
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-2"
                            onClick={() => setIsImageOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl aspect-square sm:aspect-auto sm:h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src="/assests/images/about/image.png"
                                alt={`${aboutData.title} profile`}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}