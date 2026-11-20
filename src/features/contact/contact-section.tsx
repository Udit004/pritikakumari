"use client";

import { contactData } from "./data";
import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import { useSound } from "@/components/SoundProvider";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactSection() {
  const { play } = useSound();
  const sectionRef = useRef<HTMLElement>(null);
  const headerImgRef = useRef<HTMLDivElement>(null);

  useSectionTracking("contact");

  useGSAP(() => {
    if (headerImgRef.current) {
      gsap.to(headerImgRef.current, {
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail":
        return <Mail className="h-6 w-6 text-emerald-400" />;
      case "Phone":
        return <Phone className="h-6 w-6 text-emerald-400" />;
      case "MapPin":
        return <MapPin className="h-6 w-6 text-emerald-400" />;
      case "Linkedin":
        return <LinkIcon className="h-6 w-6 text-emerald-400" />;
      default:
        return <Mail className="h-6 w-6 text-emerald-400" />;
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
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
        {/* Header - styled consistently with Project, Experience, and Skills sections */}
        <div className="mb-12 lg:mb-16 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shrink-0">
          <div className="flex-1 space-y-6 text-left">
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
          </div>

          {/* Header image - matching Project section image size */}
          <div
            ref={headerImgRef}
            className="flex-1 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/assests/images/contact/contact_headerImage.png"
                alt="Contact Communication Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Contact Split Columns - expanded horizontally and vertically */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch shrink-0">
          {/* Left Column: Direct channels (5 cols) */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contactData.contacts.map((contact) => (
              <motion.div
                key={contact.type}
                className="relative bg-white rounded-3xl border border-emerald-200/50 shadow-sm overflow-hidden group p-5 sm:p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
                variants={itemVariants}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-emerald-400 shadow-sm">
                    {getIcon(contact.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {contact.type}
                    </span>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        target={contact.icon === "Linkedin" ? "_blank" : undefined}
                        rel={contact.icon === "Linkedin" ? "noopener noreferrer" : undefined}
                        onClick={() => {
                          play("nav");
                          trackEvent("click_contact_link", { type: contact.type, section: "contact" });
                        }}
                        className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors truncate block"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base font-bold text-slate-900 block">
                        {contact.value}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-emerald-200/50 p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-sans">
                Send a Direct Message
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Leave your details below and I will respond within 24 hours.
              </p>
            </div>
            <ContactForm itemVariants={itemVariants} />
          </div>
        </div>
      </div>
    </section>
  );
}
