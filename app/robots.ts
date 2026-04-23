import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Required for `output: export` (static site generation, e.g. GitHub Pages).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
