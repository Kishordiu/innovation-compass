import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AmbientBackdrop, FilterChips, Panel, Pill, Reveal } from "@/components/ui-kit";
import { opportunities } from "@/data/mock-data";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning & Opportunities — Innovation DNA" },
      {
        name: "description",
        content:
          "Courses, project ideas, hackathons, internships, workshops and competitions curated for students of Dhaanish Ahmed College of Engineering.",
      },
      { property: "og:title", content: "Learning & Opportunities — Innovation DNA" },
      {
        property: "og:description",
        content: "Curated courses, hackathons, internships and competitions with live deadlines.",
      },
    ],
  }),
  component: LearningPage,
});

const filters = [
  "All",
  "Courses",
  "Project Ideas",
  "Hackathons",
  "Internships",
  "Workshops",
  "Competitions",
];

function LearningPage() {
  const [active, setActive] = useState("All");
  const visible =
    active === "All" ? opportunities : opportunities.filter((item) => item.category === active);

  return (
    <>
      <AmbientBackdrop />
      <AppShell
        title="Learning & Opportunities"
        subtitle="Curated for your final-year CSE innovation track"
      >
        <FilterChips options={filters} active={active} onChange={setActive} />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04}>
              <Panel hover className="flex h-full flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="dusty">{item.category}</Pill>
                  <Pill tone="gold">{item.tag}</Pill>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.provider}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarClock className="size-3.5 shrink-0" />
                    <span className="truncate">{item.deadline}</span>
                  </span>
                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-gold/50"
                  >
                    View
                  </button>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </AppShell>
    </>
  );
}
