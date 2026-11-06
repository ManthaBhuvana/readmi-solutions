import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/lib/forms.functions";
import { SITE, telHref } from "@/lib/site";
import logo from "@/assets/readmi-logo.png";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: SITE.socials.instagram },
  { Icon: Twitter, label: "X (Twitter)", href: SITE.socials.twitter },
  { Icon: Linkedin, label: "LinkedIn", href: SITE.socials.linkedin },
  { Icon: Youtube, label: "YouTube", href: SITE.socials.youtube },
];

export function SiteFooter() {
  const socials = SOCIALS.filter((x) => x.href);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [subscribed, setSubscribed] = useState<{ email: string; duplicate: boolean } | null>(null);
  const sent = status === "done";

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "loading") return;
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    setStatus("loading");
    try {
      const res = await subscribeNewsletter({ data: { email, website, page: window.location.pathname } });
      setSubscribed({ email, duplicate: Boolean(res?.duplicate) });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="relative mt-24 overflow-hidden bg-[var(--brand-slate)] text-[var(--brand-cream)]">

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Readmi Solutions logo" className="h-12 w-12 rounded object-contain" />
              <span className="font-display text-lg font-black tracking-tight">
                Readmi <span className="text-[var(--brand-red)]">Solutions</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-[var(--brand-cream)]/70 leading-relaxed">
              Powering Your Digital Growth. Built with a Human Touch.
            </p>
            <form
              onSubmit={onSubscribe}
              className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur"
            >
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={sent}
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-[var(--brand-cream)]/40 outline-none disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={status === "loading" || sent}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-fire px-4 py-2 text-sm font-semibold shadow-fire transition-transform hover:scale-[1.03]"
              >
                {sent ? "Subscribed" : status === "loading" ? "Sending…" : "Subscribe"}
                {sent ? <Check size={14} /> : <ArrowRight size={14} />}
              </Button>
            </form>
            <div aria-live="polite">
              {sent && subscribed && (
                <p className="mt-3 flex max-w-md items-start gap-2 text-sm leading-snug text-[var(--brand-cream)]">
                  <CheckCircle2 size={18} className="mt-px shrink-0 text-[var(--brand-orange)]" />
                  <span>
                    {subscribed.duplicate ? (
                      <>You’re already subscribed with <strong className="font-semibold">{subscribed.email}</strong>. Thanks for sticking with us.</>
                    ) : (
                      <>
                        You’re subscribed. A welcome email is on its way to{" "}
                        <strong className="font-semibold">{subscribed.email}</strong>
                        <span className="text-[var(--brand-cream)]/60"> (check spam if you don’t see it).</span>
                      </>
                    )}
                  </span>
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="mt-3 text-sm text-[var(--brand-orange)]">
                  Couldn’t subscribe right now. Please try again.
                </p>
              )}
            </div>
          </div>

          <FooterCol
            title="Company"
            items={[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Contact", to: "/contact" },
            ]}
          />
          <FooterCol
            title="Services"
            items={[
              { label: "Website Designing", to: "/services" },
              { label: "SEO", to: "/services" },
              { label: "Social Media", to: "/services" },
              { label: "E-mail Marketing", to: "/services" },
            ]}
          />
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--brand-cream)]/60">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--brand-cream)]/80">
              <li><a href={`mailto:${SITE.email}`} className="hover:text-[var(--brand-cream)]">{SITE.email}</a></li>
              {SITE.phone && <li><a href={telHref(SITE.phone)} className="hover:text-[var(--brand-cream)]">{SITE.phone}</a></li>}
              {SITE.hours && <li>{SITE.hours}</li>}
            </ul>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 transition-all hover:border-[var(--brand-orange)] hover:bg-gradient-fire hover:scale-110"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[var(--brand-cream)]/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Readmi Solutions. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-[var(--brand-cream)]">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--brand-cream)]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--brand-cream)]/60">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="text-[var(--brand-cream)]/80 transition-colors hover:text-[var(--brand-orange)]">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
