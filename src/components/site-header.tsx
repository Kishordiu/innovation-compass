import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { to: "/", label: "Home" },
  { to: "/learning", label: "Learning" },
  { to: "/mentors", label: "Mentors" },
  { to: "/startup", label: "Startup Hub" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl gold-gradient font-display text-sm font-bold text-gold-foreground">
            iD
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold">
              Innovation DNA
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Dhaanish Ahmed College of Engineering
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="ml-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-gold/50"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="shimmer-cta ml-1 rounded-full gold-gradient px-5 py-2 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Enter platform
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          className="grid size-10 place-items-center rounded-xl border border-border bg-card md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/70 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl gold-gradient px-3 py-3 text-center text-sm font-semibold text-gold-foreground"
              >
                Enter platform
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-ivory/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold">Innovation DNA</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The student innovation and startup ecosystem of Dhaanish Ahmed College of
              Engineering, Chennai — learning, projects, mentorship and startups in one calm
              workspace.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Platform
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/projects" className="text-muted-foreground hover:text-foreground">
                Project Hub
              </Link>
              <Link to="/ai-mentor" className="text-muted-foreground hover:text-foreground">
                AI Mentor
              </Link>
              <Link to="/notifications" className="text-muted-foreground hover:text-foreground">
                Notifications
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Campus
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Institution's Innovation Council</span>
              <span>Padappai, Chennai — 601301</span>
              <span>iic@dhaanish.edu.in</span>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-border/70 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Innovation DNA · Dhaanish Ahmed College of Engineering.
          Demo experience with sample data.
        </p>
      </div>
    </footer>
  );
}
