export interface SkillItem {
  name: string;
  level: number;
  icon: string;
  category: "People Operations" | "HR Systems" | "Compliance & Payroll" | "Analytics & Strategy";
  tags: string[];
  masteryText: string;
}

export const skillsData = {
  title: "Skills & Expertise",
  skillsList: [
    {
      name: "HR Operations",
      level: 5,
      icon: "Users",
      category: "People Operations" as const,
      tags: ["Onboarding", "Attendance & Leave", "Exit Formalities"],
      masteryText: "96% Proficiency",
    },
    {
      name: "HRMS Administration",
      level: 5,
      icon: "Monitor",
      category: "HR Systems" as const,
      tags: ["Zoho People", "Employee Records", "Access Management"],
      masteryText: "95% Proficiency",
    },
    {
      name: "Employee Engagement",
      level: 4,
      icon: "Users",
      category: "People Operations" as const,
      tags: ["Pulse Surveys", "Culture Programs", "Team Relations"],
      masteryText: "90% Proficiency",
    },
    {
      name: "Payroll Coordination",
      level: 4,
      icon: "FileText",
      category: "Compliance & Payroll" as const,
      tags: ["Zoho Payroll", "TDS Calculation", "Salary Validation"],
      masteryText: "92% Proficiency",
    },
    {
      name: "Compliance Management",
      level: 4,
      icon: "ShieldCheck",
      category: "Compliance & Payroll" as const,
      tags: ["PF & ESI Laws", "New Labour Codes", "Statutory Filings"],
      masteryText: "91% Proficiency",
    },
    {
      name: "HR Documentation",
      level: 5,
      icon: "Folder",
      category: "People Operations" as const,
      tags: ["Offer Letters", "Policy Handbooks", "HR SOPs"],
      masteryText: "96% Proficiency",
    },
    {
      name: "Employee Lifecycle Management",
      level: 5,
      icon: "UserCog",
      category: "People Operations" as const,
      tags: ["Pre-boarding", "Appraisal Cycles", "Separation Process"],
      masteryText: "94% Proficiency",
    },
    {
      name: "Data Analysis (Excel, Power BI, SQL, Python)",
      level: 4,
      icon: "BarChart",
      category: "Analytics & Strategy" as const,
      tags: ["Power BI Dashboards", "Excel Pivot Models", "Python ETL"],
      masteryText: "88% Proficiency",
    },
    {
      name: "Communication & Stakeholder Management",
      level: 5,
      icon: "MessageSquare",
      category: "Analytics & Strategy" as const,
      tags: ["Executive Briefings", "Cross-Team Alignment", "Conflict Resolution"],
      masteryText: "95% Proficiency",
    },
  ],
};
