"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion/reveal";
import type { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Residential", "Commercial", "Hospitality", "Heritage"] as const;
type Filter = (typeof FILTERS)[number];

interface ProjectsExplorerProps {
  projects: ProjectFrontmatter[];
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.type === filter)),
    [filter, projects],
  );

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-2 md:mt-16">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={cn(
                "group relative px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors",
                active ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {f}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 block h-px bg-accent transition-all duration-300 ease-out",
                  active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50",
                )}
              />
            </button>
          );
        })}
        <span className="ml-auto self-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {filtered.length.toString().padStart(2, "0")} {filtered.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-24 text-center text-muted">No projects in this category yet.</p>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-y-28 lg:gap-y-32">
          {filtered.map((project, i) => (
            <Reveal as="div" key={project.slug} delay={(i % 2) * 0.06}>
              <div className={cn(i % 2 === 1 && "md:mt-24 lg:mt-32")}>
                <ProjectCard
                  project={project}
                  index={i + 1}
                  total={filtered.length}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
