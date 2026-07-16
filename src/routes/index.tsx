import { createFileRoute, Link } from "@tanstack/react-router";
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
import foundayoPillAsset from "@/assets/foundayo-pill.png.asset.json";
import wegovyPillAsset from "@/assets/wegovy-pill.png.asset.json";
import zepboundPenAsset from "@/assets/zepbound-pen.png.asset.json";
import wegovyPenAsset from "@/assets/wegovy-pen.png.asset.json";
import ozempicPenAsset from "@/assets/ozempic-pen.png.asset.json";
import mounjaroPenAsset from "@/assets/mounjaro-pen.png.asset.json";
import feelLikeYourselfAsset from "@/assets/feel-like-yourself.jpg.asset.json";
import loveWhatYouSeeAsset from "@/assets/love-what-you-see.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online GLP-1 Weight Loss Program | Compounded Semaglutide & Tirzepatide | ChubbyNoMore" },
      { name: "description", content: "ChubbyNoMore is an online GLP-1 weight loss program for US adults, offering physician-prescribed compounded semaglutide, tirzepatide, and brand-name Wegovy, Zepbound, Ozempic and Mounjaro — delivered discreetly, no insurance required." },
      { property: "og:title", content: "Online GLP-1 Weight Loss Program | ChubbyNoMore" },
      { property: "og:description", content: "Physician-prescribed semaglutide and tirzepatide, delivered to your door. Compounded from $149.99 per 28-day supply, brand-name from $199.99 per month. No insurance required." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navLinks = [
  { label: "How It Works", href: "#how" },
  { label: "Medications", href: "#medications" },
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
      { label: "GLP-1 + GIP (Tirzepatide)", price: "$249.99", period: "per 28-day supply" },
      { label: "GLP-1 (Semaglutide)", price: "$149.99", period: "per 28-day supply" },
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
      <EmotionalTransformation />
      <TrustMarquee />
      <HowItWorks />
      <MedicationOptions />
      <DetailedProducts />

      <GLP1Highlights />
      <WeightLossScale />
      <WhoQualifies />
      <SemaVsTirz />
      <CompoundedVsBrand />
      <WhoNotFor />

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
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={`sticky top-0 z-50 w-full max-w-full bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(27,33,71,0.08),0_8px_24px_-16px_rgba(27,33,71,0.18)]" : ""}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <a href="/" className="flex min-w-0 items-center gap-2">
            <span className="font-serif text-[18px] font-bold text-[#1B2147] whitespace-nowrap sm:text-[22px]">ChubbyNoMore</span>
          </a>
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-xs font-medium text-[#1B2147]/80 transition hover:text-[#1B2147] sm:text-sm ${
                  l.label === "Medications" || l.label === "Pricing" ? "" : "hidden md:inline-flex"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <a href="#cta" className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-[#1B2147] px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#0F1432] sm:w-auto sm:px-7 sm:py-3.5 sm:text-sm">
          See if I qualify — free
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
          Real GLP-1 <em className="font-serif italic underline decoration-2 underline-offset-[6px] text-[#1B2147]">results.</em>
        </Reveal>
        <Reveal as="p" delay={120} className="mt-6 max-w-xl text-base leading-relaxed text-[#1B2147] sm:text-lg">
          Starting at $149.99 per 28-day supply. No insurance needed. Doctor-prescribed and delivered to your door.
        </Reveal>
        <Reveal delay={200}>
          <a
            href="#cta"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2147] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#0F1432]"
          >
            See if I qualify — free
          </a>
        </Reveal>
        <Reveal as="p" delay={260} className="mt-3 max-w-xl text-sm text-[#1B2147]/70">
          Free eligibility check. No charge if you don't qualify.
        </Reveal>
      </div>
    </section>
  );
}

type Tile = {
  id: string;
  tag?: string;
  title: string;
  subtitle?: string;
  icon?: "bolt" | "user";
  img: string;
  imgAlt: string;
  variant: "image-hero" | "row" | "half";
  align?: "left" | "right";
  imgClass?: string;
};

const tiles: Tile[] = [
  {
    id: "feel",
    title: "Feel like yourself again",
    subtitle: "Sustained energy for the moments that matter most.",
    icon: "bolt",
    img: feelLikeYourselfAsset.url,
    imgAlt: "Father playing with his children in the front yard at golden hour",
    variant: "image-hero",
  },
  {
    id: "love",
    title: "Love what you see",
    subtitle: "Confidence that shows in every part of your life.",
    icon: "user",
    img: loveWhatYouSeeAsset.url,
    imgAlt: "Smiling man in a white shirt looking in the mirror with his partner",
    variant: "image-hero",
  },
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
      { label: "GLP-1 + GIP", value: "Starting at $249.99 per 28-day supply" },
      { label: "GLP-1", value: "Starting at $149.99 per 28-day supply" },
    ],
  },
  {
    id: "brand",
    title: "Brand-name Weight Loss",
    subtitle: "FDA-approved name brand",
    medications: "Ozempic, Mounjaro, Wegovy, Foundayo, Zepbound",
    img: tirzepatideImg,
    imgAlt: "Brand-name GLP-1 injector pens",
    prices: [{ label: "", value: "Starting at $199.99 per month" }],
  },
];

type DetailedCard = {
  id: string;
  tags: string[];
  tagTone: "tan" | "lavender";
  name: string;
  desc: string;
  price: string;
  period: string;
  img: string;
  imgAlt: string;
};

const detailedCards: DetailedCard[] = [
  {
    id: "tirzepatide",
    tags: ["COMPOUNDED", "GLP-1 + GIP"],
    tagTone: "tan",
    name: "Tirzepatide",
    desc: "Discover one of the most effective medical weight loss tools available — clinically studied to support significant weight loss over time.",
    price: "$249.99",
    period: "/28-day supply",
    img: semaglutideImg,
    imgAlt: "Compounded Tirzepatide vial",
  },
  {
    id: "semaglutide",
    tags: ["COMPOUNDED", "GLP-1"],
    tagTone: "tan",
    name: "Semaglutide",
    desc: "Unlock meaningful weight loss support with Semaglutide — clinically studied to help patients achieve significant results over time.",
    price: "$149.99",
    period: "/28-day supply",
    img: semaglutideImg,
    imgAlt: "Compounded Semaglutide vial",
  },
  {
    id: "foundayo",
    tags: ["BRAND-NAME", "GLP-1", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Foundayo™ Tablets",
    desc: "Foundayo™ (orforglipron) is the only GLP-1 pill for weight loss that can be taken any time of day, with or without food or water restrictions. FDA-approved for chronic weight management in adults with obesity or overweight with a weight-related condition.",
    price: "$199.99",
    period: "/month",
    img: foundayoPillAsset.url,
    imgAlt: "Foundayo tablet",
  },
  {
    id: "wegovy-tablets",
    tags: ["BRAND-NAME", "GLP-1", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Wegovy® Tablets",
    desc: "Wegovy® tablets deliver the same active ingredient as the Wegovy injection, in a once-daily oral form. The first and only FDA-approved semaglutide pill for weight loss in adults with obesity or overweight with a weight-related condition.",
    price: "$249.99",
    period: "/month",
    img: wegovyPillAsset.url,
    imgAlt: "Wegovy tablet",
  },
  {
    id: "zepbound",
    tags: ["BRAND-NAME", "GLP-1", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Zepbound®",
    desc: "Zepbound® (tirzepatide) once-weekly injection. FDA-approved for chronic weight management and for moderate-to-severe obstructive sleep apnea in adults with obesity.",
    price: "$449.99",
    period: "/month",
    img: zepboundPenAsset.url,
    imgAlt: "Zepbound injection pen",
  },
  {
    id: "wegovy-pens",
    tags: ["BRAND-NAME", "GLP-1", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Wegovy® Pens",
    desc: "Wegovy® once-weekly injection for chronic weight management in adults with obesity with a weight-related condition, and to reduce the risk of major cardiovascular events.",
    price: "$349.99",
    period: "/month",
    img: wegovyPenAsset.url,
    imgAlt: "Wegovy injection pen",
  },
  {
    id: "ozempic",
    tags: ["BRAND-NAME", "GLP-1"],
    tagTone: "lavender",
    name: "Ozempic®",
    desc: "A once-weekly semaglutide injection that improves insulin sensitivity, reduces appetite, and helps regulate blood sugar.",
    price: "$349.99",
    period: "/month",
    img: ozempicPenAsset.url,
    imgAlt: "Ozempic injection pen",
  },
  {
    id: "mounjaro",
    tags: ["BRAND-NAME", "GLP-1 + GIP"],
    tagTone: "lavender",
    name: "Mounjaro®",
    desc: "A once-weekly tirzepatide injection that activates two hormone receptors — GIP and GLP-1 — to reduce appetite, slow gastric emptying, and support metabolic health.",
    price: "$1,249.99",
    period: "/month",
    img: mounjaroPenAsset.url,
    imgAlt: "Mounjaro injection pen",
  },
];

function DetailedProducts() {
  return (
    <section id="pricing" className="bg-white px-4 pb-16 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
        {detailedCards.map((c, i) => (
          <Reveal key={c.id} delay={(i % 2) * 100}>
            <DetailedProductCard card={c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DetailedProductCard({ card }: { card: DetailedCard }) {
  const tagClass =
    card.tagTone === "tan"
      ? "bg-[#E6D4B8] text-[#1B2147]"
      : "bg-[#D8DCEF] text-[#1B2147]";
  return (
    <article
      className="card-lift flex h-full cursor-pointer flex-col rounded-[28px] bg-[#EEF0EC] px-6 py-7 sm:px-8 sm:py-8"
      role="button"
      tabIndex={0}
      aria-label={`Start questionnaire for ${card.name}`}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("open-qualify-modal"));
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("open-qualify-modal"));
        }
      }}
    >
      <div className="flex flex-wrap gap-2">
        {card.tags.map((t) => (
          <span
            key={t}
            className={`rounded-md px-3 py-1 text-[11px] font-semibold tracking-[0.12em] ${tagClass}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h3 className="font-sans text-[20px] font-semibold leading-[1.15] text-[#1B2147] break-words sm:text-[24px] lg:text-[28px]">
            {card.name}
          </h3>
        </div>
        <div className="flex w-[110px] shrink-0 items-center justify-center sm:w-[150px] lg:w-[160px]">
          <img
            src={card.img}
            alt={card.imgAlt}
            className="max-h-[110px] w-auto object-contain mix-blend-multiply sm:max-h-[140px] lg:max-h-[150px]"
            loading="lazy"
          />
        </div>
      </div>

      <p className="mt-4 text-[14.5px] leading-relaxed text-[#1B2147]/85 sm:text-[15px]">
        {card.desc}
      </p>
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[#1B2147]">
          <span className="text-[15px]">Starting at</span>
          <span className="text-[30px] font-bold leading-none sm:text-[34px]">{card.price}</span>
          <span className="text-[15px]">{card.period}</span>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent("open-qualify-modal"));
            }}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[#1B2147] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0F1432]"
          >
            See if I qualify — free
          </a>
          <Link
            to="/medications/$slug"
            params={{ slug: card.id }}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-[#1B2147]/20 bg-white px-5 py-3.5 text-sm font-semibold text-[#1B2147] transition hover:border-[#1B2147]"
          >
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
}

function HeroTile({ tile }: { tile: Tile }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-3xl bg-[#F2F3F0]">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={tile.img}
          alt={tile.imgAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-4 px-6 py-6 sm:px-7 sm:py-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1B2147]/25 text-[#1B2147] sm:h-12 sm:w-12">
          {tile.icon === "user" ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
            </svg>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-[20px] font-bold leading-tight text-[#1B2147] sm:text-[22px]">{tile.title}</h3>
          {tile.subtitle && (
            <p className="mt-1 text-[14px] leading-snug text-[#1B2147]/70 sm:text-[15px]">{tile.subtitle}</p>
          )}
        </div>
      </div>
    </article>
  );
}

function EmotionalTransformation() {
  const heroTiles = tiles.filter((t) => t.variant === "image-hero");
  return (
    <section className="bg-white px-4 pb-16 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {heroTiles.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <a href="#cta" className="block h-full" aria-label={`Start intake form for ${t.title}`}>
                <HeroTile tile={t} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MedicationOptions() {
  return (
    <section id="medications" className="bg-white px-4 pt-12 md:pt-16 pb-16 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <Reveal className="mb-2 text-center">
          <h2 className="font-serif text-3xl leading-tight text-[#1B2147] sm:text-4xl md:text-5xl">
            Personalized GLP-1 treatment options starting at $149.99 per 28-day supply.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#1B2147]/70 sm:text-lg">
            Your licensed provider will determine which available treatment option may be medically appropriate for you.
          </p>
        </Reveal>
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
    <article className="flex h-full flex-col rounded-[28px] bg-[#D9DDD8] px-6 py-7 sm:px-8 sm:py-8">
      <div className="flex items-center justify-center py-2">
        <img
          src={card.img}
          alt={card.imgAlt}
          className="max-h-[180px] w-auto object-contain mix-blend-multiply sm:max-h-[220px]"
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 font-serif text-[28px] leading-[1.1] text-[#1B2147] sm:text-[34px]">
        {card.title}
      </h3>
      <p className="mt-3 text-[15px] text-[#1B2147]/85">{card.subtitle}</p>
      <p className="mt-1.5 text-[15px] font-medium text-[#3454C7]">{card.medications}</p>
      <div className="mt-auto pt-6 space-y-2 text-[15px] text-[#1B2147]">
        {card.prices.map((p, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-1.5">
            {p.label && <span>{p.label}</span>}
            <span className="text-[#3454C7] underline underline-offset-2">
              {p.value}
            </span>
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
  return (
    <section className="bg-[#E8EAF0] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal as="h2" className="font-serif text-[40px] leading-[1.05] tracking-tight text-[#1B2147] md:text-[64px]">
          Weight loss is about more than willpower.
        </Reveal>
        <Reveal as="p" className="mt-5 max-w-3xl text-[17px] leading-[1.5] text-[#1B2147]/85">
          For many people, biology makes losing weight—and keeping it off—far more difficult. GLP-1 medications can help regulate appetite, improve satiety, and reduce food intake as part of a medically supervised weight-management plan.
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {/* Card 1 — Tirzepatide */}
          <Reveal className="rounded-3xl bg-gradient-to-b from-white to-[#EEF0F7] p-7 md:p-9 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3454C7]">
              Body weight support (Tirzepatide)
            </div>
            <h3 className="mt-5 font-serif text-[40px] leading-none text-[#1B2147] md:text-[52px]">
              GLP-1 + GIP
            </h3>
            <p className="mt-5 text-[17px] leading-[1.5] text-[#1B2147]/85">
              Tirzepatide is a dual-action GLP-1 and GIP receptor agonist clinically studied for its ability to support metabolic health and weight management over time. Results vary.
            </p>
          </Reveal>

          {/* Card 2 — Semaglutide */}
          <Reveal delay={120} className="rounded-3xl bg-gradient-to-b from-white to-[#EEF0F7] p-7 md:p-9 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3454C7]">
              Body weight support (Semaglutide)
            </div>
            <h3 className="mt-5 font-serif text-[40px] leading-none text-[#1B2147] md:text-[52px]">
              GLP-1
            </h3>
            <p className="mt-5 text-[17px] leading-[1.5] text-[#1B2147]/85">
              Semaglutide is a GLP-1 receptor agonist clinically studied for its ability to support appetite control and healthy weight management over time. Results vary.
            </p>
          </Reveal>
        </div>

        <div className="mt-6 md:mt-8">
          <a
            href="#cta"
            className="flex w-full items-center justify-center rounded-full bg-[#3454C7] px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#2a45a8] md:mx-auto md:w-auto md:px-14"
          >
            See if I qualify — free
          </a>
        </div>
      </div>
    </section>
  );
}

function WeightLossScale() {
  const [weight, setWeight] = useState(270);
  const potentialLoss = Math.round(weight * 0.15);

  return (
    <section className="bg-[#E8EAF0] px-6 pb-20 md:pb-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[#0F1E3F] p-8 text-white shadow-sm md:p-14">
        <h2 className="font-serif text-[36px] leading-[1.1] tracking-tight md:text-[52px]">
          Nearly 74% of adults in the U.S. are overweight or obese.
        </h2>
        <p className="mt-5 text-[15px] text-white/80 md:text-base">
          Adjust the scale to view your potential weight loss.
        </p>

        <div className="mt-12 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
            Your current weight (lbs):
          </div>
          <div className="mt-3 font-serif text-[72px] leading-none md:text-[96px]">
            {weight}
          </div>
        </div>

        <div className="mt-8">
          <input
            type="range"
            min={120}
            max={400}
            step={1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            aria-label="Current weight in pounds"
            className="scale-slider w-full"
          />
        </div>

        <div className="mt-12 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
            In one year you could lose (lbs):
          </div>
          <div className="mt-3 font-serif text-[72px] leading-none md:text-[96px]">
            {potentialLoss}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-[13px] leading-relaxed text-white/70">
          In clinical trials of GLP-1 medications, adults lost a mean of roughly 15% of body weight over about a year (STEP-1, Novo Nordisk; SURMOUNT-1, Eli Lilly). This is a study average, not a prediction of your personal result. Individual results vary.
        </p>
      </div>
    </section>
  );
}

function CompoundedVsBrand() {
  const cards = [
    {
      tag: "COMPOUNDED",
      title: "Custom-formulated",
      meds: "Tirzepatide, Semaglutide",
      rows: [
        ["Regulation", "Prepared by licensed US compounding pharmacies."],
        ["Cost", "$149.99–$249.99 per 28-day supply, out of pocket. No insurance required."],
        ["Customization", "Dose tailored to you. Vial-and-syringe format."],
        ["Supply", "Reliably in stock through our pharmacy partner."],
      ],
    },
    {
      tag: "BRAND-NAME",
      title: "FDA-approved name brand",
      meds: "Ozempic, Mounjaro, Wegovy, Zepbound, Foundayo",
      rows: [
        ["Regulation", "FDA-approved and manufactured by Novo Nordisk or Eli Lilly."],
        ["Cost", "From $199.99 per month. Insurance and savings cards may apply."],
        ["Customization", "Fixed doses in pre-filled injection pens."],
        ["Supply", "Subject to manufacturer shortages from time to time."],
      ],
    },
  ];

  return (
    <section className="bg-[#FAF8F5] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3454C7]">
            Compounded vs Brand-name
          </div>
          <h2 className="mt-5 font-serif text-[40px] leading-[1.05] tracking-tight text-[#1B2147] md:text-[64px]">
            <em className="italic text-[#3454C7]">Powerful active ingredient.</em>{" "}
            Different regulatory path.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {cards.map((c, idx) => (
            <Reveal
              key={c.tag}
              delay={idx * 120}
              className="rounded-3xl bg-[#EFEFEC] p-7 md:p-10"
            >
              <div className="flex justify-center">
                <span className="inline-block rounded-md bg-[#1B2147] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  {c.tag}
                </span>
              </div>
              <h3 className="mt-7 font-serif text-[32px] leading-tight text-[#1B2147] md:text-[40px]">
                {c.title}
              </h3>
              <p className="mt-4 text-[16px] font-medium text-[#3454C7]">{c.meds}</p>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#1B2147]/85 md:text-[16px]">
                {c.rows.map(([label, body]) => (
                  <li key={label} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B2147]" />
                    <span>
                      <strong className="font-semibold text-[#1B2147]">{label}:</strong> {body}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center md:mt-14">
          <p className="font-semibold text-[#1B2147]">
            Both paths are doctor-supervised by ChubbyNoMore providers. You can switch between compounded and brand-name as your needs change.
          </p>
          <p className="mt-3 text-sm text-[#1B2147]/70">
            Compounded medications are not FDA-approved for safety, efficacy, or quality.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {

  return (
    <section id="how" className="bg-[#FAF8F5] px-6 py-16">
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
          <PillButton href="#cta">See if I qualify — free</PillButton>
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
            <PillButton href="#cta">See if I qualify — free</PillButton>
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
    const openQuestionnaire = () => {
      setStep(0);
      setOpen(true);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href="#cta"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      openQuestionnaire();
    };
    const onOpenQualifyModal = () => openQuestionnaire();
    document.addEventListener("click", onClick);
    window.addEventListener("open-qualify-modal", onOpenQualifyModal);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("open-qualify-modal", onOpenQualifyModal);
    };
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

/* ───────────── Query-driven SEO sections ───────────── */

function WhoQualifies() {
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3454C7]">
            Eligibility
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#1B2147] md:text-[52px]">
            Who qualifies for GLP-1 weight loss treatment?
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#1B2147]/85 md:text-[17px]">
          <p>
            Most US adults 18 and older with a BMI of <strong>30 or higher</strong> qualify for GLP-1
            therapy through ChubbyNoMore. Adults with a BMI of <strong>27 or higher</strong> also
            qualify if they have at least one weight-related condition, such as type 2 diabetes, high
            blood pressure, high cholesterol, or obstructive sleep apnea.
          </p>
          <p>
            You must be able to safely take a GLP-1 medication — meaning no personal or family
            history of medullary thyroid cancer or MEN 2, no history of pancreatitis, and you can't
            be pregnant, planning pregnancy, or breastfeeding.
          </p>
          <p>
            A US-licensed physician reviews your full health history, current medications, and goals
            before prescribing. If you don't qualify, you're never charged.
          </p>
        </Reveal>
        <Reveal delay={140} className="mt-8">
          <a
            href="#cta"
            className="inline-flex rounded-full bg-[#1B2147] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#0F1432]"
          >
            See if I qualify — free
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function WhoNotFor() {
  const items = [
    "You have a personal or family history of medullary thyroid cancer or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
    "You're currently pregnant, actively trying to conceive, or breastfeeding.",
    "You have a history of pancreatitis, severe gastroparesis, or active gallbladder disease.",
    "You have type 1 diabetes or a history of diabetic ketoacidosis.",
    "You're under 18 years old.",
    "You're seeking rapid, short-term weight loss without a plan for sustained lifestyle changes — GLP-1 therapy is designed for long-term chronic weight management.",
  ];
  return (
    <section className="bg-[#FBF3F0] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B84B4B]">
            Safety first
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#1B2147] md:text-[52px]">
            Who this is not for
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#1B2147]/85 md:text-[17px]">
            GLP-1 medications are powerful and not right for everyone. Don't start therapy through
            ChubbyNoMore — or any provider — if any of the following apply to you:
          </p>
        </Reveal>
        <Reveal delay={140}>
          <ul className="mt-6 grid gap-3">
            {items.map((i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[#1B2147]/90 md:text-[16px]">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B84B4B]" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-sm text-[#1B2147]/70">
            Not sure? Complete our free intake and a physician will review your history — if it's not
            safe or appropriate, they'll tell you and suggest alternatives.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SemaVsTirz() {
  const rows: [string, string, string][] = [
    ["Drug class", "GLP-1 receptor agonist", "Dual GLP-1 + GIP receptor agonist"],
    ["Average weight loss (trial data)", "~15% over 68 weeks (STEP-1)", "~20–22% at 15 mg over 72 weeks (SURMOUNT-1)"],
    ["Dosing schedule", "Once weekly injection", "Once weekly injection"],
    ["Compounded starting price", "$149.99 per 28-day supply", "$249.99 per 28-day supply"],
    ["FDA-approved brand versions", "Wegovy®, Ozempic®", "Zepbound®, Mounjaro®"],
    ["Common side effects", "Nausea, constipation, fatigue", "Nausea, diarrhea, decreased appetite"],
    ["Best fit for", "Steady weight loss with a well-studied GLP-1", "Highest average efficacy option"],
  ];
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3454C7]">
            Compare
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#1B2147] md:text-[56px]">
            Semaglutide vs Tirzepatide — which is right for me?
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#1B2147]/85 md:text-[17px]">
            Both are once-weekly GLP-1 medications available through ChubbyNoMore. Tirzepatide adds
            a second target (GIP) and produces greater average weight loss in clinical trials, while
            semaglutide has a longer real-world track record and a lower starting cost.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-10 overflow-hidden rounded-2xl border border-[#1B2147]/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14.5px]">
              <thead className="bg-[#1B2147] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Attribute</th>
                  <th className="px-5 py-4 font-semibold">Semaglutide</th>
                  <th className="px-5 py-4 font-semibold">Tirzepatide</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {rows.map(([a, b, c], i) => (
                  <tr key={a} className={i % 2 ? "bg-[#F5F6F3]" : ""}>
                    <td className="px-5 py-4 font-semibold text-[#1B2147]">{a}</td>
                    <td className="px-5 py-4 text-[#1B2147]/85">{b}</td>
                    <td className="px-5 py-4 text-[#1B2147]/85">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={160} className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/medications/$slug"
            params={{ slug: "semaglutide" }}
            className="rounded-full border border-[#1B2147]/25 px-6 py-3 text-sm font-semibold text-[#1B2147] hover:border-[#1B2147]"
          >
            Semaglutide details →
          </Link>
          <Link
            to="/medications/$slug"
            params={{ slug: "tirzepatide" }}
            className="rounded-full border border-[#1B2147]/25 px-6 py-3 text-sm font-semibold text-[#1B2147] hover:border-[#1B2147]"
          >
            Tirzepatide details →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
