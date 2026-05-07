import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ExternalLink, ArrowUpRight, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pritika-kumari-a68192376",
    icon: ExternalLink,
    description: "Professional Profile",
  },
  {
    label: "Email",
    href: "mailto:pritikakumaree96@gmail.com",
    icon: Mail,
    description: "pritikakumaree96@gmail.com",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950">
      {/* ── Ambient Glow Layer ── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-600/8 blur-[80px]" />
        <div className="absolute right-0 top-1/2 h-48 w-48 rounded-full bg-green-500/6 blur-[60px]" />
        {/* Subtle dot-grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:22px_22px]" />
      </div>

      {/* ── Top Divider: Green Glow Line ── */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* ── Hero Brand Strip ── */}
      <div className="relative z-10 border-b border-white/5 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          {/* Logo + Name */}
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
            <div className="relative">
              {/* Glow ring behind logo */}
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md" />
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-emerald-500/30 bg-white shadow-lg shadow-emerald-500/10">
                <Image
                  src="/assests/images/logo.png"
                  alt="Pritika Kumari Logo"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Pritika Kumari
              </h2>
              <p className="mt-0.5 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-400">
                HR Operations Professional
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className="max-w-sm text-sm leading-relaxed text-slate-400 lg:text-right">
            Transforming workplaces through{" "}
            <span className="font-semibold text-emerald-400">data-driven HR</span>,
            strategic recruitment, and people-first operations.
          </p>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Column 1 — Quick Links */}
          <div>
            <h4 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span className="h-px w-5 bg-emerald-500/60" />
              Navigate
            </h4>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 py-1.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:text-white"
                  >
                    <span className="h-px w-0 bg-emerald-400 text-slate-200 hover:text-white transition-all duration-300 group-hover:w-4" />
                    <span className="text-slate-500 hover:text-white">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Connect */}
          <div>
            <h4 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span className="h-px w-5 bg-emerald-500/60" />
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href, icon: Icon, description }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/3 p-3 transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-200 flex items-center gap-1">
                        {label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">{description}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Location + CTA */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span className="h-px w-5 bg-emerald-500/60" />
              Location
            </h4>

            {/* Location card */}
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-white/5 bg-white/3 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">Noida, Uttar Pradesh</p>
                <p className="mt-0.5 text-xs text-slate-500">India · Open to opportunities</p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-400 hover:shadow-emerald-400/30 hover:-translate-y-0.5"
            >
              Get In Touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-slate-600">
            © {currentYear} Pritika Kumari. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-600">
            Crafted with
            <Heart className="h-3 w-3 fill-emerald-500 text-emerald-500" aria-hidden="true" />
            for HR excellence &amp; professional growth.
          </p>
        </div>
      </div>
    </footer>
  );
}