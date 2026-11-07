import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Services } from "@/components/sections/services";
import { CtaBand } from "@/components/sections/cta-band";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      title: "Services — Website Design, SEO & Marketing | Readmi Solutions",
      description: "Website designing, SEO, social media marketing and e-mail marketing from Readmi Solutions, connected under one roof.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="pt-20 pb-4 sm:pt-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">Services</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-black tracking-tight sm:text-6xl">
            Digital expertise. <span className="text-gradient-fire">One trusted partner</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            Engage us for a single discipline or hand over the entire digital stack. Either way,
            you get senior expertise, transparent process, and outcomes you can measure.
          </p>
        </div>
      </section>
      <Services />
      <CtaBand />
    </>
  );
}
