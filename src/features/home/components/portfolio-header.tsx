import Link from "next/link";

import { navigationLinks } from "../data";

export function PortfolioHeader() {
  return (
    <header className="flex items-center justify-between gap-6 rounded-[2rem] border border-white/60 bg-white/70 px-5 py-4 shadow-[var(--shadow)] backdrop-blur-md sm:px-6">
      <Link href="#top" className="text-sm font-semibold tracking-[0.28em] text-foreground">
        PRITIKA
      </Link>

      <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
        {navigationLinks.map((link) => (
          <Link key={link.label} href={link.href} className="text-sm font-medium text-muted transition hover:text-foreground">
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="#contact"
        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:scale-[1.02]"
      >
        Start a project
      </Link>
    </header>
  );
}