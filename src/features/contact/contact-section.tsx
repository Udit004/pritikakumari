"use client";

import { contactData } from "./data";
import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail": return <Mail className="h-5 w-5 text-emerald-600" />;
      case "Phone": return <Phone className="h-5 w-5 text-emerald-600" />;
      case "MapPin": return <MapPin className="h-5 w-5 text-emerald-600" />;
      case "Linkedin": return <LinkIcon className="h-5 w-5 text-emerald-600" />;
      default: return <Mail className="h-5 w-5 text-emerald-600" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden py-20 md:py-28 scroll-mt-24">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute top-0 left-0 w-96 h-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(ellipse at 0% 0%, rgba(16, 185, 129, 0.4) 0%, transparent 65%)",
          }}
        />
        {/* Bottom-right glow */}
        <div className="absolute bottom-0 right-0 w-80 h-60 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(ellipse at 100% 100%, rgba(16, 185, 129, 0.3) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 space-y-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 border border-emerald-500/25">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Contact
            </p>
          </div>
          <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#064e3b" }}>
            {contactData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
            <div className="w-5 h-1 rounded-full bg-emerald-200" />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Contact Info */}
          <motion.div
            className="flex-1 space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {contactData.contacts.map((contact, idx) => (
              <motion.div
                key={contact.type}
                className="relative bg-white rounded-2xl border border-emerald-200/30 shadow-sm overflow-hidden group p-5 transition-all hover:shadow-md hover:-translate-y-1"
                variants={itemVariants}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/25">
                    {getIcon(contact.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-slate-900">
                      {contact.type}
                    </span>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        target={contact.icon === "Linkedin" ? "_blank" : undefined}
                        rel={contact.icon === "Linkedin" ? "noopener noreferrer" : undefined}
                        className="text-sm text-gray-600 hover:text-emerald-600 transition-colors truncate block mt-1"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-600 block mt-1">{contact.value}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Form */}
          <ContactForm itemVariants={itemVariants} />
        </div>
      </div>
    </section>
  );
}
