"use client";

import Link from "next/link";
import { contactData } from "./data";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-accent-primary py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
              Let's Connect
            </p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              {contactData.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              {contactData.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 pt-6">
            <div className="space-y-2">
              <p className="text-sm text-white/80">Email me directly</p>
              <a
                href={contactData.links.email}
                className="inline-flex rounded-lg bg-white px-6 py-3 text-lg font-semibold text-accent-primary transition hover:shadow-lg"
              >
                {contactData.email}
              </a>
            </div>

            <div className="h-px w-12 bg-white/30" />

            <div className="space-y-3">
              <p className="text-sm text-white/80">Or connect with me on</p>
              <div className="flex gap-4">
                <Link
                  href={contactData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg border border-white bg-transparent px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  LinkedIn
                </Link>
                <a
                  href={contactData.links.email}
                  className="inline-flex rounded-lg border border-white bg-transparent px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-sm text-white/70">
              📍 {contactData.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
