import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AmbientBackdrop, FilterChips, Reveal } from "@/components/ui-kit";
import { MentorCard } from "@/components/mentor-card";
import { mentors } from "@/data/mock-data";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Mentor Hub — Innovation DNA" },
      {
        name: "description",
        content:
          "Faculty and industry mentors from Zoho, Freshworks, Ford and IIT Madras — expertise, availability, ratings and session booking.",
      },
      { property: "og:title", content: "Mentor Hub — Innovation DNA" },
      {
        property: "og:description",
        content: "Find and book faculty and industry mentors for your innovation journey.",
      },
    ],
  }),
  component: MentorsPage,
});

const filters = ["All", "Available this week", "Limited slots", "Fully booked"];

function MentorsPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const visible = mentors.filter((mentor) => {
    const matchesFilter = active === "All" || mentor.availability === active;
    const haystack = `${mentor.name} ${mentor.role} ${mentor.expertise.join(" ")}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  });

  return (
    <>
      <AmbientBackdrop />
      <AppShell title="Mentor Hub" subtitle="Faculty and industry mentors on the innovation board">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, company or expertise"
            className="w-full rounded-xl border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-gold/60"
          />
        </div>

        <div className="mt-6">
          <FilterChips options={filters} active={active} onChange={setActive} />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((mentor, index) => (
            <Reveal key={mentor.id} delay={index * 0.04}>
              <MentorCard mentor={mentor} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No mentors match that search yet.
          </p>
        ) : null}
      </AppShell>
    </>
  );
}
