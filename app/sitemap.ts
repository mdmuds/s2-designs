import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const projects = await getAllProjects();
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/about",
    "/services",
    "/contact",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));
  return [...staticRoutes, ...projectRoutes];
}
