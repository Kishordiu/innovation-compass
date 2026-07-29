import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { AmbientBackdrop, FilterChips, Reveal, StatCard } from "@/components/ui-kit";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/mock-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Hub — Innovation DNA" },
      {
        name: "description",
        content:
          "Track student projects with milestones, tech stacks, teams, repositories and progress across the Dhaanish Ahmed innovation studio.",
      },
      { property: "og:title", content: "Project Hub — Innovation DNA" },
      {
        property: "og:description",
        content: "Milestones, teams, tech stacks and progress for every student project.",
      },
    ],
  }),
  component: ProjectsPage,
});

const filters = ["All", "In Progress", "Prototype", "Deployed"];

function ProjectsPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.status === active);

  return (
    <>
      <AmbientBackdrop />
      <AppShell title="Project Hub" subtitle="Your builds, milestones and teams in one studio">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Active builds" value="3" delta="1 deployed on campus" />
          <StatCard label="Teammates" value="6" delta="Across 3 departments" accent="sage" />
          <StatCard label="Milestones hit" value="7 / 10" delta="This semester" accent="dusty" />
        </div>

        <div className="mt-8">
          <FilterChips options={filters} active={active} onChange={setActive} />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </AppShell>
    </>
  );
}
