import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { ContactForm } from "@/components/sections/contact-form";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Readmi Solutions — Get a Quote",
      description: "Contact Readmi Solutions. Tell us about your business, goals and timeline. We respond to every inquiry within one business day.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="pt-12 sm:pt-20">
      <ContactForm asPage />
    </section>
  );
}
