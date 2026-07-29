import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, GraduationCap, Lock, Mail } from "lucide-react";
import { AmbientBackdrop } from "@/components/ui-kit";
import { colleges, roles, roleProfiles, type Role } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { useRole } from "@/hooks/use-role";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Innovation DNA" },
      {
        name: "description",
        content:
          "Choose your campus role and sign in to the Innovation DNA ecosystem for Dhaanish Ahmed College of Engineering, Chennai.",
      },
      { property: "og:title", content: "Sign in — Innovation DNA" },
      {
        property: "og:description",
        content: "Role-based access for students, faculty, mentors, deans and administrators.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("Student");
  const [college, setCollege] = useState(colleges[0]);
  const profile = roleProfiles[role];

  const { setRole: setContextRole } = useRole();

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-14">
      <AmbientBackdrop />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl gold-gradient font-display text-sm font-bold text-gold-foreground">
            iD
          </span>
          <span className="font-display text-base font-semibold">Innovation DNA</span>
        </Link>

        <div className="surface-card mt-8 p-7 sm:p-9">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue your innovation journey.
          </p>

          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              setContextRole(role);
              navigate({ to: "/dashboard" });
            }}
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Your role
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {roles.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                      option === role
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-gold/45 hover:text-foreground",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="college"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                College
              </label>
              <div className="relative mt-3">
                <GraduationCap className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="college"
                  value={college}
                  onChange={(event) => setCollege(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-gold/60"
                >
                  {colleges.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                Campus email
              </label>
              <div className="relative mt-3">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  defaultValue={profile.email}
                  key={profile.email}
                  className="w-full rounded-xl border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold/60"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Password
                </label>
                <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-3">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  defaultValue="innovationdna"
                  className="w-full rounded-xl border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-gold/60"
                />
              </div>
            </div>

            <button
              type="submit"
              className="shimmer-cta flex w-full items-center justify-center gap-2 rounded-xl gold-gradient py-3.5 text-sm font-semibold text-gold-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Continue as {role} <ArrowRight className="size-4" />
            </button>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Signing in as <span className="text-foreground">{profile.name}</span> · {college}
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
