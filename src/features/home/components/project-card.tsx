type ProjectCardProps = {
  title: string;
  description: string;
  outcome: string;
  tags: string[];
};

export function ProjectCard({ title, description, outcome, tags }: ProjectCardProps) {
  return (
    <article className="group rounded-[1.75rem] border border-[color:var(--border)] bg-surface/90 p-6 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent-soft)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Featured work</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        <span className="rounded-full border border-[color:var(--accent-soft)] bg-[#f8ead2] px-3 py-1 text-xs font-medium text-[color:var(--accent)]">
          Concept
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted">{description}</p>

      <p className="mt-5 text-sm font-medium leading-6 text-foreground">{outcome}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[color:var(--border)] bg-white/80 px-3 py-1 text-xs font-medium text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}