"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll-spy: track which section labelled with data-nav-section is in view.
  useEffect(() => {
    setActiveSection(null);
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-section]"),
    );
    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = entry.target.getAttribute("data-nav-section");
          if (!key) continue;
          if (entry.isIntersecting) {
            visible.set(key, entry.intersectionRatio);
          } else {
            visible.delete(key);
          }
        }
        if (visible.size === 0) {
          setActiveSection(null);
          return;
        }
        const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActiveSection(top ? top[0] : null);
      },
      {
        // Trigger when a section crosses the upper third of the viewport
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // A nav link is active when the route matches OR (on home) the spied section matches.
  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (pathname === "/" && activeSection === href) return true;
    return false;
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:border focus-visible:border-accent focus-visible:bg-bg focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-fg"
      >
        Skip to content
      </a>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink text-cream shadow-[0_1px_0_0_rgba(0,0,0,0.4)] dark:border-white/[0.08] dark:bg-[#1F1C18] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:h-24 md:px-10 lg:px-20">
          <Link
            href="/"
            className="font-display text-2xl tracking-tighter md:text-[28px]"
            aria-label={`${siteConfig.name} — Home`}
          >
            {siteConfig.shortName}
            <span className="text-accent">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-12 md:flex">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative text-base tracking-wide transition-all duration-300 ease-out hover:text-accent",
                    active ? "text-accent" : "font-medium text-cream/90",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block transition-transform duration-300 ease-out",
                      active && "scale-[1.08]",
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 border border-cream/40 px-5 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-200 hover:border-accent hover:text-accent md:inline-flex"
            >
              Get in Touch
            </Link>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center md:hidden"
            >
              <Menu strokeWidth={1.5} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[60] bg-bg text-fg transition-opacity duration-400 ease-out md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-xl tracking-tighter"
          >
            {siteConfig.shortName}
            <span className="text-accent">.</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center"
          >
            <X strokeWidth={1.5} size={22} />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col px-6 pt-12">
          {siteConfig.nav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-baseline justify-between border-b border-border py-6 font-display text-4xl tracking-tighter transition-colors hover:text-accent",
                  active && "text-accent",
                )}
              >
                <span className="flex items-baseline gap-3">
                  {active && (
                    <span aria-hidden="true" className="inline-block h-2 w-2 -translate-y-1 bg-accent" />
                  )}
                  {item.label}
                </span>
                <span className="text-xs font-sans text-muted">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-12 inline-flex w-full items-center justify-center border border-fg px-6 py-4 text-xs font-medium uppercase tracking-[0.14em] hover:bg-fg hover:text-bg"
          >
            Get in Touch
          </Link>
          <p className="mt-12 text-xs uppercase tracking-[0.14em] text-muted">
            {siteConfig.city} · {siteConfig.hours}
          </p>
        </nav>
      </div>
    </>
  );
}
