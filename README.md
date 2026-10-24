![INNOVATION DNA — bespoke brushed-metal project artwork](./assets/readme-metal-hero.svg)

# INNOVATION DNA

**A student innovation-ecosystem prototype connecting ideas, learning, projects, and mentorship pathways.**

Innovation DNA explores how a student could move from curiosity to a concrete project without navigating disconnected tools. The current repository provides a React-based application shell and interaction patterns for the concept; it should not be mistaken for a fully integrated campus-wide service.

## The idea-to-project pathway

```text
Interest / curiosity
        │
        ▼
Discover learning and challenge pathways
        │
        ▼
Connect to a project or mentor
        │
        ▼
Organise the work and next steps
        │
        ▼
Carry the project beyond submission day
```

## What the interface is designed to support

- **Project discovery:** A structured space to surface work and opportunities.
- **Mentorship pathways:** A place to connect a learning goal with a person or project.
- **Learning context:** A clearer relationship between skills, practice, and outcomes.
- **Continuity:** A project can remain meaningful after an event or submission ends.

These are the product direction; treat integrations such as authentication, persistent project records, storage, and AI-assisted mentoring as future work unless the relevant service is configured and verified in the running build.

## Stack

React · TypeScript · TanStack Router / Start · Tailwind CSS · Motion

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/Kishordiu/innovation-compass.git
cd innovation-compass
npm install
npm run dev
```

Use the local URL printed by Vite.

## Status and next validation steps

**Status: front-end innovation-ecosystem prototype.** Before presenting it as a live campus platform, connect and test the required identity, persistence, permission, notification, and mentoring services. Confirm data ownership and access boundaries before loading real student or institutional information.

---

<p align="center"><sub>DIU FOUNDRY · LEARNING / COMMUNITY / PRODUCT SYSTEMS</sub></p>
