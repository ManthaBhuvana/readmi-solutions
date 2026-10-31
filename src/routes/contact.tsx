import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/sections/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Readmi Solutions" },
      { name: "description", content: "Tell us about your business, goals, and timeline. We respond to every inquiry within one business day." },
      { property: "og:title", content: "Contact Readmi Solutions" },
      { property: "og:description", content: "Request a quote or book a consultation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="pt-12 sm:pt-20">
      <ContactForm />
    </section>
  );
}
