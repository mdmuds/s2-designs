/** @type {import('next').NextConfig} */
// Set REPO_NAME at build time (e.g. via GitHub Actions) when deploying to a
// GitHub Pages project site so assets resolve under /<repo>/.
// For a user/organization root site (<user>.github.io) leave it unset.
const repo = process.env.REPO_NAME ? `/${process.env.REPO_NAME}` : "";

const nextConfig = {
  reactStrictMode: true,
  // Static export so the whole site can be served from any static host (GitHub Pages, S3, etc).
  output: "export",
  // Emit URLs as folders with trailing index.html — required for GH Pages clean URLs.
  trailingSlash: true,
  basePath: repo,
  assetPrefix: repo || undefined,
  images: {
    // GitHub Pages can't run the Next image optimizer; serve images as-is.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
