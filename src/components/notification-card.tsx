import { CalendarClock, MessageSquare, Trophy, BookOpen } from "lucide-react";
import { Pill } from "@/components/ui-kit";
import type { Notification } from "@/data/mock-data";

const icons = {
  Deadlines: CalendarClock,
  Mentors: MessageSquare,
  Hackathons: Trophy,
  Learning: BookOpen,
};

const priorityTone = {
  High: "danger",
  Medium: "gold",
  Low: "sage",
} as const;

export function NotificationCard({ notification }: { notification: Notification }) {
  const Icon = icons[notification.category];
  return (
    <article className="surface-card lift-hover grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 font-display text-sm font-semibold sm:text-base">
            {notification.title}
          </h3>
          <Pill tone={priorityTone[notification.priority]}>{notification.priority}</Pill>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{notification.body}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{notification.category}</span>
          <span className="size-1 rounded-full bg-border" />
          <span>{notification.time}</span>
        </div>
      </div>
    </article>
  );
}
