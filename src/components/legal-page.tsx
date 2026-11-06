import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-foreground/60">Last updated: {updated}</p>
        <div className="mt-10 space-y-8 leading-relaxed text-foreground/80 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_a]:text-brand-red [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  );
}
