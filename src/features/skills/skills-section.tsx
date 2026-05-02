import { skillsData } from "./data";
import { BookOpen, Users, Monitor, FileText, ShieldCheck, Folder, UserCog, BarChart, MessageSquare } from "lucide-react";

export function SkillsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users": return <Users className="h-5 w-5 text-accent-primary" />;
      case "Monitor": return <Monitor className="h-5 w-5 text-accent-primary" />;
      case "FileText": return <FileText className="h-5 w-5 text-accent-primary" />;
      case "ShieldCheck": return <ShieldCheck className="h-5 w-5 text-accent-primary" />;
      case "Folder": return <Folder className="h-5 w-5 text-accent-primary" />;
      case "UserCog": return <UserCog className="h-5 w-5 text-accent-primary" />;
      case "BarChart": return <BarChart className="h-5 w-5 text-accent-primary" />;
      case "MessageSquare": return <MessageSquare className="h-5 w-5 text-accent-primary" />;
      default: return <Users className="h-5 w-5 text-accent-primary" />;
    }
  };

  return (
    <section id="skills" className="h-full p-8">
      <div className="mb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-md bg-accent-primary/10 px-3 py-1">
            <BookOpen className="h-4 w-4 text-accent-primary" />
            <p className="text-xs font-bold uppercase tracking-wider text-accent-primary">
              My Skills
            </p>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          {skillsData.title}
        </h2>
      </div>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillsData.skillsList.map((skill) => (
          <div key={skill.name} className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/10 shrink-0">
              {getIcon(skill.icon)}
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-sm font-semibold text-foreground">
                {skill.name}
              </span>
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i < skill.level ? "bg-accent-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
