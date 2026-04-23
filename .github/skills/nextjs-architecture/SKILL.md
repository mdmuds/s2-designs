---
name: nextjs-architecture
description: '**ARCHITECTURE SKILL** — Use when scaffolding the Next.js 15 app, deciding Server vs Client Components, structuring routes, wiring the MDX content pipeline, configuring fonts/themes/Tailwind/shadcn, building the project loader, or adding metadata/sitemap/robots. USE FOR: project setup, new routes, MDX schema and loader, layout/loading/error boundaries, theme provider, shadcn primitives, lib/site-config. DO NOT USE FOR: pure visual styling decisions (use design skill), motion (use motion skill), Lighthouse tuning (use performance-seo skill).'
---

# Next.js Architecture Skill — S2 Designs

Locked stack: **Next.js 15 (App Router) · TypeScript strict · Tailwind · shadcn/ui · next-themes · MDX · Framer Motion · Vercel.** Do not swap.

---

## 1. Project layout

```
app/
  layout.tsx              # html, fonts, theme provider, nav, footer
  page.tsx                # Home
  globals.css             # Tailwind layers, CSS vars for tokens
  projects/
    page.tsx              # Index (filterable grid)
    [slug]/
      page.tsx            # Detail
      not-found.tsx
  about/page.tsx
  services/page.tsx
  contact/page.tsx
  sitemap.ts
  robots.ts
  not-found.tsx
components/
  ui/                     # shadcn primitives only
  nav.tsx
  footer.tsx
  theme-toggle.tsx
  project-card.tsx
  hero.tsx
  contact-form.tsx
  motion/                 # reusable motion components (Reveal, MaskReveal, etc.)
content/
  projects/<slug>.mdx
lib/
  site-config.ts          # studio name, contact, social — single source of truth
  projects.ts             # MDX loader + Zod schema
  utils.ts                # cn() helper
public/
  projects/<slug>/...
  fonts/                  # only if self-hosting; prefer next/font
```

Co-locate small components inside the route file. Promote to `components/` only on second use.

---

## 2. Server vs Client Components

**Server by default.** Add `"use client"` only when the component needs:
- React state or effects (`useState`, `useEffect`, `useRef`)
- Browser APIs (`window`, `IntersectionObserver`, `matchMedia`)
- Framer Motion components that depend on viewport
- `next-themes` (`useTheme`)
- Event handlers (`onClick`, `onChange`, form interactivity)

**Push the `"use client"` boundary as deep as possible.** A page should stay server; only the interactive leaf is client. Pass server-fetched data down as props.

**Patterns:**
- `app/projects/page.tsx` → server. Loads MDX list, renders a client `<ProjectsGrid>` only if filtering needs state. If filter via URL params, keep it server.
- `<Nav>` → client (theme toggle, mobile menu state).
- `<Reveal>` motion wrapper → client. The content it wraps can still be server-rendered as `children`.

---

## 3. MDX content pipeline

Use `next-mdx-remote/rsc` (works in Server Components, no extra runtime).

```ts
// lib/projects.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  location: z.string(),
  type: z.enum(["Residential", "Commercial", "Hospitality", "Heritage"]),
  year: z.number().int(),
  status: z.enum(["Completed", "In Progress"]),
  area: z.string(),
  coverImage: z.string(),
  gallery: z.array(z.string()).default([]),
  excerpt: z.string(),
  featured: z.boolean().default(false),
});
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<ProjectFrontmatter[]> { /* read dir, parse matter, validate, sort by year desc */ }
export async function getProject(slug: string): Promise<{ frontmatter: ProjectFrontmatter; content: string } | null> { /* ... */ }
export async function getFeaturedProjects(limit = 3): Promise<ProjectFrontmatter[]> { /* ... */ }
```

**Rules:**
- Validate frontmatter with Zod. Fail loudly at build time if a project is malformed.
- The slug in frontmatter must match the filename. Enforce in the loader.
- `getAllProjects` is cached implicitly by RSC. No need for `unstable_cache`.
- Image paths in frontmatter are absolute from `/public` (e.g. `/projects/heritage-villa/cover.jpg`).

