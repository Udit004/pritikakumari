"use client";

import { contactData } from "./data";
import { Mail, Phone, MapPin, Link as LinkIcon, Send } from "lucide-react";

export function ContactSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail": return <Mail className="h-5 w-5 text-foreground" />;
      case "Phone": return <Phone className="h-5 w-5 text-foreground" />;
      case "MapPin": return <MapPin className="h-5 w-5 text-foreground" />;
      case "Linkedin": return <LinkIcon className="h-5 w-5 text-foreground" />;
      default: return <Mail className="h-5 w-5 text-foreground" />;
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden py-24 sm:py-28 scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="mb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-md bg-accent-primary/10 px-3 py-1">
            <Mail className="h-4 w-4 text-accent-primary" />
            <p className="text-xs font-bold uppercase tracking-wider text-accent-primary">
              Contact
            </p>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          {contactData.title}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Contact Info */}
        <div className="flex-1 space-y-6">
          {contactData.contacts.map((contact) => (
            <div key={contact.type} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-secondary border border-border">
                {getIcon(contact.icon)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {contact.type}
                </span>
                {contact.link ? (
                  <a
                    href={contact.link}
                    target={contact.icon === "Linkedin" ? "_blank" : undefined}
                    rel={contact.icon === "Linkedin" ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted hover:text-accent-primary transition-colors truncate max-w-62.5 sm:max-w-none"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span className="text-sm text-muted">{contact.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Form */}
        <div className="flex-1">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  );
}
