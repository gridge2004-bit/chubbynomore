import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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
      { title: "Online GLP-1 Weight Loss Program | ChubbyNoMore" },
      { name: "description", content: "Online GLP-1 weight-management care with licensed-provider review. Explore compounded semaglutide, tirzepatide, and select FDA-approved brand-name options." },
      { property: "og:title", content: "Online GLP-1 Weight Loss Program | ChubbyNoMore" },
      { property: "og:description", content: "Licensed-provider-reviewed online GLP-1 weight-management care, with compounded and select FDA-approved brand-name options where available." },
      { property: "og:url", content: "https://chubbynomore.com/" },
      { name: "twitter:title", content: "Online GLP-1 Weight Loss Program | ChubbyNoMore" },
      { name: "twitter:description", content: "Licensed-provider-reviewed online GLP-1 weight-management care, with compounded and select FDA-approved brand-name options where available." },
    ],
    links: [{ rel: "canonical", href: "https://chubbynomore.com/" }],
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
  "Online health intake",
  "Licensed-provider review",
  "Medication dispensed by a licensed US pharmacy",
  "Transparent starting prices",
  "Discreet home delivery",
  "Ongoing clinical support",
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
  { n: "01", img: step1Img, title: "Complete your intake", imgAlt: "Complete your intake", desc: "Fill out your health history online in about 60 seconds. No awkward waiting rooms. Your health information is submitted through a private online intake." },
  { n: "02", img: step2Img, title: "Clinical review", imgAlt: "Licensed provider reviewing a patient’s health information", desc: "A licensed provider reviews your health history, evaluates your eligibility, and determines whether an available treatment option may be medically appropriate for you." },
  { n: "03", img: step3Img, title: "Receive your medication", imgAlt: "Receive your medication", desc: "Your medication is dispensed by a licensed US pharmacy and shipped discreetly to your door — with ongoing support." },
];


const faqs = [
  { q: "What are the common side effects of GLP-1 medications?", a: "Common side effects may include nausea, diarrhea, vomiting, constipation, and stomach discomfort, particularly when beginning treatment or increasing a dose. Side effects vary by person. A licensed provider will review the potential risks and help determine an appropriate treatment and titration plan." },
  { q: "How much weight can I expect to lose?", a: "Results vary significantly from person to person, and no specific result is guaranteed. Your provider can discuss what may be realistic based on your medication, starting weight, medical history, lifestyle, and consistency with your treatment plan." },
  { q: "What determines whether I qualify for treatment?", a: "A licensed provider will review factors including your medical history, current medications, height, weight, BMI, existing health conditions, and treatment goals. Completing the questionnaire does not guarantee approval or a prescription." },
  { q: "Can I eventually stop taking GLP-1 medication?", a: "The appropriate length of treatment differs for each patient. Your provider will help determine whether continuing, adjusting, or stopping treatment is appropriate. Do not stop or change a prescribed medication without medical guidance." },
  { q: "What happens if GLP-1 treatment is not right for me?", a: "A prescription will not be issued if a licensed provider determines that treatment is not medically appropriate. The provider may discuss other possible next steps or recommend that you follow up with your primary-care provider or another specialist." },
  { q: "Can I switch from my current GLP-1 provider?", a: "Yes. If you are currently taking semaglutide, tirzepatide, or another GLP-1 medication, you can complete our online intake and provide information about your current medication, dose, treatment history, and prescribing provider. A licensed provider will review your information and determine whether continuing treatment, changing medications, or adjusting your dose may be medically appropriate. Continuation of treatment or a particular dose is not guaranteed." },
  {
    q: "How is my information handled?",
    a: (
      <>
        Your health information is collected through the private online intake and used to evaluate and coordinate your care. It should only be shared with the providers, pharmacies, and service partners involved in delivering that care, as permitted by applicable law and the Chubby No More Privacy Policy.{" "}
        {/* TODO: Replace /privacy-policy-placeholder with the actual privacy-policy URL once it exists. */}
        <a href="/privacy-policy-placeholder" className="underline hover:no-underline">
          Read our Privacy Policy
        </a>
      </>
    ),
  },
  { q: "How much does the program cost?", a: "ChubbyNoMore is a cash-pay program, and insurance is not required. Personalized GLP-1 treatment options start at $149.99 per 28-day supply. Your final cost depends on the treatment prescribed and the current price of that treatment." },
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
      <TrustMarquee />
      <SwitchingCare />
      <HowItWorks />
      <WhyChoose />
      <EmotionalTransformation />
      <MedicationOptions />

      <GLP1Highlights />
      <WeightLossScale />
      <WhoQualifies />
      <SemaVsTirz />
      <CompoundedVsBrand />
      <WhoNotFor />

      <TrustedCare />
      <FinalCTA />
      <FAQ />
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
        <span>Free online eligibility check — takes 60 seconds</span>
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
        <Reveal as="div" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3454C7]">
          For men who are done waiting to feel like themselves again
        </Reveal>
        <Reveal as="h1" className="mt-4 font-serif text-6xl leading-[0.95] tracking-tight text-[#1B2147] sm:text-7xl md:text-[96px]">
          Serious GLP-1 care, built for men.
        </Reveal>
        <Reveal as="p" delay={120} className="mt-6 max-w-2xl text-base leading-relaxed text-[#1B2147] sm:text-lg">
          Complete a private online evaluation with a licensed provider. If treatment is medically appropriate, available options may include compounded semaglutide or tirzepatide and select FDA-approved brand-name medications, delivered to your door where available. Compounded semaglutide starts at $149.99 per 28-day supply. No insurance required.
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
          Takes about 60 seconds. No charge if you don't qualify. Prescription only — not everyone qualifies. Compounded medications are not FDA-approved.
        </Reveal>
        <Reveal delay={320}>
          <a href="#switching" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1B2147] underline underline-offset-4 transition hover:text-[#3454C7]">
            Already taking a GLP-1? Explore switching your care →
          </a>
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
    desc: "A clinician-prescribed treatment option that may support appetite regulation and weight management as part of a medically supervised plan. Individual results vary.",
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
    desc: "A clinician-prescribed GLP-1 treatment option that may support appetite regulation and weight management as part of a medically supervised plan. Individual results vary.",
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
    desc: "Foundayo™ (orforglipron) is a once-daily oral GLP-1 medication FDA-approved, together with a reduced-calorie diet and increased physical activity, to reduce excess body weight and maintain weight reduction long term in eligible adults.",
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
    desc: "Wegovy® tablets are a once-daily oral semaglutide treatment FDA-approved, together with a reduced-calorie diet and increased physical activity, for chronic weight management in eligible adults.",
    price: "$249.99",
    period: "/month",
    img: wegovyPillAsset.url,
    imgAlt: "Wegovy tablet",
  },
  {
    id: "zepbound",
    tags: ["BRAND-NAME", "GLP-1 + GIP", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Zepbound®",
    desc: "Zepbound® (tirzepatide) is a once-weekly injection FDA-approved, together with a reduced-calorie diet and increased physical activity, for chronic weight management in eligible adults and for moderate-to-severe obstructive sleep apnea in adults with obesity.",
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
    desc: "Wegovy® is a once-weekly semaglutide injection FDA-approved for chronic weight management in eligible adults. It is also approved to reduce the risk of major cardiovascular events in certain adults with cardiovascular disease and overweight or obesity.",
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
    desc: "Ozempic® (semaglutide) is a once-weekly injection FDA-approved for adults with type 2 diabetes. It is not FDA-approved for chronic weight management.",
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
    desc: "Mounjaro® (tirzepatide) is a once-weekly injection FDA-approved for adults with type 2 diabetes. It is not FDA-approved for chronic weight management.",
    price: "$1,249.99",
    period: "/month",
    img: mounjaroPenAsset.url,
    imgAlt: "Mounjaro injection pen",
  },
];


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
      {card.tags.includes("COMPOUNDED") && (
        <p className="mt-3 text-[12px] leading-relaxed text-[#1B2147]/60 italic">
          Compounded medications are not FDA-approved for safety, effectiveness, or quality. Availability varies.
        </p>
      )}
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
        <div id="pricing" className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {detailedCards.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 100}>
              <DetailedProductCard card={c} />
            </Reveal>
          ))}
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

