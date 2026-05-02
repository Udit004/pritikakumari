type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-[color:var(--border)] bg-surface/85 p-6 shadow-[var(--shadow)] backdrop-blur-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">{label}</p>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}