"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileSpreadsheet, GitFork, Users, UserMinus, TrendingDown, PieChart, Table, Lightbulb, AlertTriangle, Target, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Analysis1Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Analysis1({ isOpen, onClose }: Analysis1Props) {
  const [openAccordion, setOpenAccordion] = useState<string | null>("distribution");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-10 custom-scrollbar"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur z-20 border-b border-gray-100 p-4 sm:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-black flex items-end justify-center pb-2 gap-1 shrink-0">
                <div className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                <div className="w-1.5 h-6 bg-emerald-500 rounded-sm" />
                <div className="w-1.5 h-4 bg-emerald-500 rounded-sm" />
              </div>
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold mb-2">
                  Analysis 1
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Overall Employee Attrition</h2>
                <div className="mt-3 inline-flex items-center px-4 py-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                  Q1. What percentage of employees have left the organization?
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors text-sm font-medium cursor-pointer">
                <Link target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fraw.githubusercontent.com%2FPritikaKumari099%2FHR-Employee_Attrition%2Frefs%2Fheads%2Fmain%2Fexcel_files%2FHR-Employee-Attrition.xlsx&wdOrigin=BROWSELINK"} className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Open in Excel
                </Link>
              </button>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer">
                <Link target="_blank" rel="noopener noreferrer" href={"https://github.com/PritikaKumari099/HR-Employee_Attrition"} className="flex items-center gap-2"><GitFork className="w-4 h-4" />GitHub Repository</Link>

              </button>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-6 bg-slate-50/50">
            {/* Action buttons for mobile */}
            <div className="flex sm:hidden gap-3 w-full">
              <button className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-200 text-emerald-700 bg-white shadow-sm text-sm font-medium cursor-pointer">
                <Link target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fraw.githubusercontent.com%2FPritikaKumari099%2FHR-Employee_Attrition%2Frefs%2Fheads%2Fmain%2Fexcel_files%2FHR-Employee-Attrition.xlsx&wdOrigin=BROWSELINK"} className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Open in Excel
                </Link>
              </button>
              <button className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 bg-white shadow-sm text-sm font-medium cursor-pointer">
                <Link target="_blank" rel="noopener noreferrer" href={"https://github.com/PritikaKumari099/HR-Employee_Attrition"} className="flex items-center gap-2"><GitFork className="w-4 h-4" />GitHub Repository</Link>

              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Total Employees</p>
                  <p className="text-2xl font-bold text-slate-900">1,470</p>
                  <p className="text-xs text-gray-400">100% of workforce</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                  <UserMinus className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Employees Left</p>
                  <p className="text-2xl font-bold text-slate-900">237</p>
                  <p className="text-xs text-gray-400">16.12% of workforce</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Attrition Rate</p>
                  <p className="text-2xl font-bold text-slate-900">16.12%</p>
                  <p className="text-xs text-gray-400">Overall attrition rate</p>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-12 gap-6">
              {/* Chart */}
              <div className="col-span-6 lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900">Employee Attrition Distribution</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="relative w-48 h-48">
                    {/* Simple SVG Donut Chart */}
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="32" fill="transparent" stroke="#2563eb" strokeWidth="36" />
                      <circle cx="50" cy="50" r="32" fill="transparent" stroke="#f97316" strokeWidth="36" strokeDasharray="201.06" strokeDashoffset="168.6" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full" />
                    </div>
                    {/* Labels on chart */}
                    <div className="absolute top-1/4 left-1/4 text-white text-xs font-bold drop-shadow-md">16.12%</div>
                    <div className="absolute bottom-1/4 right-1/4 text-white text-xs font-bold drop-shadow-md">83.88%</div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Stayed (No)</p>
                        <p className="text-sm text-gray-500">1,233 (83.88%)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Left (Yes)</p>
                        <p className="text-sm text-gray-500">237 (16.12%)</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Total Employees</p>
                      <p className="text-sm font-bold text-slate-900">1,470</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tables */}
              <div className="col-span-6 lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Table className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Pivot Table</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-slate-700 font-semibold border-b border-gray-100">
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg">Row Labels</th>
                          <th className="px-4 py-3 rounded-tr-lg text-right">Count of EmployeeNumber</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3 text-gray-600">No</td>
                          <td className="px-4 py-3 text-right font-medium">1,233</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-gray-600">Yes</td>
                          <td className="px-4 py-3 text-right font-medium">237</td>
                        </tr>
                        <tr className="bg-emerald-50/50">
                          <td className="px-4 py-3 font-bold text-emerald-700">Grand Total</td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-700">1,470</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Table className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Summary Table</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center border border-gray-100">
                      <thead className="bg-gray-50 text-slate-700 font-semibold border-b border-gray-100">
                        <tr>
                          <th className="px-4 py-3 border-r border-gray-100">Attrition Status</th>
                          <th className="px-4 py-3 border-r border-gray-100">Percentage</th>
                          <th className="px-4 py-3">Employees</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-100">Stayed</td>
                          <td className="px-4 py-3 text-gray-600 border-r border-gray-100">83.88%</td>
                          <td className="px-4 py-3 text-gray-600">1,233</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-100">Left</td>
                          <td className="px-4 py-3 text-gray-600 border-r border-gray-100">16.12%</td>
                          <td className="px-4 py-3 text-gray-600">237</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 opacity-10 text-emerald-500 scale-[2] translate-x-4 translate-y-4">
                    <TrendingDown className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Business Insights</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600 relative z-10">
                    <li className="flex gap-2">
                      <span className="font-bold text-slate-400">1.</span>
                      The organization has an overall attrition rate of 16.12%, indicating that approximately 1 out of every 6 employees has left the company.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-slate-400">2.</span>
                      While the majority of employees (83.88%) remain with the organization, the attrition level is significant enough to warrant further investigation into the underlying causes of employee turnover.
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 opacity-10 text-orange-500 scale-150 translate-x-4 translate-y-4">
                    <AlertTriangle className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-slate-900">Business Impact</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 relative z-10">
                    <li className="flex gap-2"><span className="font-bold text-slate-400">1.</span> Higher recruitment and onboarding costs.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">2.</span> Loss of skilled and experienced employees.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">3.</span> Reduced workforce productivity.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">4.</span> Increased workload on remaining employees.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">5.</span> Lower employee morale and engagement.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">6.</span> Potential decline in organizational performance and profitability.</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 opacity-10 text-emerald-500 scale-[1.5] translate-x-4 translate-y-4">
                    <FileSpreadsheet className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Recommendations</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 relative z-10">Conduct detailed attrition analysis by:</p>
                  <ul className="space-y-2 text-sm text-slate-700 font-medium relative z-10">
                    <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs">1</div> Department wise</li>
                    <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs">2</div> Job Role</li>
                    <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs">3</div> Age Group</li>
                    <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs">4</div> Salary Level</li>
                    <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs">5</div> Job Satisfaction</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-3 relative z-10">to identify the primary drivers of employee turnover.</p>
                </div>
              </div>
            </div>

            {/* Mobile Accordions */}
            <div className="md:hidden space-y-3">
              {[
                { id: "distribution", icon: <PieChart className="w-5 h-5" />, title: "Employee Attrition Distribution", content: (
                  <div className="flex flex-col items-center gap-6 py-4">
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#2563eb" strokeWidth="36" />
                        <circle cx="50" cy="50" r="32" fill="transparent" stroke="#f97316" strokeWidth="36" strokeDasharray="201.06" strokeDashoffset="168.6" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full" />
                      </div>
                      <div className="absolute top-1/4 left-1/4 text-white text-xs font-bold drop-shadow-md">16.12%</div>
                      <div className="absolute bottom-1/4 right-1/4 text-white text-xs font-bold drop-shadow-md">83.88%</div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-slate-700">Stayed (No)</p>
                          <p className="text-xs text-gray-500">1,233 (83.88%)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-slate-700">Left (Yes)</p>
                          <p className="text-xs text-gray-500">237 (16.12%)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )},
                { id: "pivot", icon: <Table className="w-5 h-5" />, title: "Pivot Table", content: (
                  <div className="overflow-x-auto py-2">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-slate-700 font-semibold border-b border-gray-100">
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg">Row Labels</th>
                          <th className="px-4 py-3 rounded-tr-lg text-right">Count</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3 text-gray-600">No</td>
                          <td className="px-4 py-3 text-right font-medium">1,233</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-gray-600">Yes</td>
                          <td className="px-4 py-3 text-right font-medium">237</td>
                        </tr>
                        <tr className="bg-emerald-50/50">
                          <td className="px-4 py-3 font-bold text-emerald-700">Grand Total</td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-700">1,470</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )},
                { id: "summary", icon: <Table className="w-5 h-5" />, title: "Summary Table", content: (
                  <div className="overflow-x-auto py-2">
                    <table className="w-full text-sm text-center border border-gray-100">
                      <thead className="bg-gray-50 text-slate-700 font-semibold border-b border-gray-100">
                        <tr>
                          <th className="px-4 py-3 border-r border-gray-100">Status</th>
                          <th className="px-4 py-3 border-r border-gray-100">%</th>
                          <th className="px-4 py-3">Count</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-100">Stayed</td>
                          <td className="px-4 py-3 text-gray-600 border-r border-gray-100">83.88%</td>
                          <td className="px-4 py-3 text-gray-600">1,233</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-100">Left</td>
                          <td className="px-4 py-3 text-gray-600 border-r border-gray-100">16.12%</td>
                          <td className="px-4 py-3 text-gray-600">237</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )},
                { id: "insights", icon: <Lightbulb className="w-5 h-5" />, title: "Business Insights", content: (
                  <ul className="space-y-3 text-sm text-gray-600 py-2">
                    <li className="flex gap-2"><span className="font-bold text-slate-400">1.</span> Overall attrition rate of 16.12%, approx. 1 in 6 employees has left.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">2.</span> Attrition level is significant enough to warrant further investigation.</li>
                  </ul>
                )},
                { id: "impact", icon: <AlertTriangle className="w-5 h-5 text-orange-500" />, title: "Business Impact", content: (
                  <ul className="space-y-2 text-sm text-gray-600 py-2">
                    <li className="flex gap-2"><span className="font-bold text-slate-400">1.</span> Higher recruitment and onboarding costs.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">2.</span> Loss of skilled and experienced employees.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">3.</span> Reduced workforce productivity.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">4.</span> Increased workload on remaining employees.</li>
                    <li className="flex gap-2"><span className="font-bold text-slate-400">5.</span> Lower employee morale and engagement.</li>
                  </ul>
                )},
                { id: "recommendations", icon: <Target className="w-5 h-5" />, title: "Recommendations", content: (
                  <div className="py-2">
                    <p className="text-sm text-gray-600 mb-3">Conduct detailed attrition analysis by:</p>
                    <ul className="space-y-2 text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs shrink-0">1</div> Department wise</li>
                      <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs shrink-0">2</div> Job Role</li>
                      <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs shrink-0">3</div> Age Group</li>
                      <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs shrink-0">4</div> Salary Level</li>
                      <li className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center text-xs shrink-0">5</div> Job Satisfaction</li>
                    </ul>
                  </div>
                )}
              ].map((section) => (
                <div key={section.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-emerald-600">
                        {section.icon}
                      </div>
                      <span className="font-bold text-slate-900">{section.title}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openAccordion === section.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openAccordion === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-gray-100">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
