import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { AmbientBackdrop, FilterChips, Reveal } from "@/components/ui-kit";
import { NotificationCard } from "@/components/notification-card";
import { notifications } from "@/data/mock-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notification Center — Innovation DNA" },
      {
        name: "description",
        content:
          "Deadlines, hackathon alerts, mentor replies and learning recommendations, sorted by priority in one calm notification center.",
      },
      { property: "og:title", content: "Notification Center — Innovation DNA" },
      {
        property: "og:description",
        content: "Deadlines, hackathon alerts, mentor replies and learning recommendations.",
      },
    ],
  }),
  component: NotificationsPage,
});

const filters = ["All", "Deadlines", "Hackathons", "Mentors", "Learning"];

function NotificationsPage() {
  const [active, setActive] = useState("All");
  const visible =
    active === "All" ? notifications : notifications.filter((n) => n.category === active);

  return (
    <>
      <AmbientBackdrop />
      <AppShell title="Notification Center" subtitle="Everything that needs your attention">
        <FilterChips options={filters} active={active} onChange={setActive} />
        <div className="mt-8 space-y-4">
          {visible.map((notification, index) => (
            <Reveal key={notification.id} delay={index * 0.04}>
              <NotificationCard notification={notification} />
            </Reveal>
          ))}
        </div>
      </AppShell>
    </>
  );
}
