# S2 Designs — Portfolio Website Plan

> Living document. Phase 1 = mockup for client (brother) approval. Phase 2 = real content + production launch.

---

## 1. Project Overview

A premium portfolio website for **S2 Designs**, an interior design & architecture studio based in Bangalore. Goal: an editorial, magazine-style site that converts visitors into qualified leads.

- **Studio:** S2 Designs
- **Domain:** s2designs.co.in (already owned)
- **Location:** Bangalore, Karnataka 560042
- **Email:** aamir.salar@s2designs.co.in
- **Phone / WhatsApp:** +91-9629718765
- **Instagram:** @s2designs *(to confirm)*
- **Tagline:** *From Drafting to Crafting* *(placeholder — open to refinement)*

---

## 2. Goals & Success Criteria

| Goal | Success metric |
|---|---|
| Showcase featured projects beautifully | Visitors view ≥ 2 project detail pages per session |
| Generate qualified inquiries | Working contact form + 1-tap WhatsApp / Call / Email |
| Be easy for the studio to maintain | Adding a new project = drop an `.mdx` file + images |
| Rank well on Google for "interior designer Bangalore" | SEO meta, sitemap, OG images, fast Lighthouse score |
| Look distinctive (not a template) | Custom palette, typography, motion language |

---

## 3. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSR/SSG, image optimization, file-based routing, best-in-class SEO |
| Styling | **Tailwind CSS** + **shadcn/ui** | Rapid, consistent, accessible primitives |
| Animation | **Framer Motion** | Scroll reveals, hero parallax, hover effects |
| Content | **MDX + JSON frontmatter** in `/content/projects/` | Brother-editable without touching code |
| Images | **`next/image`** + `/public/projects/<slug>/` | Auto WebP, lazy loading, responsive |
| Theme | **next-themes** | Light + dark mode toggle |
| Forms | **Formspree** (free tier) → upgrade later to **Resend + Next.js API route** | No backend in Phase 1 |
| Hosting | **Vercel** | Free, made by Next.js team, custom domain in 2 min, auto-deploys from GitHub |
| Analytics | **Vercel Analytics** + **Plausible** *(Phase 2)* | Privacy-friendly, lightweight |

---

## 4. Sitemap

```
/                          Home — hero, featured 3 projects, about teaser, services snapshot, CTA
/projects                  Projects index — full filterable grid
/projects/[slug]           Project detail — gallery, narrative, sticky metadata sidebar
/about                     Studio story, philosophy, team
/services                  Architecture / Interior Design / Turnkey / Consulting
/contact                   Form + direct contact panel (WhatsApp, IG, call, email, map)
```

System pages: `sitemap.xml`, `robots.txt`, `404`, custom `500`.

---

## 5. Page-by-Page Spec

### 5.1 Home `/`
- **Hero:** full-viewport image, large serif headline, subtle parallax, single CTA → `/contact`
- **Featured Work:** 3 hand-picked projects, asymmetric grid (one large + two stacked)
- **Studio Snapshot:** 2-column — image + short studio intro, link → `/about`
- **Services strip:** 4 icons + one-liner each, link → `/services`
- **Testimonial:** single rotating quote
- **Instagram preview:** 4 latest posts (Phase 2 — Instagram Basic Display API or static for now)
- **Footer CTA:** "Have a project in mind?" → `/contact`

### 5.2 Projects `/projects`
- Filter chips: *All · Residential · Commercial · Hospitality · Heritage*
- Numbered grid (`01`, `02`, `03`...) — editorial print-portfolio feel
- Hover: image scales, overlay reveals title + location
- Click → detail page

### 5.3 Project Detail `/projects/[slug]`
- Full-bleed cover image
- Sticky left sidebar: Title, Location, Type, Year, Status, Area
- Right column: long-form design narrative (MDX)
- Horizontal-scroll gallery
- "Next project →" navigation at bottom

