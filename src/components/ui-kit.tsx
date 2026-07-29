import { type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function Panel({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn("surface-card p-6", hover && "lift-hover", className)}>{children}</div>
  );
}

type Tone = "neutral" | "gold" | "sage" | "dusty" | "danger";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-secondary text-secondary-foreground border-border",
  gold: "bg-gold/20 text-gold-foreground border-gold/35",
  sage: "bg-sage/18 text-sage-foreground border-sage/35",
  dusty: "bg-dusty/16 text-dusty-foreground border-dusty/35",
  danger: "bg-destructive/12 text-destructive border-destructive/30",
};

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function FilterChips({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              isActive
                ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "border-border bg-card text-muted-foreground hover:border-gold/45 hover:text-foreground",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "gold",
  className,
}: {
  value: number;
  tone?: "gold" | "sage" | "dusty";
  className?: string;
}) {
  const fill =
    tone === "sage" ? "bg-sage" : tone === "dusty" ? "bg-dusty" : "gold-gradient";
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn("h-full rounded-full", fill)}
      />
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  accent = "gold",
}: {
  label: string;
  value: string;
  delta?: string;
  accent?: "gold" | "sage" | "dusty";
}) {
  const bar =
    accent === "sage" ? "bg-sage" : accent === "dusty" ? "bg-dusty" : "gold-gradient";
  return (
    <div className="surface-card lift-hover relative overflow-hidden p-5">
      <span className={cn("absolute inset-x-0 top-0 h-1", bar)} />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
      {delta ? <p className="mt-1 text-sm text-muted-foreground">{delta}</p> : null}
    </div>
  );
}

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground",
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 cream-gradient" />
      <div className="float-shape absolute -left-24 top-10 size-[26rem] rounded-full bg-gold/18 blur-3xl" />
      <div
        className="float-shape absolute -right-32 top-1/3 size-[30rem] rounded-full bg-sage/14 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="float-shape absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-dusty/10 blur-3xl"
        style={{ animationDelay: "-11s" }}
      />
    </div>
  );
}
