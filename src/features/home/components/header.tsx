"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { UserRound, Menu, X } from "lucide-react";

export function Header() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = useMemo(
        () => [
            { label: "Home", href: "#hero", id: "hero" },
            { label: "About", href: "#about", id: "about" },
            { label: "Skills", href: "#skills", id: "skills" },
            { label: "Experience", href: "#experience", id: "experience" },
            { label: "Projects", href: "#projects", id: "projects" },
            { label: "Education", href: "#education", id: "education" },
            { label: "Resume", href: "#resume", id: "resume" },
            // { label: "Contact", href: "#contact", id: "contact" },
        ],
        []
    );

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observedIds = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            {
                root: null,
                threshold: [0.15, 0.35, 0.6],
                rootMargin: "-18% 0px -45% 0px",
            }
        );

        const observeSections = () => {
            navLinks.forEach((link) => {
                const element = document.getElementById(link.id);
                if (element && !observedIds.has(link.id)) {
                    observer.observe(element);
                    observedIds.add(link.id);
                }
            });
        };

        observeSections();

        const mutationObserver = new MutationObserver(() => {
            observeSections();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        const syncFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && navLinks.some((link) => link.id === hash)) {
                setActiveSection(hash);
            }
        };

        window.addEventListener("hashchange", syncFromHash);
        syncFromHash();

        return () => {
            window.removeEventListener("hashchange", syncFromHash);
            mutationObserver.disconnect();
            observer.disconnect();
        };
    }, [navLinks]);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 pt-2`}>
            <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300`}>
                <div className={`flex items-center justify-between rounded-full border transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-slate-200/60 shadow-lg shadow-slate-200/20 px-4 py-2 sm:px-6' : 'bg-transparent border-transparent px-2 sm:px-4 py-2'}`}>

                    {/* Logo */}
                    <Link href="#hero" onClick={() => setActiveSection("hero")} className="flex items-center gap-3 group">
                        <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm border border-slate-100">
                            <Image src="/assests/images/logo.png" alt="Logo" width={40} height={40} className="object-cover" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Pritika Kumari</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">HR Professional</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={`hidden lg:flex items-center rounded-full px-2 py-1.5 transition-all duration-500 ${isScrolled ? 'bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 shadow-sm' : 'bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm'}`} aria-label="Primary navigation">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => setActiveSection(link.id)}
                                    className={`
                                        relative px-4 py-2 text-[13px] font-semibold transition-all duration-300 rounded-full
                                        ${isActive
                                            ? "text-emerald-400 bg-black shadow-sm"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                                        }
                                    `}
                                >
                                    <span className={`${isActive ? "text-emerald-400":"text-black"}`}>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop CTA & Mobile Toggle */}
                    <div className="flex items-center gap-2 lg:gap-0">
                        <Link
                            href="#contact"
                            onClick={() => setActiveSection("contact")}
                            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold tracking-wide text-white transition-all hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5"
                        >
                            <UserRound className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                            <span className="text-emerald-400">Connect</span>
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden inline-flex items-center justify-center rounded-full p-2.5 transition-colors ${isMobileMenuOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-700 bg-white/50 backdrop-blur-md shadow-sm border border-slate-200 hover:bg-white'}`}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <nav
                className={`fixed right-0 top-0 z-50 h-dvh w-70 bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-label="Mobile navigation"
            >
                <div className="flex shrink-0 items-center justify-between px-6 py-5 border-b border-slate-100">
                    <p className="text-sm font-bold tracking-wide text-slate-900 uppercase">Menu</p>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="rounded-full p-2 -mr-2 text-slate-500 hover:bg-slate-100 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-1.5 p-6 overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => {
                                    setActiveSection(link.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`
                                px-4 py-3.5 text-sm font-semibold transition-all duration-200 rounded-xl
                                ${isActive
                                        ? "text-emerald-800 bg-emerald-50 border border-emerald-100/50"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                                    }
                            `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50">
                    <Link
                        href="#contact"
                        onClick={() => {
                            setActiveSection("contact");
                            setIsMobileMenuOpen(false);
                        }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold transition hover:bg-slate-800 hover:shadow-md"
                        style={{ color: '#ffffff' }}
                    >
                        <UserRound className="h-4 w-4 text-emerald-400" />
                        <span style={{ color: '#ffffff' }} className="text-green-700">Let&apos;s Connect</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
