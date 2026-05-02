import { skillsData } from "./data";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 bg-surface-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-primary">
            Expertise
          </p>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            {skillsData.title}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillsData.skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="mb-4 font-semibold text-foreground">{group.title}</h3>
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center justify-between text-sm text-muted"
                  >
                    <span>{skill}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
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
