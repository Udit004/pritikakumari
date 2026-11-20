"use client";

import { useRef, useState } from "react";
import { aboutData } from "./data";
import Image from "next/image";
import { BarChart2, X, CheckCircle } from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const paragraphs = aboutData.summary.split("\n\n");

    useSectionTracking("about");

    useGSAP(() => {
        // Entrance sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(".about-badge", {
            opacity: 0,
            y: 25,
            duration: 0.6,
            ease: "power3.out",
        })
        .from(".about-heading", {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power3.out",
        }, "-=0.4")
        .from(".about-paragraph", {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
        }, "-=0.3")
        .from(".about-feature-chip", {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.5)",
        }, "-=0.2");

        // Profile composition entry
        gsap.from(imageWrapperRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            scale: 0.88,
            x: 40,
            duration: 1.1,
            ease: "power3.out",
        });

        // Floating badge reveal
        gsap.from(".floating-card", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: 30,
            y: 20,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.3,
        });

        // Subtle parallax movement on the portrait while scrolling through section
        if (imageWrapperRef.current) {
            gsap.to(imageWrapperRef.current, {
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
            id="about"
            ref={sectionRef}
            className="scene-section relative w-full min-h-[100svh] flex items-center justify-center py-20 lg:py-24"
        >
            <style>{`
                @keyframes about-ring-spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes about-glow-breathe {
                    0%, 100% { opacity: 0.35; transform: scale(1.06); }
                    50%       { opacity: 0.65; transform: scale(1.12); }
                }
                .about-ring-spin    { animation: about-ring-spin 10s linear infinite; }
                .about-glow-breathe { animation: about-glow-breathe 4s ease-in-out infinite; }
            `}</style>

            {/* Ambient depth gradients */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 65% 55% at 80% 50%, rgba(16,185,129,0.08) 0%, transparent 68%)," +
                        "radial-gradient(ellipse 45% 40% at 18% 70%, rgba(45,90,108,0.06) 0%, transparent 60%)",
                }}
            />

            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col justify-center h-full max-h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                    {/* Left Column — Text Intro */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 order-2 lg:order-1">
                        <div className="about-badge w-fit">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 backdrop-blur-md px-3.5 py-1 shadow-xs">
                                <span className="relative flex h-2 w-2">
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
                                    About Me
                                </span>
                            </div>
                        </div>

                        <div className="about-heading space-y-1">
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                                Delivering Purposeful HR &amp; People Operations
                            </h2>
                            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-600">
                                Who I Am &amp; What Drives Me
                            </p>
                        </div>

                        <div className="space-y-3 max-w-xl text-slate-600 font-medium leading-relaxed">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className={`about-paragraph text-sm sm:text-base ${
                                        i === 0
                                            ? "text-slate-900 font-semibold leading-relaxed"
                                            : "text-slate-600 leading-relaxed"
                                    }`}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        <div className="pt-1 flex flex-wrap gap-2">
                            {[
                                "HRMS Administration",
                                "Payroll & Statutory Compliance",
                                "Employee Lifecycle",
                                "HR Analytics & Reporting",
                            ].map((pillar) => (
                                <div
                                    key={pillar}
                                    className="about-feature-chip inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 px-3 py-1.5 shadow-xs"
                                >
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                    <span className="text-xs font-semibold text-slate-800">{pillar}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column — Asymmetric Circular Visual & Stack Badge */}
                    <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
                        <div
                            ref={imageWrapperRef}
                            className="relative flex items-center justify-center cursor-pointer group/img"
                            onClick={() => setIsImageOpen(true)}
                        >
                            <div
                                aria-hidden="true"
                                className="about-glow-breathe absolute rounded-full pointer-events-none"
                                style={{
                                    inset: "-22%",
                                    background:
                                        "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.06) 55%, transparent 75%)",
                                    filter: "blur(24px)",
                                }}
                            />

                            <div
                                aria-hidden="true"
                                className="about-ring-spin absolute rounded-full pointer-events-none"
                                style={{
                                    inset: "-5px",
                                    background:
                                        "conic-gradient(from 0deg, #10b981 0%, #34d399 28%, #a7f3d0 48%, #ffffff 52%, #a7f3d0 56%, #34d399 72%, #10b981 100%)",
                                }}
                            />

                            <div
                                aria-hidden="true"
                                className="absolute rounded-full bg-slate-50 pointer-events-none"
                                style={{ inset: "-1.5px" }}
                            />

                            <div
                                className="relative overflow-hidden rounded-full shadow-2xl shadow-emerald-500/20 transition-transform duration-500 group-hover/img:scale-105"
                                style={{
                                    width: "clamp(220px, 28vw, 340px)",
                                    height: "clamp(220px, 28vw, 340px)",
                                }}
                            >
                                <Image
                                    src="/assests/images/about/image.png"
                                    alt={`${aboutData.title} profile`}
                                    fill
                                    loading="lazy"
                                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 28vw, 220px"
                                    className="object-cover object-top"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ boxShadow: "inset 0 0 35px 5px rgba(0,0,0,0.12)" }}
                                />
                            </div>

                            <div className="floating-card absolute -right-3 bottom-3 sm:-right-6 sm:bottom-4 z-20 cursor-default">
                                <div className="flex items-center gap-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-xl p-2.5 pr-4">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                                        <BarChart2 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                            Analytics Stack
                                        </p>
                                        <p className="text-xs sm:text-sm font-extrabold text-slate-950 whitespace-nowrap">
                                            Power BI · SQL · Python
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Lightbox Modal */}
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
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-2 cursor-pointer"
                            onClick={() => setIsImageOpen(false)}
                            aria-label="Close image preview"
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
