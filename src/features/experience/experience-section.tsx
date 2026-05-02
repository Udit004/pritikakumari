import { experienceData } from "./data";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-primary">
            Career
          </p>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            {experienceData.title}
          </h2>
        </div>

        <div className="space-y-8">
          {experienceData.experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="relative rounded-lg border border-border bg-surface-secondary p-6 sm:p-8"
            >
              <div className="absolute -left-4 top-8 h-8 w-8 rounded-full border-4 border-background bg-accent-primary" />

              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.position}
                  </h3>
                  <p className="text-accent-primary font-medium">{exp.company}</p>
                </div>
                <div className="text-sm text-muted">
                  <p>{exp.duration}</p>
                  <p>{exp.location}</p>
                </div>
              </div>

              <ul className="space-y-2 text-muted">
                {exp.responsibilities.map((resp, respIdx) => (
                  <li
                    key={respIdx}
                    className="flex gap-3 text-sm leading-relaxed before:mt-1 before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-accent-secondary"
                  >
                    {resp}
                  </li>
                ))}
              </ul>

              {idx < experienceData.experiences.length - 1 && (
                <div className="absolute -left-1 top-16 h-12 w-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
