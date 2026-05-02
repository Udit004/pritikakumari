"use client";

import Link from "next/link";
import { heroData } from "./data";
import { UserCheck, FileText, Mail, Briefcase, Users, BarChart2, ExternalLink } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    return (
        <section
            id="hero"
            className="relative pt-14 pb-12 overflow-hidden bg-white"
        >
            {/* Subtle background blobs */}
            <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-green-200/10 blur-3xl" />
            </div>

            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] items-center">

                    {/* ── Left Content ── */}
                    <div className="flex flex-col justify-center space-y-8 relative z-10">

                        {/* Badge */}
                        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
                            <UserCheck className="h-5 w-5 text-green-600" />
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green-600">
                                HR Operations Professional
                            </p>
                        </div>

                        {/* Heading */}
                        <div className="space-y-3">
                            <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
                                {heroData.name}
                            </h1>
                            <p className="text-xl font-semibold text-green-600">{heroData.title}</p>
                            {/* Underline accent */}
                            <div className="flex items-center gap-2 pt-1">
                                <div className="h-[3px] w-16 rounded-full bg-green-500" />
                                <div className="h-[3px] w-2 rounded-full bg-green-300" />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 text-lg leading-8 text-gray-700">
                            <p className="font-bold text-black">{heroData.subtitle}</p>
                            <p className="text-base text-gray-600">{heroData.description}</p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4">
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:scale-105"
                            >
                                <FileText className="h-4 w-4 text-white" />
                                <span className="text-white">{heroData.cta.primary}</span>
                            </Link>
                            <Link
                                href={heroData.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-600 bg-white px-6 py-3 text-sm font-semibold text-green-600 transition hover:bg-green-50"
                            >
                                <ExternalLink className="h-4 w-4" />
                                {heroData.cta.secondary}
                            </Link>
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                            >
                                <Mail className="h-4 w-4" />
                                {heroData.cta.tertiary}
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col gap-4 pt-8 sm:flex-row">
                            {heroData.stats.map((stat, idx) => {
                                const StatIcons = [Briefcase, Users, BarChart2];
                                const Icon = StatIcons[idx] ?? Briefcase;
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                    >
                                        <Icon className="h-8 w-8 text-green-600 shrink-0" />
                                        <div>
                                            <p className="text-lg font-bold text-black">{stat.value}</p>
                                            <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Right Image ── */}
                    <div className="relative flex items-end justify-center h-full min-h-[520px]">
                        {/* ── Person image (sits on top of the circle) ── */}
                        <div className="relative z-10 w-full flex justify-center items-end">
                            <Image
                                src="/assests/images/hero_Image2.png"
                                alt={`${heroData.name} - Hero Image`}
                                width={560}
                                height={640}
                                priority
                                className="object-contain object-bottom rounded-lg"
                                style={{
                                    maxHeight: "80vh",
                                    width: "auto",
                                }}
                            />
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}