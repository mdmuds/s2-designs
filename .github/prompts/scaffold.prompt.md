---
mode: agent
description: First-time scaffold of the S2 Designs Next.js project — stack, tokens, fonts, MDX pipeline, layout, theme, and a placeholder home page.
---

# Scaffold the S2 Designs project

Read first (in order):
1. [AGENTS.md](../../AGENTS.md)
2. [.github/copilot-instructions.md](../copilot-instructions.md)
3. [docs/PLAN.md](../../docs/PLAN.md) — especially §3 stack, §4 sitemap, §6 schema, §9 folder structure, §10 Phase 1 checklist
4. [.github/skills/design/SKILL.md](../skills/design/SKILL.md)
5. [.github/skills/nextjs-architecture/SKILL.md](../skills/nextjs-architecture/SKILL.md)

## Goal

Stand up a working Next.js 15 app with the locked stack, design tokens, fonts, theme, MDX pipeline, base layout (nav + footer), and a placeholder `/` that already feels editorial — not a CRA splash.

## Tasks

1. **Initialize** Next.js 15 + TypeScript (strict) + Tailwind + App Router + ESLint, with `pnpm` (or npm if pnpm unavailable). Use `src/`-less layout: `app/` at root.
2. **Install** dependencies:
   - `framer-motion`, `next-themes`, `lucide-react`, `clsx`, `tailwind-merge`, `zod`
   - `gray-matter`, `next-mdx-remote`
   - shadcn/ui CLI; init it, then add `button`, `input`, `textarea`, `label`, `select`, `sheet`.
3. **Tokens & theme**:
   - Define CSS variables in `app/globals.css` for `:root` and `.dark` per the design skill table.
   - Map them in `tailwind.config.ts` (or v4 inline config) to semantic utilities (`bg-bg`, `text-fg`, etc.).
   - Add `lib/utils.ts` with `cn()`.
4. **Fonts**: load Fraunces + Inter via `next/font/google`, expose as `--font-display` and `--font-body`, wire to Tailwind `fontFamily`.
5. **Theme provider**: add `components/theme-provider.tsx` (client) wrapping `next-themes`. Mount in `app/layout.tsx`.
6. **Site config**: `lib/site-config.ts` with the values from PLAN §1.
7. **MDX pipeline**: `lib/projects.ts` with the Zod schema and loader functions described in the architecture skill. Create one placeholder MDX at `content/projects/heritage-villa.mdx` with realistic copy and Unsplash image URLs (or commit one local image for now).
8. **Motion utilities**: `lib/motion.ts` with `ease` + `duration` constants, and `components/motion/reveal.tsx` (`<Reveal>`).
9. **Layout shell**: `app/layout.tsx` with `<Nav>` + `<Footer>` + theme provider + fonts. Build minimal but on-brand `Nav` (transparent → opaque on scroll) and `Footer` (warm-black bg, three columns).
10. **Home placeholder** at `app/page.tsx`: full-bleed hero with a placeholder Unsplash interior image, Fraunces 96px headline `From Drafting to Crafting.`, scroll cue, and ONE featured-project section pulling from MDX. No two-CTA hero. No template smell.
11. **System pages**: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`.
12. **Metadata defaults** in root layout per the performance-seo skill.
13. **README.md** at root with: setup commands, scripts, how to add a project, link to AGENTS.md.

## Acceptance

- `pnpm dev` runs with no warnings.
- `pnpm build` succeeds; `pnpm start` serves a working home page.
- Light AND dark mode both look intentional. Dark = warm sepia, not black.
- Lighthouse on `/` (built, throttled mobile) ≥ 85 Performance, ≥ 95 A11y/SEO. Note exact scores.
- Update [docs/PLAN.md](../../docs/PLAN.md) §10 Phase 1 checkboxes for items completed.
- Add one entry to §12 Decisions Log if you made any non-obvious call.

## Out of scope (don't do here)

- All other pages (`/projects`, `/about`, `/services`, `/contact`) — separate prompt.
- Real photography — Unsplash placeholders only.
- Contact form wiring — placeholder fields only.
- Per-project OG images.
