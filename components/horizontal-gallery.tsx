"use client";

import Image from "next/image";
import { useRef } from "react";

interface HorizontalGalleryProps {
  images: string[];
  title: string;
}

export function HorizontalGallery({ images, title }: HorizontalGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="mx-auto mb-10 flex max-w-[1440px] items-end justify-between px-6 md:mb-14 md:px-10 lg:px-20">
        <div>
          <p className="eyebrow">Gallery</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {images.length.toString().padStart(2, "0")} frames · drag or scroll →
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:gap-10 md:px-10 lg:px-20"
        role="region"
        aria-label={`${title} — image gallery`}
      >
        {images.map((src, i) => {
          const isPortrait = i % 3 === 0;
          return (
            <figure
              key={src}
              className="relative shrink-0 snap-start overflow-hidden bg-border/40"
              style={{
                width: isPortrait ? "min(560px, 80vw)" : "min(820px, 92vw)",
                aspectRatio: isPortrait ? "3 / 4" : "4 / 3",
              }}
            >
              <Image
                src={src}
                alt={`${title} — frame ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream mix-blend-difference">
                {(i + 1).toString().padStart(2, "0")} / {images.length.toString().padStart(2, "0")}
              </figcaption>
            </figure>
          );
        })}
        <div className="shrink-0" aria-hidden="true" style={{ width: "1px" }} />
      </div>
    </section>
  );
}
