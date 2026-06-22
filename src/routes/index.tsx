import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import semaHero from "@/assets/sema-hero.jpg";
import tirzHero from "@/assets/tirz-hero.jpg";
import semaProduct from "@/assets/semaglutide.jpg";
import tirzProduct from "@/assets/tirzepatide.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChubbyNoMore — Physician-supervised GLP-1 care" },
      { name: "description", content: "Semaglutide and Tirzepatide programs supervised by board-certified physicians. Transparent pricing, discreet shipping, HSA/FSA eligible." },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Semaglutide", href: "#semaglutide" },
  { label: "Tirzepatide", href: "#tirzepatide" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

const miniCards = [
  { emoji: "💊", title: "Semaglutide", desc: "Once-weekly GLP-1", href: "#semaglutide" },
  { emoji: "💉", title: "Tirzepatide", desc: "Dual GIP/GLP-1", href: "#tirzepatide" },
  { emoji: "🏷️", title: "Pricing & Plans", desc: "Transparent monthly cost", href: "#pricing" },
  { emoji: "🧭", title: "How It Works", desc: "From eval to delivery", href: "#how" },
  { emoji: "❓", title: "FAQ", desc: "Answers in plain language", href: "#faq" },
];

const marqueeItems = [
  "Physician-supervised",
  "Clinically proven",
  "Discreet shipping",
  "No hidden fees",
  "USP 797 pharmacies",
  "HSA/FSA eligible",
];

const semaGoals = ["All of the above", "Lose 15+ lbs", "Curb cravings", "Better blood sugar", "Sustainable habits"];
const tirzGoals = ["All of the above", "Lose 25+ lbs", "Reduce appetite", "Metabolic reset", "Long-term maintenance"];

const credibility = [
  { emoji: "🩺", title: "Board-Certified Physicians", desc: "Every program is reviewed and supervised by US-licensed, board-certified physicians." },
  { emoji: "📊", title: "Evidence-Based Protocols", desc: "Dosing and titration follow protocols grounded in peer-reviewed GLP-1 clinical research." },
  { emoji: "🧪", title: "Licensed Compounding Pharmacies", desc: "Medications are dispensed by USP 797-compliant compounding pharmacies in the United States." },
];

const faqs = [
  { q: "Who qualifies for a GLP-1 program?", a: "Eligibility is determined by a licensed physician based on your medical history, current medications, and BMI. The free evaluation takes about 5 minutes." },
  { q: "How is the medication shipped?", a: "Medication is shipped discreetly in temperature-controlled packaging directly from a USP 797 compounding pharmacy to your door." },
  { q: "Is this covered by HSA or FSA?", a: "Yes. ChubbyNoMore programs are HSA and FSA eligible. We provide itemized receipts for reimbursement." },
  { q: "What are the side effects?", a: "Common side effects include nausea, fatigue, and mild GI discomfort, especially during titration. Your physician will discuss your full risk profile during the evaluation." },
  { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts. You can pause or cancel your program at any time from your account." },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <Nav scrolled={scrolled} />
      <Hero />
      <MiniCards />
      <Marquee />
      <DrugSection
        id="semaglutide"
        eyebrow="Semaglutide"
        title="Once-weekly Semaglutide, supervised end-to-end."
        body="A weekly GLP-1 protocol with physician oversight from your first evaluation through every titration step."
        image={semaHero}
        reverse={false}
        statLabel="Avg. body-weight reduction at 6 months"
        statValue="↓15%"
        goals={semaGoals}
        formats={["Self-inject pen", "Vial + syringe", "Sublingual (select states)"]}
      />
      <DrugSection
        id="tirzepatide"
        eyebrow="Tirzepatide"
        title="Tirzepatide, the dual-agonist option."
        body="A dual GIP/GLP-1 receptor protocol for patients seeking a stronger metabolic response, with the same physician oversight."
        image={tirzHero}
        reverse={true}
        statLabel="Avg. body-weight reduction at 6 months"
        statValue="↓22%"
        goals={tirzGoals}
        formats={["Self-inject pen", "Vial + syringe", "Titration-adjusted dosing"]}
      />
      <Credibility />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}

function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={`sticky top-0 z-50 bg-cream transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_rgba(26,61,46,0.08),0_8px_24px_-16px_rgba(26,61,46,0.25)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="ChubbyNoMore" width={140} height={40} className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 transition hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#cta" className="btn-pill">
          Check If I Qualify <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-10 pb-16 md:pt-16 md:pb-20">
      <div className="grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
        <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
          Real GLP-1 care.<br />
          Physician-led.<br />
          <span className="text-[color:var(--teal)]">No guesswork.</span>
        </h1>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">As featured in</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-serif text-xl text-foreground/70 md:justify-end">
            <span>Forbes</span><span className="opacity-30">|</span>
            <span>SELF</span><span className="opacity-30">|</span>
            <span>Healthline</span>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <HeroCard
          tint="#E8F1E8"
          tag="Semaglutide"
          headline="Once-weekly. Steady results."
          href="#semaglutide"
          image={semaProduct}
        />
        <HeroCard
          tint="#F4ECDD"
          tag="Tirzepatide"
          headline="Dual-action. Deeper response."
          href="#tirzepatide"
          image={tirzProduct}
        />
      </div>
    </section>
  );
}

function HeroCard({ tint, tag, headline, href, image }: { tint: string; tag: string; headline: string; href: string; image: string }) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-[2rem] border border-border transition hover:-translate-y-1"
      style={{ backgroundColor: tint }}
    >
      <div className="grid grid-cols-2 items-center gap-4 p-7 md:p-9">
        <div>
          <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest">{tag}</span>
          <h3 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">{headline}</h3>
          <span className="mt-6 inline-flex items-center gap-2 font-button text-sm text-forest">
            Explore <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
        <div className="aspect-square overflow-hidden rounded-2xl">
          <img src={image} alt={tag} width={600} height={600} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </a>
  );
}

function MiniCards() {
  return (
    <section className="border-y border-border/60 bg-cream">
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 py-6 no-scrollbar">
        <div className="flex min-w-max gap-4">
          {miniCards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="card-surface flex w-56 shrink-0 flex-col gap-2 px-5 py-4 transition hover:-translate-y-0.5 hover:border-forest/30"
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="font-button text-sm">{c.title}</span>
              <span className="text-xs text-muted-foreground">{c.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <section className="overflow-hidden bg-forest py-5 text-forest-foreground">
      <div className="marquee-track font-button text-sm uppercase tracking-[0.18em]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--teal)]" />
          </span>
        ))}
      </div>
    </section>
  );
}

function DrugSection({
  id, eyebrow, title, body, image, reverse, statLabel, statValue, goals, formats,
}: {
  id: string; eyebrow: string; title: string; body: string; image: string; reverse: boolean;
  statLabel: string; statValue: string; goals: string[]; formats: string[];
}) {
  const [selected, setSelected] = useState<string>(goals[0]);
  const pct = statValue.includes("22") ? 78 : 65;

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-20">
      <div className={`grid items-stretch gap-6 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="card-surface overflow-hidden">
          <img src={image} alt={eyebrow} width={1280} height={1024} loading="lazy" className="h-full max-h-[520px] w-full object-cover" />
        </div>
        <div className="card-surface flex flex-col justify-between gap-8 p-8 md:p-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--teal)]">{eyebrow}</span>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">{title}</h2>
            <p className="mt-5 max-w-md text-base text-muted-foreground">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#cta" className="btn-pill">Check If I Qualify →</a>
            <a href="#how" className="btn-pill-outline">How it works</a>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="card-surface p-7">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Treatment formats</span>
          <ul className="mt-4 space-y-3">
            {formats.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[color:var(--teal)]" />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-7">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Clinical signal</span>
          <div className="mt-3 font-serif text-6xl text-[color:var(--teal)]">{statValue}</div>
          <p className="mt-1 text-sm text-muted-foreground">{statLabel}</p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-[color:var(--teal)] transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="card-surface p-7">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Your goal</span>
          <p className="mt-2 text-sm text-muted-foreground">Pick what matters most — we'll tune the protocol with you.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {goals.map((g) => {
              const active = g === selected;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelected(g)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "border-forest bg-forest text-forest-foreground"
                      : "border-border bg-white text-foreground hover:border-forest/40"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Credibility() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--teal)]">Medical credibility</span>
      <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
        Built on real medicine, not marketing.
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {credibility.map((c) => (
          <div key={c.title} className="card-surface p-8 text-left">
            <span className="text-3xl">{c.emoji}</span>
            <h3 className="mt-5 font-serif text-2xl">{c.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--teal)]">FAQ</span>
      <h2 className="mt-4 font-serif text-4xl md:text-5xl">Questions, answered.</h2>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-xl md:text-2xl">{f.q}</span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-lg transition-transform duration-300 ${
                    isOpen ? "rotate-45 bg-forest text-forest-foreground border-forest" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="card-surface flex flex-col justify-between gap-8 p-8 md:p-12"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--teal)]">Free evaluation</span>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">Get your free evaluation now.</h3>
            <p className="mt-3 text-sm text-muted-foreground">5 minutes. No card required. A licensed physician reviews every submission.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-border bg-white px-5 py-3.5 text-sm outline-none focus:border-forest"
            />
            <button className="btn-pill justify-center">Start free eval →</button>
          </div>
        </form>

        <a href="#faq" className="card-surface flex flex-col justify-between gap-8 p-8 md:p-12 transition hover:-translate-y-1" style={{ backgroundColor: "#E8F1E8" }}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/70">Knowledge base</span>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">All your GLP-1 questions answered.</h3>
            <p className="mt-3 text-sm text-forest/70">Dosing, side effects, eligibility, shipping, HSA/FSA — covered in plain language.</p>
          </div>
          <span className="font-button text-sm text-forest">Read the FAQ →</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl">ChubbyNoMore</div>
            <p className="mt-4 max-w-xs text-sm text-forest-foreground/70">
              Physician-supervised GLP-1 care. Transparent pricing, discreet shipping, real medicine.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-forest-foreground placeholder:text-forest-foreground/50 outline-none"
              />
              <button className="m-1 rounded-full bg-[color:var(--teal)] px-5 py-2 font-button text-sm text-forest">Join →</button>
            </form>
          </div>
          <FooterCol title="Programs" links={["Semaglutide", "Tirzepatide", "Pricing & Plans"]} />
          <FooterCol title="Learn" links={["How It Works", "FAQ", "Knowledge base"]} />
          <FooterCol title="Company" links={["About", "Contact", "Press"]} />
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-forest-foreground/60 md:flex-row">
          <span>© {new Date().getFullYear()} ChubbyNoMore. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-forest-foreground">Privacy</a>
            <a href="#" className="hover:text-forest-foreground">Terms</a>
            <a href="#" className="hover:text-forest-foreground">HIPAA</a>
          </div>
        </div>
        <div aria-hidden className="pointer-events-none mt-10 select-none overflow-hidden text-center font-serif leading-none text-white/[0.06]" style={{ fontSize: "clamp(80px, 18vw, 240px)" }}>
          ChubbyNoMore
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="font-button text-xs uppercase tracking-[0.2em] text-forest-foreground/60">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l}><a href="#" className="text-forest-foreground/85 transition hover:text-forest-foreground">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