### 5.4 About `/about`
- Studio story (3 paragraphs)
- Philosophy / approach (3 pillars with icons)
- Team grid (photo + name + role) — *placeholder until real data*
- Process timeline (Discover → Design → Detail → Deliver)

### 5.5 Services `/services`
Proposed offerings (confirm with brother):
1. **Architecture** — ground-up residential & commercial design
2. **Interior Design** — bespoke interiors, FF&E specification
3. **Turnkey Execution** — design + build, single point of accountability
4. **Design Consulting** — concept advisory, space planning

Each: hero image, description, "what's included" list, sample projects.

### 5.6 Contact `/contact`
**Two-column layout:**

**Left — Form** (Formspree action)
- Name *
- Phone *
- Email *
- Project description *
- Total project budget (select)
- Project completion timeline (select)
- How did you hear about us? (select)
- Submit → success state

**Right — Reach us directly**
- 📞 **Call** → `tel:+919629718765`
- 💬 **WhatsApp** → `https://wa.me/919629718765?text=Hi%20S2%20Designs,%20I'd%20like%20to%20discuss%20a%20project`
- 📷 **Instagram** → `https://instagram.com/s2designs`
- ✉️ **Email** → `mailto:aamir.salar@s2designs.co.in`
- 📍 **Google Maps** embed of studio location
- Studio address + working hours

---

## 6. Content Schema

Each project lives at `content/projects/<slug>.mdx`:

```mdx
---
title: Heritage Villa Restoration
slug: heritage-villa
location: Indiranagar, Bangalore
type: Residential          # Residential | Commercial | Hospitality | Heritage
year: 2024
status: Completed          # Completed | In Progress
area: 4200 sqft
coverImage: /projects/heritage-villa/cover.jpg
gallery:
  - /projects/heritage-villa/01.jpg
  - /projects/heritage-villa/02.jpg
  - /projects/heritage-villa/03.jpg
excerpt: A century-old bungalow reimagined for modern family living.
featured: true
---

## The Brief
Long-form design narrative in markdown...

## The Approach
...
```

**Adding a new project = create one `.mdx` file + drop images in matching folder.** No code changes.

---

## 7. Design System

### Palette (warm editorial neutrals — distinct from reference)
| Token | Light | Dark |
|---|---|---|
| `bg` | `#F8F5EF` ivory | `#141210` warm black |
| `fg` | `#1A1A1A` charcoal | `#EFEAE0` cream |
| `muted` | `#6B6B6B` | `#9A958A` |
| `accent` | `#B85C38` terracotta | `#D97548` |
| `border` | `#E5DFD3` | `#2A2723` |

### Typography
- **Display:** Fraunces (variable serif — architectural character)
- **Body:** Inter (clean, neutral)
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 72 / 96

### Motion language
- Page transitions: 300ms fade + 8px y-translate
- Scroll reveals: stagger children, threshold 30%
- Hover on project card: image scale 1.05, 600ms ease-out
- No bounces, no spring overshoots — keep it editorial

### Distinctive UI moments
- Numbered project index (`01`, `02`...) like a printed catalog
- Horizontal-scroll gallery on detail pages
- Sticky metadata sidebar that scrolls with narrative
- Dark mode = warm sepia, NOT pure black
- Cursor-follow subtle scale on featured images (desktop only)

---

## 8. SEO & Performance

- Per-page `<title>`, `<meta description>`, OpenGraph, Twitter Card
- Auto-generated `sitemap.xml` and `robots.txt`
- Per-project OG image (auto-generated via `next/og` — Phase 2)
- `next/image` for all imagery (WebP, responsive `srcset`)
- Target Lighthouse: Performance ≥ 90, SEO 100, Accessibility ≥ 95
- Structured data: `LocalBusiness` JSON-LD on contact page

---

