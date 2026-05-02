import { aboutData } from "./data";
import { Users, Briefcase, BarChart2 } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const paragraphs = aboutData.summary.split("\n\n");
  
  return (
    <section id="about" className="h-full rounded-2xl bg-white p-8 shadow-sm border border-border relative overflow-hidden flex flex-col">
      <div className="mb-6 space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 rounded-md bg-accent-primary/10 px-3 py-1">
            <Users className="h-4 w-4 text-accent-primary" />
            <p className="text-xs font-bold uppercase tracking-wider text-accent-primary">
              About Me
            </p>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          {aboutData.title}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10 flex-grow">
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 text-sm leading-relaxed text-muted font-medium mb-8">
            <p className="text-foreground font-semibold">{paragraphs[0]}</p>
            <p>{paragraphs[1]}</p>
            <p>{paragraphs[2]}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-border bg-surface-secondary">
              <Users className="h-6 w-6 text-accent-primary mb-2" />
              <span className="font-bold text-foreground">1+</span>
              <span className="text-xs text-muted">Years Experience</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-border bg-surface-secondary">
              <Briefcase className="h-6 w-6 text-accent-primary mb-2" />
              <span className="font-bold text-foreground text-sm">End to End</span>
              <span className="text-xs text-muted">Employee Lifecycle</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-border bg-surface-secondary">
              <BarChart2 className="h-6 w-6 text-accent-primary mb-2" />
              <span className="font-bold text-foreground text-sm">Data Driven</span>
              <span className="text-xs text-muted">HR Professional</span>
            </div>
          </div>
        </div>
        
        {/* Abstract shape background for image */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[40%] bg-accent-primary/5 rounded-l-[100px] -z-10" />
        
        <div className="hidden lg:flex w-1/3 items-end justify-center relative">
            <Image
                src="/assests/images/hero_Image2.png"
                alt="Profile"
                width={400}
                height={500}
                className="object-contain h-[120%] w-auto absolute bottom-[-32px] right-0 drop-shadow-xl"
            />
        </div>
      </div>
    </section>
  );
}
