import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  location: z.string(),
  type: z.enum(["Residential", "Commercial", "Hospitality", "Heritage"]),
  year: z.number().int(),
  status: z.enum(["Completed", "In Progress"]),
  area: z.string(),
  coverImage: z.string(),
  gallery: z.array(z.string()).default([]),
  excerpt: z.string(),
  featured: z.boolean().default(false),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export interface ProjectFile {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

async function readProjectFile(filename: string): Promise<ProjectFile> {
  const fullPath = path.join(PROJECTS_DIR, filename);
  const raw = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(raw);
  const parsed = ProjectFrontmatterSchema.parse(data);
  const expectedSlug = filename.replace(/\.mdx?$/i, "");
  if (parsed.slug !== expectedSlug) {
    throw new Error(
      `Project slug mismatch in ${filename}: frontmatter "${parsed.slug}" must equal filename "${expectedSlug}".`,
    );
  }
  return { frontmatter: parsed, content };
}

export async function getAllProjects(): Promise<ProjectFrontmatter[]> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(PROJECTS_DIR);
  } catch {
    return [];
  }
  const files = entries.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const projects = await Promise.all(files.map(async (f) => (await readProjectFile(f)).frontmatter));
  return projects.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export async function getProject(slug: string): Promise<ProjectFile | null> {
  try {
    return await readProjectFile(`${slug}.mdx`);
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectFrontmatter[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  return featured.slice(0, limit);
}

export async function getAdjacentProject(slug: string): Promise<ProjectFrontmatter | null> {
  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const next = all[(idx + 1) % all.length];
  return next ?? null;
}
