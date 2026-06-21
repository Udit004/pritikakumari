"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  return (
    <div className="relative w-full overflow-hidden py-16 sm:py-20">
      {/* Subtle ambient glows */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(167,243,208,0.35) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(167,243,208,0.2) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "#10b981" }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ color: "#059669" }}
              >
                Certifications
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Professional Certifications <br className="hidden lg:block" />& Learning Journey
            </motion.h2>

            {/* Underline accent */}
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-[3px] w-14 rounded-full"
                style={{ background: "linear-gradient(90deg, #10b981, #a7f3d0)" }}
                initial={{ scaleX: 0, originX: "0%" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.32 }}
              />
              <motion.div
                className="h-[3px] w-5 rounded-full"
                style={{ background: "rgba(16,185,129,0.2)" }}
                initial={{ scaleX: 0, originX: "0%" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base max-w-xl"
              style={{ color: "#4b5563", lineHeight: "1.8" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              A collection of my professional certifications and continuous learning achievements that strengthen my expertise in HR Operations, Analytics and Compliance.
            </motion.p>
          </div>

          {/* Right Side: Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/assests/images/certifications/HeaderImage.png"
                alt="Certifications and Learning Journey"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
