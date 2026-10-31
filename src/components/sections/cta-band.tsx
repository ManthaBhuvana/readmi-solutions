import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-fire p-10 shadow-fire sm:p-16">
          <div className="absolute inset-0 noise-grain text-white/10" aria-hidden />
          <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-[var(--brand-magenta)] opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[var(--brand-red)] opacity-30 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-black leading-tight text-[var(--brand-cream)] sm:text-4xl lg:text-5xl">
                Let's plan your next digital project.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-[var(--brand-cream)]/90">
                Share your goals and we'll respond within one business day with a clear scope,
                timeline, and transparent quote.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                to="/contact"
                className="btn-shine group inline-flex items-center gap-2 rounded-full bg-[var(--brand-slate)] px-7 py-4 text-base font-semibold text-[var(--brand-cream)] transition-transform hover:scale-[1.04]"
              >
                Request a quote
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