`generateStaticParams` for `app/projects/[slug]/page.tsx` returns `{ slug }[]` from `getAllProjects()`.

---

## 4. Routing & metadata

Every route exports a `metadata` object (or `generateMetadata` for dynamic routes):

```ts
export const metadata: Metadata = {
  title: "Projects · S2 Designs",
  description: "...",
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
};
```

- `app/layout.tsx` provides defaults via `metadata.template`.
- Dynamic project pages use `generateMetadata({ params })`.
- Per-project OG images: Phase 2 via `next/og` route.

Required system files:
- `app/sitemap.ts` — emits `/`, all static routes, all project slugs.
- `app/robots.ts` — allow all, point to sitemap.
- `app/not-found.tsx` — branded 404.

---

## 5. Theme + fonts

```ts
// app/layout.tsx
import { Fraunces, Inter } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
```

Apply both variables on `<html>`. Tailwind config maps:
```ts
fontFamily: {
  display: ["var(--font-display)", "serif"],
  sans: ["var(--font-body)", "system-ui", "sans-serif"],
}
```

`next-themes`: wrap children in `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`. The provider is a thin client component.

---

## 6. Tailwind tokens

Expose design tokens as CSS variables in `globals.css`, both light and dark blocks. Reference from Tailwind config so utilities stay semantic (`bg-bg`, `text-fg`, `border-border`, `text-accent`).

```css
:root { --bg: #F8F5EF; --fg: #1A1A1A; --muted: #6B6B6B; --accent: #B85C38; --border: #E5DFD3; }
.dark { --bg: #141210; --fg: #EFEAE0; --muted: #9A958A; --accent: #D97548; --border: #2A2723; }
```

Never hardcode hex in components. Always go through tokens.

---

## 7. shadcn/ui

- Install only the primitives you use (`button`, `input`, `textarea`, `label`, `select`, `dialog`, `sheet` for mobile nav).
- Restyle to match design tokens immediately on install — defaults will look generic.
- Strip `rounded-md` etc. to match the "mostly square" radius rule from the design skill.

---

## 8. Forms

Phase 1: Formspree action on the `<form>` element. Native HTML validation + Zod schema for client-side polish.
Phase 2: Migrate to a Next.js Route Handler (`app/api/contact/route.ts`) calling Resend. Keep the same Zod schema; share between client and server.

Honeypot field for spam. No reCAPTCHA in Phase 1.

---

## 9. site-config

```ts
// lib/site-config.ts
export const siteConfig = {
  name: "S2 Designs",
  tagline: "From Drafting to Crafting",
  url: "https://s2designs.co.in",
  email: "aamir.salar@s2designs.co.in",
  phone: "+91-9629718765",
  whatsapp: "919629718765",
  instagram: "s2designs",
  address: { /* ... */ },
  hours: "Mon–Sat · 10:00–19:00 IST",
} as const;
```

Never hardcode any of these in components. Import from `site-config`.

---

## 10. TypeScript discipline

- `tsconfig.json` strict: `true`. `noUncheckedIndexedAccess: true`.
- No `any`. No `// @ts-ignore`. Prefer `unknown` + narrow.
- Type all component props with explicit `interface` or `type`. Avoid `React.FC`.
- Server actions / route handlers validate inputs with Zod — never trust the wire.

---

## 11. Boundaries

- `loading.tsx` per route segment with a static skeleton (no spinners).
- `error.tsx` per route — branded, links back home.
- Wrap MDX render in a try/catch boundary so one broken project doesn't kill the index.

---

## 12. Quick references

- [docs/PLAN.md](../../../docs/PLAN.md) §6 (content schema) and §9 (folder structure).
- [.github/skills/design/SKILL.md](../design/SKILL.md) — visual rules.
- [.github/skills/motion/SKILL.md](../motion/SKILL.md) — Framer Motion patterns.
- [.github/skills/performance-seo/SKILL.md](../performance-seo/SKILL.md) — metadata, sitemap, Lighthouse.
