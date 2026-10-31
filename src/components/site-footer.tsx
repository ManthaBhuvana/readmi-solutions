import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/readmi-logo.png";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

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
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={sent ? "Subscribed. Watch your inbox." : "your@email.com"}
                disabled={sent}
                className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-[var(--brand-cream)]/40 outline-none"
              />
              <Button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-fire px-4 py-2 text-sm font-semibold shadow-fire transition-transform hover:scale-[1.03]"
              >
                {sent ? "Sent" : "Subscribe"}
                <ArrowRight size={14} />
              </Button>
            </form>
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
              <li>hello@readmisolutions.com</li>
              <li>+91 98765 43210</li>
              <li>Mon – Sat · 10:00 – 19:00 IST</li>
            </ul>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 transition-all hover:border-[var(--brand-orange)] hover:bg-gradient-fire hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[var(--brand-cream)]/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Readmi Solutions. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[var(--brand-cream)]">Privacy</a>
            <a href="#" className="hover:text-[var(--brand-cream)]">Terms</a>
            <a href="#" className="hover:text-[var(--brand-cream)]">Cookies</a>
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
