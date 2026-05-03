import { educationData } from "./data";

export function EducationSection() {
  return (
    <section id="education" className="relative w-full overflow-hidden py-24 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-primary">
            Learning
          </p>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            {educationData.title}
          </h2>
        </div>

        <div className="space-y-6">
          {educationData.qualifications.map((edu) => (
            <div
              key={edu.id}
              className="rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-accent-primary font-medium">
                    {edu.specialization}
                  </p>
                </div>
                <span className="inline-flex rounded-full border border-accent-primary/30 bg-accent-primary/5 px-3 py-1 text-sm font-medium text-accent-primary">
                  Active
                </span>
              </div>

              <p className="text-foreground font-medium">{edu.institution}</p>
              <p className="text-muted text-sm">{edu.location}</p>
              <p className="mt-2 text-muted text-sm">{edu.duration}</p>

              <ul className="mt-4 space-y-2">
                {edu.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-muted text-sm before:h-1.5 before:w-1.5 before:rounded-full before:bg-success"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
