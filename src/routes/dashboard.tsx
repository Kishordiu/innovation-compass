import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Trophy, CalendarClock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  AmbientBackdrop,
  Avatar,
  Panel,
  Pill,
  ProgressBar,
  Reveal,
  StatCard,
} from "@/components/ui-kit";
import { ProjectCard } from "@/components/project-card";
import { MentorCard } from "@/components/mentor-card";
import { NotificationCard } from "@/components/notification-card";
import {
  dashboardStats,
  innovationTracks,
  mentors,
  notifications,
  opportunities,
  projects,
  student,
  upcomingSessions,
} from "@/data/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — Innovation DNA" },
      {
        name: "description",
        content:
          "Innovation score, projects, hackathons, learning progress and mentor suggestions for Mustaq Ahemad at Dhaanish Ahmed College of Engineering.",
      },
      { property: "og:title", content: "Student Dashboard — Innovation DNA" },
      {
        property: "og:description",
        content: "Track your innovation journey: projects, learning, mentors and opportunities.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const hackathons = opportunities.filter((item) => item.category === "Hackathons");

  return (
    <>
      <AmbientBackdrop />
      <AppShell title={`Welcome back, ${student.name.split(" ")[0]}`} subtitle={student.college}>
        <div className="space-y-8">
          <Reveal>
            <Panel className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="flex min-w-0 items-start gap-4">
                <Avatar initials={student.initials} className="size-14 text-base" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-semibold">{student.name}</h2>
                    <Pill tone="gold">Student</Pill>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{student.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {student.rollNumber} · {student.department}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/ai-mentor"
                  className="shimmer-cta inline-flex items-center gap-2 rounded-xl gold-gradient px-5 py-3 text-sm font-semibold text-gold-foreground transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="size-4" /> Ask AI Mentor
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-gold/50"
                >
                  New project <ArrowRight className="size-4" />
                </Link>
              </div>
            </Panel>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.05}>
                <StatCard {...stat} />
              </Reveal>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <Panel className="h-full">
                <h3 className="font-display text-lg font-semibold">Innovation progress</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Rank #{student.rank} of {student.cohortSize} in your cohort · {student.streakDays}
                  -day streak
                </p>
                <div className="mt-7 space-y-6">
                  {innovationTracks.map((track, index) => (
                    <div key={track.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>{track.label}</span>
                        <span className="font-semibold">{track.value}%</span>
                      </div>
                      <ProgressBar
                        value={track.value}
                        tone={index % 3 === 1 ? "sage" : index % 3 === 2 ? "dusty" : "gold"}
                      />
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.08}>
              <Panel className="h-full">
                <h3 className="font-display text-lg font-semibold">Upcoming sessions</h3>
                <div className="mt-5 space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.topic} className="rounded-2xl border border-border p-4">
                      <p className="text-sm font-semibold">{session.topic}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{session.mentor}</p>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarClock className="size-3.5" /> {session.when}
                      </p>
                    </div>
                  ))}
                </div>
                <h3 className="mt-8 font-display text-lg font-semibold">Hackathons</h3>
                <div className="mt-4 space-y-3">
                  {hackathons.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <Trophy className="mt-0.5 size-4 shrink-0 text-gold" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.deadline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>
          </div>

          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold">Your projects</h3>
              <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
                View all
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {projects.slice(0, 2).map((project, index) => (
                <Reveal key={project.id} delay={index * 0.06}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold">Suggested mentors</h3>
              <Link to="/mentors" className="text-sm text-muted-foreground hover:text-foreground">
                Mentor hub
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mentors.slice(0, 3).map((mentor, index) => (
                <Reveal key={mentor.id} delay={index * 0.06}>
                  <MentorCard mentor={mentor} />
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold">Recent notifications</h3>
              <Link
                to="/notifications"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                See all
              </Link>
            </div>
            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification, index) => (
                <Reveal key={notification.id} delay={index * 0.05}>
                  <NotificationCard notification={notification} />
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </AppShell>
    </>
  );
}
