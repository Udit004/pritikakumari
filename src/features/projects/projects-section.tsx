import { projectsData } from "./data";
import { Briefcase, Database, Code, Users } from "lucide-react";

export function ProjectsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users": return <Users className="h-6 w-6 text-accent-primary" />;
      case "Database": return <Database className="h-6 w-6 text-accent-primary" />;
      case "Code": return <Code className="h-6 w-6 text-accent-primary" />;
      default: return <Briefcase className="h-6 w-6 text-accent-primary" />;
    }
  };

  return (
    <section id="projects" className="h-full rounded-2xl bg-white p-8 shadow-sm border border-border">
      <div className="mb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-md bg-accent-primary/10 px-3 py-1">
            <Briefcase className="h-4 w-4 text-accent-primary" />
            <p className="text-xs font-bold uppercase tracking-wider text-accent-primary">
              Projects
            </p>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          {projectsData.title}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col rounded-xl border border-border bg-surface-secondary p-5 transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/10">
              {getIcon(project.icon)}
            </div>
            <h3 className="mb-2 font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded bg-accent-primary/5 px-2 py-1 text-xs font-medium text-accent-primary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
