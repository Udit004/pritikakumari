"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import type { ContactAnimationStatus } from "./contact-animation";

interface ContactFormProps {
  itemVariants: Variants;
  onStatusChange?: (status: ContactAnimationStatus) => void;
}

export function ContactForm({ itemVariants, onStatusChange }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    onStatusChange?.("sending");

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
          trackEvent("submit_contact_form", { success: false, error: result.message || "Unknown error" });
          throw new Error(
            result.message || "Something went wrong while sending the message.",
          );
        }

        trackEvent("submit_contact_form", { success: true });
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

      onStatusChange?.("success");
      form.reset();
    } catch (error) {
      onStatusChange?.("idle");
      if (error instanceof Error) {
        return;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="flex-1"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
        {/* Honeypot field */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />

        {/* Name and Email fields */}
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
            className="w-full rounded-2xl border border-emerald-200/50 bg-slate-50/50 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-slate-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
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
            className="w-full rounded-2xl border border-emerald-200/50 bg-slate-50/50 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-slate-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Subject field */}
        <label className="sr-only" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="Subject"
          required
          className="w-full rounded-2xl border border-emerald-200/50 bg-slate-50/50 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-slate-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />

        {/* Message textarea */}
        <label className="sr-only" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Write your message here..."
          rows={5}
          required
          className="w-full rounded-2xl border border-emerald-200/50 bg-slate-50/50 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-slate-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-slate-950 hover:bg-emerald-950 px-6 py-4 text-sm sm:text-base font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          <span className="text-emerald-400">{isSubmitting ? "Sending..." : "Send Message"}</span>
          <Send className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
        </button>
      </form>
    </motion.div>
  );
}
