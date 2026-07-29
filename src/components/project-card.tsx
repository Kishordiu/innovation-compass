import { Github, Users } from "lucide-react";
import { Panel, Pill, ProgressBar } from "@/components/ui-kit";
import type { Project } from "@/data/mock-data";

const statusTone = {
  "In Progress": "gold",
  Prototype: "dusty",
  Review: "neutral",
  Deployed: "sage",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Panel hover className="flex h-full flex-col gap-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <h3 className="min-w-0 font-display text-lg font-semibold leading-snug">
          {project.title}
        </h3>
        <Pill tone={statusTone[project.status]}>{project.status}</Pill>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Pill key={tech}>{tech}</Pill>
        ))}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold text-foreground">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} />
      </div>

      <div className="space-y-2">
        {project.milestones.map((milestone) => (
          <div key={milestone.label} className="flex items-center gap-3 text-sm">
            <span
              className={
                milestone.done
                  ? "size-2 shrink-0 rounded-full bg-sage"
                  : "size-2 shrink-0 rounded-full border border-border bg-secondary"
              }
            />
            <span className={milestone.done ? "min-w-0 truncate" : "min-w-0 truncate text-muted-foreground"}>
              {milestone.label}
            </span>
            <span className="ml-auto shrink-0 text-xs text-muted-foreground">{milestone.date}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border pt-4">
        <span className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          <Users className="size-3.5 shrink-0" />
          <span className="truncate">{project.team.join(", ")}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium">
          <Github className="size-3.5" /> Repo
        </span>
      </div>
    </Panel>
  );
}
