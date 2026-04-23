---
name: motion
description: '**MOTION SKILL** — Use when adding or reviewing animation: scroll-triggered reveals, parallax, headline word/letter reveals, image-mask reveals, hover micro-interactions, page transitions, or any Framer Motion usage. USE FOR: building <Reveal>, <MaskReveal>, <SplitText> components; choosing easings/durations; respecting prefers-reduced-motion; ensuring transforms-only animations. DO NOT USE FOR: pure layout/typography decisions (use design skill), data loading (use nextjs-architecture skill).'
---

# Motion Skill — S2 Designs

Motion is a design material here. It must feel **physical, restrained, editorial** — never decorative. If removing the animation breaks the page, the animation was wrong.

---

## 1. Tokens (locked)

```ts
// lib/motion.ts
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,        // entrances (ease-out-quart)
  inOut: [0.65, 0, 0.35, 1] as const,      // movements/exits
};

export const duration = {
  micro: 0.2,        // hover, focus, color
  standard: 0.4,     // fade, slide
  image: 0.7,        // image scales, large transforms
  hero: 1.2,         // hero parallax, mask reveals
};
```

Reference these from every motion component. Never inline magic numbers.

---

## 2. Required reusable components

Build once in `components/motion/`, reuse everywhere.

### `<Reveal>` — fade + 12px y-translate on enter
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ease, duration } from "@/lib/motion";

interface RevealProps { children: React.ReactNode; delay?: number; className?: string; }

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: duration.standard, ease: ease.out, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### `<RevealGroup>` — staggered children, 60ms apart
Wrap a list; children mount as `<Reveal delay={i * 0.06}>` or use `staggerChildren` via variants.

### `<MaskReveal>` — clip-path image reveal
```tsx
initial={{ clipPath: "inset(100% 0 0 0)" }}
whileInView={{ clipPath: "inset(0% 0 0 0)" }}
transition={{ duration: duration.hero, ease: ease.out }}
```
Use on hero imagery and project cover images.

### `<SplitHeadline>` — word-by-word reveal for display headlines
Split on spaces, animate each word with 40ms stagger, 600ms duration, opacity + 12px y. Reduced-motion → render plain text.

### `<Parallax>` — `useScroll` + `useTransform` on y
Subtle (max 80px translate over the section). Disabled under reduced motion. Never on text — imagery only.

---

## 3. Hard rules

**Always:**
- `"use client"` on every motion component.
- Check `useReducedMotion()` and degrade to opacity-only or static.
- Animate **only** `transform` and `opacity`. Never `width`, `height`, `top`, `left`, `margin`.
- Use `viewport={{ once: true }}` for entrance reveals — no re-trigger on scroll up.
- `will-change: transform` on heavy parallax elements (let Framer add it).

**Never:**
- Spring physics with overshoot. Use `tween` with the eases above.
- Bounces, rotations on hover, blinking, pulsing.
- Animate on text content (parallax, scaling). Headlines may reveal on enter, then sit still.
- Animate background-color on full sections.
- Stagger children when there are more than ~8 — looks like a wave, not editorial.
- Page-load LCP-blocking animations. Hero text is visible immediately; only its reveal masks animate.

---

## 4. Patterns by surface

| Surface | Motion |
|---|---|
| Hero headline | `<SplitHeadline>` word reveal, then static. |
| Hero image | `<MaskReveal>` 1200ms on first paint; subtle parallax on scroll (max 60px). |
| Section headlines | `<Reveal>` on enter. |
| Project cards | Hover: image `scale(1.05)` over 700ms via CSS, not Framer. Arrow `translateX(4px)`. |
| Project index numbers (`01`) | No motion. Stillness is the statement. |
| Page transitions | Phase 2: 300ms cross-fade. Phase 1: native, no transition. |
| Nav scroll state | CSS transition on bg/border, 200ms. No Framer. |
| Filter chips | Active state instant. No animated underline sliding between chips. |
| Modal / sheet | shadcn defaults, retuned to 200ms ease.out. No spring. |

---

## 5. Performance

- Lazy-mount motion components below the fold via `viewport`. Don't pre-mount entire pages of `motion.div`.
- Avoid wrapping every paragraph in `<Reveal>` — group at the section level. Stagger children of the section, not nest motion 3 levels deep.
- Profile with React Profiler if a section feels janky. Janky motion is worse than no motion.

---

## 6. Reduced motion contract

The site must remain fully usable with `prefers-reduced-motion: reduce`:
- All entrance reveals collapse to opacity-only fade (or instant).
- No parallax. No mask reveals (image appears immediately).
- Hover scales remain (they're micro-interactions, not motion). Optional: also disable.
- Page transitions: instant.

Test with DevTools → Rendering → Emulate CSS media `prefers-reduced-motion: reduce` before shipping.

---

## 7. References

- Easing inspiration: [easings.net](https://easings.net) — ease-out-quart specifically.
- Framer Motion docs: [motion.dev/docs](https://motion.dev/docs).
- North-star motion: apple.com (product reveal pages), [linear.app](https://linear.app), [vercel.com](https://vercel.com).
