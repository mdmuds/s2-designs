import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { HorizontalGallery } from "@/components/horizontal-gallery";
import { getAllProjects, getProject, getAdjacentProject } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.excerpt,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.excerpt,
      images: [{ url: project.frontmatter.coverImage }],
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-16 font-display text-3xl leading-tight tracking-tighter text-fg md:text-[40px]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-10 font-display text-2xl leading-tight tracking-tight text-fg" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 text-lg leading-[1.75] text-fg/85" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-[1.7] text-fg/85" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="my-10 border-l-2 border-accent pl-6 font-display text-2xl italic leading-snug text-fg"
      {...props}
    />
  ),
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const next = await getAdjacentProject(slug);
  const { frontmatter, content } = project;

  return (
    <>
      <Nav />
      <main id="main">
        {/* HERO */}
        <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-cream">
          <MaskReveal from="top" className="absolute inset-0">
            <Image
              src={frontmatter.coverImage}
              alt={`${frontmatter.title} — cover photograph`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </MaskReveal>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/30" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-16 md:px-10 md:pb-20 lg:px-20 lg:pb-24">
            <Reveal>
              <p className="eyebrow text-cream/70">{frontmatter.type} · {frontmatter.year}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 font-display text-5xl leading-[0.98] tracking-tightest text-cream md:text-7xl lg:text-[96px]">
                {frontmatter.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-base text-cream/85 md:text-lg">
                {frontmatter.excerpt}
              </p>
            </Reveal>
          </div>
        </section>

        {/* NARRATIVE + STICKY METADATA */}
        <section className="bg-bg py-24 md:py-32 lg:py-40">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10 lg:px-20">
            <aside className="md:col-span-4 lg:col-span-3">
              <div className="md:sticky md:top-28">
                <p className="eyebrow">Project</p>
                <p className="mt-2 font-display text-2xl leading-tight tracking-tight text-fg">
                  {frontmatter.title}
                </p>
                <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                  {[
                    ["Location", frontmatter.location],
                    ["Type", frontmatter.type],
                    ["Year", String(frontmatter.year)],
                    ["Status", frontmatter.status],
                    ["Area", frontmatter.area],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between py-3">
                      <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
                      <dd className="text-fg">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>

            <article className="md:col-span-8 lg:col-span-8 lg:col-start-5">
              <div className="max-w-2xl">
                <MDXRemote source={content} components={mdxComponents} />
              </div>
            </article>
          </div>
        </section>

        {/* GALLERY */}
        <HorizontalGallery images={frontmatter.gallery} title={frontmatter.title} />

        {/* PULL QUOTE */}
        <section className="bg-ink py-24 text-cream md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="font-display text-3xl italic leading-snug tracking-tight md:text-5xl">
                &ldquo;{frontmatter.excerpt}&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 text-xs uppercase tracking-[0.18em] text-cream/50">
                {frontmatter.location}
              </p>
            </Reveal>
          </div>
        </section>

        {/* NEXT PROJECT */}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group relative block h-[60vh] min-h-[420px] w-full overflow-hidden bg-ink text-cream"
          >
            <Image
              src={next.coverImage}
              alt={`Next project: ${next.title}`}
              fill
              sizes="100vw"
              className="object-cover opacity-60 transition-all duration-[900ms] ease-out will-change-transform group-hover:scale-[1.04] group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-16 md:px-10 md:pb-20 lg:px-20">
              <p className="eyebrow text-cream/60">Next project</p>
              <div className="mt-4 flex items-end justify-between gap-6">
                <h2 className="font-display text-4xl leading-[1.02] tracking-tighter md:text-6xl lg:text-7xl">
                  {next.title}
                </h2>
                <ArrowUpRight
                  size={36}
                  strokeWidth={1.25}
                  className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <p className="mt-3 text-sm text-cream/70">
                {next.location} · {next.type} · {next.year}
              </p>
            </div>
          </Link>
        )}
      </main>
      <Footer />
    </>
  );
}
