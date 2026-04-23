---
mode: agent
description: Add a new project to the portfolio — one MDX file + an image folder. No code changes.
---

# Add a project

Ask me (if not provided) for: title, slug, location, type, year, status, area, excerpt, and the source images.

## Read first

- [.github/instructions/mdx.instructions.md](../instructions/mdx.instructions.md) — frontmatter schema and copy rules.
- [docs/PLAN.md](../../docs/PLAN.md) §6 — content schema reference.

## Steps

1. Create `content/projects/<slug>.mdx` with valid frontmatter (Zod will validate at build).
2. Create folder `public/projects/<slug>/` and place `cover.jpg`, `01.jpg`, `02.jpg`, ... (compressed, max 2400px long edge, ~500KB each).
3. Write 200–500 words of body copy across H2 sections: `## The Brief`, `## The Approach`, `## Materials & Detail`, `## Outcome`. Confident, quiet, past tense (if completed). No banned words.
4. Run `pnpm build` locally (or `next build`) to confirm Zod validation passes and the project appears in `getAllProjects()`.
5. Verify the page renders at `/projects/<slug>` — gallery, sticky metadata sidebar, next-project nav.

## Done when

- Build succeeds.
- The project appears on `/projects` (and on `/` if `featured: true`).
- Lighthouse on the new detail page ≥ 90 Performance.
- No code changes were made — only `.mdx` + images.
