import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Readmi Solutions" },
      { name: "description", content: "How Readmi Solutions collects, uses and protects your information." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="6 November 2026">
      <p>
        This policy explains what information {SITE.name} collects through this website and how we use it.
      </p>
      <div>
        <h2>What we collect</h2>
        <ul>
          <li>Contact form: your name, email address, company, service of interest and the message you write.</li>
          <li>Newsletter: your email address.</li>
        </ul>
      </div>
      <div>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your inquiry and send an automatic confirmation.</li>
          <li>To send you our newsletter, only if you subscribed.</li>
        </ul>
        <p className="mt-2">We do not sell your information.</p>
      </div>
      <div>
        <h2>Where it is stored</h2>
        <p>
          Form submissions are stored in our Google Workspace/Google account (Google Sheets) and email systems.
          Access is limited to the {SITE.name} team. We keep inquiries for as long as needed to respond and
          maintain our business records, and newsletter addresses until you unsubscribe.
        </p>
      </div>
      <div>
        <h2>Cookies</h2>
        <p>This website does not use advertising or tracking cookies.</p>
      </div>
      <div>
        <h2>Your choices</h2>
        <p>
          You can unsubscribe at any time by replying “unsubscribe” to any newsletter email, and you can ask us to
          access, correct or delete your information by writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>Questions about this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </LegalPage>
  );
}
