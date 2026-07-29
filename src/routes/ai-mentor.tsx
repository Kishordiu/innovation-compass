import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Send, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AmbientBackdrop, Panel, Pill, Reveal } from "@/components/ui-kit";
import { careerCards, promptChips, roadmapCards, startupIdeas, projects } from "@/data/mock-data";

export const Route = createFileRoute("/ai-mentor")({
  head: () => ({
    meta: [
      { title: "AI Mentor — Innovation DNA" },
      {
        name: "description",
        content:
          "A friendly AI mentor for roadmaps, career advice, startup guidance and project suggestions, tailored to your campus innovation journey.",
      },
      { property: "og:title", content: "AI Mentor — Innovation DNA" },
      {
        property: "og:description",
        content: "Roadmaps, career advice and startup guidance from your personal AI mentor.",
      },
    ],
  }),
  component: AiMentorPage,
});

type Message = { id: number; from: "ai" | "user"; text: string };

const initialMessages: Message[] = [
  {
    id: 1,
    from: "ai",
    text: "Good morning, Mustaq. You're 68% through the AgriSense build and Smart India Hackathon entries close in two days. Want me to plan this week around both?",
  },
  {
    id: 2,
    from: "user",
    text: "Yes, and tell me what to prioritise for the hackathon submission.",
  },
  {
    id: 3,
    from: "ai",
    text: "Priority one: lock your team roster today. Priority two: record a 90-second field demo of the soil sensor — judges respond to real deployment. Priority three: prepare an impact slide with your 20-farm pilot numbers. I've drafted a checklist in your Project Hub.",
  },
];

function AiMentorPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: value }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "ai",
          text: "Here's how I'd approach that: break it into a two-week sprint, validate with three real users from campus, and bring the result to your Thursday session with Karthik. I've added the steps to your roadmap.",
        },
      ]);
      setTyping(false);
    }, 1400);
  };

  return (
    <>
      <AmbientBackdrop />
      <AppShell title="AI Mentor" subtitle="Personal guidance across learning, projects and startups">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <Panel className="flex h-full flex-col p-0">
              <div className="flex items-center gap-3 border-b border-border p-5">
                <span className="grid size-10 place-items-center rounded-xl gold-gradient text-gold-foreground">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold">Innovation DNA Mentor</p>
                  <p className="text-xs text-muted-foreground">Trained on your campus journey</p>
                </div>
              </div>

              <div className="flex-1 space-y-5 p-5">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={
                      message.from === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        message.from === "user"
                          ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground"
                          : "max-w-[90%] text-sm leading-relaxed text-foreground"
                      }
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                {typing ? (
                  <p className="text-sm text-muted-foreground">Thinking through your plan…</p>
                ) : null}
              </div>

              <div className="border-t border-border p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  {promptChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => send(chip)}
                      className="rounded-full border border-border bg-card px-3.5 py-2 text-xs text-muted-foreground transition-all duration-300 hover:border-gold/50 hover:text-foreground"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    send(input);
                  }}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about roadmaps, projects, internships…"
                    className="min-w-0 rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-gold/60"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="grid size-11 shrink-0 place-items-center rounded-xl gold-gradient text-gold-foreground transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Send className="size-4" />
                  </button>
                </form>
              </div>
            </Panel>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.06}>
              <Panel>
                <h3 className="font-display text-base font-semibold">Roadmaps for you</h3>
                <div className="mt-4 space-y-4">
                  {roadmapCards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-border p-4">
                      <p className="text-sm font-semibold">{card.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {card.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.1}>
              <Panel>
                <h3 className="font-display text-base font-semibold">Career advice</h3>
                <div className="mt-4 space-y-4">
                  {careerCards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-border p-4">
                      <p className="text-sm font-semibold">{card.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {card.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.14}>
              <Panel>
                <h3 className="font-display text-base font-semibold">Startup idea guidance</h3>
                <div className="mt-4 space-y-3">
                  {startupIdeas.map((idea) => (
                    <div key={idea.id} className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{idea.name}</p>
                        <p className="text-xs text-muted-foreground">{idea.pitch}</p>
                      </div>
                      <Pill tone="sage">{idea.validation}%</Pill>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.18}>
              <Panel>
                <h3 className="font-display text-base font-semibold">Project suggestions</h3>
                <div className="mt-4 space-y-3">
                  {projects.map((project) => (
                    <div key={project.id} className="rounded-2xl border border-border p-4">
                      <p className="text-sm font-semibold">{project.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Next: {project.milestones.find((m) => !m.done)?.label ?? "Publish results"}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>
          </div>
        </div>
      </AppShell>
    </>
  );
}
