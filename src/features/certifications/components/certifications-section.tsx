"use client";

import React from "react";
import Header from "./Header";
import CertificateList from "./CertificateList";
import { useSectionTracking } from "@/hooks/useSectionTracking";

export function CertificationsSection() {
  useSectionTracking("certificates");

  return (
    <section
      id="certificates"
      className="scene-section relative w-full min-h-[100svh] py-16 lg:py-24 overflow-x-clip"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45, 90, 108, 0.2) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        <Header />
        <CertificateList />
      </div>
    </section>
  );
}
