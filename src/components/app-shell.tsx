import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Sparkles,
  GraduationCap,
  FolderKanban,
  Users,
  Rocket,
  Bell,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { student } from "@/data/mock-data";
import { Avatar } from "@/components/ui-kit";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/ai-mentor", label: "AI Mentor", icon: Sparkles },
  { to: "/learning", label: "Learning", icon: GraduationCap },
  { to: "/projects", label: "Project Hub", icon: FolderKanban },
  { to: "/mentors", label: "Mentor Hub", icon: Users },
  { to: "/startup", label: "Startup Hub", icon: Rocket },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300",
              active
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <Link to="/" onClick={onNavigate} className="flex min-w-0 items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl gold-gradient font-display text-sm font-bold text-gold-foreground">
          iD
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-semibold">Innovation DNA</span>
          <span className="block truncate text-xs text-muted-foreground">Dhaanish Ahmed CoE</span>
        </span>
      </Link>

      <NavList onNavigate={onNavigate} />

      <div className="mt-auto rounded-2xl border border-border bg-card p-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar initials={student.initials} className="size-9" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{student.name}</p>
            <p className="truncate text-xs text-muted-foreground">{student.rollNumber}</p>
          </div>
        </div>
        <Link
          to="/login"
          onClick={onNavigate}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground"
        >
          <LogOut className="size-3.5" /> Sign out
        </Link>
      </div>
    </div>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl lg:block">
        <SidebarInner />
      </aside>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/25 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-sidebar-border bg-sidebar lg:hidden"
            >
              <SidebarInner onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="grid size-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0 lg:col-start-2">
              <h1 className="truncate font-display text-lg font-semibold sm:text-xl">{title}</h1>
              {subtitle ? (
                <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/notifications"
                aria-label="Notifications"
                className="relative grid size-10 place-items-center rounded-xl border border-border bg-card transition-colors hover:border-gold/50"
              >
                <Bell className="size-4" />
                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-gold" />
              </Link>
              <Avatar initials={student.initials} className="hidden size-10 sm:grid" />
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-10"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function MobileSidebarClose() {
  return <X className="size-4" />;
}
