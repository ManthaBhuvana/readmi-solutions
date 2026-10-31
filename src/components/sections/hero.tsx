import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Globe, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import growthImage from "@/assets/growth-arrows.jpg";

const goals = [
  { label: "Build my presence", icon: Globe, title: "A brand worth discovering.", description: "Bring your business to life with thoughtful website design and SEO that helps the right people find you.", services: ["Website designing", "SEO"] },
  { label: "Grow my audience", icon: Megaphone, title: "Turn attention into action.", description: "Reach your next customer through connected social media and e-mail campaigns shaped around your business.", services: ["Social media marketing", "E-mail marketing"] },
];

export function Hero() {
  const [selected, setSelected] = useState(0);
  const goal = goals[selected] ?? goals[0];
  return (
    <section className="studio-hero" aria-labelledby="hero-title">
      <div className="growth-cover">
        <img className="growth-cover-image" src={growthImage} alt="Three glowing blue arrows pointing upward" fetchPriority="high" />
        <div className="growth-cover-content mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase">DIGITAL THINKING. HUMAN CONNECTION.</p>
          <h1 id="hero-title" className="mt-5 font-display text-4xl font-bold sm:text-6xl">Readmi Solutions</h1>
          <p className="growth-tagline">Powering Your Digital Growth.<br />Built with a Human Touch.</p>
          <Button asChild className="studio-cta mt-7 bg-gradient-fire text-primary-foreground"><Link to="/contact">Let’s build your next chapter <ArrowUpRight /></Link></Button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="studio-goal-section">
          <div className="studio-goal-heading"><span className="text-xs font-semibold uppercase tracking-widest">Your ambition. Our starting point.</span><span className="text-sm text-muted-foreground">What’s your next move?</span></div>
          <div className="studio-goal-layout">
            <div role="tablist" aria-label="Business goals" className="studio-goal-tabs">
              {goals.map(({ label, icon: Icon }, index) => (
                <Button key={label} id={`goal-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls="goal-panel" variant="ghost" className={`studio-goal-tab ${selected === index ? "is-selected" : ""}`} onClick={() => setSelected(index)} onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    const next = (selected + (event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1) + goals.length) % goals.length;
                    setSelected(next);
                    document.getElementById(`goal-tab-${next}`)?.focus();
                  }
                }}><Icon /><span>{label}</span><ArrowUpRight className="ml-auto" /></Button>
              ))}
            </div>
            <div id="goal-panel" role="tabpanel" aria-labelledby={`goal-tab-${selected}`} className="studio-goal-panel">
              <div key={selected} className="studio-panel-content">
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{goal.title}</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{goal.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">{goal.services.map((service) => <span key={service} className="flex items-center gap-2 text-xs font-medium"><Check size={14} className="text-brand-red" />{service}</span>)}</div>
                <Button asChild variant="link" className="mt-4 h-auto px-0 text-brand-red"><Link to="/services">Discover our services <ArrowUpRight /></Link></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="studio-hero-bottom"><span>DESIGN × MARKETING × GROWTH</span><Button asChild variant="ghost" size="icon" className="rounded-full border border-border" aria-label="Scroll to services"><a href="#home-services"><ArrowDown /></a></Button><span className="hidden sm:block">BUILT AROUND YOUR BUSINESS</span></div>
      </div>
      <div className="studio-ribbon" aria-hidden><div className="studio-ribbon-track">{Array.from({ length: 12 }, (_, item) => <span key={item}>CREATE. <span>CONNECT.</span> GROW. <span>READMI SOLUTIONS.</span> </span>)}</div></div>
    </section>
  );
}
