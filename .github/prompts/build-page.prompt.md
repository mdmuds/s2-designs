---
mode: agent
description: Build a single page (or major section) of the S2 Designs site to spec — design + architecture + motion + perf + a11y all enforced.
---

# Build a page / section

Tell me which page or section you want me to build (e.g., "Projects index", "Project detail", "Contact", "Home — Studio Snapshot section").

## Read first

1. [AGENTS.md](../../AGENTS.md)
2. [docs/PLAN.md](../../docs/PLAN.md) §5 (page-by-page spec) — find the section for the target page.
3. [docs/PRD.md](../../docs/PRD.md) — find the matching visual prompt block.
4. [.github/skills/design/SKILL.md](../skills/design/SKILL.md) — premium bar checklist (§1) is non-negotiable.
5. [.github/skills/motion/SKILL.md](../skills/motion/SKILL.md) — for any animation.
6. [.github/skills/nextjs-architecture/SKILL.md](../skills/nextjs-architecture/SKILL.md) — for routing/data shape.
7. [.github/skills/performance-seo/SKILL.md](../skills/performance-seo/SKILL.md) — metadata + image sizes.

## Process

1. Restate the page's single job in one sentence.
2. List the sections top-to-bottom with the **distinctive moment** for each (design skill §1).
3. Build server-first; introduce `"use client"` only at interactive leaves.
4. Add metadata (or `generateMetadata` for dynamic routes).
5. Use existing motion components (`<Reveal>`, `<MaskReveal>`, `<SplitHeadline>`) — extend, don't duplicate.
6. Use `next/image` with accurate `sizes`. `priority` only on the hero of the route.
7. Wire to `lib/site-config` and `lib/projects` — no hardcoded values.
8. Build dark mode in the same pass. If dark looks worse, fix dark.
9. Test 375 / 768 / 1280 / 1920.
10. Run the design skill §1 premium-bar checklist. Don't ship until every box checks.

## Deliverables

- The page/section files committed.
- A short note in chat with: distinctive moments used, screenshots of light + dark at 375 + 1280, Lighthouse scores if `next build` was run.
- Update [docs/PLAN.md](../../docs/PLAN.md) §10 checkboxes.
- Any new open question for the studio owner → [docs/PLAN.md](../../docs/PLAN.md) §11.
