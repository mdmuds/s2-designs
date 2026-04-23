import Link from "next/link";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.phone,
      href: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`,
      external: true,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: `@${siteConfig.instagram}`,
      href: `https://instagram.com/${siteConfig.instagram}`,
      external: true,
    },
    {
      icon: Phone,
      label: "Call the studio",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phoneRaw}`,
      external: false,
    },
  ] as const;

  return (
    <footer
      data-nav-section="/contact"
      className="relative bg-ink text-cream dark:bg-[#1F1C18]"
    >
      {/* Glassy gradient seam — sits between body and footer in both themes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent"
      />
      <div className="relative mx-auto max-w-[1440px] px-6 pb-10 pt-24 md:px-10 md:pt-32 lg:px-20">
        {/* Big closing statement */}
        <div className="border-b border-white/10 pb-16 md:pb-20">
          <p className="eyebrow text-cream/50">Have a space in mind?</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tighter md:text-7xl lg:text-[88px]">
            Let&rsquo;s draw something <em className="not-italic text-accent">together</em>.
          </h2>

          {/* Three large icon contact tiles */}
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:mt-16 md:grid-cols-3">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noreferrer" : undefined}
                    className="group flex h-full items-center justify-between gap-6 bg-ink px-6 py-7 transition-colors hover:bg-accent/10 hover:text-accent md:px-8 md:py-10"
                  >
                    <span className="flex items-center gap-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center border border-cream/30 text-accent transition-colors group-hover:border-accent">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="block font-display text-xl leading-tight tracking-tight md:text-2xl">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-cream/60">{c.value}</span>
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-cream/40 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-cream/55">
            <span>{siteConfig.hours}</span>
            <Link href="/contact" className="text-cream/85 underline-offset-4 hover:text-accent hover:underline">
              Or send a longer note →
            </Link>
          </div>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-3xl tracking-tighter md:text-4xl">
              {siteConfig.shortName}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              {siteConfig.tagline}. An interior design and architecture studio in {siteConfig.city}.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-cream/50">Sitemap</p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/85 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-cream/50">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-cream/85 transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-cream/85 transition-colors hover:text-accent"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={`https://instagram.com/${siteConfig.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-cream/85 transition-colors hover:text-accent"
                >
                  <Instagram size={16} strokeWidth={1.5} />@{siteConfig.instagram}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-cream/55">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.city} {siteConfig.address.postalCode}, {siteConfig.address.country}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.14em]">
            Drawn in {siteConfig.city} · Built carefully
          </p>
        </div>
      </div>
    </footer>
  );
}
