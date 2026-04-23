"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="bg-bg page-pad-top">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-6 py-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">500</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tighter md:text-7xl">
          Something didn&rsquo;t draw correctly.
        </h1>
        <p className="mt-6 max-w-md text-base text-muted md:text-lg">
          A small glitch on our side. Try again, or head back to the catalogue.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-3 border border-fg px-6 py-4 text-xs uppercase tracking-[0.16em] hover:border-accent hover:text-accent"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-3 border-b border-fg/30 pb-1 text-sm hover:border-accent hover:text-accent"
          >
            ← Home
          </Link>
        </div>
      </div>
    </main>
  );
}
