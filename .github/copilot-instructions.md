# S2 Designs — Agent Instructions

You are working on the S2 Designs portfolio website — a premium architecture & interior design studio site. Every change must uphold the standards below. When in doubt, consult [docs/PLAN.md](../docs/PLAN.md) and [docs/PRD.md](../docs/PRD.md).

## Non-negotiables

1. **This is NOT a generic architect website.** Reject template-feeling output. Every section should have at least one distinctive moment (typography flourish, motion, asymmetry, unexpected detail).
2. **Apple-grade polish.** Inspiration: apple.com — confident whitespace, deliberate typography, motion that feels physical not decorative, imagery treated like art. Not a clone — a benchmark for craft.
3. **Editorial, not corporate.** Think *Wallpaper* magazine, *Dezeen*, *Cereal* — not a real-estate agency.
4. **Performance is part of the design.** A slow site is an ugly site. Target Lighthouse Performance ≥ 90.

## Tech stack (locked)

- Next.js 15 (App Router) + TypeScript (strict)
- Tailwind CSS + shadcn/ui primitives only
- Framer Motion for animation
- next-themes for light/dark
- MDX + frontmatter for project content (no CMS in Phase 1)
- `next/image` for ALL images — never raw `<img>`
- Hosted on Vercel

Do not introduce new dependencies without justification. Do not swap the stack.

## Design tokens (locked unless user changes them)

| Token | Light | Dark |
|---|---|---|
| `bg` | `#F8F5EF` ivory | `#141210` warm black |
| `fg` | `#1A1A1A` charcoal | `#EFEAE0` cream |
| `muted` | `#6B6B6B` | `#9A958A` |
| `accent` | `#B85C38` terracotta | `#D97548` |
| `border` | `#E5DFD3` | `#2A2723` |

**Typography:** Fraunces (display, variable serif) + Inter (body). No other typefaces.
**Dark mode = warm sepia, never pure black.**

## Motion language

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) for entrances; `cubic-bezier(0.65, 0, 0.35, 1)` for movement.
- Durations: 200ms (micro), 400ms (standard), 700ms (image scales), 1200ms (hero parallax).
- Scroll reveals: stagger 60ms, threshold 25%, fade + 12px y-translate.
- No bounces, no springs with overshoot, no rotation gimmicks.
- All motion respects `prefers-reduced-motion`.

## Distinctive UI moments (at least one per page)

- Numbered project index (`01`, `02`, `03`) — printed-catalog feel
- Sticky metadata sidebar on project detail
- Horizontal-scroll gallery on project detail
- Cursor-follow scale on featured cards (desktop only)
- Letter-by-letter or word-by-word reveal on key headlines
- Image-reveal masks (clip-path inset → 0) on hero entrances

## Code conventions

- Server Components by default; `"use client"` only when needed (state, motion, theme).
- Co-locate small components; promote to `components/` only when reused.
- Route segment files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`.
- Use `cn()` helper from `lib/utils.ts` for conditional classes.
- Tailwind class order: layout → box → typography → color → state → motion.
- No inline styles unless dynamic (parallax transforms, etc.).
- Type everything. No `any`. No `// @ts-ignore`.
- Site-wide constants (studio name, social links, contact) live in `lib/site-config.ts` — never hardcode.

## Content rules

- Every project lives at `content/projects/<slug>.mdx` with frontmatter matching the schema in PLAN.md.
- Images live at `public/projects/<slug>/`.
- Adding a project = ONE `.mdx` + a folder of images. No code changes.
- Placeholder copy must be plausible (no "Lorem ipsum"); use realistic studio language.
- Placeholder images: Unsplash architecture/interior photography that matches the warm palette.

## Accessibility

- All interactive elements keyboard-reachable with visible focus rings (use accent color).
- All images have meaningful `alt` text.
- Color contrast ≥ WCAG AA in both themes.
- Form fields have associated `<label>`s.
- Honor `prefers-reduced-motion`.

## SEO

- Every route exports `metadata` with title, description, openGraph, twitter.
- `app/sitemap.ts` and `app/robots.ts` always kept current.
- `LocalBusiness` JSON-LD on contact page.
- Per-project OG images via `next/og` (Phase 2 acceptable).

## When generating new sections or pages

1. Check PLAN.md for whether the page/section is already specified.
2. Match the motion + typography + spacing language already established.
3. Add at least one distinctive moment (see list above).
4. Verify mobile (375px), tablet (768px), desktop (1280px), wide (1920px).
5. Test dark mode. If it looks worse than light, fix dark — don't ship.

## What to refuse

- Stock-template hero patterns ("Hi, I'm X. I build Y." with two CTA buttons).
- Carousel sliders with dots (use horizontal scroll or grid).
- Bootstrap/Material aesthetics.
- Emoji as primary iconography (use Lucide icons).
- Generic testimonial cards with circle avatars + 5 stars.
- "Trusted by" logo strips.
