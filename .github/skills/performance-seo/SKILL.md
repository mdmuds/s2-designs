---
name: performance-seo
description: '**PERFORMANCE & SEO SKILL** — Use when adding metadata, sitemap, robots, structured data, OG images, configuring next/image budgets, font loading, bundle analysis, or chasing Lighthouse score. USE FOR: per-route metadata, app/sitemap.ts, app/robots.ts, JSON-LD on contact page, image sizes/priority decisions, font preload, Core Web Vitals fixes. DO NOT USE FOR: visual design (use design skill), animation (use motion skill).'
---

# Performance & SEO Skill — S2 Designs

Targets (must hit before launch): **Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO 100, Best Practices ≥ 95** on mobile, throttled. A slow site is an ugly site.

---

## 1. Metadata (every route)

Every `page.tsx` exports `metadata: Metadata` or `generateMetadata`. The root layout sets defaults:

```ts
// app/layout.tsx
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s · ${siteConfig.name}` },
  description: "Interior design and architecture studio in Bangalore. Residential, commercial, hospitality, heritage.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};
```

Per-route: override `title` and `description`. For project pages use `generateMetadata({ params })` and pull from MDX frontmatter.

---

## 2. Sitemap & robots

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const projects = await getAllProjects();
  const staticRoutes = ["", "/projects", "/about", "/services", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
  const projectRoutes = projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() }));
  return [...staticRoutes, ...projectRoutes];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${siteConfig.url}/sitemap.xml` };
}
```

---

## 3. Structured data (JSON-LD)

`LocalBusiness` JSON-LD on the contact page (and `Organization` on layout). Inject via `<script type="application/ld+json">` in a Server Component.

```tsx
const ld = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner", // also acceptable for the studio
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressRegion: "KA", postalCode: "560042", addressCountry: "IN" },
  sameAs: [`https://instagram.com/${siteConfig.instagram}`],
};
```

Per-project: `CreativeWork` JSON-LD on detail pages (Phase 2 acceptable).

---

## 4. Images

- **Always `next/image`.** Never raw `<img>`. Reject any PR that adds one.
- Provide accurate `sizes` based on layout. Examples:
  - Full-bleed hero: `sizes="100vw"`.
  - Project card in 3-col grid: `sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"`.
- `priority` only on the hero image of the current route. Everything else lazy.
- `placeholder="blur"` with generated `blurDataURL` (use `plaiceholder` or pre-generate). Never gray spinners.
- Source images: max 2400px on the long edge, ~500KB target after compression. Use `sharp` locally before committing.
- Decorative images: `alt=""`. Meaningful images: a sentence describing the space, not "image of room".

---

## 5. Fonts

- `next/font/google` for Fraunces and Inter — automatic self-hosting and `font-display: swap`.
- Subset to `latin` (and `latin-ext` only if needed).
- Variable axes: load Fraunces with `axes: ["opsz", "SOFT"]` only if you actually use them.
- Preload only the body font; display loads async.

---

## 6. Bundle discipline

- No client component should pull in a heavy library "just in case". Audit with `@next/bundle-analyzer` once before launch.
- Framer Motion is allowed app-wide but tree-shakes well — import named exports only (`import { motion } from "framer-motion"`).
- No moment.js / lodash — use date-fns or native, and individual lodash modules if absolutely needed.
- shadcn primitives only as installed; don't pull entire Radix packages.

---

## 7. Core Web Vitals checklist

| Metric | Target | How |
|---|---|---|
| **LCP** | < 2.5s | Hero image with `priority`, properly sized, AVIF/WebP via `next/image`. Avoid client-side data fetching for hero. |
| **CLS** | < 0.1 | Always set `width`/`height` (or `fill` + sized parent) on images. No layout shift from web fonts (next/font handles). |
| **INP** | < 200ms | No heavy work in client components on mount. Defer non-critical JS. |
| **TTFB** | < 0.8s | Static rendering wherever possible (`generateStaticParams` for projects). Vercel edge is fine. |

---

## 8. Lighthouse pre-flight (run before declaring "done")

1. `next build && next start` — never benchmark dev mode.
2. Chrome DevTools → Lighthouse → Mobile, Slow 4G, 4× CPU throttle.
3. Run on `/`, `/projects`, `/projects/<slug>`, `/contact`.
4. Fix any score < 90 (Performance) or < 95 (A11y/SEO).
5. Document any unavoidable misses in [docs/PLAN.md](../../../docs/PLAN.md) §12.

---

## 9. Analytics

- `@vercel/analytics` in Phase 1 (privacy-friendly, free).
- Add Plausible or Umami in Phase 2 if the studio wants more detail.
- Never add Google Analytics without explicit approval.

---

## 10. Accessibility floor (re-stated for SEO score)

- Single `<h1>` per page. Logical heading order.
- Form labels associated. Buttons have discernible text.
- Color contrast AA verified with a tool, not by eye.
- Skip-link in nav.
- `lang="en"` on `<html>`.
