import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Clients } from "@/components/sections/clients";
import { ContactForm } from "@/components/sections/contact-form";
import { CtaBand } from "@/components/sections/cta-band";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Readmi Solutions — Digital Marketing & Web Services",
      description: "Readmi Solutions offers website design, SEO, social media and e-mail marketing. Powering Your Digital Growth. Built with a Human Touch.",
      path: "/",
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
