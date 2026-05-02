import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-foreground">Pritika Kumari</h3>
            <p className="mt-2 text-sm text-muted">HR Operations Professional</p>
            <p className="mt-1 text-xs text-muted">Data-Driven HR | HRMS Administration</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Experience", href: "#experience" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Connect</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/pritika-kumaria68192376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:pritikakumaree96@gmail.com"
                  className="text-sm text-muted transition hover:text-foreground"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Location</h4>
            <p className="mt-3 text-sm text-muted">Noida, Uttar Pradesh</p>
            <p className="text-xs text-muted">India</p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted">
            © {currentYear} Pritika Kumari. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-muted">
            Crafted with focus on HR excellence and professional growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
