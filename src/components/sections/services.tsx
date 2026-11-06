import { Monitor, Search, Share2, Mail, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/lib/reveal";

const services = [
  {
    icon: Monitor,
    title: "Website Designing",
    desc: "Conversion-focused, responsive websites engineered for speed, SEO, and brand consistency.",
    tags: ["UI/UX", "Responsive", "CMS"],
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    desc: "Technical, on-page, and off-page SEO programs that drive sustained organic traffic and qualified leads.",
    tags: ["Audits", "On-page", "Link building"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Channel-native content and community strategy across Instagram, Facebook, LinkedIn, and YouTube.",
    tags: ["Strategy", "Content", "Community"],
  },
  {
    icon: Mail,
    title: "E-mail Marketing",
    desc: "Lifecycle campaigns, automations, and newsletters that nurture leads and grow customer LTV.",
    tags: ["Automation", "Newsletters", "CRM"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
              <span className="h-2 w-2 rounded-full bg-gradient-fire" /> What we do
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
              End-to-end digital services<br />
              <span className="text-gradient-fire">under one roof.</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/70">
            From your first website to your next campaign —
            connected digital expertise, built around your business.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60} className="h-full">
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const Icon = service.icon;
  return (
    <article className={`group service-color service-tone-${index} card-hover relative flex h-full flex-col overflow-hidden rounded-lg border border-border p-6`}>
      <div className="relative flex items-start justify-between">
        <div className="service-icon grid h-12 w-12 place-items-center rounded-lg"><Icon size={22} /></div>
        <ArrowUpRight size={20} className="service-arrow transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{service.desc}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {service.tags.map((t) => (
          <span key={t} className="service-tag rounded-full px-2.5 py-1 text-xs font-semibold">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
