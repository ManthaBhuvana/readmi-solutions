import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

export function ContactForm({ heading = true }: { heading?: boolean }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSent(true);
      setSubmitting(false);
    }, 800);
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
                <h2 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
                  Let's discuss your<br />
                  <span className="text-gradient-fire">next project</span>.
                </h2>
                <p className="mt-6 max-w-md text-foreground/70 leading-relaxed">
                  Tell us about your business, goals, and timeline. Our team responds to
                  every inquiry within one business day.
                </p>
              </>
            )}
            <ul className="mt-8 space-y-4">
              {[
                { Icon: Mail, label: "hello@readmisolutions.com" },
                { Icon: Phone, label: "+91 98765 43210" },
                { Icon: MapPin, label: "Mon – Sat · 10:00 – 19:00 IST" },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-fire text-[var(--brand-cream)] shadow-fire">
                    <Icon size={16} />
                  </span>
                  <span className="font-medium">{label}</span>
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
              <button
                type="submit"
                disabled={submitting || sent}
                className="btn-shine group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-fire px-7 py-4 text-base font-semibold text-[var(--brand-cream)] shadow-fire transition-transform hover:scale-[1.02] disabled:opacity-90"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={18} />
                    Thank you — we'll be in touch
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
