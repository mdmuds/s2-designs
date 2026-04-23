---
name: design
description: '**DESIGN SKILL** — Use whenever generating, reviewing, or modifying any UI for the S2 Designs portfolio site (pages, sections, components, styles, MDX templates). Enforces premium editorial aesthetic (Wallpaper / Cereal / Dezeen × apple.com), locked design tokens, motion language, typographic discipline, and the "no generic architect site" bar. USE FOR: building new pages, polishing existing screens, reviewing PRs for visual quality, choosing imagery, writing Tailwind classes, designing interactions, dark-mode passes, responsive checks. DO NOT USE FOR: backend/API work, build config, deployment scripts.'
---

# Design Skill — S2 Designs

Premium-by-default. Every visual decision must clear this bar before shipping.

> **The single test:** would Apple ship this? Would *Wallpaper* magazine print it? If no — iterate.

---

## 1. The Premium Bar (mandatory checklist)

Before considering any UI "done", verify ALL of these:

- [ ] **No template feeling.** A stranger should not be able to name the SaaS template this came from.
- [ ] **At least one distinctive moment** in the section (numbered index, asymmetric break, image-mask reveal, sticky element, cursor effect, type flourish).
- [ ] **Whitespace is generous** — never feels cramped on desktop. Section vertical padding ≥ 96px desktop, ≥ 64px mobile.
- [ ] **Typography hierarchy is visible at a glance** — display vs body should be clearly distinguishable from 6 feet away.
- [ ] **Imagery is treated like art** — full-bleed where possible, no rounded-corner thumbnails everywhere, no drop shadows.
- [ ] **Dark mode looks intentional**, not inverted. Warm sepia, never pure black.
- [ ] **Motion feels physical**, not decorative. Removed = section still works.
- [ ] **Mobile is not an afterthought.** Tested at 375px before declaring complete.
- [ ] **Accessibility is real** — keyboard, focus rings, alt text, contrast AA minimum.
- [ ] **Copy is precise.** No hype words. No "we believe…". Short sentences.

If any box is unchecked: do not ship. Fix it.

---

## 2. Design Tokens (locked)

### Color
| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#F8F5EF` ivory | `#141210` warm black | Page background |
| `fg` | `#1A1A1A` charcoal | `#EFEAE0` cream | Primary text |
| `muted` | `#6B6B6B` warm gray | `#9A958A` | Captions, metadata |
| `accent` | `#B85C38` terracotta | `#D97548` | Links, focus, key accents only |
| `border` | `#E5DFD3` | `#2A2723` | Hairlines |
| `surface` | `#FFFFFF` (rare) | `#1C1916` | Cards (use sparingly) |

**Rules:**
- Never use pure white `#FFF` as page bg in light mode. Never pure black in dark.
- Accent terracotta is for emphasis, not decoration. Max ~3 uses per viewport.
- No gradients except subtle image overlays (charcoal `0%` → `40%` opacity for legibility).
- No colored shadows. Use hairline borders or subtle 1-2px y-offset black at 6% opacity max.

### Typography
- **Display:** Fraunces (variable serif) — weight 300–500, optical size variable. Use at 32px+.
- **Body / UI:** Inter — weight 400 (body), 500 (buttons/labels).
- **Mono (rare):** JetBrains Mono or system mono — for time stamps, metadata indices only.

**Type scale (px):** 12 · 13 · 14 · 16 · 18 · 24 · 32 · 48 · 64 · 80 · 96 · 128

**Rules:**
- Body text: 16–18px, line-height 1.6–1.7, max-width 640px (≈ 65ch).
- Display headlines: tight tracking (-0.02em), generous leading (1.05–1.15).
- Eyebrows: Inter 12–13px, uppercase, tracking 0.12em, muted color.
- Never use ALL CAPS for body sentences. Eyebrows and small labels only.
- Never use italic body text. Italics reserved for pull-quotes in display.
- One display weight per viewport. Don't mix Fraunces 300 and 500 on the same screen.

### Spacing
- 4-px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 240.
- Section vertical rhythm: 96 (mobile) → 128 (tablet) → 160 (desktop).
- Component padding: prefer 24/32/48 over 16/20/40.

### Radii
- Corners are **mostly square**. Default radius: `0` or `2px`.
- Allowable exceptions: form inputs (4px), avatar/pill chips (full).
- No `rounded-xl` / `rounded-2xl`. We are not a SaaS dashboard.

