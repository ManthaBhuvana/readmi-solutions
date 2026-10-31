import { ArrowUpRight, BookOpen, GraduationCap, Globe } from "lucide-react";

const clients = [
  { name: "SVU Library", type: "Library", icon: BookOpen },
  { name: "Sri Vatsal Gurukul Vidyalaya", type: "School", icon: GraduationCap },
  { name: "Venugopal Bere", type: "Visit website", icon: Globe, href: "https://thereviewer.co.in/" },
];

export function Clients() {
  return (
    <section className="client-section py-16 sm:py-20" aria-labelledby="clients-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Our clients</p>
        <h2 id="clients-title" className="mt-3 font-display text-3xl font-bold sm:text-4xl">Growing together.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {clients.map(({ name, type, icon: Icon, ...client }, i) => {
            const className = `group service-color service-tone-${i} card-hover flex min-h-36 items-center gap-5 rounded-lg border border-foreground/15 p-6 shadow-soft`;
            const content = (
              <>
                <div className="service-icon grid h-14 w-14 shrink-0 place-items-center rounded-lg">
                  <Icon size={28} />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-xl font-bold leading-snug text-foreground">{name}</div>
                  <div className="mt-1 text-sm font-medium text-foreground/60">{type}</div>
                </div>
                {"href" in client && (
                  <ArrowUpRight className="service-arrow ml-auto shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={22} />
                )}
              </>
            );
            return "href" in client ? (
              <a key={name} href={client.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
            ) : (
              <div key={name} className={className}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}