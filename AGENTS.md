# S2 Designs — Agent Entry Point

Any agent working in this repo: read this first, then proceed.

## What this is

A premium portfolio website for **S2 Designs** (interior design + architecture studio, Bangalore). Editorial, magazine-style. Apple-grade craft. Not a template.

## Read order (mandatory before coding)

1. [.github/copilot-instructions.md](.github/copilot-instructions.md) — non-negotiables, stack, tokens, conventions.
2. [docs/PLAN.md](docs/PLAN.md) — sitemap, page specs, content schema, folder structure, roadmap.
3. [docs/PRD.md](docs/PRD.md) — visual spec per page (originally for Stitch; treat as design intent).
4. [.github/skills/design/SKILL.md](.github/skills/design/SKILL.md) — premium bar, tokens, motion, anti-patterns.

## Skills index

Load the relevant SKILL.md before acting in that domain:

| Skill | When to load |
|---|---|
| [design](.github/skills/design/SKILL.md) | Any UI work — pages, sections, components, styles, MDX templates. |
| [nextjs-architecture](.github/skills/nextjs-architecture/SKILL.md) | App Router structure, RSC vs client, routing, MDX pipeline, data loading. |
| [motion](.github/skills/motion/SKILL.md) | Framer Motion — scroll reveals, parallax, headline reveals, page transitions. |
| [performance-seo](.github/skills/performance-seo/SKILL.md) | Metadata, OG, sitemap, robots, Lighthouse, image budgets, font loading. |

## Scoped instructions

| File | Applies to |
|---|---|
| [.github/instructions/tsx.instructions.md](.github/instructions/tsx.instructions.md) | `**/*.tsx`, `**/*.ts` |
| [.github/instructions/mdx.instructions.md](.github/instructions/mdx.instructions.md) | `content/**/*.mdx` |

## Reusable prompts

- [.github/prompts/scaffold.prompt.md](.github/prompts/scaffold.prompt.md) — first-time scaffold of the Next.js project.
- [.github/prompts/build-page.prompt.md](.github/prompts/build-page.prompt.md) — build a new page or section to spec.
- [.github/prompts/add-project.prompt.md](.github/prompts/add-project.prompt.md) — add a new MDX project entry.

## Working agreement

- Implement, don't only suggest. Ship working code.
- Update [docs/PLAN.md](docs/PLAN.md) §10 (Phased Roadmap) checkboxes as you complete items.
- Add new decisions to [docs/PLAN.md](docs/PLAN.md) §12 (Decisions Log) with date + rationale.
- Open questions for the studio owner go in [docs/PLAN.md](docs/PLAN.md) §11.
- If a design choice violates the locked tokens or anti-patterns, refuse and propose an alternative.
