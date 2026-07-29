import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Trophy, CalendarClock, Users, FileText, Activity, CheckCircle, Target, Shield, UserCog, Briefcase } from "lucide-react";
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
import { useRole } from "@/hooks/use-role";
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
      { title: "Dashboard — Innovation DNA" },
      {
        name: "description",
        content: "Innovation dashboard for Dhaanish Ahmed College of Engineering.",
      },
      { property: "og:title", content: "Dashboard — Innovation DNA" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { role, profile } = useRole();
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      <AmbientBackdrop />
      <AppShell title={`Welcome back, ${profile.name.split(" ")[0]}`} subtitle={profile.department}>
        <div className="space-y-8">
          <Reveal>
            <Panel className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="flex min-w-0 items-start gap-4">
                <Avatar initials={initials} className="size-14 text-base" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-semibold">{profile.name}</h2>
                    <Pill tone="gold">{role}</Pill>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{profile.title}</p>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {role === "Student" && (
                  <>
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
                  </>
                )}
                {role === "Faculty" && (
                  <button className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-gold/50">
                    Review submissions <ArrowRight className="size-4" />
                  </button>
                )}
                {role === "Mentor" && (
                  <button className="shimmer-cta inline-flex items-center gap-2 rounded-xl gold-gradient px-5 py-3 text-sm font-semibold text-gold-foreground transition-transform duration-300 hover:-translate-y-0.5">
                    Open schedule slots
                  </button>
                )}
                {role === "Dean" && (
                  <button className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-gold/50">
                    Generate ecosystem report <ArrowRight className="size-4" />
                  </button>
                )}
                {role === "Admin" && (
                  <button className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-gold/50">
                    Manage users <Users className="size-4" />
                  </button>
                )}
              </div>
            </Panel>
          </Reveal>

          {role === "Student" && <StudentDashboard />}
          {role === "Faculty" && <FacultyDashboard />}
          {role === "Mentor" && <MentorDashboard />}
          {role === "Dean" && <DeanDashboard />}
          {role === "Admin" && <AdminDashboard />}
        </div>
      </AppShell>
    </>
  );
}

function StudentDashboard() {
  const hackathons = opportunities.filter((item) => item.category === "Hackathons");
  return (
    <>
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
              Rank #{student.rank} of {student.cohortSize} in your cohort · {student.streakDays}-day streak
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
          <Link to="/notifications" className="text-sm text-muted-foreground hover:text-foreground">
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
    </>
  );
}

function FacultyDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <StatCard label="Assigned Projects" value="12" delta="3 pending reviews" accent="gold" />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard label="Students Mentored" value="45" delta="across 14 teams" accent="sage" />
        </Reveal>
        <Reveal delay={0.15}>
          <StatCard label="Department Rank" value="2nd" delta="out of 8 in innovation" accent="dusty" />
        </Reveal>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <Panel className="h-full">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <FileText className="size-4 text-gold" /> Project Submissions
            </h3>
            <div className="mt-5 space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="rounded-2xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{project.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Team: {project.team.join(", ")}</p>
                  </div>
                  <Pill tone={project.status === "Deployed" ? "sage" : "gold"}>{project.status}</Pill>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <Panel className="h-full">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Activity className="size-4 text-sage" /> Upcoming Reviews
            </h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-border p-4">
                <p className="text-sm font-semibold">AgriSense — Prototype Demo</p>
                <p className="mt-1 text-xs text-muted-foreground">Mustaq Ahemad's Team</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" /> Tomorrow · 10:00 AM
                </p>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <p className="text-sm font-semibold">CampusFlow — Code Audit</p>
                <p className="mt-1 text-xs text-muted-foreground">CSE Department Pilot</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" /> Thursday · 2:00 PM
                </p>
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </>
  );
}

function MentorDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <StatCard label="Total Sessions" value="142" delta="4.9 avg rating" accent="gold" />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard label="Active Mentees" value="8" delta="3 teams" accent="sage" />
        </Reveal>
        <Reveal delay={0.15}>
          <StatCard label="Hours Contributed" value="114" delta="this semester" accent="dusty" />
        </Reveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Panel className="h-full">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Users className="size-4 text-gold" /> Assigned Students
            </h3>
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Avatar initials="MA" className="size-10" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Mustaq Ahemad</p>
                  <p className="text-xs text-muted-foreground mt-0.5">AgriSense Project Lead</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:border-gold/50 transition-colors">Message</button>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <Avatar initials="SP" className="size-10" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Sana Parveen</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Hardware Integration</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:border-gold/50 transition-colors">Message</button>
              </div>
            </div>
          </Panel>
        </Reveal>
        
        <Reveal delay={0.08}>
          <Panel className="h-full">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <CalendarClock className="size-4 text-sage" /> Upcoming Sessions
            </h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-border p-4">
                <p className="text-sm font-semibold">System Architecture Review</p>
                <p className="mt-1 text-xs text-muted-foreground">Mustaq's Team</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                  Thursday · 4:00 PM (GMeet)
                </p>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <p className="text-sm font-semibold">Fundraising Basics</p>
                <p className="mt-1 text-xs text-muted-foreground">Open Office Hours</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  Friday · 5:30 PM (Innovation Studio)
                </p>
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </>
  );
}

function DeanDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={0.05}>
          <StatCard label="Total Students" value="4,212" delta="+184 this week" accent="gold" />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard label="Active Projects" value="310" delta="12 in prototype stage" accent="sage" />
        </Reveal>
        <Reveal delay={0.15}>
          <StatCard label="Patents Filed" value="14" delta="4 approved" accent="dusty" />
        </Reveal>
        <Reveal delay={0.2}>
          <StatCard label="Grants Secured" value="₹1.8 Cr" delta="TANSIM & IIC" accent="gold" />
        </Reveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <Panel className="h-full">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Target className="size-4 text-gold" /> Strategic Goals
            </h3>
            <div className="mt-5 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Startups Incubated</span>
                  <span className="font-semibold">8 / 15</span>
                </div>
                <ProgressBar value={53} tone="gold" />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Industry Mentors Onboarded</span>
                  <span className="font-semibold">86 / 100</span>
                </div>
                <ProgressBar value={86} tone="sage" />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Student Engagement Rate</span>
                  <span className="font-semibold">68%</span>
                </div>
                <ProgressBar value={68} tone="dusty" />
              </div>
            </div>
          </Panel>
        </Reveal>
        
        <Reveal delay={0.08}>
          <Panel className="h-full">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <CheckCircle className="size-4 text-sage" /> Approvals & Actions
            </h3>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-border p-4">
                <div>
                  <p className="text-sm font-semibold">TANSIM Seed Grant</p>
                  <p className="text-xs text-muted-foreground mt-0.5">AgriSense Team (₹10L)</p>
                </div>
                <button className="text-xs font-semibold px-4 py-2 rounded-xl gold-gradient text-gold-foreground transition-transform duration-300 hover:-translate-y-0.5">Review</button>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border p-4">
                <div>
                  <p className="text-sm font-semibold">New Mentor Onboarding</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Nithya Krishnan, Ford India</p>
                </div>
                <button className="text-xs font-semibold px-4 py-2 rounded-xl border border-border transition-colors hover:border-gold/50">Review</button>
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={0.05}>
          <StatCard label="System Health" value="99.9%" delta="All services online" accent="sage" />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard label="Active Users" value="2,184" delta="Today" accent="gold" />
        </Reveal>
        <Reveal delay={0.15}>
          <StatCard label="Support Tickets" value="3" delta="0 critical" accent="dusty" />
        </Reveal>
        <Reveal delay={0.2}>
          <StatCard label="Storage" value="142 GB" delta="48% capacity" accent="gold" />
        </Reveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal>
          <Panel className="h-full">
            <div className="flex flex-col items-center justify-center text-center p-6 gap-4">
              <div className="grid place-items-center size-16 rounded-full bg-secondary text-foreground">
                <UserCog className="size-8 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-lg">User Management</p>
                <p className="text-sm text-muted-foreground mt-1">Add, remove, or modify roles</p>
              </div>
              <button className="mt-2 text-sm font-semibold px-5 py-2.5 rounded-full border border-border hover:border-gold/50 w-full transition-colors">Open Panel</button>
            </div>
          </Panel>
        </Reveal>
        
        <Reveal delay={0.05}>
          <Panel className="h-full">
            <div className="flex flex-col items-center justify-center text-center p-6 gap-4">
              <div className="grid place-items-center size-16 rounded-full bg-secondary text-foreground">
                <Briefcase className="size-8 text-sage" />
              </div>
              <div>
                <p className="font-semibold text-lg">Ecosystem Data</p>
                <p className="text-sm text-muted-foreground mt-1">Export projects & hackathons</p>
              </div>
              <button className="mt-2 text-sm font-semibold px-5 py-2.5 rounded-full border border-border hover:border-gold/50 w-full transition-colors">Open Panel</button>
            </div>
          </Panel>
        </Reveal>
        
        <Reveal delay={0.1}>
          <Panel className="h-full">
            <div className="flex flex-col items-center justify-center text-center p-6 gap-4">
              <div className="grid place-items-center size-16 rounded-full bg-secondary text-foreground">
                <Shield className="size-8 text-dusty" />
              </div>
              <div>
                <p className="font-semibold text-lg">Security & Access</p>
                <p className="text-sm text-muted-foreground mt-1">Audit logs and permissions</p>
              </div>
              <button className="mt-2 text-sm font-semibold px-5 py-2.5 rounded-full border border-border hover:border-gold/50 w-full transition-colors">Open Panel</button>
            </div>
          </Panel>
        </Reveal>
      </div>
    </>
  );
}
