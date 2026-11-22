"use client";

import { useState, useRef } from "react";
import CertificateListCard from "./CertificateListCard";
import DetailCertificate from "./DetailCertificate";
import MobileCertificatesDeck from "./MobileCertificatesDeck";
import {
  LayoutDashboard,
  Users,
  Calculator,
  ShieldCheck,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
  "All Certificates",
  "HR Management",
  "Payroll",
  "Tools & Technology",
];

export interface CertificateItem {
  title: string;
  platform: string;
  year: string;
  category: string;
  tag: string;
  image: string;
  icon: React.ReactNode;
  url: string;
  Skills: string[];
  Description: string;
}

const certificatesData: CertificateItem[] = [
  {
    title: "Excel from Beginner to Advanced",
    platform: "Udemy",
    year: "2025",
    category: "Tools & Technology",
    tag: "Excel",
    image: "/assests/images/certifications/MicrosoftExcel.png",
    icon: <FileSpreadsheet size={24} />,
    url: "https://www.udemy.com/certificate/UC-4ba82390-7b87-4bad-9a8b-b674d950e6eb/",
    Skills: ["Excel Functions", "Data Analysis", "Pivot Tables", "Charts", "Dashboards"],
    Description:
      "Comprehensive course covering Excel essentials to advanced level including formulas, data analysis, pivot tables, charts and dashboard creation.",
  },
  {
    title: "Microsoft Power BI Desktop for Business Intelligence",
    platform: "Udemy",
    year: "2025",
    category: "Tools & Technology",
    tag: "Power BI",
    image: "/assests/images/certifications/MicrosoftPowerBI.jpeg",
    icon: <LayoutDashboard size={24} />,
    url: "https://www.udemy.com/certificate/UC-a48ce599-073b-4460-600-984547266cf/",
    Skills: ["Power BI", "Data Analysis", "Data Visualization", "DAX", "Business Intelligence"],
    Description:
      "Master data analysis and visualization using Power BI, create compelling dashboards, and leverage DAX for advanced business intelligence.",
  },
  {
    title: "Ultimate HR Generalist: Certified Human Resource Management",
    platform: "Udemy",
    year: "2026",
    category: "HR Management",
    tag: "HR Management",
    image: "/assests/images/certifications/HRGeneralist.png",
    icon: <Users size={24} />,
    url: "https://www.udemy.com/certificate/UC-a1c4fe0f-1fc5-4c18-a21d-b6e106861884/",
    Skills: ["HR Generalist", "HR Management", "Recruitment", "Employee Relations", "Performance Management"],
    Description:
      "Comprehensive HR training covering recruitment, employee relations, performance management, HR policies, and legal compliance.",
  },
  {
    title: "A Complete Guide to Indian Payroll Management [2023-24]",
    platform: "Udemy",
    year: "2026",
    category: "Payroll",
    tag: "Payroll",
    image: "/assests/images/certifications/IndianPayrollManagement.png",
    icon: <Calculator size={24} />,
    url: "https://www.udemy.com/certificate/UC-3e11e473-7f86-45f8-afc3-717138281614/",
    Skills: ["Indian Payroll Management", "TDS", "Payroll", "Compliance"],
    Description:
      "Comprehensive guide to Indian payroll management including TDS calculation, compliance, and regulatory requirements.",
  },
  {
    title: "TDS for Indian Payroll - For Professionals",
    platform: "Udemy",
    year: "2026",
    category: "Payroll",
    tag: "Payroll",
    image: "/assests/images/certifications/TDSPayroll.png",
    icon: <ShieldCheck size={24} />,
    url: "https://www.udemy.com/certificate/UC-634fab80-1bd3-493a-afc9-629fbd8fede0/",
    Skills: ["TDS for Indian Payroll", "TDS", "Payroll", "Compliance"],
    Description:
      "Learn TDS for Indian Payroll, master TDS calculation, compliance, and regulatory requirements for professionals.",
  },
  {
    title: "Diploma in Labour Laws and Statutory Compliances (new Codes)",
    platform: "Udemy",
    year: "2026",
    category: "Labour Laws",
    tag: "Labour Laws",
    image: "/assests/images/certifications/LabourLaws.png",
    icon: <ShieldCheck size={24} />,
    url: "https://www.udemy.com/certificate/UC-1c69f724-3d8f-4c36-963b-44f483c3c1af/",
    Skills: [
      "Labour Laws",
      "Statutory Compliance",
      "New Labour Codes",
      "Employment Laws",
    ],
    Description:
      "Learn Indian labour laws and statutory compliance requirements, including the new labour codes, employment regulations, and key compliance obligations for professionals.",
  },
];

