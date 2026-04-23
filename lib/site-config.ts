export const siteConfig = {
  name: "S2 Designs",
  shortName: "s2 designs",
  tagline: "From Drafting to Crafting",
  description:
    "Interior design and architecture studio in Bangalore. Residential, commercial, hospitality, and heritage work — drawn slowly, built carefully.",
  url: "https://s2designs.co.in",
  email: "aamir.salar@s2designs.co.in",
  phone: "+91 96297 18765",
  phoneRaw: "+919629718765",
  whatsapp: "919629718765",
  whatsappMessage: "Hi S2 Designs, I'd like to discuss a project.",
  instagram: "s2designs",
  city: "Bangalore",
  timezone: "Asia/Kolkata",
  hours: "Mon–Sat · 10:00–19:00 IST",
  address: {
    line1: "Studio S2",
    line2: "Off CMH Road, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560042",
    country: "India",
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { slug: "architecture", name: "Architecture" },
    { slug: "interior-design", name: "Interior Design" },
    { slug: "turnkey", name: "Turnkey Execution" },
    { slug: "consulting", name: "Design Consulting" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