### Borders
- Hairline by default — 1px, `border` token.
- Thicker borders (2px+) only for emphasis on focus or active states.

---

## 3. Layout Principles

1. **Asymmetric > symmetric.** A 5/7 column split beats 6/6. A staggered grid beats a uniform one.
2. **Editorial alignment.** Anchor to type baselines and grid columns. Avoid centering everything.
3. **Full-bleed when the image is the message.** Break the container.
4. **Vertical rhythm matters.** Use the 8/12/16/24/32/48 scale. No magic numbers.
5. **One focal point per viewport.** If everything competes, nothing wins.
6. **The fold isn't sacred.** Trust the user to scroll. Don't cram.

### Grid
- Desktop: 12-col, 24px gutter, 80–120px page padding.
- Tablet: 8-col, 20px gutter, 40–48px padding.
- Mobile: 4-col, 16px gutter, 24px padding.

### Breakpoints
- `sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 / `2xl` 1536.
- Always test 375 (small mobile) and 1920 (wide desktop).

---

## 4. Motion Language

**Easing:**
- Entrances: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart)
- Movements/exits: `cubic-bezier(0.65, 0, 0.35, 1)` (ease-in-out-cubic)

**Durations:**
- 200ms — micro (hover, focus, color change)
- 400ms — standard (fade, slide)
- 700ms — image scales, large transforms
- 1200ms — hero parallax, mask reveals

**Patterns:**
- Scroll reveal: opacity 0 → 1 + translateY 12px → 0, 60ms stagger between siblings, threshold 25%.
- Image hover: scale 1 → 1.05 over 700ms (wrapper has `overflow:hidden`).
- Headline reveal: word-by-word with 40ms stagger, 600ms per word.
- Image-mask reveal: `clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)` over 1200ms.
- Page transition: 300ms cross-fade with 8px y-translate.

**Forbidden:**
- Bounces, springs with overshoot, rotations on hover, parallax on text, blinking/pulsing.
- Animating background-color of large surfaces.
- Animating layout properties (width/height) — use transforms.

**Always:**
- Respect `prefers-reduced-motion: reduce` — disable transforms, keep opacity fades only.
- Compose only `transform` and `opacity`. Never animate `top/left/width/height`.

---

## 5. Imagery Rules

- All imagery via `next/image` with explicit `width`/`height` or `fill` + sized parent.
- Aspect ratios: 4:5 (cards), 16:9 (heroes), 3:4 (portraits), 1:1 (rare).
- Treatment: warm, natural light, lived-in. Avoid: stock-y staged real estate, white-cyc product shots, futuristic renders, cold modernist glass boxes.
- Default overlay for text-on-image: linear-gradient charcoal `0%` → `40%` from bottom.
- Loading placeholder: `placeholder="blur"` with `blurDataURL`. Never a gray spinner.
- Alt text is a sentence describing the space, not "image of room".

---

## 6. Component Patterns

### Project Card
- Numbered index `01` in mono top-left, color muted.
- Image 4:5, full bleed within card, no border-radius.
- Title in Fraunces 24–28px below image with 16px gap.
- Metadata in Inter 14px muted, separator `·`.
- Hover: image scales 1.05 (700ms), arrow icon translates 4px right.

### Buttons
- **Primary:** charcoal bg, ivory text, 0–2px radius, 14px Inter medium, uppercase, tracking 0.06em, padding 16/32. Hover: bg slightly lifted (`#000` or accent depending on context).
- **Secondary:** 1px charcoal border, transparent bg. Hover: bg charcoal/5.
- **Tertiary (text link):** terracotta, with arrow icon → translates 4px on hover; underline on hover only.
- Never use rounded-full pill buttons except for filter chips.

### Form fields
- 48px tall, transparent bg, 1px hairline border.
- Label above field: Inter 13px uppercase tracking 0.08em muted.
- Focus: terracotta border, no glowing ring.
- Required asterisk in terracotta.
- Error state: terracotta border + 13px message below.
- Never use rounded-full inputs. Never use floating-label patterns.

### Nav
- 72px tall.
- Initial state over hero: transparent bg, ivory text.
- Past 80px scroll: ivory bg, charcoal text, 1px bottom border.
- Mobile: hamburger → full-screen ivory overlay, links in Fraunces 48px stacked, terracotta hover underline.

### Footer
- Warm-black `#141210` bg, cream text.
- 3 columns desktop, stacked mobile.
- Hairline divider before © strip. © strip is 12px muted.

