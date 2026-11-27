"use client";

import { contactData } from "./data";
import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";
import { ContactAnimation, type ContactAnimationStatus } from "./contact-animation";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { trackEvent } from "@/lib/analytics";
import { useSound } from "@/components/SoundProvider";
import { useState } from "react";

export function ContactSection() {
  const { play } = useSound();
  const [animationStatus, setAnimationStatus] = useState<ContactAnimationStatus>("idle");

  useSectionTracking("contact");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail":
        return <Mail className="h-6 w-6" />;
      case "Phone":
        return <Phone className="h-6 w-6" />;
      case "MapPin":
        return <MapPin className="h-6 w-6" />;
      case "Linkedin":
        return <LinkIcon className="h-6 w-6" />;
      default:
        return <Mail className="h-6 w-6" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="contact"
      className="scene-section relative w-full min-h-[100svh] flex flex-col justify-center py-20 lg:py-28"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-10 w-96 h-72 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(16, 185, 129, 0.4) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-80 h-60 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 100% 100%, rgba(45, 90, 108, 0.3) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header - heading text on left, DotLottie animation on right */}
        <div className="mb-12 lg:mb-16 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shrink-0">
          <motion.div
            className="flex-1 space-y-6 text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Get In Touch
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              {contactData.title}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <div className="w-5 h-1 rounded-full bg-emerald-200" />
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Available for full-time HR executive roles, consulting inquiries, and talent operational opportunities. Reach out via direct message or email.
            </p>
          </motion.div>

          <motion.div
            className="flex-1 w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactAnimation
              status={animationStatus}
              onSuccessComplete={() => setAnimationStatus("idle")}
            />
          </motion.div>
        </div>

        {/* Centered Contact Form with Animated Rotating Emerald Border Glow */}
        <motion.div
          className="mx-auto w-full max-w-2xl shrink-0"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="emerald-glow-wrapper">
            <div className="emerald-glow-border">
              <div className="emerald-glow-surface p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div className="mb-6 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-sans">
                    Send a Direct Message
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Leave your details below and I will respond within 24 hours.
                  </p>
                </div>
                <ContactForm
                  itemVariants={itemVariants}
                  onStatusChange={setAnimationStatus}
                />
              </div>
            </div>
          </div>

          {/* Icon-only Contact Links below the form */}
          <motion.div
            className="mt-9 flex items-center justify-center gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contactData.contacts.map((contact) => {
              const iconBox = (
                <span className="group relative flex p-[1.5px] rounded-2xl bg-gradient-to-br from-emerald-400/70 via-teal-300/30 to-emerald-500/70 shadow-[0_6px_20px_-6px_rgba(16,185,129,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.5)]">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-[calc(1rem-1.5px)] bg-gradient-to-b from-slate-900 to-slate-950 text-emerald-400 overflow-hidden">
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/45 to-transparent" />
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-emerald-300">
                      {getIcon(contact.icon)}
                    </span>
                  </span>
                </span>
              );

              return (
                <motion.div key={contact.type} variants={itemVariants}>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      target={contact.icon === "Linkedin" ? "_blank" : undefined}
                      rel={contact.icon === "Linkedin" ? "noopener noreferrer" : undefined}
                      aria-label={`${contact.type}: ${contact.value}`}
                      title={`${contact.type}: ${contact.value}`}
                      onClick={() => {
                        play("nav");
                        trackEvent("click_contact_link", { type: contact.type, section: "contact" });
                      }}
                      className="inline-block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                    >
                      {iconBox}
                    </a>
                  ) : (
                    <div
                      role="img"
                      aria-label={`${contact.type}: ${contact.value}`}
                      title={`${contact.type}: ${contact.value}`}
                      className="inline-block cursor-default"
                    >
                      {iconBox}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
