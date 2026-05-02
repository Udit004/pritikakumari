"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { UserRound, Menu, X } from "lucide-react";

export function Header() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = useMemo(
        () => [
            { label: "Home", href: "#hero", id: "hero" },
            { label: "About", href: "#about", id: "about" },
            { label: "Experience", href: "#experience", id: "experience" },
            { label: "Skills", href: "#skills", id: "skills" },
            { label: "Projects", href: "#projects", id: "projects" },
            { label: "Education", href: "#education", id: "education" },
            { label: "Contact", href: "#contact", id: "contact" },
        ],
        []
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visibleEntry?.target.id) {
                    setActiveSection(visibleEntry.target.id);
                }
            },
            {
                root: null,
                threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
                rootMargin: "-18% 0px -62% 0px",
            }
        );

        navLinks.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [navLinks]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(17,24,39,0.04)]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="#" className="flex items-center gap-3">
                    <Image src="/assests/images/logo.png" alt="Logo" width={40} height={40} />

                    <div>
                        <p className="text-sm font-bold text-foreground">Pritika Kumari</p>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-800">HR Professional</p>
                    </div>
                </Link>

                {/* ── Desktop Navigation ── */}
                <nav
                    className="hidden lg:flex items-center gap-1"
                    aria-label="Primary navigation"
                >
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <Link
                                key={link.id}
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`
                                    relative px-4 py-2 text-sm font-medium transition-colors duration-150
                                    ${isActive
                                        ? "text-gray-900"
                                        : "text-gray-500 hover:text-gray-900"
                                    }
                                `}
                            >
                                {link.label}

                                {/* Green underline indicator – matches the image exactly */}
                                <span
                                    className={`
                                        absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-green-500
                                        transition-all duration-200
                                        ${isActive ? "w-2/3 opacity-100" : "w-0 opacity-0"}
                                    `}
                                    aria-hidden="true"
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden inline-flex items-center justify-center rounded-lg p-2.5 text-gray-900 hover:bg-gray-100 transition"
                    aria-label="Toggle mobile menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    )}
                </button>

                {/* CTA Button – Desktop */}
                <Link
                    href="#contact"
                    className="hidden lg:inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-900 hover:shadow-lg hover:scale-105"
                >
                    <UserRound className="h-4 w-4 text-white" aria-hidden="true" />
                    <span className="text-white">Let&apos;s Connect</span>
                </Link>
            </div>


            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <nav
                    className="fixed right-0 top-18.25 z-40 h-[calc(100vh-73px)] w-72 border-l border-border/70 bg-white shadow-md lg:hidden"
                    aria-label="Mobile navigation"
                >
                    <div className="flex flex-col gap-1 px-4 py-4">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`
                                    relative px-4 py-3 text-sm font-medium transition-colors duration-150 rounded-lg
                                    ${isActive
                                            ? "text-gray-900 bg-gray-100"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                        }
                                `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {/* Mobile CTA Button */}
                        <Link
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-900"
                        >
                            <UserRound className="h-4 w-4 text-white" aria-hidden="true" />
                            <span className="text-white">Let&apos;s Connect</span>
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}
