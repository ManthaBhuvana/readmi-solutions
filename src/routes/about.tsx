import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { CtaBand } from "@/components/sections/cta-band";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Readmi Solutions — Our Story & Team",
      description: "Readmi Solutions brings technology, creativity and expertise together as a single accountable partner for digital growth.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase text-brand-red">About us</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold sm:text-6xl">Readmi Solutions</h1>
          <p className="mt-5 max-w-3xl font-display text-2xl font-medium text-gradient-fire sm:text-3xl">Powering Your Digital Growth. Built with a Human Touch.</p>
          <div className="mt-12 max-w-4xl space-y-8 text-lg leading-relaxed text-foreground/80">
            <p className="about-lead">Readmi Solutions was founded with a clear vision: to empower businesses and institutions with a comprehensive range of digital solutions under one roof. We believe that managing multiple service providers should not be a challenge, which is why we offer an integrated suite of services, including website design and development, Search Engine Optimization (SEO), digital marketing, and networking solutions. Our goal is to simplify digital transformation by providing reliable, innovative, and customized solutions through a single, accountable partner.</p>
            <p>Over the past decade, we have built valuable experience serving startups, academic institutions, and businesses across diverse sectors. Our commitment to quality, creativity, and customer satisfaction has enabled us to understand our clients' unique needs and deliver solutions that support their growth, enhance their digital presence, and improve operational efficiency. At Readmi Solutions, we combine technology, creativity, and expertise to help our clients navigate the evolving digital landscape and achieve sustainable success.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
