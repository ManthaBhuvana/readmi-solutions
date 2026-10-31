import { useEffect, useRef, useState } from "react";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-brand-slate py-14 text-brand-cream sm:py-16">
      <div className="absolute inset-0 noise-grain text-white/4" aria-hidden />
      <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-gradient-fire opacity-15 blur-3xl" />
      <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-brand-magenta opacity-15 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            By the numbers
          </p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-4xl">
            A decade of <span className="text-gradient-fire">delivering results</span>.
          </h2>
        </div>
        <Counter value={10} suffix="+" label="Years of experience" />
      </div>
    </section>
  );
}

function Counter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              setN(value * (1 - Math.pow(1 - p, 3)));
              if (p < 1) requestAnimationFrame(tick);
              else setN(value);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-t border-white/15 pt-5 sm:min-w-65 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
      <div className="font-display text-6xl font-black tracking-tight sm:text-7xl">
        <span className="text-gradient-fire">{Math.round(n)}</span>
        <span className="text-gradient-fire">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-(--brand-cream)/70">{label}</div>
    </div>
  );
}