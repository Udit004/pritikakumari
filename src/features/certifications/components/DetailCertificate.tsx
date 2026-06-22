"use client";

import { motion } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  BadgeCheck 
} from "lucide-react";

type Props = {
  certificate: any;
  onClose: () => void;
};

export default function DetailCertificate({ certificate, onClose }: Props) {
  if (!certificate) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-[1080px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
      >
        {/* Close Button - Mobile absolute, Desktop absolute top right */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200 text-gray-700 transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Left Side - Image Slider */}
        <div className="w-full md:w-[55%] lg:w-[50%] p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50 relative">
          
          <div className="flex items-center w-full justify-between relative group">
            {/* Prev Button */}
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-600 hover:text-black hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all hover:scale-110 active:scale-95 z-10 -ml-2 sm:-ml-4 shrink-0 cursor-pointer">
              <ChevronLeft size={20} />
            </button>

            {/* Certificate Placeholder Div */}
            <div className="w-full max-w-[420px] aspect-[4/3] bg-[#fdfbf7] border border-[#e5e1d8] rounded-lg shadow-sm mx-4 relative overflow-hidden flex items-center justify-center">
              {/* Fake Certificate Content for visual similarity before image replacement */}
              <div className="absolute inset-2 border border-[#d6cfbe] p-4 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-[#2d1b36] mb-4 tracking-tighter">ûdemy</span>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4">Certificate of Completion</span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">{certificate.title}</h2>
                <p className="text-lg font-semibold text-gray-800 mb-8">Pritika Kumari</p>
                <div className="w-full flex justify-between text-[10px] text-gray-500 px-4 mt-auto">
                  <div className="text-left">
                    <p>Date <span className="font-semibold text-gray-800">{certificate.year}</span></p>
                    <p>Certificate ID <span className="font-semibold text-gray-800">UC-XXXXXXX</span></p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#d6cfbe]/30 border-2 border-[#c2b69b] flex items-center justify-center">
                    <span className="text-[#2d1b36] font-bold text-xs">U</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-600 hover:text-black hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all hover:scale-110 active:scale-95 z-10 -mr-2 sm:-mr-4 shrink-0 cursor-pointer">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-100"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-100"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-100"></div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-[45%] lg:w-[50%] p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto">
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3 pr-8">
            {certificate.title}
          </h2>

          <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-emerald-50 mb-8">
            <BadgeCheck size={16} className="fill-emerald-100 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Verified Certificate</span>
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-500 mb-1">Issued by</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-[10px]">
                  U
                </div>
                <span className="text-sm font-bold text-gray-900">{certificate.platform}</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-500 mb-1">Issued Date</span>
              <span className="text-sm font-bold text-gray-900">{certificate.year}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-500 mb-1">Credential ID</span>
              <span className="text-sm font-bold text-gray-900 truncate">UC-XXXXXXX</span>
            </div>
          </div>

          {/* Skills Covered */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Skills Covered</h3>
            <div className="flex flex-wrap gap-2">
              {['Excel Functions', 'Data Analysis', 'Pivot Tables', 'Charts', 'Dashboards'].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50/50 border border-emerald-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Comprehensive course covering Excel essentials to advanced level including formulas, data analysis, pivot tables, charts and dashboard creation.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100/60">

            <button className="flex-1 flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-3.5 px-6 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap">
              Verify Credential
              <ExternalLink size={18} className="text-gray-500" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
