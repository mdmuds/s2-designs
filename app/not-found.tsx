import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="bg-bg page-pad-top">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-6 py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tighter md:text-7xl">
            That page isn&rsquo;t in the catalogue.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted md:text-lg">
            The link may have changed, or it never existed. Either way — let&rsquo;s get you back to
            the work.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 border border-fg px-6 py-4 text-xs uppercase tracking-[0.16em] hover:border-accent hover:text-accent"
            >
              ← Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 border-b border-fg/30 pb-1 text-sm hover:border-accent hover:text-accent"
            >
              See all projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
