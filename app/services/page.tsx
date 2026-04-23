import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, interior design, turnkey execution, and design consulting — four disciplines, one studio.",
};

const SERVICES = [
  {
    id: "architecture",
    numeral: "01",
    name: "Architecture",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    body: [
      "Ground-up residential and commercial design — from a small home addition to a fifteen-thousand-square-foot office floor. We produce drawings that builders can read and clients can hold.",
      "We coordinate with structural, MEP, and landscape consultants in-house, and we are on site through every milestone — not just the ribbon cutting.",
    ],
    includes: [
      "Conceptual design and massing",
      "Schematic and detailed design drawings",
      "Statutory drawings and approvals",
      "Tendering and contractor selection",
      "Construction administration",
    ],
  },
  {
    id: "interior-design",
    numeral: "02",
    name: "Interior Design",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80",
    body: [
      "Bespoke interiors for homes, restaurants, and offices. We specify every joint, every finish, every light fixture — and we draw the joinery ourselves.",
      "Our briefs include the things that don&rsquo;t fit on a floor plan: how a kitchen feels at six in the morning, where the dog sleeps, what gets read in the corner chair.",
    ],
    includes: [
      "Spatial planning and layouts",
      "Joinery and millwork design",
      "Material and finish palettes",
      "Lighting design",
      "FF&E specification and procurement",
    ],
  },
  {
    id: "turnkey",
    numeral: "03",
    name: "Turnkey Execution",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1800&q=80",
    body: [
      "Design and build, under one roof. For clients who want a single line of accountability — from drawing to delivery — we manage the contractors, the schedule, and the snag list.",
      "We work with a small set of trusted craftspeople in Bangalore: carpenters in Bommanahalli, stone-cutters in Hosur, brass-workers in Moradabad.",
    ],
    includes: [
      "Detailed BOQs and cost estimation",
      "Contractor and vendor management",
      "On-site project supervision",
      "Quality control and finishing",
      "Handover, snagging, and aftercare",
    ],
  },
  {
    id: "consulting",
    numeral: "04",
    name: "Design Consulting",
    image:
      "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?auto=format&fit=crop&w=1800&q=80",
    body: [
      "For clients who already have a contractor or want a second opinion. We come in for the parts where design discipline matters most: planning, materials, light, detail.",
      "Engagements range from a single-day site review to a multi-month advisory.",
    ],
    includes: [
      "Concept advisory and feasibility",
      "Space planning and zoning",
      "Material and lighting consultation",
      "Drawing reviews",
      "Site walkthroughs and reporting",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-bg page-pad-top pb-24 md:pb-40">
        {/* HEADER */}
        <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <Reveal as="div" className="md:col-span-3">
              <p className="eyebrow">What we do</p>
            </Reveal>
            <Reveal as="div" delay={0.08} className="md:col-span-9">
              <h1 className="font-display text-5xl leading-[1.02] tracking-tighter text-fg md:text-7xl lg:text-[88px]">
                Four disciplines, one studio.
              </h1>
            </Reveal>
          </div>
        </section>

        {/* SERVICE BLOCKS */}
        <div className="mt-24 flex flex-col gap-32 md:mt-40 md:gap-40">
          {SERVICES.map((service, i) => {
            const reverse = i % 2 === 1;
            return (
              <section
                id={service.id}
                key={service.id}
                className="mx-auto max-w-[1440px] scroll-mt-32 px-6 md:px-10 lg:px-20"
              >
                <div
                  className={cn(
                    "grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16",
                    reverse && "md:[&>*:first-child]:order-2",
                  )}
                >
                  <Reveal as="div" className="md:col-span-6">
                    <div className="relative aspect-[4/5] overflow-hidden bg-border/40">
                      <Image
                        src={service.image}
                        alt={`${service.name} — example interior or architectural detail.`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>

                  <div className="md:col-span-6 md:pt-12 lg:pt-16">
                    <Reveal>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                        {service.numeral}
                      </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                      <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tighter text-fg md:text-5xl lg:text-6xl">
                        {service.name}
                      </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-fg/85 md:text-lg">
                        {service.body.map((p) => (
                          <p key={p.slice(0, 24)} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                      </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                      <div className="mt-10 border-t border-border pt-8">
                        <p className="eyebrow">What&rsquo;s included</p>
                        <ul className="mt-4 divide-y divide-border">
                          {service.includes.map((item, idx) => (
                            <li
                              key={item}
                              className="flex items-baseline gap-6 py-3 text-sm text-fg"
                            >
                              <span className="font-mono text-[11px] text-muted">
                                {(idx + 1).toString().padStart(2, "0")}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <Link
                        href="/projects"
                        className="group mt-10 inline-flex items-center gap-3 border-b border-fg/30 pb-1 text-sm font-medium tracking-wide text-fg transition-colors hover:border-accent hover:text-accent"
                      >
                        See related projects
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </Reveal>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
