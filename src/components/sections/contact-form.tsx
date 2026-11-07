import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/lib/forms.functions";
import { SITE, telHref } from "@/lib/site";

export function ContactForm({ heading = true, asPage = false }: { heading?: boolean; asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    setSubmitting(true);
    setError(null);
    try {
      await submitContact({
        data: {
          name: get("name"),
          email: get("email"),
          company: get("company"),
          service: get("service"),
          brief: get("brief"),
          website: get("website"),
          page: window.location.pathname,
        },
      });
      setSent(true);
      form.reset();
    } catch {
      setError("Sorry, we couldn't send your message. Please try again, or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            {heading && (
              <>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                  <span className="h-2 w-2 rounded-full bg-gradient-fire" /> Contact
                </p>
                <Heading className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
                  Let's discuss your<br />
                  <span className="text-gradient-fire">next project</span>.
                </Heading>
                <p className="mt-6 max-w-md text-foreground/70 leading-relaxed">
                  Tell us about your business, goals, and timeline. Our team responds to
                  every inquiry within one business day.
                </p>
              </>
            )}
            <ul className="mt-8 space-y-4">
              {[
                { Icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
                ...(SITE.phone ? [{ Icon: Phone, label: SITE.phone, href: telHref(SITE.phone) }] : []),
                ...(SITE.hours ? [{ Icon: MapPin, label: SITE.hours, href: "" }] : []),
              ].map(({ Icon, label, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-fire text-[var(--brand-cream)] shadow-fire">
                    <Icon size={16} />
                  </span>
                  {href ? <a href={href} className="font-medium hover:text-[var(--brand-red)]">{label}</a> : <span className="font-medium">{label}</span>}
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10"
          >
            <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-gradient-fire opacity-15 blur-3xl" aria-hidden />
            <div className="relative grid gap-5">
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Jane Doe" />
                <Field label="Work email" name="email" type="email" placeholder="jane@company.com" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company" name="company" placeholder="Company name" />
                <Field label="Service of interest" name="service" placeholder="e.g. SEO, Web Design" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">
                  Project details
                </label>
                <textarea
                  required
                  rows={5}
                  name="brief"
                  placeholder="Tell us about your business, goals, and timeline…"
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground/30 focus:border-[var(--brand-red)] focus:ring-4 focus:ring-[var(--brand-red)]/15"
                />
              </div>
              {error && (
                <p role="alert" className="text-sm font-medium text-[var(--brand-red)]">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting || sent}
                className="btn-shine group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-fire px-7 py-4 text-base font-semibold text-[var(--brand-cream)] shadow-fire transition-transform hover:scale-[1.02] disabled:opacity-90"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={18} />
                    Thank you — check your inbox
                  </>
                ) : submitting ? (
                  "Sending…"
                ) : (
                  <>
                    Send inquiry
                    <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">{label}</label>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground/30 focus:border-[var(--brand-red)] focus:ring-4 focus:ring-[var(--brand-red)]/15"
      />
    </div>
  );
}
