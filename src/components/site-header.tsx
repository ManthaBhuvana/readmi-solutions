import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/readmi-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[color-mix(in_oklab,var(--brand-cream)_85%,transparent)] border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src={logo} alt="Readmi Solutions logo" className="h-11 w-11 rounded object-contain" />
          <span className="font-display text-base font-black tracking-tight sm:text-lg">
            Readmi <span className="text-[var(--brand-red)]">Solutions</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-[var(--brand-red)]" }}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-fire px-5 py-2.5 text-sm font-semibold text-[var(--brand-cream)] shadow-fire transition-transform hover:scale-[1.03]"
          >
            Get a quote
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <Button variant="outline" size="icon"
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-border bg-card"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-5 py-4 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-[var(--brand-red)]" }}
                className="py-3 text-base font-medium border-b border-border last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-fire px-5 py-3 text-sm font-semibold text-[var(--brand-cream)]"
            >
              Get a quote →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
