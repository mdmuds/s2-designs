# S2 Designs

Premium portfolio website for **S2 Designs** — an architecture and interior design studio in Bangalore. Built with Next.js 15, Tailwind, MDX, and Framer Motion. Editorial, magazine-grade, with light + dark themes.

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

## Adding a project

Drop ONE `.mdx` file at `content/projects/<slug>.mdx` with the frontmatter schema documented in [.github/instructions/mdx.instructions.md](.github/instructions/mdx.instructions.md). Drop matching images in `public/projects/<slug>/`. The build will validate the frontmatter and surface the project on `/projects` automatically.

## Project structure

See [docs/PLAN.md](docs/PLAN.md) §9.

## Conventions

See [AGENTS.md](AGENTS.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md). The non-negotiables: locked stack, locked design tokens, server-first components, `next/image` everywhere, dark mode shipped together.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS, shadcn-style primitives
- Framer Motion · next-themes · lucide-react
- MDX content via `next-mdx-remote/rsc` + Zod validation
- Hosted on Vercel
