import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Clients } from "@/components/sections/clients";
import { ContactForm } from "@/components/sections/contact-form";
import { CtaBand } from "@/components/sections/cta-band";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Readmi Solutions — Digital Marketing & Web Services" },
      { name: "description", content: "Powering Your Digital Growth. Built with a Human Touch. Website design, SEO, social media and e-mail marketing by Readmi Solutions." },
      { property: "og:title", content: "Readmi Solutions — Digital Marketing & Web Services" },
      { property: "og:description", content: "Websites, SEO and marketing engineered to drive measurable growth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <div id="home-services" className="scroll-mt-20"><Services /></div>
      <Stats />
      <Clients />
      <CtaBand />
      <ContactForm />
    </>
  );
}
