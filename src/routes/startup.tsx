import { createFileRoute } from "@tanstack/react-router";
import { Building2, HandCoins, LifeBuoy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AmbientBackdrop, Panel, Pill, ProgressBar, Reveal } from "@/components/ui-kit";
import {
  fundingOpportunities,
  incubationPrograms,
  mentors,
  pitchReadiness,
  startupIdeas,
} from "@/data/mock-data";

export const Route = createFileRoute("/startup")({
  head: () => ({
    meta: [
      { title: "Startup Hub — Innovation DNA" },
      {
        name: "description",
        content:
          "Validate startup ideas, track pitch readiness and explore grants, incubation programs and founder support at Dhaanish Ahmed College of Engineering.",
      },
      { property: "og:title", content: "Startup Hub — Innovation DNA" },
      {
        property: "og:description",
        content: "Idea validation, funding, incubation and pitch readiness for student founders.",
      },
    ],
  }),
  component: StartupPage,
});

function StartupPage() {
  return (
    <>
      <AmbientBackdrop />
      <AppShell title="Startup Hub" subtitle="From validated idea to funded venture">
        <section>
          <h2 className="font-display text-lg font-semibold">Your startup ideas</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {startupIdeas.map((idea, index) => (
              <Reveal key={idea.id} delay={index * 0.05}>
                <Panel hover className="flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="min-w-0 truncate font-display text-base font-semibold">
                      {idea.name}
                    </h3>
                    <Pill tone="sage">{idea.stage}</Pill>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{idea.pitch}</p>
                  <p className="text-xs text-muted-foreground">{idea.market}</p>
                  <div className="mt-auto">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Validation score</span>
                      <span className="font-semibold">{idea.validation}%</span>
                    </div>
                    <ProgressBar value={idea.validation} />
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Panel className="h-full">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <HandCoins className="size-4 text-gold" /> Funding opportunities
              </h2>
              <div className="mt-5 space-y-4">
                {fundingOpportunities.map((fund) => (
                  <div
                    key={fund.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{fund.name}</p>
                      <p className="text-xs text-muted-foreground">{fund.window}</p>
                    </div>
                    <Pill tone="gold">{fund.amount}</Pill>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel className="h-full">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <Building2 className="size-4 text-sage" /> Incubation programs
              </h2>
              <div className="mt-5 space-y-4">
                {incubationPrograms.map((program) => (
                  <div key={program.name} className="rounded-2xl border border-border p-4">
                    <p className="text-sm font-semibold">{program.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {program.duration} · {program.perks}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Panel className="h-full">
              <h2 className="font-display text-lg font-semibold">Pitch readiness tracker</h2>
              <div className="mt-6 space-y-6">
                {pitchReadiness.map((item, index) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <ProgressBar
                      value={item.value}
                      tone={index % 3 === 1 ? "sage" : index % 3 === 2 ? "dusty" : "gold"}
                    />
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel className="h-full">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <LifeBuoy className="size-4 text-dusty" /> Founder support
              </h2>
              <div className="mt-5 space-y-4">
                {mentors.slice(2, 5).map((mentor) => (
                  <div key={mentor.id} className="rounded-2xl border border-border p-4">
                    <p className="text-sm font-semibold">{mentor.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{mentor.role}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {mentor.expertise.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </AppShell>
    </>
  );
}
