import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <>
      <Nav />
      <main className="bg-bg page-pad-top">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 py-32">
          <p className="eyebrow">404 · Project</p>
          <h1 className="mt-4 font-display text-5xl tracking-tighter md:text-7xl">
            That project isn&rsquo;t in the catalogue.
          </h1>
          <Link
            href="/projects"
            className="mt-10 inline-flex items-center gap-2 border-b border-fg/30 pb-1 text-sm hover:border-accent hover:text-accent"
          >
            ← Back to all projects
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
