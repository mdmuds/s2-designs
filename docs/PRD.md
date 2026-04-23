# S2 Designs — Visual PRD (for Stitch by Google)

> Paste sections of this doc into Stitch to generate visual mockups. Each section below is a self-contained prompt block. Designed to produce an editorial, Apple-grade aesthetic — not a generic architect template.

---

## Master Prompt (use as system context in Stitch)

> Design a premium portfolio website for **S2 Designs**, an interior design and architecture studio in Bangalore, India. The aesthetic is editorial and magazine-like — think *Wallpaper*, *Cereal*, *Dezeen* — combined with the deliberate craft and motion of apple.com (as inspiration, not imitation).
>
> **Brand vibe:** quiet luxury, warm minimalism, architectural precision, human warmth.
>
> **Palette:** ivory background `#F8F5EF`, charcoal text `#1A1A1A`, warm muted gray `#6B6B6B`, terracotta accent `#B85C38`, soft border `#E5DFD3`. Dark mode uses warm sepia (`#141210` background, `#EFEAE0` text) — never pure black.
>
> **Typography:** Fraunces (variable serif) for headlines and display — used at large sizes with tight tracking and generous leading. Inter for all body text and UI. Avoid Playfair, avoid Montserrat.
>
> **Layout philosophy:** generous whitespace, asymmetric grids, large editorial imagery treated like art. No carousel sliders, no logo strips, no template-feeling hero with two CTA buttons. Every section should have at least one distinctive moment — a numbered index, a sticky sidebar, a cursor-follow effect, an image-mask reveal.
>
> **Motion language:** confident and physical. Image-reveal masks (clip-path inset opening), word-by-word headline reveals, parallax on hero imagery, scroll-triggered fades with 60ms stagger. No bounces, no overshoot springs.
>
> **Imagery:** warm-toned interior and architectural photography — natural light, neutral palettes, lived-in elegance. NOT cold, NOT futuristic, NOT corporate.
>
> **Audience:** affluent homeowners, hospitality investors, and commercial clients in India looking for thoughtful, bespoke design.
>
> Site is built in Next.js + Tailwind. Deliver mobile-first responsive layouts at 375px, 768px, and 1440px.

---

## Pages to Generate

### 1. Home `/`

**Purpose:** Stop the scroll. Establish craft. Funnel to projects or contact.

**Sections (top to bottom):**

1. **Sticky transparent nav** — wordmark "s2 designs" left (lowercase Fraunces, tight tracking), nav links right (Projects · About · Services · Contact), small "Get in Touch" outline button. Becomes opaque ivory with bottom border on scroll.

2. **Hero** — full viewport. Single full-bleed warm-toned interior photograph (e.g., a sunlit living room with linen drapes). Headline overlaid bottom-left in ivory: *"From Drafting to Crafting."* in Fraunces 96px, line-height 1, 2 lines, with the second line indented. Below: one line of body text in 18px Inter. No buttons. Subtle scroll-cue chevron bottom center. Top-right corner shows current city + local time in tiny mono ("Bangalore · 14:32 IST").

3. **Featured Work intro** — left-aligned, two columns. Left: small uppercase eyebrow "Selected Work · 2024–2026". Right: a single sentence in Fraunces 32px, e.g. *"Six projects that defined our last two years."*

4. **Featured Work grid** — three projects in an asymmetric layout:
   - Project 01: large image, left half, full-bleed to viewport edge
   - Project 02: smaller image, top-right
   - Project 03: smaller image, bottom-right
   Each card shows: numbered index `01` in serif top-left, project title in Fraunces 24px below image, location + type in Inter 14px muted. On hover, image scales 1.05 over 700ms; an arrow icon slides in from the right beside the title.

5. **Studio snapshot** — split layout. Left: a portrait or studio interior image taking 5 of 12 columns. Right: heading "A studio of two disciplines" in Fraunces 48px, three paragraphs of body, and a quiet text link "About the studio →".

6. **Services strip** — full-width, ivory-on-ivory with hairline dividers. Four services in a row: *Architecture · Interior Design · Turnkey Execution · Design Consulting*. Each is a column with a small Lucide icon in terracotta, name in Fraunces 24px, one-line description in Inter 14px muted, "Learn more →".

7. **Single testimonial** — centered, max-width 720px. Large opening quote glyph in terracotta. Quote in Fraunces 32px italic light-weight. Attribution in Inter 14px small caps below.