### Cards / Surfaces
- Prefer no card. If card needed: ivory bg, hairline border, no shadow, 32–48px padding.
- Never combine border + shadow.

---

## 7. Iconography

- **Library:** Lucide only.
- **Stroke:** 1.5px (default Lucide is 2 — override).
- **Size:** 16/20/24 — match the surrounding type size.
- **Color:** inherit `currentColor` (fg or accent depending on context).
- **No emoji as iconography.** Emoji acceptable only in informal copy (e.g., a microcopy note), never as UI affordance.
- Icons are paired with text labels by default. Icon-only buttons require `aria-label`.

---

## 8. Dark Mode (first-class, not an afterthought)

- Toggle via `next-themes`, default to system preference.
- Background `#141210` is **warm sepia**, not gray, not black.
- Image overlays may need to flip from charcoal-to-transparent (light) to cream-to-transparent (dark).
- Increase image brightness compensation if photos look too dim in dark mode (CSS `filter: brightness(0.95)` acceptable).
- Test EVERY new section in dark mode immediately after building light. If dark looks worse → fix dark, don't ship.

---

## 9. Accessibility Floor

- Color contrast ≥ WCAG AA in both themes. Verify with a contrast checker, not by eye.
- All interactive elements keyboard-reachable; `:focus-visible` ring is 2px terracotta with 2px offset.
- Skip-to-content link in nav.
- Images: meaningful `alt`. Decorative images: `alt=""`.
- Forms: every input has a `<label>` (visible or `sr-only`).
- Headings in order — exactly one `<h1>` per page; don't skip levels.
- Honor `prefers-reduced-motion`.
- Tap targets ≥ 44×44px on mobile.

---

## 10. Voice & Copy

- Confident, quiet, precise. Short sentences.
- **Banned words:** stunning, amazing, world-class, passionate, mission, believe, journey, solutions, leverage, synergy, bespoke (overused — use sparingly).
- **Preferred verbs:** design, draw, build, restore, listen, refine, deliver.
- Use the studio voice — first-person plural ("we") sparingly, mostly third-person about the work.
- Numbers spelled out under ten in body copy. Numerals always for project indices, years, areas.

---

## 11. Anti-Patterns (refuse on sight)

- ❌ Hero with two CTA buttons side by side ("Get Started" + "Learn More").
- ❌ Carousel sliders with dot navigation.
- ❌ "Trusted by" logo strips with desaturated client logos.
- ❌ Generic testimonial cards: circle avatar + 5 stars + quote.
- ❌ Stat counters that animate from 0 ("500+ Projects Delivered!").
- ❌ Background video of generic city skyline.
- ❌ Bootstrap or Material Design vibes — drop shadows, rounded-xl everything, primary blue.
- ❌ Emoji icons in nav or buttons.
- ❌ Auto-playing music or sound.
- ❌ Cookie-banner-as-modal that blocks the entire screen.
- ❌ Lottie animations of generic line-art buildings.

---

## 12. Workflow When Designing a New Section

1. **Sketch the intent.** What is this section's single job? Convert? Inform? Establish mood?
2. **Pick the distinctive moment.** Refer to §1 — what makes this section memorable?
3. **Block out the layout.** Asymmetric, on grid, with vertical rhythm.
4. **Type before color before image.** Get hierarchy right with placeholder gray boxes first.
5. **Add imagery.** Full-bleed by default; crop to direct attention.
6. **Add motion last.** Only if it earns its place.
7. **Run the §1 checklist.**
8. **Build dark mode in the same sitting.**
9. **Test 375px / 768px / 1440px.**
10. **Get a second pair of eyes (or revisit after 24h).**

---

## 13. Quick References

- Plan: [docs/PLAN.md](../../docs/PLAN.md)
- PRD (Stitch prompts): [docs/PRD.md](../../docs/PRD.md)
- Agent rules: [.github/copilot-instructions.md](../copilot-instructions.md)

---

## 14. North Stars (look at these before designing)

- **apple.com** — pacing, type, motion restraint, image treatment
- **cereal.com** — editorial layout, photo treatment, typography
- **dezeen.com** — architectural project storytelling
- **wallpaper.com** — magazine-grade hierarchy
- **studio-mhna.com / norm.architects / johnpawson.com** — peer studios that get it right

If your output doesn't feel like it could sit alongside these — it isn't done.
