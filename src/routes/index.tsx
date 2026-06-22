import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal, useParallax } from "@/components/Reveal";

const heroImg = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80";
const vialImg = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80";
const semaglutideImg = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80";
const tirzepatideImg = "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80";
const step1Img = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80";
const step2Img = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80";
const step3Img = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80";
const ctaImg = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80";

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
  { label: "How It Works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

const marqueeItems = [
  "Custom dosing",
  "Physician supervised",
  "10,000+ members",
  "Clinically proven",
  "Discreet shipping",
  "No hidden fees",
];

const products = [
  {
    id: "semaglutide",
    tags: ["COMPOUNDED", "GLP-1"],
    name: "Semaglutide",
    desc: "A once-weekly GLP-1 protocol with physician oversight from your first evaluation through every titration step. Steady, predictable results.",
    bullets: ["Once-weekly injection", "Physician-titrated dosing", "Avg. ↓15% body weight at 6 months"],
    price: "$229",
    period: "/28-day supply",
    img: semaglutideImg,
  },
  {
    id: "tirzepatide",
    tags: ["COMPOUNDED", "GLP-1"],
    name: "Tirzepatide",
    desc: "A dual GIP/GLP-1 receptor protocol for patients seeking a stronger metabolic response, with the same physician oversight throughout.",
    bullets: ["Dual-agonist mechanism", "Physician-titrated dosing", "Avg. ↓22% body weight at 6 months"],
    price: "$349",
    period: "/28-day supply",
    img: tirzepatideImg,
  },
];

const steps = [
  { n: "01", img: step1Img, title: "Complete your evaluation", desc: "Answer a few questions about your health history. The whole thing takes about 5 minutes from your phone." },
  { n: "02", img: step2Img, title: "Physician review", desc: "A US-licensed physician reviews your submission — usually within 24 hours — and writes the right protocol for you." },
  { n: "03", img: step3Img, title: "Treatment delivered", desc: "Your medication ships discreetly from a licensed US compounding pharmacy. Ongoing support included." },
];

const testimonials = [
  { quote: "I tried everything for years and nothing stuck. With physician supervision and the right medication, I finally have a plan that works. Down 19 lbs in 12 weeks.", name: "Sarah M., 34 — Lost 19 lbs in 12 weeks" },
  { quote: "The process was so easy — evaluation to delivery in under a week. My doctor adjusts my dose as I go and I never feel alone in this.", name: "James T., 41 — Ongoing physician-adjusted dosing" },
  { quote: "I was skeptical about GLP-1 but the clinical data is real. I've lost 22 lbs and my blood sugar is the best it's been in years.", name: "Michelle R., 38 — Lost 22 lbs, blood sugar improved" },
];

const faqs = [
  { q: "Who qualifies for a GLP-1 program?", a: "Eligibility is determined by a licensed physician based on your medical history, current medications, and BMI. The free evaluation takes about 5 minutes." },
  { q: "How is the medication shipped?", a: "Medication is shipped discreetly in temperature-controlled packaging directly from a USP 797 compounding pharmacy to your door." },
  { q: "Is this covered by HSA or FSA?", a: "Yes. ChubbyNoMore programs are HSA and FSA eligible. We provide itemized receipts for reimbursement." },
  { q: "What are the side effects?", a: "Common side effects include nausea, fatigue, and mild GI discomfort, especially during titration. Your physician will discuss your full risk profile during the evaluation." },
  { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts. You can pause or cancel your program at any time from your account." },
  { q: "Is this safe? Are there risks I should know about?", a: "GLP-1 medications like semaglutide and tirzepatide have been FDA-approved and studied extensively. Like all medications, they carry possible side effects (most commonly nausea and fatigue, especially early on). That's exactly why we require a physician evaluation before every prescription — to make sure it's the right fit for your health profile." },
  { q: "How is this different from getting GLP-1 from my regular doctor?", a: "Most primary care physicians have limited time for weight management and may not be familiar with titration protocols. Our platform is built specifically for GLP-1 care — with physicians who specialize in metabolic health, ongoing dose adjustments, and support throughout your journey." },
  { q: "What if I don't qualify?", a: "If you don't qualify after your free evaluation, you won't be charged anything. Our physicians will let you know why and may suggest alternatives that could be a better fit for your situation." },
  { q: "Will insurance cover this?", a: "Most insurance plans do not cover compounded GLP-1 medications. However, our programs are HSA/FSA eligible, and our pricing is transparent with no hidden fees. Many patients find it more affordable than expected." },
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
        <PillButton href="#cta">Check If I Qualify — Free &amp; Fast</PillButton>
      </div>
    </header>
  );
}

function Hero() {
  const parallaxRef = useParallax(0.4);
  return (
    <section className="w-full border-b border-[#E7E8EE]">
      <div className="grid w-full md:grid-cols-[55fr_45fr]" style={{ minHeight: 580 }}>
        <div className="relative min-h-[360px] overflow-hidden bg-[#F7F7F7] md:min-h-[580px]">
          <img
            ref={parallaxRef as React.RefObject<HTMLImageElement>}
            src={heroImg}
            alt="Woman stretching in athletic wear"
            className="absolute inset-0 h-[120%] w-full object-cover"
            style={{ top: "-10%" }}
            loading="eager"
          />
        </div>
        <div className="flex flex-col justify-center bg-white px-8 py-16 md:px-16">
          <Reveal as="span" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1B2147]">GLP-1 Weight Loss</Reveal>
          <Reveal as="h1" delay={80} className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-[#1B2147] md:text-6xl lg:text-[68px]">
            GLP-1 weight loss,
            <br />
            <em className="font-serif italic text-[#1B2147]">backed by science.</em>
          </Reveal>
          <Reveal as="p" delay={160} className="mt-6 max-w-md text-base leading-relaxed text-[#5A6075]">
            Physician-supervised weight loss — personalized to your goals, delivered to your door.
          </Reveal>
          <Reveal delay={240} className="mt-8">
            <PillButton href="#cta">Check If I Qualify — Free &amp; Fast</PillButton>
          </Reveal>
          <Reveal as="p" delay={320} className="mt-5 text-sm text-[#5A6075]">Join 10,000+ people already on the program</Reveal>
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
          GLP-1 medications, <em className="italic">in one place.</em>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {products.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 150}>
              <article id={p.id} className="card-lift flex flex-col overflow-hidden rounded-2xl bg-[#F0F0EF]">
                <div className="grid grid-cols-[1fr_150px] gap-6 p-8 md:p-10">
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
                  <div className="flex items-start justify-end">
                    <div className="h-[150px] w-[150px] overflow-hidden rounded-xl bg-white">
                      <img src={p.img} alt={p.name} className="h-full w-full object-contain" loading="lazy" />
                    </div>
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
          It's easy <em className="italic">to get started.</em>
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
          <PillButton href="#cta">Check If I Qualify — Free &amp; Fast</PillButton>
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
          <em className="italic">Results</em> that speak louder than promises.
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
        <p className="mt-8 text-xs text-[#5A6075]">Collected from verified customers. Results vary.</p>
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
            Weight Loss Treatment <em className="italic">FAQs</em>
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
    "Easy online doctor visits",
    "No appointments, message anytime",
    "US-based medical providers",
    "Free expedited shipping",
  ];
  return (
    <section id="cta" className="w-full bg-[#E8EDF8]">
      <div className="grid w-full md:grid-cols-[45fr_55fr]">
        <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
          <img src={ctaImg} alt="Young woman in athletic wear smiling" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 md:px-16">
          <h2 className="font-serif text-4xl leading-[1.1] text-[#1B2147] md:text-5xl lg:text-[52px]">
            Physician grade health care, <em className="italic">from anywhere.</em>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#1B2147]/75">
            Join 10,000+ people who have trusted and transformed their health with ChubbyNoMore.
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
              Physician-supervised GLP-1 care. Transparent pricing, discreet shipping, real medicine.
            </p>
          </div>
          <FooterCol title="Programs" links={["Semaglutide", "Tirzepatide", "Pricing & Plans"]} />
          <FooterCol title="Learn" links={["How It Works", "FAQ", "Knowledge base"]} />
          <FooterCol title="Company" links={["About", "Contact", "Press"]} />
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
