"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { contactData } from "./data";
import { Mail, Phone, MapPin, Link as LinkIcon, Send } from "lucide-react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail": return <Mail className="h-5 w-5 text-foreground" />;
      case "Phone": return <Phone className="h-5 w-5 text-foreground" />;
      case "MapPin": return <MapPin className="h-5 w-5 text-foreground" />;
      case "Linkedin": return <LinkIcon className="h-5 w-5 text-foreground" />;
      default: return <Mail className="h-5 w-5 text-foreground" />;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
    };

    try {
      const submission = fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then(async (response) => {
        const result = (await response.json().catch(() => ({}))) as { message?: string };

        if (!response.ok) {
          throw new Error(
            result.message || "Something went wrong while sending the message.",
          );
        }

        return result.message || "Your message has been sent successfully.";
      });

      await toast.promise(submission, {
        loading: "Sending your message...",
        success: (message) => message,
        error: (error) =>
          error instanceof Error
            ? error.message
            : "Could not send your message right now. Please try again later.",
      });

      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        return;
      }
    } finally {
      setIsSubmitting(false);
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="sr-only" htmlFor="contact-name">
                Your Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
              />
              <label className="sr-only" htmlFor="contact-email">
                Your Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
              />
            </div>
            <label className="sr-only" htmlFor="contact-subject">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="Subject"
              required
              className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
            />
            <label className="sr-only" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  );
}
