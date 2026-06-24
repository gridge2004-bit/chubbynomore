import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal, useParallax } from "@/components/Reveal";
import heroImg from "@/assets/hero.jpg";
import semaglutideImg from "@/assets/semaglutide-vial.jpg";
import tirzepatideImg from "@/assets/tirzepatide-vial.jpg";
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
    id: "semaglutide",
    tags: ["MOST POPULAR", "GLP-1"],
    name: "Semaglutide",
    desc: "A once-weekly GLP-1 injection for weight management, compounded by a licensed US pharmacy and prescribed online. Used alongside diet and exercise. Your physician decides if it's appropriate for you. Individual results vary.",
    bullets: ["Once-weekly injection", "Physician-titrated dosing", "From $47/mL — flat monthly price"],
    price: "$149",
    period: "/month",
    img: semaglutideImg,
  },
  {
    id: "tirzepatide",
    tags: ["DUAL-ACTION", "GLP-1 / GIP"],
    name: "Tirzepatide",
    desc: "A once-weekly dual-action (GLP-1/GIP) injection for weight management, compounded by a licensed US pharmacy and prescribed online. Used alongside diet and exercise. Your physician decides if it's right for you. Individual results vary.",
    bullets: ["Dual-action GLP-1 + GIP", "Physician-titrated dosing", "Free shipping, cancel anytime"],
    price: "$199",
    period: "/month",
    img: tirzepatideImg,
  },
];

const steps = [
  { n: "01", img: step1Img, title: "Complete your intake", desc: "Fill out your health history online in about 5 minutes. No awkward waiting rooms. Everything is confidential and HIPAA-secure." },
  { n: "02", img: step2Img, title: "Meet your physician", desc: "A board-certified doctor reviews your history, evaluates your eligibility, and creates a personalized treatment plan just for you." },
  { n: "03", img: step3Img, title: "Receive your medication", desc: "Your medication is dispensed by a licensed US pharmacy and shipped discreetly to your door — with ongoing support." },
];

const testimonials = [
  { quote: "I tried every diet imaginable. ChubbyNoMore was the first thing that actually worked — and I finally feel like myself again.", name: "Sarah R. — Lost 34 lbs in 8 months" },
  { quote: "The whole process was seamless. Doctor was incredibly supportive. The medication just… worked. I couldn't believe how different I felt.", name: "Marcus T. — Lost 52 lbs in 11 months" },
  { quote: "Honestly, I just feel like myself again — more energy, sharper focus, and clothes that finally fit right. The process was simple and my doctor actually listened.", name: "James R. — Early-access member" },
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
    <div className="min-h-screen bg-white text-[#1B2147]">
      <PromoBanner />
      <Nav scrolled={scrolled} />
      <Hero />
      <TrustMarquee />
      <ProductCards />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function PromoBanner() {
  return (
    <div className="w-full bg-[#1B2147] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]">
        <span className="hidden h-1.5 w-1.5 rounded-full bg-[#E8B45A] sm:inline-block" />
        <span>HSA / FSA eligible — early access, by invitation</span>
        <span aria-hidden className="hidden text-white/40 sm:inline">•</span>
        <a href="#cta" className="hidden underline-offset-4 hover:underline sm:inline">Check If I Qualify — Free & Fast →</a>
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
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(27,33,71,0.08),0_8px_24px_-16px_rgba(27,33,71,0.18)]" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <span className="font-serif text-[22px] font-bold text-[#1B2147] whitespace-nowrap">ChubbyNoMore</span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-[#1B2147]/80 transition hover:text-[#1B2147]">
              {l.label}
            </a>
          ))}
        </nav>
        <PillButton href="#cta">Check If I Qualify — Free & Fast</PillButton>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="w-full border-b border-[#E7E8EE]">
      <div className="grid w-full md:grid-cols-[55fr_45fr]" style={{ minHeight: 580 }}>
        <div className="relative h-[360px] overflow-hidden bg-[#F7F7F7] md:h-[580px]">
          <img
            src={heroImg}
            alt="Athletic man running on a mountain trail"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 30%" }}
            loading="eager"
          />
        </div>
        <div className="flex flex-col justify-center bg-white px-8 py-16 md:px-16">
          <Reveal as="span" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1B2147]">Real GLP-1 medication</Reveal>
          <Reveal as="h1" delay={80} className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-[#1B2147] md:text-6xl lg:text-[68px]">
            Real GLP-1 medication.
            <br />
            <em className="font-serif italic text-[#1B2147]">Real results. Real you.</em>
          </Reveal>
          <Reveal as="p" delay={160} className="mt-6 max-w-md text-base leading-relaxed text-[#5A6075]">
            Medical weight loss, prescribed by real doctors. Delivered discreetly. No insurance required. No waiting rooms.
          </Reveal>
          <Reveal delay={240} className="mt-8">
            <PillButton href="#cta">Check If I Qualify — Free & Fast</PillButton>
          </Reveal>
          <Reveal as="p" delay={320} className="mt-5 text-sm text-[#5A6075]">From $47/mL — up to 3× less than other GLP-1 programs.</Reveal>
        </div>
      </div>
    </section>
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

function ProductCards() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal as="h2" className="text-center font-serif text-4xl leading-tight text-[#1B2147] md:text-5xl">
          Two GLP-1 options. <em className="italic">Your physician helps you choose.</em>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {products.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 150}>
              <article id={p.id} className="card-lift flex flex-col overflow-hidden rounded-2xl bg-[#F0F0EF]">
                <div className="grid grid-cols-[1fr_180px] gap-6 p-8 md:p-10">
                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-[#1B2147] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{t}</span>
                      ))}
                    </div>
                    <h3 className="mt-5 font-serif text-3xl font-semibold text-[#1B2147] md:text-[32px]">{p.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5A6075]">{p.desc}</p>
                    <ul className="mt-5 space-y-2.5">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-[#1B2147]">
                          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[#1B2147]" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-[180px] w-[180px] object-contain mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-auto px-8 py-6 md:px-10">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-[#5A6075]">Starting at</div>
                      <div className="mt-1 font-serif text-3xl font-semibold text-[#1B2147]">
                        {p.price}<span className="text-base font-normal text-[#5A6075]">{p.period}</span>
                      </div>
                    </div>
                    <a href="#cta" className="flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition bg-[#1B2147] text-white hover:bg-[#0F1432]">Start Treatment</a>
                    <a href={`#${p.id}`} className="text-center text-sm font-semibold text-[#1B2147] underline-offset-4 hover:underline">Learn more →</a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
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

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill={NAVY} className="h-4 w-4">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#F7F7F7] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal as="h2" className="font-serif text-4xl leading-tight text-[#1B2147] md:text-5xl">
          <em className="italic">920+ patients</em> transformed their lives.
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 150} className="card-lift flex flex-col rounded-2xl border border-[#E7E8EE] bg-white p-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} />)}
              </div>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[#1B2147]">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#1B2147]">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1B2147]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified buyer
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-[#5A6075]">In clinical trials, patients lost on average about 15% of body weight on semaglutide and about 20% on tirzepatide over roughly 68–72 weeks, used alongside diet and exercise. Individual stories are not typical and not a guarantee of your results.</p>
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
            <PillButton href="#cta">Get Started</PillButton>
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
