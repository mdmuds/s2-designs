---
applyTo: "**/*.{ts,tsx}"
---

# TypeScript / React rules — S2 Designs

Strict-mode discipline. These rules apply to every `.ts` and `.tsx` file.

## TypeScript

- `strict: true` — no `any`, no `// @ts-ignore`, no `// @ts-expect-error` without a tracked TODO.
- Prefer `interface` for component props, `type` for unions/aliases.
- Validate all external data (frontmatter, form input, API) with Zod.
- Use `as const` for literal config objects. Export `type` aliases via `z.infer`.
- No `React.FC`. Type props explicitly: `function Card({ title }: { title: string })` or via `interface CardProps`.

## React / Next.js

- Server Components by default. Add `"use client"` ONLY for state, effects, browser APIs, motion, theme, or event handlers.
- Push the `"use client"` boundary as deep as possible.
- Use `next/image` for ALL images. Never `<img>`.
- Use `next/link` for internal navigation. Never `<a>` to internal routes.
- Use `next/font` for fonts. Never `<link>` to Google Fonts.
- Co-locate small components inside the route file; promote to `components/` on second use.
- Every route segment may have `loading.tsx` (skeleton, no spinner) and `error.tsx` (branded).

## Styling

- Tailwind only. No CSS modules, no styled-components, no inline styles (except dynamic transforms for parallax).
- Use the `cn()` helper from `lib/utils.ts` for conditional classes.
- Class order: layout → box → typography → color → state → motion. Example:
  `flex items-center gap-4 px-6 py-3 text-sm text-fg hover:text-accent transition-colors`
- Use semantic token utilities: `bg-bg`, `text-fg`, `text-muted`, `text-accent`, `border-border`. Never hardcode hex.
- Radius: default to `rounded-none` or `rounded-sm`. Never `rounded-xl`/`rounded-2xl`/`rounded-full` (except pills/avatars).

## Imports

- Path alias `@/*` for everything inside the project root.
- Group imports: react/next → external → `@/` → relative → types.
- Named exports preferred over default for components (easier refactors). Page/layout files use `default` (Next requirement).

## Constants

- Studio info, contact, social, address, hours → import from `@/lib/site-config`. Never hardcode.
- Motion tokens (easing, duration) → import from `@/lib/motion`.

## Accessibility

- All interactive elements must be keyboard-reachable with a visible `:focus-visible` ring (2px accent, 2px offset).
- Icon-only buttons require `aria-label`.
- Form fields require associated `<label>` (visible or `sr-only`).
- Images: meaningful `alt` (a sentence about the space) or `alt=""` if decorative.

## Forbidden in this codebase

- `useEffect` for data fetching. Fetch in Server Components or Route Handlers.
- `dangerouslySetInnerHTML` except for JSON-LD `<script>` blocks.
- Global state libraries (Redux, Zustand) — Phase 1 has no state needs that warrant them.
- Carousel libraries. Use horizontal scroll or grid.
- Icon libraries other than `lucide-react`.