function SwitchingCare() {
  return (
    <section id="switching" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-3xl border border-[#1B2147]/8 bg-[#FAF8F5] p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 md:p-12 lg:p-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3454C7]">
              ALREADY TAKING A GLP-1?
            </div>
            <h2 className="mt-4 font-serif text-[34px] leading-[1.05] tracking-tight text-[#1B2147] md:text-[44px] lg:text-[52px]">
              Switching your care can be simple.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[#1B2147]/85 md:text-[17px]">
              Already taking semaglutide or tirzepatide through another provider? Complete a brief online intake and share your current medication, dose, and treatment history. A licensed provider will review whether continuing your treatment—and at what dose—is medically appropriate.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-start">
            <p className="text-[15px] leading-relaxed text-[#1B2147]/80 md:text-[16px]">
              If prescribed, medication is dispensed by a licensed U.S. pharmacy and delivered discreetly to your door where available.
            </p>
            <a
              href="#cta"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#1B2147] bg-white px-6 py-3.5 text-sm font-semibold text-[#1B2147] transition hover:bg-[#1B2147] hover:text-white"
            >
              Switch and keep my momentum →
            </a>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-[#1B2147]/60">
              Continuation of treatment and dosing are determined by the licensed provider based on your medical history and current treatment.
            </p>
          </div>
        </div>
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
              Tirzepatide acts on GLP-1 and GIP pathways involved in appetite and metabolic regulation. A licensed provider will determine whether it may be appropriate for you. Individual results vary.
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
              Semaglutide acts on the GLP-1 pathway involved in appetite regulation and satiety. A licensed provider will determine whether it may be appropriate for you. Individual results vary.
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
  const [trial, setTrial] = useState<"sema" | "tirz">("sema");

  const trialPct = trial === "sema" ? 0.15 : 0.21; // midpoint of 20–22%
  const trialLabel = trial === "sema" ? "approximately 15%" : "approximately 20–22%";
  const endingLabel = trial === "sema" ? "Weight at ~15% lower" : "Weight at ~20–22% lower";
  const potentialLoss = Math.round(weight * trialPct);
  const illustrativeWeight = Math.round(weight - potentialLoss);

  const tabBase =
    "flex-1 rounded-full px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition";
  const tabOn = "bg-white text-[#0F1E3F]";
  const tabOff = "bg-transparent text-white/75 hover:text-white";

  return (
    <section className="bg-[#E8EAF0] px-6 pb-20 md:pb-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[#0F1E3F] p-8 text-white shadow-sm md:p-14">
        <h2 className="font-serif text-[36px] leading-[1.1] tracking-tight md:text-[52px]">
          What could {potentialLoss} fewer pounds change for you?
        </h2>
        <p className="mt-5 text-[15px] text-white/80 md:text-base">
          More confidence in your clothes. More energy for the people and moments that matter. A lighter version of everyday life.
        </p>

        <div className="mt-8" role="tablist" aria-label="Trial average">
          <div className="mx-auto flex max-w-md gap-1 rounded-full border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              role="tab"
              aria-selected={trial === "sema"}
              onClick={() => setTrial("sema")}
              className={`${tabBase} ${trial === "sema" ? tabOn : tabOff}`}
            >
              Semaglutide ~15%
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={trial === "tirz"}
              onClick={() => setTrial("tirz")}
              className={`${tabBase} ${trial === "tirz" ? tabOn : tabOff}`}
            >
              Tirzepatide ~20–22%
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
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

        <div className="mt-12 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-10">
          <div className="text-center md:min-w-[140px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
              Your starting point
            </div>
            <div className="mt-2 font-serif text-[48px] leading-none md:text-[64px]">
              {weight} <span className="text-[24px] md:text-[28px]">lbs</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <svg
              className="h-6 w-14 text-white/60 md:h-8 md:w-20"
              viewBox="0 0 80 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 14h68M64 6l12 8-12 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="rounded-full bg-[#3454C7] px-5 py-2.5 text-center font-button text-[15px] font-extrabold text-white shadow-md">
              −{potentialLoss} lbs
            </div>
          </div>

          <div className="text-center md:min-w-[140px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
              {endingLabel}
            </div>
            <div className="mt-2 font-serif text-[48px] leading-none md:text-[64px]">
              {illustrativeWeight} <span className="text-[24px] md:text-[28px]">lbs</span>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[15px] text-white/90 md:text-base">
          Imagine what carrying {potentialLoss} fewer pounds could mean for your confidence, energy, and everyday movement.
        </p>

        <div className="mt-8 text-center">
          <a
            href="#cta"
            className="inline-flex items-center justify-center rounded-full bg-[#3454C7] px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#2a45a8] md:px-14"
          >
            Check my eligibility — free
          </a>
          <p className="mt-3 text-[13px] text-white/70">
            Free eligibility check. Takes about 60 seconds. No charge if you don’t qualify.
          </p>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-[13px] leading-relaxed text-white/70">
          This is an educational illustration of clinical-trial averages ({trialLabel}), not a prediction or promise of personal results. Individual results vary. Weight loss is not guaranteed. These results do not establish the safety, effectiveness, or quality of compounded medications.
        </p>
      </div>
    </section>
  );
}

function CompoundedVsBrand() {
  const cards = [
    {
      tag: "COMPOUNDED",
      title: "Prepared by a compounding pharmacy",
      meds: "Tirzepatide, Semaglutide",
      rows: [
        ["Regulation", "Prepared by licensed US compounding pharmacies."],
        ["Cost", "$149.99–$249.99 per 28-day supply, out of pocket. No insurance required."],
        ["Customization", "Prepared in prescribed strengths and dispensed in a vial-and-syringe format."],
        ["Supply", "Availability varies and is confirmed at the time of prescribing."],
      ],
    },
    {
      tag: "BRAND-NAME",
      title: "FDA-approved brand-name medications",
      meds: "Wegovy®, Zepbound®, Foundayo™, Ozempic®, Mounjaro®",
      rows: [
        ["Regulation", "FDA-approved and manufactured by Novo Nordisk or Eli Lilly."],
        ["Cost", "From $199.99 per month. Insurance and savings cards may apply."],
        ["Available formats", "Product-specific oral tablets or pre-filled injection pens."],
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
            <em className="italic text-[#3454C7]">Different treatment options.</em>{" "}
            Different regulatory pathways.
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
            A licensed provider will determine whether a compounded or FDA-approved treatment option may be medically appropriate based on your individual needs and product availability.
          </p>
          <p className="mt-3 text-sm text-[#1B2147]/70">
            Compounded medications are not FDA-approved for safety, efficacy, or quality.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChoose() {
  const benefits = [
    {
      title: "Direct, straightforward care",
      body: "Clear information, transparent starting prices, and no unnecessary runaround.",
    },
    {
      title: "Private from the start",
      body: "Complete your health intake online and receive discreet treatment delivery where available.",
    },
    {
      title: "Built around a busy schedule",
      body: "Complete the intake on your own time without sitting in a traditional waiting room.",
    },
    {
      title: "More than a prescription",
      body: "A licensed provider reviews your medical information and determines whether an available treatment may be appropriate for you.",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3454C7]">
            WHY MEN CHOOSE CHUBBYNOMORE
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#1B2147] sm:text-4xl md:text-5xl">
            Straightforward care, without the usual friction.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#1B2147]/70 sm:text-lg">
            Chubby No More is designed for men who want direct answers, private care, transparent pricing, and a medically supervised plan that fits into real life.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 100}
              className="flex flex-col rounded-2xl bg-[#FAF8F5] p-7 md:p-8"
            >
              <h3 className="font-serif text-xl text-[#1B2147] md:text-2xl">
                {b.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#1B2147]/75">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-12 text-center md:mt-14">
          <PillButton href="#cta">See if I qualify — free</PillButton>
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
                <img src={s.img} alt={s.imgAlt} className="h-full w-full object-cover" loading="lazy" />
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
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <section id="faq" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="font-serif text-4xl leading-[1.1] text-[#1B2147] md:text-5xl">
            Frequently asked <em className="italic">questions.</em>
          </h2>
        </Reveal>
        <div>
          <div className="divide-y divide-[#E7E8EE] border-y border-[#E7E8EE]">
            {faqs.map((f, i) => {
              const isOpen = openSet.has(i);
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2147] focus-visible:ring-offset-2"
                  >
                    <span className="font-serif text-lg text-[#1B2147] md:text-xl">{f.q}</span>
                    <ChevronDown
                      aria-hidden
                      className={`h-5 w-5 shrink-0 text-[#1B2147] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!isOpen}
                    className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0">
                      <p className="max-w-2xl text-sm leading-relaxed text-[#5A6075] md:text-base">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[#5A6075] md:text-sm">
            Prescription treatment requires an online medical evaluation. Not everyone qualifies. Individual results vary.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TrustedCare section
// Configuration-driven. Do NOT display placeholder credentials,
// testimonials, statistics, badges, or ratings unless verified
// data has been supplied and substantiated.
// ============================================================

type ProviderConfig = {
  verified: boolean;
  name?: string;
  title?: string;
  headshot?: string;
  license?: string; // medical license or states served
  credential?: string; // relevant credential (e.g. specialty)
  bio?: string;
};

type TestimonialConfig = {
  firstName: string;
  lastInitial: string;
  photo?: string; // only when written permission exists
  text: string;
  compensated: boolean;
  disclaimer?: string;
};

type StatisticConfig = {
  label: string;
  value?: string; // hidden if not supplied
};

const providerConfig: ProviderConfig = {
  verified: false,
  // TODO: Populate with verified provider details before enabling.
  // name: "",
  // title: "",
  // headshot: "",
  // license: "",
  // credential: "",
  // bio: "",
};

// Master toggle for the entire TrustedCare section.
// Keep false until at least one verified provider profile has been added.
const showTrustedCareSection = false;

// Single toggle. Keep false until real, consented testimonials exist.
const testimonialsEnabled = false;
const testimonialConfig: TestimonialConfig[] = [
  // TODO: Add up to three consented testimonials.
];

const statisticsConfig: StatisticConfig[] = [
  { label: "Patients served" },
  { label: "Average review score" },
  { label: "States available" },
];

function TrustedCare() {
  if (!showTrustedCareSection) return null;

  const visibleStats = statisticsConfig.filter((s) => s.value && s.value.trim().length > 0);
  const showDisclaimer = testimonialsEnabled || visibleStats.length > 0;

  return (
    <section
      aria-labelledby="trusted-care-heading"
      className="w-full bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1B2147]/60">
            Trusted care
          </div>
          <h2
            id="trusted-care-heading"
            className="mt-4 font-serif text-4xl leading-[1.1] text-[#1B2147] md:text-5xl"
          >
            Trusted care, built around real medical review
          </h2>
        </div>

        {/* Provider area */}
        <div className="mt-14 rounded-2xl border border-[#1B2147]/10 bg-[#F5F1EA] p-8 md:p-12">
          <h3 className="font-serif text-2xl text-[#1B2147] md:text-3xl">
            Care reviewed by licensed medical professionals
          </h3>

          {providerConfig.verified ? (
            <div className="mt-8 grid gap-8 md:grid-cols-[180px_1fr] md:items-start">
              <div className="h-40 w-40 overflow-hidden rounded-full bg-white ring-1 ring-[#1B2147]/10 md:h-44 md:w-44">
                {providerConfig.headshot ? (
                  <img
                    src={providerConfig.headshot}
                    alt={providerConfig.name ? `Portrait of ${providerConfig.name}` : "Provider portrait"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div>
                {providerConfig.name && (
                  <div className="font-serif text-xl text-[#1B2147]">{providerConfig.name}</div>
                )}
                {providerConfig.title && (
                  <div className="mt-1 text-sm text-[#1B2147]/70">{providerConfig.title}</div>
                )}
                {providerConfig.credential && (
                  <div className="mt-1 text-sm text-[#1B2147]/70">{providerConfig.credential}</div>
                )}
                {providerConfig.license && (
                  <div className="mt-1 text-sm text-[#1B2147]/70">{providerConfig.license}</div>
                )}
                {providerConfig.bio && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#1B2147]/80">
                    {providerConfig.bio}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-[#1B2147]/70">Provider information coming soon</p>
          )}
        </div>

        {/* Testimonial area — only rendered when enabled */}
        {testimonialsEnabled && testimonialConfig.length > 0 && (
          <div className="mt-12">
            <h3 className="font-serif text-2xl text-[#1B2147] md:text-3xl">
              What patients are saying
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonialConfig.slice(0, 3).map((t, i) => (
                <figure
                  key={i}
                  className="flex h-full flex-col rounded-2xl border border-[#1B2147]/10 bg-white p-6 shadow-sm"
                >
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={`Portrait of ${t.firstName} ${t.lastInitial}.`}
                      className="mb-4 h-14 w-14 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <blockquote className="text-sm leading-relaxed text-[#1B2147]/85">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-[#1B2147]">
                    {t.firstName} {t.lastInitial}.
                  </figcaption>
                  <div className="mt-2 space-y-1 text-xs text-[#1B2147]/60">
                    {t.compensated && <div>Compensated for their time.</div>}
                    {t.disclaimer && <div>{t.disclaimer}</div>}
                  </div>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Statistics area — each stat hidden if value not supplied */}
        {visibleStats.length > 0 && (
          <div className="mt-12 grid gap-6 rounded-2xl bg-[#1B2147] p-8 text-white sm:grid-cols-2 md:grid-cols-3 md:p-10">
            {visibleStats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl md:text-4xl">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {showDisclaimer && (
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#1B2147]/60">
            Individual experiences and results vary. Testimonials do not guarantee that other patients will achieve the same outcome.
          </p>
        )}
      </div>
    </section>
  );
}

function FinalCTA() {
  const checks = [
    "Clinician reviewed",
    "Private online intake",
    "Delivered to your door",
    "Availability varies by state",
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
  const programLinks = [
    { label: "How It Works", href: "#how" },
    { label: "Medications", href: "#medications" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <footer className="bg-[#1B2147] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="font-serif text-3xl">ChubbyNoMore</div>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Online prescription weight-management care with clinician review and home delivery, where available.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Program</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {programLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/85 transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 md:flex-row">
          <span>© {new Date().getFullYear()} ChubbyNoMore. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────── QUALIFY QUESTIONNAIRE (framework) ─────────────────
   Multi-step screening questionnaire. Currently only the intro screen is
   implemented — question steps will be added in follow-up prompts.
   Any anchor on the page pointing to href="#cta" opens this flow, and the
   "open-qualify-modal" window event does the same.
------------------------------------------------------------------------- */

const MINT = "#6FBF9F";

type QuestionStep = {
  id: string;
  render: (ctx: {
    answers: Record<string, unknown>;
    setAnswer: (id: string, value: unknown) => void;
  }) => React.ReactNode;
  isAnswered: (answers: Record<string, unknown>) => boolean;
};

const HEALTH_OPTIONS: string[] = [
  "I or a family member have had medullary thyroid carcinoma",
  "I or a family member have Multiple Endocrine Neoplasia syndrome type 2, also called MEN 2",
  "I have had a serious allergic reaction to semaglutide, tirzepatide, or another GLP-1 medication",
  "I am pregnant, planning to become pregnant soon, or currently breastfeeding",
  "I am undergoing fertility treatment or expect to begin fertility treatment soon",
  "Cardiovascular disease",
  "Obstructive sleep apnea",
  "High blood pressure",
  "High cholesterol",
  "Type 2 diabetes",
];
const HEALTH_NONE = "None of these apply to me";

/* ─────────── QUESTIONNAIRE ROUTING CONFIG ───────────
   Screening-only routing. NOT a diagnosis or eligibility decision.
   A developer can edit these lists after clinical review to change
   which health-history selections require additional provider review
   versus which continue into the full intake.
   Any selection in `reviewRequired` routes to the Additional Review
   outcome. Otherwise the user sees the Continue Intake outcome.
   ---------------------------------------------------- */
const HEALTH_ROUTING: {
  reviewRequired: string[];
  continueIntake: string[];
} = {
  reviewRequired: [
    // medullary thyroid carcinoma history
    HEALTH_OPTIONS[0],
    // MEN 2 history
    HEALTH_OPTIONS[1],
    // serious GLP-1 allergic reaction
    HEALTH_OPTIONS[2],
    // pregnant, planning pregnancy, or breastfeeding
    HEALTH_OPTIONS[3],
    // fertility treatment
    HEALTH_OPTIONS[4],
  ],
  continueIntake: [
    // cardiovascular disease
    HEALTH_OPTIONS[5],
    // obstructive sleep apnea
    HEALTH_OPTIONS[6],
    // high blood pressure
    HEALTH_OPTIONS[7],
    // high cholesterol
    HEALTH_OPTIONS[8],
    // type 2 diabetes
    HEALTH_OPTIONS[9],
    // none of the listed conditions
    HEALTH_NONE,
  ],
};

// TODO: Replace these placeholders with the confirmed provider-booking
// and full-intake destinations once those systems are connected.
const PROVIDER_BOOKING_URL_PLACEHOLDER = "#provider-booking-placeholder";
const FULL_INTAKE_URL_PLACEHOLDER = "#full-intake-placeholder";

const questionSteps: QuestionStep[] = [
  {
    id: "current_weight",
    isAnswered: (a) => {
      const v = a["current_weight"];
      if (typeof v !== "string") return false;
      const n = Number(v);
      return Number.isInteger(n) && n >= 70 && n <= 800;
    },
    render: ({ answers, setAnswer }) => {
      const raw = (answers["current_weight"] as string) ?? "";
      const touched = (answers["current_weight_touched"] as boolean) ?? false;
      const n = Number(raw);
      const valid =
        raw !== "" && Number.isInteger(n) && n >= 70 && n <= 800;
      const showError = touched && !valid;
      return (
        <div>
          <h2
            id="qualify-modal-title"
            className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl"
          >
            What is your current weight?
          </h2>
          <div className="mt-6">
            <label
              htmlFor="q-current-weight"
              className="sr-only"
            >
              Current weight in pounds
            </label>
            <div className="relative">
              <input
                id="q-current-weight"
                type="number"
                inputMode="numeric"
                min={70}
                max={800}
                step={1}
                value={raw}
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^\d]/g, "");
                  setAnswer("current_weight", digits);
                  if (!touched) setAnswer("current_weight_touched", true);
                }}
                aria-invalid={showError || undefined}
                aria-describedby={showError ? "q-current-weight-err" : undefined}
                className="w-full rounded-2xl border border-[#E7E8EE] bg-white px-5 py-4 pr-16 text-lg font-semibold text-[#1B2147] outline-none transition focus:border-[#1B2147] focus:ring-2 focus:ring-[#6FBF9F]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-sm font-semibold text-[#5A6075]"
              >
                lbs
              </span>
            </div>
            {showError && (
              <p
                id="q-current-weight-err"
                className="mt-2 text-sm text-[#B4442A]"
              >
                Please enter your current weight.
              </p>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: "current_glp1",
    isAnswered: (a) => {
      const v = a["current_glp1"];
      return v === "yes" || v === "no" || v === "unsure";
    },
    render: ({ answers, setAnswer }) => {
      const value = answers["current_glp1"] as string | undefined;
      const opts: { id: string; label: string }[] = [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
        { id: "unsure", label: "I’m not sure" },
      ];
      return (
        <div>
          <h2
            id="qualify-modal-title"
            className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl"
          >
            Are you currently taking a GLP-1 medication?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5A6075]">
            Examples may include semaglutide, tirzepatide, Wegovy, Zepbound,
            Ozempic, or Mounjaro.
          </p>
          <div
            role="radiogroup"
            aria-label="Are you currently taking a GLP-1 medication?"
            className="mt-6 flex flex-col gap-3"
          >
            {opts.map((o) => {
              const selected = value === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setAnswer("current_glp1", o.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F] ${
                    selected
                      ? "border-[#1B2147] bg-[#1B2147] text-white"
                      : "border-[#E7E8EE] bg-white text-[#1B2147] hover:border-[#1B2147]"
                  }`}
                >
                  <span>{o.label}</span>
                  <span
                    aria-hidden="true"
                    className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                      selected ? "border-white" : "border-[#C9CBD6]"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      );
    },
  },
  {
    id: "health_conditions",
    isAnswered: (a) => {
      const v = a["health_conditions"];
      return Array.isArray(v) && v.length > 0;
    },
    render: ({ answers, setAnswer }) => {
      const selected = (answers["health_conditions"] as string[]) ?? [];
      const isNone = selected.includes(HEALTH_NONE);
      const toggle = (opt: string) => {
        if (opt === HEALTH_NONE) {
          setAnswer("health_conditions", isNone ? [] : [HEALTH_NONE]);
          return;
        }
        const withoutNone = selected.filter((s) => s !== HEALTH_NONE);
        if (withoutNone.includes(opt)) {
          setAnswer(
            "health_conditions",
            withoutNone.filter((s) => s !== opt)
          );
        } else {
          setAnswer("health_conditions", [...withoutNone, opt]);
        }
      };
      const Row = ({ opt }: { opt: string }) => {
        const checked = selected.includes(opt);
        return (
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm leading-relaxed transition sm:text-base ${
              checked
                ? "border-[#1B2147] bg-[#F5F6FB] text-[#1B2147]"
                : "border-[#E7E8EE] bg-white text-[#1B2147] hover:border-[#1B2147]"
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={() => toggle(opt)}
            />
            <span
              aria-hidden="true"
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${
                checked
                  ? "border-[#1B2147] bg-[#1B2147] text-white"
                  : "border-[#C9CBD6] bg-white"
              }`}
            >
              {checked && (
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                  <path
                    d="M2 6.5 5 9.5 10 3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="font-medium">{opt}</span>
          </label>
        );
      };
      return (
        <div>
          <h2
            id="qualify-modal-title"
            className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl"
          >
            Do any of the following apply to you?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5A6075]">
            Select all that apply.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            {HEALTH_OPTIONS.map((opt) => (
              <Row key={opt} opt={opt} />
            ))}
            <div className="mt-2 border-t border-[#E7E8EE] pt-2.5">
              <Row opt={HEALTH_NONE} />
            </div>
          </div>
        </div>
      );
    },
  },
];

function QualifyModal() {
  const [open, setOpen] = useState(false);
  // step 0 = intro; 1..questionSteps.length = questions
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const totalQuestions = questionSteps.length;
  const hasAnswers = Object.keys(answers).length > 0;

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const requestClose = () => {
    if (hasAnswers) {
      const ok = window.confirm(
        "Close the questionnaire? Your answers so far will not be saved."
      );
      if (!ok) return;
    }
    setOpen(false);
    // Delay reset so the closing animation (if any) doesn't flash a reset UI
    setTimeout(reset, 0);
  };

  // Intercept clicks on any CTA anchor pointing to #cta
  useEffect(() => {
    const openQuestionnaire = () => {
      reset();
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

  // Body scroll lock + Esc-to-close + initial focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the dialog
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const setAnswer = (id: string, value: unknown) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const outcomeStep = totalQuestions + 1;
  const isOutcome = step === outcomeStep;
  const currentQuestion =
    step > 0 && step <= totalQuestions ? questionSteps[step - 1] : null;
  const nextEnabled = currentQuestion ? currentQuestion.isAnswered(answers) : true;

  // Which outcome to show, based on health-conditions routing config.
  const selectedConditions =
    (answers["health_conditions"] as string[] | undefined) ?? [];
  const needsReview = selectedConditions.some((c) =>
    HEALTH_ROUTING.reviewRequired.includes(c)
  );

  const goNext = () => {
    if (step === 0) {
      if (totalQuestions === 0) return;
      setStep(1);
      return;
    }
    if (isOutcome) return;
    if (!nextEnabled) return;
    setStep((s) => Math.min(s + 1, outcomeStep));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  // Close without the "answers will not be saved" confirm — used from
  // outcome-screen actions where the flow is intentionally complete.
  const closeNow = () => {
    setOpen(false);
    setTimeout(reset, 0);
  };
  const reviewAnswers = () => setStep(1);

  /* ─────────── QUESTIONNAIRE RESULT (in-memory only) ───────────
     Structured screening result built when the user reaches the
     outcome step. This object lives in React component state only.

     PRIVACY (do not change without review):
     - Never persist to localStorage or sessionStorage.
     - Never send to Google Analytics, Meta Pixel, ad platforms,
       heat-mapping tools, or general website analytics.
     - Never place answers in the URL or query parameters.
     - Never include answers in error-reporting logs.
     - Do not transmit anywhere until the approved secure backend
       or EHR integration is in place.

     TODO: Wire this result to the approved secure backend / EHR
     submission endpoint once available. Until then, this object
     stays in memory and is discarded when the modal closes.
     ------------------------------------------------------------- */
  const rawWeight = answers["current_weight"];
  const parsedWeight =
    typeof rawWeight === "string" && rawWeight !== ""
      ? Number(rawWeight)
      : null;
  const currentWeight =
    parsedWeight !== null && Number.isInteger(parsedWeight)
      ? parsedWeight
      : null;
  const glp1Raw = answers["current_glp1"];
  const currentlyUsingGLP1: "yes" | "no" | "unsure" | null =
    glp1Raw === "yes" || glp1Raw === "no" || glp1Raw === "unsure"
      ? glp1Raw
      : null;
  const screeningOutcome: "additional_review" | "continue_intake" = needsReview
    ? "additional_review"
    : "continue_intake";

  const [result, setResult] = useState<{
    currentWeight: number | null;
    currentlyUsingGLP1: "yes" | "no" | "unsure" | null;
    selectedConditions: string[];
    screeningOutcome: "additional_review" | "continue_intake";
    completedAt: string;
  } | null>(null);

  useEffect(() => {
    if (!isOutcome) {
      if (result !== null) setResult(null);
      return;
    }
    const built = {
      currentWeight,
      currentlyUsingGLP1,
      selectedConditions,
      screeningOutcome,
      completedAt: new Date().toISOString(),
    };
    setResult(built);
    // Dev-only logging. import.meta.env.DEV is `false` in production
    // builds, so this branch is stripped from the production bundle.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[qualify] screening result (dev only, in-memory):", built);
    }
    // TODO: Replace this dev log with a call to the approved secure
    // backend or EHR submission endpoint once it is connected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOutcome]);


  // Progress: 0% on intro; 100% on outcome; otherwise (step / totalQuestions)
  const pct =
    step === 0 || totalQuestions === 0
      ? 0
      : isOutcome
      ? 100
      : Math.round((step / totalQuestions) * 100);
  const stepLabel =
    step === 0
      ? "Getting started"
      : isOutcome
      ? "Next steps"
      : `Step ${step} of ${totalQuestions}`;

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qualify-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      className="fixed inset-0 z-[300] flex items-stretch justify-center bg-[#1B2147]/60 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
    >
      <div
        ref={dialogRef}
        className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-xl sm:rounded-3xl"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={requestClose}
          aria-label="Close questionnaire"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#E7E8EE] bg-white text-[#1B2147] transition hover:bg-[#1B2147] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F]"
        >
          <span aria-hidden="true">✕</span>
        </button>

        {/* Header + progress */}
        <div className="border-b border-[#E7E8EE] px-6 pt-6 pb-4 sm:px-8">
          <span className="font-serif text-[20px] font-bold text-[#1B2147]">
            ChubbyNoMore
          </span>
          <div
            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#F0F0EF]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Questionnaire progress"
          >
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${pct}%`, backgroundColor: MINT }}
            />
          </div>
          <div
            className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ color: MINT }}
          >
            {stepLabel}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8 sm:py-8">
          {step === 0 && (
            <IntroScreen
              onStart={goNext}
              onDismiss={requestClose}
              canStart={totalQuestions > 0}
            />
          )}

          {currentQuestion && (
            <div>
              {currentQuestion.render({ answers, setAnswer })}
              <ModalNav
                onBack={goBack}
                onNext={goNext}
                nextLabel={step === totalQuestions ? "See next step" : "Next"}
                nextDisabled={!nextEnabled}
                showBack={step > 1}
              />
            </div>
          )}

          {isOutcome && (
            <OutcomeScreen
              variant={needsReview ? "review" : "continue"}
              onReview={reviewAnswers}
              onClose={closeNow}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function IntroScreen({
  onStart,
  onDismiss,
  canStart,
}: {
  onStart: () => void;
  onDismiss: () => void;
  canStart: boolean;
}) {
  return (
    <div>
      <h2
        id="qualify-modal-title"
        className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl"
      >
        See whether you may be a fit for treatment
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-[#5A6075] sm:text-base">
        Answer a few initial questions to help us determine the appropriate
        next step. A licensed provider must review your complete health
        information before any treatment can be prescribed.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={onStart}
          disabled={!canStart}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1B2147] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0F1432] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Start questionnaire
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-[#1B2147] underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F]"
        >
          Not right now
        </button>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-[#5A6075]">
        This initial questionnaire does not guarantee approval or a
        prescription.
      </p>
    </div>
  );
}

function OutcomeScreen({
  variant,
  onReview,
  onClose,
}: {
  variant: "review" | "continue";
  onReview: () => void;
  onClose: () => void;
}) {
  const isReview = variant === "review";
  const heading = isReview
    ? "Let’s find the right next step"
    : "You’re ready to continue";
  const body = isReview
    ? "One or more of your answers requires additional review before you continue. This does not necessarily mean treatment is unavailable. A licensed provider can review your health history and help determine which options may be appropriate for you."
    : "Your initial answers did not identify one of the listed issues requiring additional review. This is not a medical approval and does not guarantee a prescription. A licensed provider must still review your complete health history and determine whether treatment is appropriate.";
  const primaryLabel = isReview
    ? "Speak with a provider"
    : "Continue to full intake";
  // Placeholder destinations — replace once the real booking / intake URLs
  // are connected (see PROVIDER_BOOKING_URL_PLACEHOLDER / FULL_INTAKE_URL_PLACEHOLDER).
  const primaryHref = isReview
    ? PROVIDER_BOOKING_URL_PLACEHOLDER
    : FULL_INTAKE_URL_PLACEHOLDER;

  return (
    <div>
      <h2
        id="qualify-modal-title"
        className="font-serif text-2xl font-semibold leading-tight text-[#1B2147] sm:text-3xl"
      >
        {heading}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-[#5A6075] sm:text-base">
        {body}
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={primaryHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1B2147] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0F1432] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F] focus-visible:ring-offset-2"
        >
          {primaryLabel}
        </a>
        <button
          type="button"
          onClick={onReview}
          className="inline-flex w-full items-center justify-center rounded-full border border-[#1B2147] bg-white px-6 py-3 text-sm font-semibold text-[#1B2147] transition hover:bg-[#F5F6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F]"
        >
          Review my answers
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-[#1B2147] underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F]"
        >
          Return to the homepage
        </button>
      </div>
    </div>
  );
}

function ModalNav({
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
  showBack = true,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-[#E7E8EE] bg-white px-5 py-2.5 text-sm font-semibold text-[#1B2147] transition hover:bg-[#F0F0EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F]"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-disabled={nextDisabled}
        className="inline-flex items-center gap-2 rounded-full bg-[#1B2147] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0F1432] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FBF9F] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {nextLabel} →
      </button>
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
            Who may qualify for prescription weight loss treatment?
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#1B2147]/85 md:text-[17px]">
          <p>
            Adults with a BMI of <strong>30 or higher</strong>, or a BMI of <strong>27 or higher</strong> with at least one weight-related condition, may be candidates for certain prescription weight-management medications. Meeting these general criteria does not guarantee eligibility.
          </p>
          <p>
            Eligibility depends on the specific medication, your medical history, current medications, treatment goals, and other clinical factors. Certain treatments may not be appropriate during pregnancy or breastfeeding, or for people with particular medical conditions or risk factors.
          </p>
          <p>
            A licensed provider will review your complete health history and determine whether any available treatment option is medically appropriate for you. If you do not qualify, you will not be charged.
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
    "You or a family member have had medullary thyroid carcinoma, or you have Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
    "You have had a serious allergic reaction to semaglutide, tirzepatide, or any ingredient in a prescribed medication.",
    "You are pregnant, breastfeeding, planning a pregnancy, or become pregnant during treatment.",
    "You have a history of pancreatitis, gallbladder problems, severe gastroparesis, or another serious digestive condition.",
    "You have type 1 diabetes, a history of diabetic ketoacidosis, diabetic retinopathy, kidney problems, or take insulin or certain other diabetes medications.",
    "You have an upcoming surgery or procedure involving general anesthesia or deep sedation.",
    "Age eligibility varies by medication and program availability.",
  ];
  return (
    <section className="bg-[#FBF3F0] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B84B4B]">
            Safety first
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#1B2147] md:text-[48px]">
            Important safety considerations
          </h2>
          <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-[#1B2147]/90 md:text-[17px]">
            Prescription GLP-1 and GIP/GLP-1 medications are not appropriate for everyone. Safety and eligibility depend on the specific medication, your medical history, current medications, and other clinical factors. Tell your licensed provider if any of the following apply to you:
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 md:mt-10">
          <ul className="divide-y divide-[#1B2147]/10">
            {items.map((item) => (
              <li key={item} className="flex gap-4 py-5 md:py-6">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#B84B4B]" />
                <span className="text-[15px] leading-relaxed text-[#1B2147] md:text-[16px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180} className="mt-10 border-t border-[#1B2147]/10 pt-6 md:mt-12 md:pt-8">
          <p className="max-w-4xl text-[15px] leading-relaxed text-[#1B2147]/80 md:text-[16px]">
            This is not a complete list of risks, warnings, or reasons a medication may be inappropriate. Complete the private online intake so a licensed provider can review your health history and determine whether an available treatment option may be medically appropriate. Do not start, stop, or change a prescription medication without guidance from a qualified healthcare professional.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SemaVsTirz() {
  const cards = [
    {
      name: "Semaglutide",
      drugClass: "GLP-1 receptor agonist",
      slug: "semaglutide",
      accent: {
        wash: "bg-[#EAF3F5]",
        circle: "bg-[#DDEAF0]",
        text: "text-[#2E6B7A]",
        pill: "bg-[#2E6B7A]/10 text-[#2E6B7A]",
        feature: "bg-[#2E6B7A]/8",
        deco: "GLP-1",
      },
      attributes: [
        { label: "Average weight loss in brand-name clinical trials", value: "Wegovy®: approximately 15% over 68 weeks in STEP 1" },
        { label: "Dosing schedule", value: "Once weekly injection" },
        { label: "Compounded starting price", value: "$149.99 per 28-day supply", price: "$149.99", priceUnit: "per 28-day supply" },
        { label: "FDA-approved products containing the ingredient", value: "Wegovy® — weight management; Ozempic® — type 2 diabetes" },
        { label: "Common side effects", value: "Nausea, constipation, fatigue" },
      ],
    },
    {
      name: "Tirzepatide",
      drugClass: "Dual GLP-1 + GIP receptor agonist",
      slug: "tirzepatide",
      accent: {
        wash: "bg-[#ECECF6]",
        circle: "bg-[#E0E2F0]",
        text: "text-[#4B4F8C]",
        pill: "bg-[#4B4F8C]/10 text-[#4B4F8C]",
        feature: "bg-[#4B4F8C]/8",
        deco: "GLP-1 + GIP",
      },
      attributes: [
        { label: "Average weight loss in brand-name clinical trials", value: "Zepbound®: approximately 20–22% over 72 weeks in SURMOUNT-1" },
        { label: "Dosing schedule", value: "Once weekly injection" },
        { label: "Compounded starting price", value: "$249.99 per 28-day supply", price: "$249.99", priceUnit: "per 28-day supply" },
        { label: "FDA-approved products containing the ingredient", value: "Zepbound® — weight management; Mounjaro® — type 2 diabetes" },
        { label: "Common side effects", value: "Nausea, diarrhea, decreased appetite" },
      ],
    },
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
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#1B2147]/90 md:text-[17px]">
            Semaglutide and tirzepatide act through different hormone pathways. In clinical trials of FDA-approved brand-name products, tirzepatide produced greater average weight loss, while semaglutide has a longer real-world track record and a lower starting cost. These trial results do not establish the safety, efficacy, or quality of compounded formulations.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {cards.map((card, idx) => (
            <Reveal
              key={card.name}
              delay={idx * 120}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#1B2147]/8 bg-[#FAF8F5] shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:shadow-lg"
            >
              <div className={`relative overflow-hidden ${card.accent.wash} px-7 pb-8 pt-7 md:px-9 md:pt-9`}>
                <span className={`pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full opacity-30 blur-3xl md:h-48 md:w-48 ${card.accent.circle}`} />
                <span className="pointer-events-none absolute bottom-0 right-2 select-none font-serif text-[80px] font-bold leading-none opacity-[0.04] md:text-[110px]">
                  {card.accent.deco}
                </span>
                <div className="relative z-10">
                  <h3 className="font-serif text-[32px] leading-tight text-[#1B2147] md:text-[40px]">
                    {card.name}
                  </h3>
                  <p className={`mt-2 text-[15px] font-medium ${card.accent.text}`}>
                    {card.drugClass}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-0 px-7 md:px-9">
                {card.attributes.map((attr, attrIdx) => {
                  const isTrial = attr.label === "Average weight loss in brand-name clinical trials";
                  const isPrice = attr.label === "Compounded starting price";
                  const divider = attrIdx !== 0 ? "border-t border-[#1B2147]/8" : "";
                  return (
                    <div key={attr.label} className={`py-5 ${divider}`}>
                      {isTrial && (
                        <div className={`rounded-2xl ${card.accent.feature} p-5`}>
                          <span className={`mb-3 inline-block w-fit rounded-full ${card.accent.pill} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]`}>
                            {attr.label}
                          </span>
                          <p className="text-[15px] leading-relaxed text-[#1B2147] md:text-[16px]">
                            {attr.value}
                          </p>
                        </div>
                      )}
                      {isPrice && (
                        <div>
                          <span className={`mb-3 inline-block w-fit rounded-full ${card.accent.pill} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]`}>
                            {attr.label}
                          </span>
                          <div className={`flex items-baseline gap-3 rounded-2xl ${card.accent.wash} px-5 py-4`}>
                            <span className="font-serif text-[32px] leading-none text-[#1B2147] md:text-[36px]">
                              {attr.price}
                            </span>
                            <span className="text-[14px] font-medium text-[#1B2147]/80">
                              {attr.priceUnit}
                            </span>
                          </div>
                        </div>
                      )}
                      {!isTrial && !isPrice && (
                        <div>
                          <span className={`mb-2 inline-block w-fit rounded-full ${card.accent.pill} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]`}>
                            {attr.label}
                          </span>
                          <p className="text-[15px] leading-relaxed text-[#1B2147] md:text-[16px]">
                            {attr.value}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto px-7 pb-7 pt-2 md:px-9 md:pb-9">
                <Link
                  to="/medications/$slug"
                  params={{ slug: card.slug }}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#1B2147] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0F1432]"
                >
                  {card.name} details
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
