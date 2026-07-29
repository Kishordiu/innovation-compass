import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import {
  AmbientBackdrop,
  Panel,
  Pill,
  Reveal,
  SectionHeading,
} from "@/components/ui-kit";
import { COLLEGE, ecosystemPillars, trustStats } from "@/data/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Innovation DNA — Student Innovation Ecosystem, Dhaanish Ahmed CoE" },
      {
        name: "description",
        content:
          "Innovation DNA is the AI-powered innovation and startup ecosystem for Dhaanish Ahmed College of Engineering — learning, projects, mentors, hackathons and startups in one place.",
      },
      { property: "og:title", content: "Innovation DNA — Student Innovation Ecosystem" },
      {
        property: "og:description",
        content:
          "Learning, projects, mentorship, hackathons and startup growth for students of Dhaanish Ahmed College of Engineering, Chennai.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackdrop />
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.9, 0.3, 1] }}
          className="max-w-3xl"
        >
          <Pill tone="gold">
            <Sparkles className="size-3.5" /> AI-guided innovation for every student
          </Pill>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-6xl">
            The innovation DNA of
            <span className="block text-muted-foreground">Dhaanish Ahmed College</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            One calm, elegant workspace where students learn, build projects, meet mentors, win
            hackathons and turn ideas into funded startups — guided by an AI mentor that knows
            their journey.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="shimmer-cta inline-flex items-center justify-center gap-2 rounded-full gold-gradient px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start your journey <ArrowRight className="size-4" />
            </Link>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {COLLEGE}
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <SectionHeading
            eyebrow="The ecosystem"
            title="Everything a student innovator needs, in one refined place"
            description="Six connected pillars that carry a student from first idea to funded venture, without the noise of a generic campus portal."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystemPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <Panel hover className="h-full">
                <span className="grid size-10 place-items-center rounded-xl bg-gold/18 font-display text-sm font-semibold text-gold-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.detail}
                </p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="surface-card overflow-hidden p-8 sm:p-12">
            <SectionHeading
              eyebrow="Trusted on campus"
              title="A measured, growing innovation culture"
            />
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-semibold sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="surface-card grid gap-6 p-8 sm:p-12 md:grid-cols-[1.5fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Bring your idea. We'll bring the ecosystem.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Sign in with your campus role and step into a dashboard built around your
                innovation journey.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Sign in <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
