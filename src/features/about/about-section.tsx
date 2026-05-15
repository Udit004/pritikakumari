"use client";

import { useRef } from "react";
import { aboutData } from "./data";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { BarChart2 } from "lucide-react";
// import { AboutCanvas } from "./about-canvas";

/* ─────────────────────────────────────────────────────────────
   Framer Motion variants
   Same easing curve [0.22, 1, 0.36, 1] used throughout hero.
───────────────────────────────────────────────────────────── */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */
export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

    const paragraphs = aboutData.summary.split("\n\n");

    return (
        <section
            id="about"
            ref={sectionRef}
            className="group/about relative w-full min-h-dvh lg:h-dvh lg:min-h-175 flex items-center justify-center overflow-hidden pt-24 pb-12 lg:py-0"
        >
            {/* ── CSS keyframes (scoped with prefix) ── */}
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


            {/* ── Radial depth tint — reinforces canvas blur ── */}
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

                {/* ════════════════════════════════════════════
                    LEFT — Text content
                ════════════════════════════════════════════ */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col justify-center w-full order-2 lg:order-1 flex-1 lg:h-full z-20"
                >
                    {/* Badge — identical tokens to hero badge */}
                    <motion.div variants={fadeUp} className="w-fit">
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-200/80 bg-green-50/50 backdrop-blur-md mt-4 px-4 py-1.5 shadow-sm transition-all hover:bg-green-100/50">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="about-badge-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                                About Me
                            </p>
                        </div>
                    </motion.div>

                    {/* Heading — same scale & gradient as hero h1 */}
                    <motion.div variants={fadeUp} className="mt-4">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 drop-shadow-sm">
                            <span className="text-4xl font-bold tracking-tight" style={{ color: "#fffff" }}>
                                Who I Am
                            </span>
                        </h2>
                    </motion.div>

                    {/* Summary — first paragraph bold, rest regular (from aboutData) */}
                    <div className="mt-5 space-y-4 max-w-lg">
                        {paragraphs.map((p, i) => (
                            <motion.p
                                key={i}
                                variants={fadeUp}
                                className={`text-base sm:text-lg leading-relaxed font-medium ${
                                    i === 0
                                        ? "text-slate-900 font-semibold"
                                        : "text-slate-600"
                                }`}
                            >
                                {p}
                            </motion.p>
                        ))}
                    </div>

                    {/* ── Stats row — profile facts, not skills ──
                        Same layout pattern used in hero stats row.
                        Uses heroData.stats so the source of truth stays in data.ts. */}
                    <motion.div
                        variants={fadeUp}
                        className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-200/80 pt-6"
                    >
                        {/* {heroData.stats.map((stat, idx) => {
                            const Icon = STAT_ICONS[idx] ?? Briefcase;
                            return (
                                <div key={idx} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-600 shrink-0">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                                        {stat.label}
                                    </span>
                                </div>
                            );
                        })} */}
                    </motion.div>
                </motion.div>

                {/* ════════════════════════════════════════════
                    RIGHT — Circular image with layered effects
                ════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, x: 38, scale: 0.97 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex w-full h-[44vh] sm:h-[50vh] lg:h-[78vh] items-center justify-center order-1 lg:order-2"
                >
                    <div className="relative flex items-center justify-center">

                        {/* ── Layer 1: Ambient glow (breathes slowly) ── */}
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

                        {/* ── Layer 2: Spinning conic-gradient ring ── */}
                        <div
                            aria-hidden="true"
                            className="about-ring-spin absolute rounded-full pointer-events-none"
                            style={{
                                inset: "-5px",
                                background:
                                    "conic-gradient(from 0deg, #10b981 0%, #6ee7b7 28%, #d1fae5 48%, #f0fdf4 52%, #d1fae5 56%, #6ee7b7 72%, #10b981 100%)",
                            }}
                        />

                        {/* ── Layer 3: Slate-50 gap — clean separator between ring & image ── */}
                        <div
                            aria-hidden="true"
                            className="absolute rounded-full bg-slate-50 pointer-events-none"
                            style={{ inset: "-1.5px" }}
                        />

                        {/* ── Layer 4: Circular image ── */}
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
                            {/* Photographic inner vignette for depth */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 rounded-full pointer-events-none"
                                style={{ boxShadow: "inset 0 0 38px 7px rgba(0,0,0,0.10)" }}
                            />
                        </div>

                        {/* ── Floating glassmorphic card: top-left ──
                            Exact same tokens as hero's floating tag:
                            bg-white/70 backdrop-blur-md border border-white/50 shadow-xl */}
                        {/* <motion.div
                            initial={{ opacity: 0, x: -14, y: 10 }}
                            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.60, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden sm:flex absolute -left-8 top-[13%] lg:-left-14 z-20 cursor-default"
                        >
                            <div className="flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/50 shadow-xl p-3 pr-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider tabular-nums">
                                        Specialization
                                    </p>
                                    <p className="text-sm font-extrabold text-slate-900 whitespace-nowrap">
                                        HR Analytics
                                    </p>
                                </div>
                            </div>
                        </motion.div> */}

                        {/* ── Floating glassmorphic card: bottom-right ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 14, y: 10 }}
                            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden sm:flex absolute -right-8 bottom-[11%] lg:-right-14 z-20 cursor-default"
                        >
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
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}