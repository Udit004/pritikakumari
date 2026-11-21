import { SkillItem, skillsData } from "./data";

export type SkillCategory =
  | "People Operations"
  | "HR Systems"
  | "Compliance & Payroll"
  | "Analytics & Strategy";

export interface SingleSkillCardData {
  id: string;
  index: number;
  row: number; // 0, 1, 2
  col: number; // 0, 1, 2
  skill: SkillItem;
  svgSrc: string;
}

export const CATEGORY_SVG_MAP: Record<SkillCategory, string> = {
  "People Operations": "/assests/images/skills/Skill card · HR Operations.svg",
  "HR Systems": "/assests/images/skills/Skill card · HRMS Administration.svg",
  "Compliance & Payroll": "/assests/images/skills/Skill card · Compliance & Payroll.svg",
  "Analytics & Strategy":
    "/assests/images/skills/Skill card · Data Analysis (Excel, Power BI, SQL, Python).svg",
};

export function getNineSkillCards(): SingleSkillCardData[] {
  return skillsData.skillsList.map((skill, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const svgSrc =
      CATEGORY_SVG_MAP[skill.category as SkillCategory] ||
      "/assests/images/skills/Skill card · HR Operations.svg";

    return {
      id: `skill-card-${idx}`,
      index: idx,
      row,
      col,
      skill,
      svgSrc,
    };
  });
}
