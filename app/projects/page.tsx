import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A working portfolio of residential, commercial, hospitality, and heritage work by S2 Designs.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <Nav />
      <main id="main" className="bg-bg page-pad-top pb-24 md:pb-40">
        <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <Reveal as="div" className="md:col-span-3">
              <p className="eyebrow">Projects</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {projects.length.toString().padStart(2, "0")} works · 2019 — 2026
              </p>
            </Reveal>
            <Reveal as="div" delay={0.08} className="md:col-span-9">
              <h1 className="font-display text-5xl leading-[1.02] tracking-tighter text-fg md:text-7xl lg:text-[88px]">
                Spaces, in chronological order.
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted md:text-lg">
                A working catalogue. Filter by type, or scroll the full body of work.
              </p>
            </Reveal>
          </div>

          <ProjectsExplorer projects={projects} />
        </section>
      </main>
      <Footer />
    </>
  );
}
