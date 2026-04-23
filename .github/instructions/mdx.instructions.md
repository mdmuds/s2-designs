---
applyTo: "content/**/*.mdx"
---

# MDX content rules — S2 Designs projects

Each project lives at `content/projects/<slug>.mdx`. Adding a project = ONE `.mdx` file + a folder of images at `public/projects/<slug>/`. No code changes.

## Required frontmatter

```yaml
---
title: Heritage Villa Restoration
slug: heritage-villa                  # MUST match the filename (without .mdx)
location: Indiranagar, Bangalore
type: Residential                     # Residential | Commercial | Hospitality | Heritage
year: 2024
status: Completed                     # Completed | In Progress
area: 4200 sqft
coverImage: /projects/heritage-villa/cover.jpg
gallery:
  - /projects/heritage-villa/01.jpg
  - /projects/heritage-villa/02.jpg
  - /projects/heritage-villa/03.jpg
excerpt: A century-old bungalow reimagined for modern family living.   # 1 sentence, ≤ 140 chars
featured: true                        # surface on the home page
---
```

All fields are validated by Zod in `lib/projects.ts`. The build fails if any project is malformed — fix the MDX, don't loosen the schema.

## Body conventions

- Structure: H2 sections only. Suggested order: `## The Brief` → `## The Approach` → `## Materials & Detail` → `## Outcome`.
- Tone: confident, quiet, precise. Short sentences. Past tense for completed work.
- **Banned words:** stunning, amazing, world-class, passionate, journey, solutions, leverage, synergy. "Bespoke" sparingly.
- No marketing hype. Describe the problem, the response, the materials, the outcome.
- 200–500 words per project. Editorial, not sales copy.

## Images

- Live in `public/projects/<slug>/`. Filenames: `cover.jpg`, `01.jpg`, `02.jpg`, ...
- Source max 2400px long edge, ~500KB after compression. Use `sharp` locally before committing.
- 8–14 gallery images per project. Quality over quantity.
- Cover image is the strongest single shot (used on home, index, and detail hero).

## Don't

- Don't add custom MDX components per-project. Use only the components registered in the global MDX provider.
- Don't add raw HTML `<img>`, `<div>`, inline styles, or `<script>`.
- Don't reference images outside `public/projects/<slug>/` for that project.
- Don't change the slug after publishing — it's the URL.