8. **Contact CTA banner** — full-width, charcoal background, ivory text. "Have a space in mind?" in Fraunces 64px on left. Right: a large outline "Start a conversation" button + smaller WhatsApp / Email / Call icons.

9. **Footer** — three columns on warm-black background. Left: wordmark + tagline. Middle: nav. Right: contact (email, phone, IG). Bottom strip: ©2026 s2 designs · All rights reserved · Privacy.

---

### 2. Projects Index `/projects`

**Purpose:** Browse the full body of work.

1. **Page header** — left-aligned. Eyebrow "Projects". Headline in Fraunces 72px: *"Spaces, in chronological order."* Below: filter chips (All · Residential · Commercial · Hospitality · Heritage). Active chip has terracotta underline.

2. **Numbered grid** — 2 columns desktop, 1 column mobile. Each project card:
   - Numbered index `01 / 24` in tiny mono top-left
   - Image (4:5 ratio), object-cover
   - On hover: image scales, an overlay reveals title + location + year from the bottom
   - Below image: title in Fraunces 28px, location · type · year in Inter 14px muted
   - Generous vertical spacing between rows (96px desktop)

3. **Footer** (same as home).

---

### 3. Project Detail `/projects/[slug]`

**Purpose:** Sell the depth of the work.

1. **Full-bleed cover image** — 100vw × 80vh. Headline overlaid bottom-left in ivory: project title in Fraunces 80px. Below: one line of metadata.

2. **Sticky metadata sidebar + scrolling narrative** — two-column layout starts here.
   - **Left sidebar (sticky, 4 of 12 cols):** Title repeated small, then a metadata list — `Location`, `Type`, `Year`, `Status`, `Area` — each row is a hairline-divided pair (label muted, value charcoal).
   - **Right column (8 of 12 cols):** scrolling narrative in MDX. Section headings in Fraunces 32px. Body in Inter 18px, line-height 1.7, max-width 640px.

3. **Horizontal-scroll gallery** — full viewport width, breaks out of the column grid. 4–6 images of varying widths (some portrait, some landscape) scrolled horizontally with snap. Drag cursor on desktop, swipe on mobile. Caption appears in the corner for the active image.

4. **Pull-quote** — full-width charcoal block. A single line from the design narrative in Fraunces 48px italic ivory.

5. **Next project** — full-width image of the next project, dimmed. Overlay: small "Next project" eyebrow + project title in Fraunces 56px + arrow.

6. **Footer.**

---

### 4. About `/about`

1. **Header** — "The Studio" eyebrow + headline *"We design slowly, on purpose."* in Fraunces 72px. Below: a 3-paragraph studio intro, two columns.

2. **Philosophy / 3 pillars** — three cards in a row, each with a serif numeral (`I`, `II`, `III`), pillar name (e.g., "Listen first"), and 2 sentences of explanation.

3. **Team grid** — 4-up on desktop. Each tile: portrait photograph in 3:4 ratio, name in Fraunces 24px, role in Inter 14px muted. On hover, photo desaturates and a short bio fades in.

4. **Process timeline** — horizontal stepper with four stages: Discover → Design → Detail → Deliver. Each stage has a numeral, title, and one-line description. Connecting line in terracotta.

5. **Footer.**

---

### 5. Services `/services`

1. **Header** — "What we do" eyebrow + headline *"Four disciplines, one studio."* in Fraunces 72px.

2. **Service blocks (4)** — each a full-width split row, alternating image-left and image-right. Per service:
   - Large image (5 of 12 cols)
   - Numeral `01`, service name in Fraunces 48px, 2-paragraph description, an "What's included" bullet list (3–5 items), "See related projects →" link.
   - Generous 160px vertical spacing between blocks.

3. **Footer.**

---

### 6. Contact `/contact`

**Purpose:** Convert. Multiple paths to reach the studio.

1. **Header** — "Let's talk" eyebrow + headline *"Tell us about your space."* in Fraunces 72px. Below: one paragraph of welcoming copy.

