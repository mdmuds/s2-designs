import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Compass, Layers, Hammer, Lightbulb } from "lucide-react";import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { Parallax } from "@/components/motion/parallax";
import { ProjectCard } from "@/components/project-card";
import { LocalClock } from "@/components/local-clock";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";
import { getFeaturedProjects } from "@/lib/projects";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=2400&q=80";
const STUDIO_IMAGE =
  "https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1600&q=80";

const SERVICES = [
  {
    icon: Compass,
    name: "Architecture",
    blurb: "Ground-up residential and commercial design.",
    href: "/services#architecture",
  },
  {
    icon: Layers,
    name: "Interior Design",
    blurb: "Bespoke interiors, materials, and FF&E.",
    href: "/services#interior-design",
  },
  {
    icon: Hammer,
    name: "Turnkey Execution",
    blurb: "Design and build, single point of accountability.",
    href: "/services#turnkey",
  },
  {
    icon: Lightbulb,
    name: "Design Consulting",
    blurb: "Concept advisory and space planning.",
    href: "/services#consulting",
  },
] as const;

export default async function HomePage() {
  const featured = await getFeaturedProjects(3);

  return (
    <>
      <Nav />
      <main id="main">
        {/* HERO */}
        <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-cream">
          <MaskReveal from="top" className="absolute inset-0">
            <Parallax distance={32} className="absolute inset-0">
              <Image
                src={HERO_IMAGE}
                alt="A sunlit living room with linen drapes, terracotta floor, and mid-century furniture in a Bangalore home."
                fill
                priority
                sizes="100vw"
                className="scale-[1.04] object-cover"
              />
            </Parallax>
          </MaskReveal>
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

          {/* Top corner — local time */}
          <div className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[1440px] items-center justify-between px-6 pt-24 text-cream/70 md:px-10 md:pt-28 lg:px-20">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] md:inline">
              N 12.97° · E 77.59°
            </span>
            <LocalClock
              city={siteConfig.city}
              timezone={siteConfig.timezone}
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
            />
          </div>

          {/* Headline */}
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-14 md:px-10 md:pb-20 lg:px-20 lg:pb-24">
            <p className="eyebrow mb-6 text-cream/70">An architecture & interior studio · Est. Bangalore</p>
            <SplitHeadline
              as="h1"
              text="From Drafting"
              className="display block text-[18vw] leading-[0.92] tracking-tightest text-cream md:text-[13vw] lg:text-[11vw]"
            />
            <SplitHeadline
              as="h1"
              text="to Crafting."
              delay={0.18}
              className="display block pl-[10vw] text-[18vw] leading-[0.92] tracking-tightest text-cream md:pl-[14vw] md:text-[13vw] lg:text-[11vw]"
            />
            <Reveal delay={0.9} className="mt-8 flex items-end justify-between gap-6">
              <p className="max-w-md text-base text-cream/80 md:text-lg">
                Six years drawing residences, restaurants, and quiet retreats — one room at a time.
              </p>
              <a
                href="#featured"
                className="hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-accent md:inline-flex"
                aria-label="Scroll to featured work"
              >
                <span>Scroll</span>
                <ArrowDown size={14} strokeWidth={1.5} className="animate-bounce" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* FEATURED WORK */}
        <section
          id="featured"
          data-nav-section="/projects"
          className="cv-auto bg-bg py-24 md:py-32 lg:py-40"
        >
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
              <Reveal as="div" className="md:col-span-4">
                <p className="eyebrow">Selected Work · 2023 — 2026</p>
              </Reveal>
              <Reveal as="div" delay={0.1} className="md:col-span-8">
                <h2 className="font-display text-4xl leading-[1.05] tracking-tighter text-fg md:text-6xl lg:text-7xl">
                  Six projects that defined our last two years — drawn slowly, built carefully.
                </h2>
              </Reveal>
            </div>

            {/* Asymmetric grid */}
            {featured.length >= 3 && (
              <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-28 md:grid-cols-12 md:gap-y-24">
                <Reveal as="div" className="md:col-span-7">
                  <ProjectCard
                    project={featured[0]!}
                    index={1}
                    aspect="aspect-[5/6]"
                    sizes="(min-width: 768px) 58vw, 100vw"
                  />
                </Reveal>
                <div className="flex flex-col gap-16 md:col-span-5 md:gap-24 md:pt-24">
                  <Reveal as="div" delay={0.08}>
                    <ProjectCard
                      project={featured[1]!}
                      index={2}
                      aspect="aspect-[4/5]"
                      sizes="(min-width: 768px) 40vw, 100vw"
                    />
                  </Reveal>
                  <Reveal as="div" delay={0.16}>
                    <ProjectCard
                      project={featured[2]!}
                      index={3}
                      aspect="aspect-[4/5]"
                      sizes="(min-width: 768px) 40vw, 100vw"
                    />
                  </Reveal>
                </div>
              </div>
            )}

            <Reveal className="mt-20 flex justify-center md:mt-24">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 border border-fg/80 px-8 py-4 text-xs uppercase tracking-[0.16em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                See all projects
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* STUDIO SNAPSHOT */}
        <section data-nav-section="/about" className="cv-auto bg-bg pb-24 md:pb-32 lg:pb-40">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16 lg:gap-24">
              <Reveal as="div" className="md:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden bg-border/40">
                  <Image
                    src={STUDIO_IMAGE}
                    alt="Architect's studio with drafting table, material samples in trays, and warm window light."
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <div className="md:col-span-7 md:pt-12 lg:pt-24">
                <Reveal>
                  <p className="eyebrow">The Studio</p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tighter text-fg md:text-5xl lg:text-6xl">
                    A studio of two disciplines, one ethic.
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-8 max-w-prose space-y-5 text-lg leading-relaxed text-fg/85">
                    <p>
                      We sit somewhere between the drafting table and the site shed. Architecture
                      grounds us; interiors finish the sentence. Every project moves through the
                      same set of hands — from the first plan to the last switch plate.
                    </p>
                    <p>
                      We work in modest numbers — a few projects each year, each one detailed to
                      the millimetre. We prefer materials that age into character: lime plaster,
                      reclaimed teak, kota stone, brushed brass.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <Link
                    href="/about"
                    className="group mt-10 inline-flex items-center gap-3 border-b border-fg/30 pb-1 text-sm font-medium tracking-wide text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    About the studio
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES STRIP */}
        <section
          data-nav-section="/services"
          className="cv-auto border-y border-border bg-bg py-20 md:py-24"
        >
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
            <Reveal>
              <p className="eyebrow">What we do</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Reveal
                    as="div"
                    delay={i * 0.06}
                    key={service.name}
                    className="group flex flex-col gap-4 py-8 md:px-8 md:py-4 md:first:pl-0 md:last:pr-0"
                  >
                    <Icon
                      strokeWidth={1.5}
                      size={22}
                      className="text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                    />
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-2xl tracking-tighter text-fg">
                        {service.name}
                      </h3>
                      <span className="font-mono text-[11px] text-muted">
                        0{i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{service.blurb}</p>
                    <Link
                      href={service.href}
                      className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-fg/70 transition-colors hover:text-accent"
                    >
                      Learn more
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="cv-auto bg-bg py-24 md:py-40">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <span
                aria-hidden="true"
                className="font-display text-7xl leading-none text-accent md:text-8xl"
              >
                &ldquo;
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-2 font-display text-2xl font-light italic leading-snug tracking-tight text-fg md:text-4xl">
                They listened for a long time before they drew anything. The house feels less like
                a renovation and more like something we recovered.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-xs uppercase tracking-[0.18em] text-muted">
                Residential client · Indiranagar, Bangalore
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
