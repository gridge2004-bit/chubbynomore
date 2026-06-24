import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal, useParallax } from "@/components/Reveal";
import heroImg from "@/assets/hero.jpg";
import semaglutideImg from "@/assets/compounded-weightloss.jpg";
import tirzepatideImg from "@/assets/brand-weightloss.jpg";
import oralTablets1Img from "@/assets/oral-tablets-1.png";
import oralTablets2Img from "@/assets/oral-tablets-2.png";
import step1Img from "@/assets/step1.jpg";
import step2Img from "@/assets/step2.jpg";
import step3Img from "@/assets/step3.jpg";
import ctaImg from "@/assets/cta.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChubbyNoMore — Real GLP-1 medication. Real results. Real you." },
      { name: "description", content: "Medical weight loss, prescribed by real doctors. Delivered discreetly. No insurance required. No waiting rooms." },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "How It Works", href: "#how" },
  { label: "Medications", href: "#semaglutide" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const marqueeItems = [
  "Prescribed by US-licensed physicians",
  "Board-certified doctors",
  "Compounded by a licensed US pharmacy",
  "Licensed in all 50 states",
  "HIPAA compliant",
  "No hidden fees",
];

const products = [
  {
    id: "compounded",
    tag: "MOST POPULAR",
    name: "Compounded Weight Loss",
    subtitle: "Custom-formulated",
    medications: ["Tirzepatide", "Semaglutide"],
    desc: "Custom-formulated GLP-1 medications compounded by a licensed US pharmacy and prescribed online. Used alongside diet and exercise. Your physician decides what's right for you.",
    bullets: ["Once-weekly injection", "Physician-titrated dosing", "Free shipping, cancel anytime"],
    options: [
      { label: "GLP-1 + GIP (Tirzepatide)", price: "$199", period: "/month" },
      { label: "GLP-1 (Semaglutide)", price: "$149", period: "/month" },
    ],
    img: semaglutideImg,
  },
  {
    id: "brand",
    tag: "FDA-APPROVED",
    name: "Brand-name Weight Loss",
    subtitle: "FDA-approved name brand",
    medications: ["Ozempic", "Mounjaro", "Wegovy", "Zepbound"],
    desc: "Brand-name GLP-1 medications dispensed by a licensed US pharmacy. Prescribed online by a board-certified physician based on your eligibility and goals.",
    bullets: ["Authentic manufacturer product", "Physician-managed care", "Shipped discreetly to your door"],
    options: [
      { label: "Starting at", price: "$399", period: "/month" },
    ],
    img: tirzepatideImg,
  },
];

const steps = [
  { n: "01", img: step1Img, title: "Complete your intake", desc: "Fill out your health history online in about 5 minutes. No awkward waiting rooms. Everything is confidential and HIPAA-secure." },
  { n: "02", img: step2Img, title: "Meet your physician", desc: "A board-certified doctor reviews your history, evaluates your eligibility, and creates a personalized treatment plan just for you." },
  { n: "03", img: step3Img, title: "Receive your medication", desc: "Your medication is dispensed by a licensed US pharmacy and shipped discreetly to your door — with ongoing support." },
];


const faqs = [
  { q: "Will insurance cover this?", a: "Most insurance plans don't cover GLP-1 medications for weight loss, but our programs are HSA/FSA eligible. We keep pricing transparent so there are no surprises." },
  { q: "How quickly will I see results?", a: "Many patients begin noticing changes within the first 1–2 months, but everyone responds differently and results vary. Your physician will set realistic expectations. GLP-1 medication works best alongside healthy eating and regular activity." },
  { q: "Are there side effects?", a: "The most common side effects are digestive — usually nausea, and sometimes vomiting, diarrhea, or constipation. These are typically mild and tend to ease as your dose is increased slowly. Less common but more serious risks include pancreatitis, gallbladder problems, and low blood sugar. GLP-1 medications are not right for everyone. Your physician reviews your full health history before prescribing." },
  { q: "Do I need to go to a clinic?", a: "No. Everything is done online — your consultation, prescription, and follow-ups. Medication is shipped directly to your door." },
  { q: "What if I don't qualify?", a: "If you don't meet the criteria for GLP-1 therapy, your physician will explain why and may suggest alternative options. You're never charged if you don't qualify." },
  { q: "How is ChubbyNoMore different from other telehealth services?", a: "We focus exclusively on GLP-1 weight loss. Your physician stays involved throughout — not just at signup. We don't disappear after the prescription." },
];

const NAVY = "#1B2147";

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#1B2147]">
      <PromoBanner />
      <Nav scrolled={scrolled} />
      <Hero />
      <CategoryStack />
      <TrustMarquee />
      
      <GLP1Highlights />
      <HowItWorks />

      <FAQ />
      <FinalCTA />
      <Footer />
      <QualifyModal />
    </div>
  );
}

