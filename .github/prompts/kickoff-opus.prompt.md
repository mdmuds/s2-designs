---
mode: agent
description: Kickoff message to give Claude Opus to begin building the S2 Designs site end-to-end.
---

# Kickoff — S2 Designs (give this to Opus)

You are picking up the S2 Designs portfolio website. The brief, design system, architecture, motion language, and acceptance bar are already specified. Your job is to execute.

## Onboarding (do this first, in order)

1. Read [AGENTS.md](../../AGENTS.md) — entry point.
2. Read [.github/copilot-instructions.md](../copilot-instructions.md) — non-negotiables.
3. Read [docs/PLAN.md](../../docs/PLAN.md) end-to-end.
4. Read [docs/PRD.md](../../docs/PRD.md) end-to-end.
5. Skim every file in `.github/skills/*/SKILL.md`. You will load the relevant one in full before each task.
6. Skim `.github/instructions/*.instructions.md`.

## Execution plan

Run these prompts in sequence. After each, report status and wait for "go" before the next.

1. **Scaffold:** [.github/prompts/scaffold.prompt.md](scaffold.prompt.md)
2. **Build Projects index** (`/projects`) using [.github/prompts/build-page.prompt.md](build-page.prompt.md).
3. **Build Project detail** (`/projects/[slug]`) — same prompt.
4. **Build About** (`/about`) — same prompt.
5. **Build Services** (`/services`) — same prompt.
6. **Build Contact** (`/contact`) — same prompt. Wire form to Formspree (placeholder action URL — add to PLAN §11 as an open question).
7. **Polish pass:** dark-mode review, 375/768/1280 review, motion review, Lighthouse pass on every route. Document scores in PLAN §12.
8. **Seed content:** add 4 more placeholder projects via [.github/prompts/add-project.prompt.md](add-project.prompt.md) — varied types (Residential, Commercial, Hospitality, Heritage).

## Operating rules

- Implement, don't only suggest.
- Refuse template patterns. If unsure, default to *more* editorial / *less* generic.
- Update [docs/PLAN.md](../../docs/PLAN.md) §10 checkboxes as you complete items, §12 for any decision, §11 for any open question.
- Do not introduce dependencies outside the locked stack without flagging it as a decision in PLAN §12.
- Do not ship a section that fails the premium-bar checklist in [.github/skills/design/SKILL.md](../skills/design/SKILL.md) §1.

## What "done" looks like for Phase 1

- All Phase 1 checkboxes in [docs/PLAN.md](../../docs/PLAN.md) §10 ticked.
- Site runs locally, builds clean, deploys to a Vercel preview.
- Lighthouse mobile (built + throttled) ≥ 90 Perf, ≥ 95 A11y, 100 SEO on every route.
- Light AND dark mode shipped together.
- Brother (the studio owner) can review a preview URL and approve content/copy direction.