2. **Two-column body:**

   **Left column (form, 7 of 12 cols)** — on a soft ivory card with a hairline border, 48px padding:
   - Name (text)
   - Phone (tel)
   - Email (email)
   - Project description (textarea, 4 rows)
   - Total project budget (select: Under ₹10L · ₹10–25L · ₹25–50L · ₹50L–1Cr · Above ₹1Cr)
   - Project completion timeline (select: Within 3 months · 3–6 months · 6–12 months · Flexible)
   - How did you hear about us? (select)
   - Submit button: charcoal background, ivory text, full-width, "Send message"

   **Right column (direct contact, 5 of 12 cols):**
   - Heading "Reach us directly" in Fraunces 32px
   - Four large tap-targets stacked, each is a row with a Lucide icon in terracotta, label in Fraunces 20px, and value/handle in Inter 14px muted:
     - 📞 **Call us** · +91 96297 18765 → opens dialer
     - 💬 **WhatsApp** · Message instantly → opens WhatsApp
     - 📷 **Instagram** · @s2designs → opens IG profile
     - ✉️ **Email** · aamir.salar@s2designs.co.in
   - Below: a Google Maps embed of the studio location, 4:3 ratio, with a custom warm-toned map style
   - Below map: studio address + working hours

3. **Footer.**

---

## Component Specifications

### Navigation bar
- Height: 72px
- Initial state: transparent background, ivory text (over hero hero); becomes ivory background, charcoal text once scrolled past 80px
- Mobile: hamburger reveals a full-screen ivory overlay with nav links in Fraunces 48px, stacked, with terracotta hover underline.

### Project card (home + index)
```
┌─────────────────────────────┐
│  01                         │
│                             │
│       [4:5 image]           │
│                             │
└─────────────────────────────┘
   Heritage Villa Restoration
   Indiranagar · Residential · 2024
```

### Form fields
- Height: 48px
- Border: 1px hairline `#E5DFD3`
- Background: transparent
- Focus: terracotta border, no glowing ring
- Label: above field, 13px Inter uppercase tracking-wide muted
- Required marker: small terracotta asterisk

### Buttons
- Primary: charcoal bg, ivory text, no rounded corners (or 2px max), 16px padding-y, 32px padding-x, Inter 14px medium uppercase tracking-wide
- Secondary: 1px charcoal border, transparent bg, charcoal text
- Tertiary (text link): underline on hover, terracotta color, with right-arrow icon that translates 4px on hover

### Footer
- Background: warm-black `#141210`
- Text: cream `#EFEAE0`
- Top border: 1px `#2A2723`
- Hairline divider before the © strip

---

## Imagery Brief (for Stitch image prompts)

When Stitch generates placeholder imagery, use prompts like:

- *"Editorial interior photograph of a sunlit Bangalore living room, linen drapes, terracotta floor, mid-century furniture, warm natural light, Wallpaper magazine aesthetic, shot on Hasselblad"*
- *"Architectural detail of a curved teak staircase in a heritage Indian bungalow, soft morning light, cinematic, muted warm palette"*
- *"Boutique restaurant interior with handmade ceramic tiles, brass pendant lights, intimate and warm, editorial photography"*
- *"Architect's studio workspace with drafting table, material samples in trays, a single tactile cup of coffee, warm window light"*

Avoid: cold modernist white-on-white, glass-box skyscrapers, futuristic renders, cluttered staged real-estate shots.

---

## What to Generate in Stitch (suggested order)

1. **Home — desktop 1440px** (most important — sets the bar)
2. **Project Detail — desktop 1440px**
3. **Projects Index — desktop 1440px**
4. **Contact — desktop 1440px**
5. **Home — mobile 375px**
6. **Project Detail — mobile 375px**
7. **About — desktop 1440px**
8. **Services — desktop 1440px**
9. **Dark mode variant of the Home hero**

---

## Out of Scope for the Render

- Real photography (use placeholders matching the brief above)
- Real project copy (use the placeholders below)
- Real testimonial attributions (use "Residential client, Bangalore")
- Animations (Stitch is static — call them out in annotations)

---

## Placeholder Project Names (for filling cards)

1. *Heritage Villa Restoration* — Indiranagar · Residential · 2024
2. *Sky Loft Penthouse* — Koramangala · Residential · 2025
3. *Maya Boutique Hotel* — Whitefield · Hospitality · 2024
4. *North Star Office* — MG Road · Commercial · 2025
5. *Tide House* — Goa · Residential · 2023
6. *Saffron Restaurant* — UB City · Hospitality · 2025

---

## Tagline & Voice

- **Tagline:** *From Drafting to Crafting.*
- **Voice:** confident, quiet, precise. Short sentences. No hype words ("amazing", "stunning", "world-class"). Let the work speak.
- **Avoid:** "We're passionate about…", "Our mission is…", "We believe…"
