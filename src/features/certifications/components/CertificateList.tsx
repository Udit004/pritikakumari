"use client";

import { useState, useRef } from "react";
import CertificateListCard from "./CertificateListCard";
import DetailCertificate from "./DetailCertificate";
import { LayoutDashboard, Users, Calculator, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All Certificates",
  "HR Management",
  "Payroll",
  "Tools & Technology",
];

const certificatesData = [
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
    Description: "Comprehensive course covering Excel essentials to advanced level including formulas, data analysis, pivot tables, charts and dashboard creation."
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
    Description: "Master data analysis and visualization using Power BI, create compelling dashboards, and leverage DAX for advanced business intelligence."
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
    Description: "Comprehensive HR training covering recruitment, employee relations, performance management, HR policies, and legal compliance."
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
    Description: "Comprehensive guide to Indian payroll management including TDS calculation, compliance, and regulatory requirements."
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
    Description: "Learn TDS for Indian Payroll, master TDS calculation, compliance, and regulatory requirements for professionals."
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
      "Employment Laws"
    ],
    Description: "Learn Indian labour laws and statutory compliance requirements, including the new labour codes, employment regulations, and key compliance obligations for professionals."
  }


];

export default function CertificateList() {
  const [activeCategory, setActiveCategory] = useState("All Certificates");
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const filteredCertificates = certificatesData.filter(
    (cert) => activeCategory === "All Certificates" || cert.category === activeCategory
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      {/* Category Filter - Desktop */}
      <div className="hidden md:flex flex-wrap items-center justify-center p-1.5 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-full w-fit mx-auto mb-10 gap-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${activeCategory === category
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-0">
        {filteredCertificates.map((cert, index) => (
          <div
            key={cert.title + index}
            className="flex flex-col w-full"
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
          </div>
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
