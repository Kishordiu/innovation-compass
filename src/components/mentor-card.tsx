import { Star, CalendarCheck } from "lucide-react";
import { Avatar, Panel, Pill } from "@/components/ui-kit";
import type { Mentor } from "@/data/mock-data";

const availabilityTone = {
  "Available this week": "sage",
  "Limited slots": "gold",
  "Fully booked": "neutral",
} as const;

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Panel hover className="flex h-full flex-col gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar initials={mentor.initials} />
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold">{mentor.name}</h3>
          <p className="truncate text-xs text-muted-foreground">{mentor.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {mentor.expertise.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Star className="size-3.5 fill-gold text-gold" />
          <span className="font-semibold text-foreground">{mentor.rating}</span>
        </span>
        <span>{mentor.sessions} sessions</span>
      </div>

      <Pill tone={availabilityTone[mentor.availability]}>{mentor.availability}</Pill>

      <button
        type="button"
        disabled={mentor.availability === "Fully booked"}
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        <CalendarCheck className="size-4" /> Book a session
      </button>
    </Panel>
  );
}
