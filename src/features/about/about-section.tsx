import { aboutData } from "./data";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-surface py-16 sm:py-24">      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-primary">
            About
          </p>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            {aboutData.title}
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 text-lg leading-8 text-muted">
            {aboutData.summary.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-8">
            {aboutData.expertise.map((section) => (
              <div key={section.category}>
                <h3 className="mb-3 font-semibold text-foreground">
                  {section.category}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-muted before:h-2 before:w-2 before:rounded-full before:bg-accent-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