## 9. Folder Structure

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── projects/
│   │   ├── page.tsx                # Index
│   │   └── [slug]/page.tsx         # Detail
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                         # shadcn primitives
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── project-card.tsx
│   ├── hero.tsx
│   ├── theme-toggle.tsx
│   └── contact-form.tsx
├── content/
│   └── projects/
│       ├── heritage-villa.mdx
│       └── ...
├── lib/
│   ├── projects.ts                 # MDX loader
│   └── site-config.ts              # studio info, social links
├── public/
│   └── projects/
│       └── heritage-villa/
│           ├── cover.jpg
│           └── 01.jpg
├── docs/
│   └── PLAN.md                     # this file
└── README.md
```

---

## 10. Phased Roadmap

### Phase 1 — Mockup (this round)
- [x] Scaffold Next.js + Tailwind + next-themes (shadcn primitives deferred — none needed yet)
- [x] Site config, fonts, color tokens, dark mode
- [x] Nav + Footer + theme toggle
- [x] Home page
- [x] Projects index + detail template
- [x] 5 placeholder projects (Unsplash images, editorial narratives)
- [x] About, Services, Contact pages
- [x] Contact form (Formspree-ready, placeholder endpoint)
- [x] Animations + scroll reveals
- [x] SEO basics (meta, sitemap, robots, JSON-LD on contact)
- [ ] Run locally → share screenshots/preview URL with brother

### Phase 2 — Real content & launch (after approval)
- [ ] Replace placeholder projects with real content + photos
- [ ] Real about/services copy
- [ ] Wire contact form to Formspree or Resend
- [ ] Custom per-project OG images
- [ ] Connect domain on Vercel
- [ ] Google Search Console + sitemap submission
- [ ] Analytics

### Phase 3 — Nice-to-haves (later)
- [ ] Journal / Blog section
- [ ] Real Instagram feed integration
- [ ] Press / Accolades page
- [ ] Multilingual (English + Kannada/Hindi) — if requested
- [ ] CMS upgrade (Sanity/Contentful) if brother prefers GUI editing

---

## 11. Open Questions (need brother's input before Phase 2)

1. Confirm Instagram handle — is it actually `@s2designs`?
2. Full studio address for Google Maps embed? (currently using a placeholder Indiranagar pin)
3. Working hours? (placeholder: Mon–Sat · 10:00–19:00 IST)
4. Final list of services and the specific scope of each?
5. Tagline — keep "From Drafting to Crafting" or refine?
6. Logo / wordmark — does he have one, or should we commission?
7. List of awards / press mentions for an Accolades page?
8. List of past clients willing to give testimonials?
9. Formspree endpoint — create a free Formspree project and replace `REPLACE_ME` in `components/contact-form.tsx`. Without it the form shows a success state but does not deliver mail.

---

## 12. Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-23 | Next.js 15 + Tailwind + MDX | Best balance of DX, SEO, maintainability |
| 2026-04-23 | Vercel hosting | Free, zero-config for Next.js |
| 2026-04-23 | Custom warm palette over reference's cool grays | Differentiation, warmth fits "crafting" narrative |
| 2026-04-23 | Fraunces serif over Playfair | More architectural character |
| 2026-04-23 | MDX files over CMS for Phase 1 | Faster to build, brother can graduate to CMS later |
| 2026-04-23 | Dark mode = warm sepia, not black | Matches editorial aesthetic |
| 2026-04-23 | React 19 (auto-pulled by Next 15 + next-mdx-remote 5) | next-mdx-remote v5 ships React 19 JSX runtime; React 18 caused prerender failures. Aligned everything to React 19. |
| 2026-04-23 | shadcn/ui CLI not initialised in Phase 1 | None of the Phase 1 components needed Radix primitives — native form controls + custom styles cover Contact and Nav. Will add when Sheet/Dialog become necessary. |
| 2026-04-23 | Vanilla npm instead of pnpm | pnpm not available in target environment. npm install is reproducible enough for Phase 1. |
