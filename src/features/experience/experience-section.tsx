import { experienceData } from "./data";
import { Briefcase } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full overflow-hidden py-24 sm:py-28 scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-md bg-accent-primary/10 px-3 py-1">
            <Briefcase className="h-4 w-4 text-accent-primary" />
            <p className="text-xs font-bold uppercase tracking-wider text-accent-primary">
              Experience
            </p>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          {experienceData.title}
        </h2>
      </div>

      <div className="relative pl-0 md:pl-8">
        <div className="space-y-6">
          {experienceData.experiences.map((exp, idx) => (
            <div key={exp.id} className="relative flex flex-col md:flex-row gap-6 md:gap-12 group">
              
              {/* Timeline dots & line - Hidden on very small screens, visible on md+ */}
              <div className="hidden md:flex flex-col items-center absolute left-[220px] top-2 bottom-[-24px]">
                <div className="h-4 w-4 rounded-full bg-green-500 z-10 border-[3px] border-white shadow-sm" />
                {idx !== experienceData.experiences.length - 1 && (
                  <div className="w-[2px] h-full bg-border -mt-1" />
                )}
              </div>

              {/* Date & Duration */}
              <div className="md:w-[200px] flex-shrink-0 pt-1">
                <p className="font-bold text-foreground text-sm">{exp.date}</p>
                <p className="text-muted text-sm">{exp.durationText}</p>
              </div>

              {/* Card */}
              <div className="flex-1 rounded-xl border border-border bg-surface-secondary p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${exp.logoColor} font-bold text-lg shrink-0`}>
                    {exp.logoText}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-700">
                      {exp.position}
                    </h3>
                    <p className="text-muted text-sm font-medium uppercase tracking-wide">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mt-4 text-sm text-muted">
                  {exp.responsibilities.map((resp, respIdx) => (
                    <li
                      key={respIdx}
                      className="flex gap-3 leading-relaxed before:content-['•'] before:text-muted before:font-bold before:mr-1"
                    >
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
