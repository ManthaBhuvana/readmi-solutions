import { useEffect, useRef, useState, type ReactNode } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "h2" | "p" | "li" | "span";
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <As
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </As>
  );
}