function PromoBanner() {
  return (
    <div className="w-full bg-[#1B2147] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]">
        <span className="hidden h-1.5 w-1.5 rounded-full bg-[#E8B45A] sm:inline-block" />
        <span>HSA / FSA eligible — early access, by invitation</span>
      </div>
    </div>
  );
}

function PillButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition";
  if (variant === "secondary") {
    return <a href={href} className={`${base} border border-[#1B2147] text-[#1B2147] hover:bg-[#1B2147] hover:text-white`}>{children}</a>;
  }
  return <a href={href} className={`${base} bg-[#1B2147] text-white hover:bg-[#0F1432]`}>{children}</a>;
}

function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header className={`sticky top-0 z-50 w-full max-w-full bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(27,33,71,0.08),0_8px_24px_-16px_rgba(27,33,71,0.18)]" : ""}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <a href="/" className="flex min-w-0 items-center gap-2">
            <span className="font-serif text-[18px] font-bold text-[#1B2147] whitespace-nowrap sm:text-[22px]">ChubbyNoMore</span>
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-[#1B2147]/80 transition hover:text-[#1B2147]">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <a href="#cta" className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-[#1B2147] px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#0F1432] sm:w-auto sm:px-7 sm:py-3.5 sm:text-sm">
          Check If I Qualify — Free &amp; Fast
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="w-full bg-white px-6 pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="mx-auto max-w-7xl">
        <Reveal as="h1" className="font-serif text-6xl leading-[0.95] tracking-tight text-[#1B2147] sm:text-7xl md:text-[96px]">
          Real GLP-1
          <br />
          <em className="font-serif italic underline decoration-2 underline-offset-[6px] text-[#1B2147]">results.</em>
        </Reveal>
        <Reveal as="p" delay={120} className="mt-6 max-w-xl text-base leading-relaxed text-[#1B2147] sm:text-lg">
          The leading edge of doctor-prescribed weight loss — treating people, not averages.
        </Reveal>
      </div>
    </section>
  );
}

type Tile = {
  id: string;
  tag?: string;
  title: string;
  img: string;
  imgAlt: string;
  variant: "image-hero" | "row" | "half";
  align?: "left" | "right";
  imgClass?: string;
};

const tiles: Tile[] = [
  { id: "boost", title: "Boost metabolism", img: heroImg, imgAlt: "Man running on a trail", variant: "image-hero" },
  { id: "lose", title: "Lose weight", img: step2Img, imgAlt: "Woman exercising on a mat", variant: "image-hero" },
  { id: "compounded", tag: "POPULAR", title: "Compounded GLP-1", img: semaglutideImg, imgAlt: "Compounded GLP-1 medication", variant: "row" },
  { id: "brand", tag: "FDA-APPROVED", title: "Brand-name GLP-1", img: tirzepatideImg, imgAlt: "Brand-name GLP-1 medication", variant: "row" },
  { id: "cravings", title: "Curb cravings & appetite", img: oralTablets1Img, imgAlt: "Oral weight-loss tablets", variant: "half" },
  { id: "metabolic", title: "Metabolic health", img: oralTablets2Img, imgAlt: "Oral metabolic health tablets", variant: "half" },
  { id: "dosing", title: "Personalized dosing", img: ctaImg, imgAlt: "Personalized dosing care", variant: "row" },
];

type ProductCard = {
  id: string;
  title: string;
  subtitle: string;
  medications: string;
  img: string;
  imgAlt: string;
  prices: { label: string; value: string }[];
};

const productCards: ProductCard[] = [
  {
    id: "compounded",
    title: "Compounded Weight Loss",
    subtitle: "Custom-formulated",
    medications: "Tirzepatide, Semaglutide",
    img: semaglutideImg,
    imgAlt: "Compounded weight loss vials",
    prices: [
      { label: "GLP-1 + GIP", value: "Starting at $249.99" },
      { label: "GLP-1", value: "Starting at $149.99" },
    ],
  },
  {
    id: "brand",
    title: "Brand-name Weight Loss",
    subtitle: "FDA-approved name brand",
    medications: "Ozempic, Mounjaro, Wegovy, Foundayo, Zepbound",
    img: tirzepatideImg,
    imgAlt: "Brand-name GLP-1 injector pens",
    prices: [{ label: "", value: "Starting at $199.99" }],
  },
];

function HeroTile({ tile }: { tile: Tile }) {
  return (
    <article className="card-lift relative h-[300px] overflow-hidden rounded-3xl sm:h-[380px]">
      <img src={tile.img} alt={tile.imgAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <h3 className="absolute left-6 bottom-6 font-serif text-3xl text-white drop-shadow-lg sm:text-4xl">{tile.title}</h3>
    </article>
  );
}

function CategoryStack() {
  const heroTiles = tiles.filter((t) => t.variant === "image-hero");
  return (
    <section className="bg-white px-4 pb-16 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        {/* Two big image cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {heroTiles.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <HeroTile tile={t} />
            </Reveal>
          ))}
        </div>
        <div className="grid max-w-7xl gap-5 sm:grid-cols-2">
          {productCards.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <a href="#cta" className="card-lift block h-full">
                <ProductTile card={p} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductTile({ card }: { card: ProductCard }) {
  return (
    <article className="flex h-full flex-col rounded-[28px] bg-[#D9DDD8] px-8 py-9 sm:px-10 sm:py-10">
      <div className="grid grid-cols-[1fr_auto] items-start gap-4">
        <h3 className="font-serif text-[40px] leading-[1.02] text-[#1B2147] sm:text-[48px]">
          {card.title.split(" ").slice(0, -2).join(" ")}
          <br />
          {card.title.split(" ").slice(-2).join(" ")}
        </h3>
        <div className="flex h-[120px] w-[140px] items-center justify-end sm:h-[170px] sm:w-[200px]">
          <img src={card.img} alt={card.imgAlt} className="h-full w-auto object-contain mix-blend-multiply" loading="lazy" />
        </div>
      </div>
      <p className="mt-6 text-[15px] text-[#1B2147]/85">{card.subtitle}</p>
      <p className="mt-2 text-[15px] font-medium text-[#3454C7]">{card.medications}</p>
      <div className="mt-auto pt-10 space-y-2 text-[15px] text-[#1B2147]">
        {card.prices.map((p, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-1.5">
            {p.label && <span>{p.label}</span>}
            <a href="#cta" className="text-[#3454C7] underline underline-offset-2">
              {p.value}
            </a>
            <span aria-hidden className="text-[#3454C7]">→</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function TrustMarquee() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <section className="overflow-hidden bg-[#1B2147] py-5 text-white">
      <div className="marquee-track text-sm font-medium uppercase tracking-[0.18em]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function GLP1Highlights() {
  const [format, setFormat] = useState("Injectable");
  const [goal, setGoal] = useState("All of the above");
  const formats = ["Injectable", "Oral"];
  const goals = ["Lose stubborn fat", "Curb cravings & appetite", "Improve metabolic health", "Feel confident again", "All of the above"];

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {/* Card 1 — Treatment formats */}
        <Reveal className="flex flex-col justify-between rounded-3xl bg-[#EEF0F7] p-8 md:p-10" style={{ minHeight: 480 }}>
          <div>
            <h3 className="font-serif text-[28px] leading-[1.15] text-[#1B2147] md:text-[32px]">
              Treatment formats that fit <em className="italic">your lifestyle</em>
            </h3>
            <div className="mt-8 flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    format === f ? "bg-[#1B2147] text-white" : "bg-white text-[#1B2147] hover:bg-[#1B2147]/5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-end justify-center gap-3">
            {format === "Injectable" && (
              <div className="flex h-52 w-24 flex-col items-center justify-end rounded-2xl bg-white p-3 shadow-sm transition-all duration-300">
                <div className="flex flex-1 flex-col items-center justify-center gap-1">
                  <span className="text-2xl font-bold text-[#1B2147]">1×</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#5A6075]">week</span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#1B2147]">Injectable</div>
              </div>
            )}
            {format === "Oral" && (
              <div className="flex h-64 w-24 flex-col items-center justify-end rounded-2xl bg-[#1B2147] p-3 shadow-sm transition-all duration-300">
                <div className="flex flex-1 flex-col items-center justify-center gap-1">
                  <span className="text-2xl font-bold text-white">1×</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/70">day</span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white">Oral</div>
              </div>
            )}
          </div>
        </Reveal>

        {/* Card 2 — Results */}
        <Reveal delay={120} className="flex flex-col justify-between rounded-3xl bg-[#EEF0F7] p-8 md:p-10" style={{ minHeight: 480 }}>
          <div>
            <h3 className="font-serif text-[28px] leading-[1.15] text-[#1B2147] md:text-[32px]">
              Make optimal your <em className="italic">new normal</em>
            </h3>
            <div className="mt-8 flex items-baseline gap-2 text-[#1B2147]">
              <span className="text-3xl font-semibold">↓</span>
              <span className="font-serif text-5xl font-semibold tracking-tight md:text-[56px]">20%</span>
            </div>
            <p className="mt-1 text-sm text-[#5A6075]">Avg. body weight reduction*</p>
          </div>
          <div className="mt-8 grid grid-cols-2 items-end gap-3">
            <div className="flex h-28 flex-col items-center justify-end rounded-2xl bg-[#1B2147]/90 p-4 text-white">
              <div className="text-[10px] uppercase tracking-[0.16em] opacity-70">Baseline</div>
              <div className="font-serif text-3xl font-semibold">230</div>
              <div className="text-[10px] opacity-70">lbs</div>
            </div>
            <div className="flex h-44 flex-col items-center justify-end rounded-2xl bg-[#1B2147] p-4 text-white">
              <div className="text-[10px] uppercase tracking-[0.16em] opacity-70">After 68 wks</div>
              <div className="font-serif text-3xl font-semibold">184</div>
              <div className="text-[10px] opacity-70">lbs</div>
            </div>
          </div>
        </Reveal>

        {/* Card 3 — Goals */}
        <Reveal delay={240} className="flex flex-col justify-between rounded-3xl bg-[#EEF0F7] p-8 md:p-10" style={{ minHeight: 480 }}>
          <h3 className="font-serif text-[28px] leading-[1.15] text-[#1B2147] md:text-[32px]">
            Why do you want to <em className="italic">lose weight?</em>
          </h3>
          <div className="mt-6 flex flex-col gap-2.5">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  goal === g ? "bg-[#1B2147] text-white" : "bg-white text-[#1B2147] hover:bg-[#1B2147]/5"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <p className="mx-auto mt-6 max-w-7xl text-[11px] text-[#9298AB]">*Based on published clinical trial averages for tirzepatide over ~68–72 weeks, used alongside diet and exercise. Individual results vary.</p>
    </section>
  );
}

function HowItWorks() {

  return (
    <section id="how" className="bg-[#FAF8F5] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal as="h2" className="text-center font-serif text-4xl leading-tight text-[#1B2147] md:text-5xl">
          Three steps to <em className="italic">a healthier you.</em>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, idx) => (
            <Reveal key={s.n} delay={idx * 150} className="card-lift rounded-2xl p-2 -m-2">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white">
                <img src={s.img} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9298AB]">Step {s.n}</div>
              <h3 className="mt-2 font-serif text-2xl text-[#1B2147]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5A6075]">{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <PillButton href="#cta">Check If I Qualify — Free & Fast</PillButton>
        </Reveal>
      </div>
    </section>
  );
}


function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="font-serif text-4xl leading-[1.1] text-[#1B2147] md:text-5xl">
            Common questions. <em className="italic">Honest answers.</em>
          </h2>
        </Reveal>
        <div className="divide-y divide-[#E7E8EE] border-y border-[#E7E8EE]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-serif text-lg text-[#1B2147] md:text-xl">{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center text-xl text-[#1B2147]" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0">
                    <p className="max-w-2xl text-sm leading-relaxed text-[#5A6075] md:text-base">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const checks = [
    "Doctor prescribed",
    "100% confidential",
    "Delivered to your door",
    "Licensed in all 50 states",
  ];
  return (
    <section id="cta" className="w-full bg-[#E8EDF8]">
      <div className="grid w-full md:grid-cols-[45fr_55fr]">
        <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
          <img src={ctaImg} alt="Patient living an active life" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 md:px-16">
          <h2 className="font-serif text-4xl leading-[1.1] text-[#1B2147] md:text-5xl lg:text-[52px]">
            Ready to see if GLP-1 is right for you? <em className="italic">ChubbyNoMore is with you every step.</em>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#1B2147]/75">
            Join 920+ patients already on their journey. Free to join. Invite-only early access.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-[#1B2147]">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-[#1B2147]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <PillButton href="#cta">Check If I Qualify — Free & Fast</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1B2147] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl">ChubbyNoMore</div>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Doctor-prescribed GLP-1 weight loss, prescribed online and delivered to your door. Licensed in all 50 states.
            </p>
          </div>
          <FooterCol title="Program" links={["How It Works", "Medications", "Pricing", "FAQs"]} />
          <FooterCol title="Company" links={["About Us", "Our Doctors", "Patient Stories", "Blog"]} />
          <FooterCol title="Legal" links={["Privacy Policy", "Terms of Service", "HIPAA Notice", "Contact"]} />
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 md:flex-row">
          <span>© {new Date().getFullYear()} ChubbyNoMore. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">HIPAA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/60">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l}><a href="#" className="text-white/85 transition hover:text-white">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────── QUALIFY MODAL (ported from Backup Website) ───────────────── */
type Condition = "diabetes" | "hbp" | "cholesterol" | "sleep_apnea" | "none";
type Goal = "lose_weight" | "improve_health" | "both";

const MINT = "#6FBF9F";

function QualifyModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const totalSteps = 7;

  const [weight, setWeight] = useState(185);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(5);
  const [age, setAge] = useState("35–44");
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [goal, setGoal] = useState<Goal>("both");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactError, setContactError] = useState("");
  const [conditionsError, setConditionsError] = useState(false);

  // Intercept clicks on any CTA anchor pointing to #cta
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href="#cta"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      setStep(0);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleCondition = (c: Condition) => {
    setConditionsError(false);
    if (c === "none") {
      setConditions((cur) => (cur.includes("none") ? [] : ["none"]));
      return;
    }
    setConditions((cur) => {
      const without = cur.filter((x) => x !== "none" && x !== c);
      return cur.includes(c) ? without : [...without, c];
    });
  };

  const validateConditions = () => {
    if (conditions.length === 0) {
      setConditionsError(true);
      return;
    }
    next();
  };

  const validateContact = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setContactError("Please fill out all the boxes above to continue.");
      return;
    }
    if (!emailValid) {
      setContactError("Please enter a valid email address.");
      return;
    }
    setContactError("");
    next();
  };

  const pct = step === 0 ? 0 : Math.round((step / totalSteps) * 100);
  const stepLabel = step === 0 ? "Free qualification check" : `Step ${step} of ${totalSteps}`;

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qualify-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#1B2147]/60 backdrop-blur-sm px-4 py-6 sm:p-8"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#E7E8EE] bg-white text-[#1B2147] transition hover:bg-[#1B2147] hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="border-b border-[#E7E8EE] px-6 pt-6 pb-4 sm:px-8">
          <span className="font-serif text-[20px] font-bold text-[#1B2147]">ChubbyNoMore</span>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#F0F0EF]">
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${pct}%`, backgroundColor: MINT }}
            />
          </div>
          <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: MINT }}>
            {stepLabel}
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-7 sm:px-8 sm:py-8">
          {step === 0 && (
            <div>
              <h2 id="qualify-modal-title" className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl">
                Find out if you qualify
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6075] sm:text-base">
                Answer a few quick questions and we'll tell you right away if GLP-1 therapy is right for you. Takes about 2 minutes.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "100% confidential & HIPAA secure",
                  "No credit card required to check",
                  "Board-certified physician review",
                  "Results in under 24 hours",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-[#1B2147]">
                    <span className="grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold text-[#1B2147]" style={{ backgroundColor: MINT }}>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <ModalNav onNext={next} nextLabel="Let's Get Started →" />
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl">
                What's your current weight?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6075] sm:text-base">
                Use the slider to select your approximate weight. This helps us calculate your eligibility accurately.
              </p>
              <div className="mt-7 text-center">
                <div className="font-serif text-5xl font-semibold text-[#1B2147]">
                  {weight} <span className="text-2xl font-medium text-[#5A6075]">lbs</span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={400}
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  aria-label="Current weight in pounds"
                  className="mt-5 w-full"
                  style={{ accentColor: MINT }}
                />
                <div className="mt-2 flex justify-between text-xs text-[#5A6075]">
                  <span>120 lbs</span>
                  <span>400 lbs</span>
                </div>
              </div>
              <ModalNav onBack={back} onNext={next} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl">
                What's your height?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6075] sm:text-base">
                We use this along with your weight to calculate your BMI and determine eligibility.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <SelectField label="Feet" value={heightFt} onChange={setHeightFt}>
                  {[4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>{n} ft</option>
                  ))}
                </SelectField>
                <SelectField label="Inches" value={heightIn} onChange={setHeightIn}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>{i} in</option>
                  ))}
                </SelectField>
              </div>
              <ModalNav onBack={back} onNext={next} />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl">
                What's your age range?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6075] sm:text-base">
                ChubbyNoMore is available for adults 18 and older. Select your age range below.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {["18–24", "25–34", "35–44", "45–54", "55+"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setAge(r)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      age === r
                        ? "border-[#6FBF9F] bg-[#6FBF9F]/10 text-[#1B2147]"
                        : "border-[#E7E8EE] bg-white text-[#1B2147] hover:border-[#6FBF9F]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <ModalNav onBack={back} onNext={next} />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl">
                Any health conditions?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6075] sm:text-base">
                Select all that apply. Having certain conditions may lower the BMI threshold for qualification.
              </p>
              <div className="mt-6 space-y-2.5">
                {(
                  [
                    ["diabetes", "Type 2 Diabetes"],
                    ["hbp", "High Blood Pressure"],
                    ["cholesterol", "High Cholesterol"],
                    ["sleep_apnea", "Sleep Apnea"],
                    ["none", "None of the above"],
                  ] as [Condition, string][]
                ).map(([val, label]) => {
                  const checked = conditions.includes(val);
                  return (
                    <button
                      type="button"
                      key={val}
                      onClick={() => toggleCondition(val)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                        checked
                          ? "border-[#6FBF9F] bg-[#6FBF9F]/10 text-[#1B2147]"
                          : "border-[#E7E8EE] bg-white text-[#1B2147] hover:border-[#6FBF9F]"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border ${
                          checked ? "border-[#6FBF9F] bg-[#6FBF9F] text-[#1B2147]" : "border-[#E7E8EE] bg-white"
                        }`}
                      >
                        {checked && "✓"}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
              {conditionsError && (
                <p className="mt-3 text-sm font-semibold text-[#C0392B]">
                  Please select at least one option to continue.
                </p>
              )}
              <ModalNav onBack={back} onNext={validateConditions} />
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl">
                What's your primary goal?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6075] sm:text-base">
                This helps us tailor the right approach and medication plan for you.
              </p>
              <div className="mt-6 space-y-3">
                {(
                  [
                    ["lose_weight", "Lose Weight", "I want to reduce my body weight significantly"],
                    ["improve_health", "Improve Health Markers", "Focus on blood sugar, blood pressure, cholesterol"],
                    ["both", "Both", "I want to lose weight and improve my overall health"],
                  ] as [Goal, string, string][]
                ).map(([val, title, sub]) => {
                  const selected = goal === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setGoal(val)}
                      className={`block w-full rounded-2xl border px-5 py-4 text-left transition ${
                        selected
                          ? "border-[#6FBF9F] bg-[#6FBF9F]/10"
                          : "border-[#E7E8EE] bg-white hover:border-[#6FBF9F]"
                      }`}
                    >
                      <div className="font-serif text-base font-semibold text-[#1B2147]">{title}</div>
                      <div className="mt-1 text-sm text-[#5A6075]">{sub}</div>
                    </button>
                  );
                })}
              </div>
              <ModalNav onBack={back} onNext={next} />
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl">
                Where should we send your results?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6075] sm:text-base">
                We'll send your qualification results and next steps.
              </p>
              <div className="mt-6 space-y-4">
                <TextField label="First Name" id="q-name" value={name} onChange={setName} placeholder="Your first name" autoComplete="given-name" />
                <TextField label="Email" id="q-email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" autoComplete="email" />
                <TextField label="Phone" id="q-phone" type="tel" value={phone} onChange={setPhone} placeholder="+1 (555) 000-0000" autoComplete="tel" />
              </div>
              <p className="mt-3 text-xs text-[#5A6075]">
                No spam. We'll only send your qualification results and next steps.
              </p>
              {contactError && (
                <p className="mt-2 text-sm font-semibold text-[#C0392B]">{contactError}</p>
              )}
              <ModalNav
                onBack={back}
                onNext={validateContact}
                nextLabel="Reserve My Early-Access Spot →"
              />
              <p className="mt-3 text-xs font-semibold leading-relaxed" style={{ color: MINT }}>
                Early access is released in limited batches — add your email to hold your place in line. We will email you the moment your spot opens.
              </p>
            </div>
          )}

          {step === 7 && (
            <div className="py-3 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1B2147] text-3xl text-white">
                ✓
              </div>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-[#1B2147]">
                You're on the early-access list.
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#5A6075]">
                Your place in line is saved. We'll email you the moment your early-access spot opens — invitations are sent in limited batches.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-[#1B2147] px-7 py-3 font-semibold text-white transition hover:bg-[#0F1432]"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModalNav({
  onBack,
  onNext,
  nextLabel = "Continue →",
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-[#E7E8EE] bg-white px-5 py-2.5 text-sm font-semibold text-[#1B2147] transition hover:bg-[#F0F0EF]"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center gap-2 rounded-full bg-[#1B2147] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0F1432]"
      >
        {nextLabel}
      </button>
    </div>
  );
}

function SelectField<T extends number>({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#1B2147]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) as T)}
        className="w-full rounded-lg border border-[#E7E8EE] bg-white px-3 py-2.5 text-sm text-[#1B2147] outline-none focus-visible:ring-2"
        style={{ ["--tw-ring-color" as never]: MINT }}
      >
        {children}
      </select>
    </label>
  );
}

function TextField({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#1B2147]">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-[#E7E8EE] bg-white px-3 py-2.5 text-sm text-[#1B2147] outline-none focus-visible:ring-2"
        style={{ ["--tw-ring-color" as never]: MINT }}
      />
    </div>
  );
}
