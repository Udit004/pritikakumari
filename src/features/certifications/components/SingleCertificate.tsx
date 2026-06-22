"use client";

import { motion } from "framer-motion";
import { 
  ExternalLink, 
  BadgeCheck 
} from "lucide-react";
import Image from "next/image";

export default function SingleCertificate() {
  const certificate = {
    title: "Microsoft Power BI Desktop for Business Intelligence",
    platform: "Udemy",
    year: "Feb. 23, 2025",
    credentialId: "UC-a48ce599-073b-4460-a6d0-a9845472e6cf",
    url: "https://ude.my/UC-a48ce599-073b-4460-a6d0-a9845472e6cf",
    instructors: "Maven Analytics, Chris Dutton, Aaron Parry",
    duration: "16.5 total hours",
    image: "/assests/images/certifications/MicrosoftPowerBI.jpeg"
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border-2 border-emerald-100"
      >
        {/* Left Side - Image */}
        <div className="w-full lg:w-[55%] p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50 relative">
          <div className="w-full relative rounded-lg overflow-hidden shadow-md border border-emerald-200 bg-white group">
            <Image 
              src={certificate.image} 
              alt={certificate.title} 
              width={1000}
              height={750}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              priority
            />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-full lg:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
            {certificate.title}
          </h2>

          <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-emerald-50 mb-8 border border-emerald-100">
            <BadgeCheck size={16} className="fill-emerald-100 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Verified Certificate</span>
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Issued by</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-[10px]">
                  U
                </div>
                <span className="text-sm font-bold text-gray-900">{certificate.platform}</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Issued Date</span>
              <span className="text-sm font-bold text-gray-900">{certificate.year}</span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Duration</span>
              <span className="text-sm font-bold text-gray-900">{certificate.duration}</span>
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <span className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Credential ID</span>
            <span className="text-sm font-bold text-gray-900 break-all">{certificate.credentialId}</span>
          </div>

          <div className="mb-8">
            <h3 className="text-[11px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">Instructors</h3>
            <p className="text-sm font-bold text-gray-900">
              {certificate.instructors}
            </p>
          </div>

          {/* Skills Covered */}
          <div className="mb-10">
            <h3 className="text-[11px] font-semibold text-gray-500 mb-3 uppercase tracking-wider">Skills Covered</h3>
            <div className="flex flex-wrap gap-2">
              {['Power BI', 'Data Analysis', 'Data Visualization', 'DAX', 'Business Intelligence'].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50/50 border border-emerald-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100/60">

            <a 
              href={certificate.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-2.5 bg-white text-emerald-700 border border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 py-3.5 px-6 rounded-full text-sm font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Verify Credential
              <ExternalLink size={18} className="text-gray-500" />
            </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
