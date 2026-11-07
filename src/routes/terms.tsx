import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use — Readmi Solutions",
      description: "Terms for using the Readmi Solutions website.",
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="6 November 2026">
      <p>By using this website you agree to these terms.</p>
      <div>
        <h2>Information on this site</h2>
        <p>
          The content here is provided for general information about {SITE.name} and our services. Submitting an
          inquiry does not create a contract; any engagement is agreed separately in writing.
        </p>
      </div>
      <div>
        <h2>Acceptable use</h2>
        <p>
          Please do not misuse the site, attempt to disrupt it, or submit unlawful, misleading or spam content
          through our forms.
        </p>
      </div>
      <div>
        <h2>Intellectual property</h2>
        <p>
          The site’s design, text, logo and graphics belong to {SITE.name} or its licensors and may not be copied
          without permission.
        </p>
      </div>
      <div>
        <h2>Liability</h2>
        <p>
          We work to keep the site accurate and available but provide it “as is”, without warranties, and are not
          liable for losses arising from its use, to the extent permitted by law.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </LegalPage>
  );
}
