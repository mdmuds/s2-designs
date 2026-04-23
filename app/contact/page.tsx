import type { Metadata } from "next";
import { Phone, MessageCircle, Instagram, Mail, MapPin } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell us about your space. Reach ${siteConfig.name} in ${siteConfig.city} via WhatsApp, email, phone, or the studio enquiry form.`,
};

const CHANNELS = [
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneRaw}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message instantly",
    href: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: `@${siteConfig.instagram}`,
    href: `https://instagram.com/${siteConfig.instagram}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
] as const;

export default function ContactPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    image: `${siteConfig.url}/og/default.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "IN",
    },
    sameAs: [`https://instagram.com/${siteConfig.instagram}`],
    openingHours: "Mo-Sa 10:00-19:00",
  };

  const mapQuery = encodeURIComponent(
    `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`,
  );

  return (
    <>
      <Nav />
      <main id="main" className="bg-bg page-pad-top pb-24 md:pb-40">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />

        {/* HEADER */}
        <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <Reveal as="div" className="md:col-span-3">
              <p className="eyebrow">Let&rsquo;s talk</p>
            </Reveal>
            <Reveal as="div" delay={0.08} className="md:col-span-9">
              <h1 className="font-display text-5xl leading-[1.02] tracking-tighter text-fg md:text-7xl lg:text-[88px]">
                Tell us about your space.
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted md:text-lg">
                A short note is enough to start. We read every enquiry ourselves and reply within
                two working days.
              </p>
            </Reveal>
          </div>
        </section>

        {/* BODY */}
        <section className="mx-auto mt-20 max-w-[1440px] px-6 md:mt-28 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <Reveal as="div" className="md:col-span-7">
              <ContactForm />
            </Reveal>

            <div className="md:col-span-5">
              <Reveal>
                <h2 className="font-display text-3xl leading-tight tracking-tight text-fg md:text-4xl">
                  Reach us directly.
                </h2>
              </Reveal>

              <ul className="mt-10 divide-y divide-border border-y border-border">
                {CHANNELS.map((c, i) => {
                  const Icon = c.icon;
                  const external = c.href.startsWith("http");
                  return (
                    <Reveal as="li" key={c.label} delay={i * 0.05}>
                      <a
                        href={c.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-accent"
                      >
                        <span className="flex items-center gap-5">
                          <span className="grid h-10 w-10 shrink-0 place-items-center border border-border text-accent transition-colors group-hover:border-accent">
                            <Icon size={18} strokeWidth={1.5} />
                          </span>
                          <span>
                            <span className="block font-display text-xl leading-tight tracking-tight text-fg group-hover:text-accent">
                              {c.label}
                            </span>
                            <span className="mt-0.5 block text-sm text-muted">{c.value}</span>
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-fg/50 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        >
                          ↗
                        </span>
                      </a>
                    </Reveal>
                  );
                })}
              </ul>

              {/* Map */}
              <Reveal delay={0.12}>
                <div className="mt-12 aspect-[4/3] w-full overflow-hidden border border-border bg-border/40">
                  <iframe
                    title={`Map showing ${siteConfig.name} studio location`}
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-full w-full grayscale-[0.35] contrast-[0.95]"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 space-y-2 text-sm text-fg/85">
                  <p className="flex items-start gap-3">
                    <MapPin size={16} strokeWidth={1.5} className="mt-0.5 text-accent" />
                    <span>
                      {siteConfig.address.line1}, {siteConfig.address.line2}
                      <br />
                      {siteConfig.address.city} {siteConfig.address.postalCode}, {siteConfig.address.country}
                    </span>
                  </p>
                  <p className="pl-7 text-muted">{siteConfig.hours}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
