"use client";

import { useState, useRef } from "react";
import CertificateListCard from "./CertificateListCard";
import DetailCertificate from "./DetailCertificate";
import { LayoutDashboard, Users, Calculator, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All Certificates",
  "HR Management",
  "HR Analytics",
  "Payroll",
  "Compliance",
  "Tools & Technology",
];

const certificatesData = [
  {
    title: "Excel from Beginner to Advanced",
    platform: "Udemy",
    year: "2025",
    category: "Tools & Technology",
    tag: "Excel",
    icon: <FileSpreadsheet size={24} />,
  },
  {
    title: "Microsoft Power BI Desktop for Business Intelligence",
    platform: "Udemy",
    year: "2025",
    category: "Tools & Technology",
    tag: "Power BI",
    icon: <LayoutDashboard size={24} />,
  },
  {
    title: "Ultimate HR Generalist: Certified Human Resource Management",
    platform: "Udemy",
    year: "2025",
    category: "HR Management",
    tag: "HR Management",
    icon: <Users size={24} />,
  },
  {
    title: "Diploma Course in Human Resource Management (HRM)",
    platform: "Udemy",
    year: "2025",
    category: "HR Management",
    tag: "HR Management",
    icon: <Users size={24} />,
  },
  {
    title: "A Complete Guide to Indian Payroll Management [2023-24]",
    platform: "Udemy",
    year: "2024",
    category: "Payroll",
    tag: "Payroll",
    icon: <Calculator size={24} />,
  },
  {
    title: "TDS for Indian Payroll - For Professionals",
    platform: "Udemy",
    year: "2024",
    category: "Payroll",
    tag: "Payroll",
    icon: <ShieldCheck size={24} />,
  },
];

export default function CertificateList() {
  const [activeCategory, setActiveCategory] = useState("All Certificates");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const filteredCertificates = certificatesData.filter(
    (cert) => activeCategory === "All Certificates" || cert.category === activeCategory
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    // We add gap (16px = 1rem) and padding to card width roughly to get snapping point
    const itemWidth = 300; // approximate width of a mobile card + gap
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex && newIndex < filteredCertificates.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      {/* Category Filter - Desktop */}
      <div className="hidden md:flex flex-wrap items-center justify-center p-1.5 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-full w-fit mx-auto mb-10 gap-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === category
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:text-black hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Filter - Mobile */}
      <div className="md:hidden flex items-start mb-6 px-4 sm:px-6">
        <div className="relative inline-block w-full max-w-[220px]">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 text-gray-900 text-sm font-bold rounded-full px-5 py-2.5 pr-10 shadow-sm focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* Grid / Carousel */}
      <div 
        className="flex md:grid items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-6 md:px-0 pb-6 md:pb-0 scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AnimatePresence mode="popLayout">
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.title + index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col w-[310px] sm:w-[350px] shrink-0 md:w-auto snap-center"
            >
              <div className="w-full h-full flex flex-col">
                <CertificateListCard
                  title={cert.title}
                  platform={cert.platform}
                  year={cert.year}
                  category={cert.tag}
                  icon={cert.icon}
                  index={index}
                  onClick={() => setSelectedCert(cert)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mobile Pagination Dots */}
      <div className="flex md:hidden justify-center gap-1.5 mb-8">
        {filteredCertificates.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-4 bg-emerald-600" : "w-1.5 bg-emerald-100"}`}
          />
        ))}
      </div>

      {/* View More Button */}
      {/* <div className="mt-4 md:mt-12 flex justify-center px-4 sm:px-6">
        <button className="w-full md:w-auto px-6 py-3.5 rounded-full bg-white border border-emerald-600/30 text-sm font-bold text-gray-900 hover:bg-emerald-50/50 flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md">
          View More Certificates
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div> */}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <DetailCertificate 
            certificate={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