export default function CertificateList() {
  const [activeCategory, setActiveCategory] = useState("All Certificates");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const streamSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const filteredCertificates = certificatesData.filter(
    (cert) => activeCategory === "All Certificates" || cert.category === activeCategory
  );

  const isScrollable = filteredCertificates.length > 2;

  // Compute maximum travel distance dynamically to handle all screen resolutions
  const getMaxTravel = () => {
    if (!trackRef.current || !streamSectionRef.current) return 1200;
    const travel = trackRef.current.scrollWidth - streamSectionRef.current.offsetWidth + 120;
    return Math.max(800, travel);
  };

  // For Left-to-Right motion:
  // Card 1 is at the start (x = -maxTravel). As track moves to the right,
  // Card 2, 3, 4, 5, 6 slide in from the left and travel across to the right.
  const displayCertificates = isScrollable
    ? [...filteredCertificates].reverse()
    : filteredCertificates;

  useGSAP(
    () => {
      if (!isScrollable || !trackRef.current || !streamSectionRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop: Smooth Pinned Horizontal Scrub from Left to Right
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const container = streamSectionRef.current;
        if (!track || !container) return;

        // Pinned stage: stops the normal whole website scrolling while cards glide
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "certs-pin",
            trigger: container,
            start: "center center",
            end: "+=1300",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                filteredCertificates.length - 1,
                Math.round(self.progress * (filteredCertificates.length - 1))
              );
              setActiveIndex(idx);
            },
          },
        });

        // Movement from Left to Right:
        // Starts shifted left (-getMaxTravel()) showing Card 01 (Excel).
        // Glides rightward to 0 as you scroll, then unpins and continues website scrolling.
        tl.fromTo(
          track,
          { x: () => -getMaxTravel() },
          {
            x: 0,
            ease: "none",
          }
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [activeCategory, filteredCertificates.length, isScrollable] }
  );

  // Programmatic navigation to card
  const goToCard = (index: number) => {
    const targetIdx = Math.max(0, Math.min(filteredCertificates.length - 1, index));
    setActiveIndex(targetIdx);

    if (typeof window !== "undefined" && window.innerWidth < 1024 && scrollAreaRef.current) {
      const cardWidth = 360;
      scrollAreaRef.current.scrollTo({ left: targetIdx * cardWidth, behavior: "smooth" });
    } else {
      const st = ScrollTrigger.getById("certs-pin");
      if (st && filteredCertificates.length > 1) {
        const progress = targetIdx / (filteredCertificates.length - 1);
        const targetScroll = st.start + (st.end - st.start) * progress;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      } else if (trackRef.current && streamSectionRef.current) {
        const maxTravel = getMaxTravel();
        const progress = targetIdx / Math.max(1, filteredCertificates.length - 1);
        const targetX = -maxTravel + progress * maxTravel;
        gsap.to(trackRef.current, {
          x: targetX,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  const scrollPrev = () => {
    goToCard(activeIndex - 1);
  };

  const scrollNext = () => {
    goToCard(activeIndex + 1);
  };

  const handleMobileScroll = () => {
    if (scrollAreaRef.current) {
      const scrollLeft = scrollAreaRef.current.scrollLeft;
      const cardWidth = 360;
      const idx = Math.min(
        filteredCertificates.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );
      setActiveIndex(idx);
    }
  };

  return (
    <div ref={containerRef} className="w-full py-4 relative">
      {/* Category Filter - Desktop */}
      <div className="hidden md:flex flex-wrap items-center justify-center p-1.5 bg-white border border-emerald-100 shadow-sm rounded-full w-fit mx-auto mb-8 gap-1.5 z-20 relative">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setActiveIndex(0);
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === category
                ? "bg-slate-950 text-white shadow-md scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Filter - Mobile */}
      <div className="md:hidden flex items-start mb-6 px-4 sm:px-6 z-20 relative">
        <div className="relative inline-block w-full max-w-[240px]">
          <select
            value={activeCategory}
            onChange={(e) => {
              setActiveCategory(e.target.value);
              setActiveIndex(0);
            }}
            className="w-full appearance-none bg-white border border-emerald-200 text-slate-900 text-sm font-bold rounded-full px-5 py-2.5 pr-10 shadow-sm focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Mobile View (< 768px): Auto-Moving Domino/Gliding Certificate Carousel ── */}
      <div className="md:hidden w-full">
        <MobileCertificatesDeck
          key={activeCategory}
          certificates={filteredCertificates}
          onSelectCert={(cert) => setSelectedCert(cert)}
        />
      </div>

      {/* ── Desktop & Tablet Showcase Area (>= 768px) ── */}
      <div className="hidden md:block w-full">
        {isScrollable ? (
          /* SINGLE-ROW HORIZONTAL SHOWCASE RIBBON (Movement Left -> Right) */
          <div ref={streamSectionRef} className="relative w-full overflow-hidden py-4">
            {/* Edge Vignette Masks for Soft Dissolve */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-30"
              style={{
                background: "linear-gradient(to right, rgba(245, 243, 240, 1) 0%, rgba(245, 243, 240, 0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-30"
              style={{
                background: "linear-gradient(to left, rgba(245, 243, 240, 1) 0%, rgba(245, 243, 240, 0) 100%)",
              }}
            />

            {/* Directional Tag Pill */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-4 flex items-center justify-end">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-white/80 px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
                <span>Scrolls Left to Right</span>
                <ArrowRight size={13} className="text-emerald-600" />
              </div>
            </div>

            {/* Horizontal Track Container */}
            <div
              ref={scrollAreaRef}
              onScroll={handleMobileScroll}
              className="w-full overflow-x-auto lg:overflow-x-visible no-scrollbar touch-pan-x snap-x snap-mandatory lg:snap-none"
            >
              <div
                ref={trackRef}
                className="flex items-stretch gap-6 lg:gap-8 will-change-transform px-6 sm:px-12"
                style={{ width: "max-content" }}
              >
                {displayCertificates.map((cert, index) => {
                  const originalIndex = filteredCertificates.length - 1 - index;
                  const isCurrent = activeIndex === originalIndex;

                  return (
                    <div
                      key={cert.title}
                      className={`w-[340px] sm:w-[390px] lg:w-[420px] h-[480px] shrink-0 flex flex-col snap-center transition-all duration-500 ${
                        isCurrent
                          ? "scale-[1.02] ring-2 ring-emerald-500/40 shadow-xl rounded-3xl"
                          : "opacity-85 hover:opacity-100"
                      }`}
                    >
                      <CertificateListCard
                        title={cert.title}
                        platform={cert.platform}
                        year={cert.year}
                        category={cert.tag}
                        icon={cert.icon}
                        image={cert.image}
                        url={cert.url}
                        index={originalIndex}
                        Skills={cert.Skills}
                        Description={cert.Description}
                        onClick={() => setSelectedCert(cert)}
                        priority={originalIndex < 2}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Interactive Controls & Counter Bar */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between pt-8">
              {/* Pagination Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {filteredCertificates.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToCard(i)}
                    aria-label={`Jump to certificate ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === i ? "w-8 bg-emerald-600" : "w-2 bg-emerald-200/70 hover:bg-emerald-300"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="w-10 h-10 rounded-full bg-white border border-emerald-200/80 shadow-2xs flex items-center justify-center text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="w-10 h-10 rounded-full bg-white border border-emerald-200/80 shadow-2xs flex items-center justify-center text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next Certificate"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* CENTERED SHOWCASE FOR FILTERED CATEGORIES WITH <= 2 CARDS */
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 py-4"
              >
                {filteredCertificates.map((cert, index) => (
                  <div
                    key={cert.title}
                    className="w-[340px] sm:w-[390px] lg:w-[420px] h-[480px] shrink-0 flex flex-col"
                  >
                    <CertificateListCard
                      title={cert.title}
                      platform={cert.platform}
                      year={cert.year}
                      category={cert.tag}
                      icon={cert.icon}
                      image={cert.image}
                      url={cert.url}
                      index={index}
                      Skills={cert.Skills}
                      Description={cert.Description}
                      onClick={() => setSelectedCert(cert)}
                      priority
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence mode="wait">
        <DetailCertificate
          certificate={selectedCert ? { ...selectedCert, url: selectedCert.url } : null}
          onClose={() => setSelectedCert(null)}
          isOpen={!!selectedCert}
        />
      </AnimatePresence>
    </div>
  );
}
