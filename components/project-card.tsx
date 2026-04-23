import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { formatIndex } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectFrontmatter;
  index: number;
  total?: number;
  className?: string;
  /** sizes attribute for next/image */
  sizes?: string;
  priority?: boolean;
  /** aspect ratio class — default 4:5 */
  aspect?: string;
}

export function ProjectCard({
  project,
  index,
  total,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  aspect = "aspect-[4/5]",
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
      aria-label={`${project.title}, ${project.location}, ${project.type}, ${project.year}`}
    >
      <div className={cn("relative overflow-hidden bg-border/40", aspect)}>
        <span className="absolute left-4 top-4 z-10 font-mono text-xs text-cream mix-blend-difference">
          {formatIndex(index, total)}
        </span>
        <Image
          src={project.coverImage}
          alt={`${project.title} — ${project.excerpt}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-[1.04]"
        />
        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs uppercase tracking-[0.16em] text-cream/80">
            {project.location} · {project.year}
          </p>
        </div>
      </div>
      <div className="flex items-start justify-between gap-6 pt-5">
        <div>
          <h3 className="font-display text-2xl leading-tight tracking-tighter text-fg md:text-[26px]">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {project.location} · {project.type} · {project.year}
          </p>
        </div>
        <ArrowUpRight
          strokeWidth={1.5}
          size={20}
          className="mt-1 shrink-0 text-fg/60 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
    </Link>
  );
}
