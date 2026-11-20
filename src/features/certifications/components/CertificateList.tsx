"use client";

import { useState, useRef } from "react";
import CertificateListCard from "./CertificateListCard";
import DetailCertificate from "./DetailCertificate";
import { LayoutDashboard, Users, Calculator, ShieldCheck, FileSpreadsheet } from "lucide-react";
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

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredCertificates = certificatesData.filter(
    (cert) => activeCategory === "All Certificates" || cert.category === activeCategory
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: 3D Stagger Entrance + Column-Based Parallax Scrub
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".cert-card");
        if (cards.length === 0) return;

        // 1. Initial 3D Scroll Reveal Wave
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 55,
            rotateX: 12,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 2. Continuous Differential Parallax on Scroll (Center column floats upward)
        const centerColCards = gsap.utils.toArray<HTMLElement>(".cert-card-col-center");
        if (centerColCards.length > 0) {
          gsap.to(centerColCards, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // Side columns gentle complementary drift
        const sideColCards = gsap.utils.toArray<HTMLElement>(".cert-card-col-side");
        if (sideColCards.length > 0) {
          gsap.to(sideColCards, {
            y: 15,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      // Mobile / Tablet: Smooth staggered entrance
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".cert-card");
        if (cards.length === 0) return;

        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto py-2 lg:py-4">
      {/* Category Filter - Desktop */}
      <div className="hidden md:flex flex-wrap items-center justify-center p-1.5 bg-white border border-emerald-100 shadow-sm rounded-full w-fit mx-auto mb-8 gap-1.5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
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
      <div className="md:hidden flex items-start mb-6 px-4 sm:px-6">
        <div className="relative inline-block w-full max-w-[240px]">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
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

      {/* Grid with 3D Parallax Scrolling Architecture */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 md:px-0"
      >
        <AnimatePresence mode="popLayout">
          {filteredCertificates.map((cert, index) => {
            const isCenterCol = index % 3 === 1;
            const colClass = isCenterCol ? "cert-card-col-center" : "cert-card-col-side";

            return (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`cert-card ${colClass} flex flex-col w-full h-full`}
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
                  priority={index < 3}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
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
