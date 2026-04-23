import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `The studio behind ${siteConfig.name} — how we work, who we are, what we believe in materially.`,
};

const PILLARS = [
  {
    numeral: "I",
    name: "Listen first",
    body:
      "We begin with a brief that includes the things you can&rsquo;t draw — the way mornings feel, the place you read, the meals you cook on weekdays. Plans come later.",
  },
  {
    numeral: "II",
    name: "Detail relentlessly",
    body:
      "A door reveal, a switch height, the way a stair tread meets the wall. We hold each detail to the same standard, whether it costs a thousand rupees or a lakh.",
  },
  {
    numeral: "III",
    name: "Build with quiet materials",
    body:
      "Lime plaster, kota stone, brushed brass, reclaimed teak. Materials that age into character rather than out of style.",
  },
] as const;

const TEAM = [
  {
    name: "Aamir Salar",
    role: "Principal Architect",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rhea Kapoor",
    role: "Head of Interiors",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Vikram Rao",
    role: "Project Director",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Anika Mehta",
    role: "Materials Lead",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  },
] as const;

const PROCESS = [
  { step: "01", name: "Discover", body: "Site visits, briefing, conversation." },
  { step: "02", name: "Design", body: "Plans, sections, mood, materials." },
  { step: "03", name: "Detail", body: "Drawings, joinery, FF&E specification." },
  { step: "04", name: "Deliver", body: "Site supervision through handover." },
] as const;

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-bg page-pad-top pb-24 md:pb-40">
        {/* HEADER */}
        <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <Reveal as="div" className="md:col-span-3">
              <p className="eyebrow">The Studio</p>
            </Reveal>
            <Reveal as="div" delay={0.08} className="md:col-span-9">
              <h1 className="font-display text-5xl leading-[1.02] tracking-tighter text-fg md:text-7xl lg:text-[88px]">
                We design slowly, on purpose.
              </h1>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12">
            <Reveal as="div" delay={0.05} className="md:col-span-6 md:col-start-4">
              <p className="text-lg leading-relaxed text-fg/85">
                S2 Designs is a studio of architects and interior designers based in Bangalore.
                Founded in 2019, we work on a small number of projects at a time — residences,
                hospitality interiors, commercial spaces, and the occasional heritage restoration.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-fg/85">
                Our work begins on paper and ends on site. We draw, specify, and supervise — we
                don&rsquo;t hand off. Every project carries the same set of fingerprints from the
                first sketch to the day the keys are handed over.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-fg/85">
                We&rsquo;re uninterested in trends. We are interested in light, in proportion, in
                materials that get better with time, and in the lives that happen inside the rooms
                we draw.
              </p>
            </Reveal>
          </div>
        </section>

        {/* PILLARS */}
        <section className="mt-24 border-y border-border bg-bg py-24 md:mt-40 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
            <Reveal>
              <p className="eyebrow">Three things we hold to</p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-16">
              {PILLARS.map((p, i) => (
                <Reveal as="div" delay={i * 0.08} key={p.numeral}>
                  <p className="font-display text-7xl leading-none tracking-tighter text-accent md:text-8xl">
                    {p.numeral}
                  </p>
                  <h3 className="mt-8 font-display text-3xl tracking-tight text-fg">{p.name}</h3>
                  <p
                    className="mt-4 text-base leading-relaxed text-fg/80"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="bg-bg py-24 md:py-40">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
              <Reveal as="div" className="md:col-span-4">
                <p className="eyebrow">The Team</p>
              </Reveal>
              <Reveal as="div" delay={0.08} className="md:col-span-8">
                <h2 className="font-display text-4xl leading-[1.05] tracking-tighter text-fg md:text-6xl">
                  Four people, one drafting room.
                </h2>
              </Reveal>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-4 md:gap-x-8">
              {TEAM.map((member, i) => (
                <Reveal as="div" key={member.name} delay={i * 0.06}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-border/40">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role} at ${siteConfig.name}.`}
                      fill
                      sizes="(min-width: 768px) 22vw, 50vw"
                      className="object-cover grayscale transition-all duration-700 ease-out hover:grayscale-0"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-xl tracking-tight text-fg md:text-2xl">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{member.role}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="border-t border-border bg-bg py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
            <Reveal>
              <p className="eyebrow">Process</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tighter text-fg md:text-6xl">
                Discover → Design → Detail → Deliver
              </h2>
            </Reveal>
            <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-4 md:gap-0">
              {PROCESS.map((p, i) => (
                <Reveal as="div" key={p.step} delay={i * 0.06} className="relative md:px-6 md:first:pl-0">
                  {i < PROCESS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-6 hidden h-px w-full bg-border md:block"
                    >
                      <span className="block h-px w-1/2 bg-accent" />
                    </span>
                  )}
                  <div className="flex items-baseline gap-4 md:block">
                    <span className="font-mono text-xs text-accent">{p.step}</span>
                    <h3 className="font-display text-2xl tracking-tight text-fg md:mt-6">
                      {p.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
