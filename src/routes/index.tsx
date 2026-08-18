import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Info, Menu, X } from "lucide-react";
import { Reveal, useParallax } from "@/components/Reveal";
import { LEGAL_LINKS } from "@/components/LegalPage";

import heroImg from "@/assets/hero.jpg";
import tirzepatideImg from "@/assets/brand-weightloss.jpg";
import oralTablets1Img from "@/assets/oral-tablets-1.png";
import oralTablets2Img from "@/assets/oral-tablets-2.png";
import step2Img from "@/assets/step2.jpg";
import ctaImg from "@/assets/cta.jpg";
import cnmSemaVialsAsset from "@/assets/cnm-sema-vials.jpg.asset.json";
import cnmTirzVialsAsset from "@/assets/cnm-tirz-vials.jpg.asset.json";
import cnmBoxAsset from "@/assets/cnm-box.png.asset.json";
import cnmHeaderLogoAsset from "@/assets/cnm-header-logo.png.asset.json";
import cnmLogoFullAsset from "@/assets/cnm-logo-full.png.asset.json";
import foundayoPillAsset from "@/assets/foundayo-pill.png.asset.json";
import wegovyPillAsset from "@/assets/wegovy-pill.png.asset.json";
import zepboundPenAsset from "@/assets/zepbound-pen.png.asset.json";
import wegovyPenAsset from "@/assets/wegovy-pen.png.asset.json";
import ozempicPenAsset from "@/assets/ozempic-pen.png.asset.json";
import mounjaroPenAsset from "@/assets/mounjaro-pen.png.asset.json";
import feelLikeYourselfAsset from "@/assets/feel-like-yourself.jpg.asset.json";
import loveWhatYouSeeAsset from "@/assets/love-what-you-see.jpg.asset.json";

import intakeManAsset from "@/assets/intake-man.png.asset.json";
import mensHealthTelehealthAsset from "@/assets/mens-health-telehealth.png.asset.json";
import dinnerCoupleAsset from "@/assets/dinner-couple.png.asset.json";
import doctor1Img from "@/assets/doctor-1.jpg";
import doctor2Img from "@/assets/doctor-2.jpg";
import doctor3Img from "@/assets/doctor-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online GLP-1 Weight Loss Program | Chubby No More" },
      { name: "description", content: "Online GLP-1 weight-management care with licensed-provider review. Explore compounded semaglutide, tirzepatide, and select FDA-approved brand-name options." },
      { property: "og:title", content: "Online GLP-1 Weight Loss Program | Chubby No More" },
      { property: "og:description", content: "Licensed-provider-reviewed online GLP-1 weight-management care, with compounded and select FDA-approved brand-name options where available." },
      { property: "og:site_name", content: "Chubby No More" },
      { property: "og:url", content: "https://chubbynomore.com/" },
      { name: "twitter:title", content: "Online GLP-1 Weight Loss Program | Chubby No More" },
      { name: "twitter:description", content: "Licensed-provider-reviewed online GLP-1 weight-management care, with compounded and select FDA-approved brand-name options where available." },
      { property: "og:image", content: "https://chubbynomore.com/__l5e/assets-v1/b99e2d31-702f-4a98-b1b7-9bca6ef9f964/cnm-social.jpg" },
      { name: "twitter:image", content: "https://chubbynomore.com/__l5e/assets-v1/b99e2d31-702f-4a98-b1b7-9bca6ef9f964/cnm-social.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://chubbynomore.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Chubby No More",
          alternateName: ["ChubbyNoMore", "CNM", "chubbynomore.com"],
          url: "https://chubbynomore.com/",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Chubby No More",
          alternateName: "ChubbyNoMore",
          url: "https://chubbynomore.com/",
          logo: "https://chubbynomore.com/icon-512x512.png",
        }),
      },
    ],
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
      { label: "GLP-1 + GIP (Tirzepatide)", price: "$279", period: "/ 28-day supply" },
      { label: "GLP-1 (Semaglutide)", price: "$149.99", period: "/ 28-day supply" },
    ],
    img: cnmSemaVialsAsset.url,
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
      { label: "Insurance & cash-pay options available — see pricing during intake", price: "", period: "" },
    ],
    img: tirzepatideImg,
  },
];

const steps = [
  { n: "01", img: intakeManAsset.url, title: "Complete your intake", imgAlt: "Man completing his online health intake on his phone while seated at a desk", desc: "Fill out your health history online in about 60 seconds. No awkward waiting rooms. Your health information is submitted through a private online intake." },
  { n: "02", img: step2Img, title: "Clinical review", imgAlt: "Licensed provider reviewing a patient’s health information", desc: "A licensed provider reviews your health history, evaluates your eligibility, and determines whether an available treatment option may be medically appropriate for you." },
  { n: "03", img: cnmBoxAsset.url, title: "Receive your medication", imgAlt: "Plain white shipping box with a subtle CNM logo on a kitchen counter", desc: "Your medication is dispensed by a licensed US pharmacy and shipped discreetly to your door — with ongoing support." },
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
        <a href="/privacy-policy" className="underline hover:no-underline">
          Read our Privacy Policy
        </a>

      </>
    ),
  },
  { q: "How much does the program cost?", a: "ChubbyNoMore is a cash-pay program, and insurance is not required. Plans start at $149.99 / 28-day supply. Your final cost depends on the treatment prescribed and the current price of that treatment." },
  { q: "What does a typical month actually cost, all in?", a: "For compounded plans, the medication price shown covers the 28-day supply, the online provider review, and standard shipping — there is no separate consult fee or delivery charge. Compounded semaglutide starts at $149.99 per 28-day supply and compounded tirzepatide at $279 per 28-day supply. Brand-name medications are priced separately by the pharmacy and depend on prescription, insurance or savings-program eligibility, and availability. Your final cost depends on what a licensed provider prescribes." },
  { q: "Will a GLP-1 affect my muscle mass or gym performance?", a: "Weight lost on any calorie deficit, including with GLP-1 treatment, can include lean mass as well as fat. Research on strategies to limit lean-mass loss generally points to adequate protein intake and regular resistance training, though individual results vary. Some men also notice lower energy during hard training early on, particularly while appetite and food intake are dropping. Discuss your training goals with your licensed provider so your plan and titration pace can account for them." },
  { q: "Do I have to use needles, or are there oral options?", a: "Both formats exist. Compounded semaglutide and tirzepatide are once-weekly injections using a short, fine needle placed under the skin of the abdomen or thigh — most patients self-administer at home in under a minute. There are also once-daily oral options, including Wegovy® tablets and Foundayo™ (orforglipron). Which format is appropriate depends on your medical history, tolerance, and provider judgment; a specific medication or format is not guaranteed." },
  { q: "How private and discreet is the process?", a: "The intake, provider review, and follow-up messaging all happen online — there is no in-person visit and no waiting room. Medication is shipped in plain packaging with no medication branding on the outside of the box. Your health information is used to evaluate and coordinate your care and is shared only with the providers, pharmacies, and service partners involved in delivering it, as described in the Privacy Policy." },
];

const NAVY = "#103942";

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#103942]">
      <PromoBanner />
      <Nav scrolled={scrolled} />
      <Hero />
      <TrustMarquee />
      <MedicalTeam />
      <SwitchingCare />
      <HowItWorks />
      <WhyChoose />
      <EmotionalTransformation />
      <MedicationOptions />

      <WeightLossScale />
      <WhoQualifies />
      <CompoundedVsBrand />
      <WhoNotFor />

      <TrustedCare />
      <FinalCTA />
      <Testimonials />
      <FAQ />
      <Footer />
      <div className="h-20 md:hidden" aria-hidden="true" />
      <StickyMobileCTA />
    </div>
  );
}

function PromoBanner() {
  return (
    <div className="w-full bg-[#103942] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]">
        <span className="hidden h-1.5 w-1.5 rounded-full bg-[#42D1C3] sm:inline-block" />
        <span className="sm:hidden">Free eligibility check · 60 seconds</span>
        <span className="hidden sm:inline">Free online eligibility check — takes 60 seconds</span>
      </div>
    </div>
  );
}

function PillButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition";
  if (variant === "secondary") {
    return <a href={href} className={`${base} border border-[#103942] text-[#103942] hover:bg-[#F5F5F7] hover:text-[#103942]`}>{children}</a>;
  }
  return <a href={href} className={`${base} bg-[#103942] text-white hover:bg-[#42D1C3] hover:text-[#103942]`}>{children}</a>;
}

function Nav({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full max-w-full border-b border-[#103942]/10 bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(16,57,66,0.08),0_8px_24px_-16px_rgba(16,57,66,0.18)]" : ""}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6 lg:gap-10">
          <a href="/" aria-label="Chubby No More home" className="flex shrink-0 items-center py-1">
            <img src={cnmHeaderLogoAsset.url} alt="Chubby No More" className="h-7 w-auto max-w-[150px] object-contain sm:h-8 sm:max-w-[190px] lg:h-9 lg:max-w-none" />
          </a>
          <nav className="hidden items-center gap-6 md:flex lg:gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#103942]/80 transition hover:text-[#42D1C3]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#switching"
            className="hidden shrink-0 items-center justify-center rounded-full border border-[#103942]/25 px-4 py-2.5 text-xs font-semibold tracking-wide text-[#103942] transition hover:border-[#42D1C3] hover:text-[#42D1C3] sm:inline-flex sm:text-sm"
          >
            Switch your care
          </a>
          <a href="/intake" className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#103942] px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942] sm:px-7 sm:py-3.5 sm:text-sm">
            <span className="sm:hidden">See if I qualify</span>
            <span className="hidden sm:inline">See if I qualify — free</span>
          </a>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[#103942] transition hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3] md:hidden"
          >
            <Menu className="h-7 w-7" strokeWidth={2} />
          </button>
        </div>

      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-[#103942]/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute inset-x-0 top-0 rounded-b-3xl bg-white px-4 pb-6 pt-3 shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <a href="/" aria-label="Chubby No More home" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center py-1">
                <img src={cnmHeaderLogoAsset.url} alt="Chubby No More" className="h-7 w-auto max-w-[150px] object-contain sm:h-8 sm:max-w-[190px]" />
              </a>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[#103942] transition hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3]"
              >
                <X className="h-7 w-7" strokeWidth={2} />
              </button>
            </div>
            <nav className="mt-4 flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[#103942]/10 py-3.5 text-base font-semibold text-[#103942] transition hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3] active:text-[#42D1C3]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href="/intake"
              onClick={() => setMenuOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#103942] px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3]"
            >
              See if I qualify — free
            </a>
            <a
              href="#switching"
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#103942]/25 px-6 py-3 text-sm font-semibold tracking-wide text-[#103942] transition hover:border-[#42D1C3] hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3]"
            >
              Switch your care
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


function Hero() {
  return (
    <section className="w-full bg-white px-6 pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
          GLP-1 CARE FOR MEN
        </div>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tight text-[#103942]">
          Lose the weight your willpower couldn't. Clinician-guided GLP-1 for men.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#103942] sm:text-lg">
          60-second intake. Licensed provider review. If prescribed, medication from a U.S. pharmacy ships to your door. Compounded plans from $149.99/28 days. Not everyone qualifies.
        </p>
        <div>
          <a
            href="/intake"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
          >
            Check if I qualify — 60 seconds, free
          </a>
        </div>
        <p className="mt-3 max-w-xl text-sm text-[#103942]/70">
          Takes about 60 seconds. No charge if you don't qualify. Prescription only — not everyone qualifies. Compounded medications are not FDA-approved.
        </p>
        <div>
          <a href="#switching" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#103942] underline underline-offset-4 transition hover:text-[#42D1C3]">
            On a GLP-1 already? Transfer your care →
          </a>
        </div>

      </div>
    </section>
  );
}

type Clinician = {
  name: string;
  credentials: string;
  states: string;
  bio: string;
  img: string;
};

const clinicians: Clinician[] = [
  {
    name: "Dr. Marcus Ellery",
    credentials: "MD, Board-Certified in Obesity Medicine",
    states: "Licensed in TX, FL, GA, AZ",
    bio: "Marcus has spent more than a decade helping men manage weight alongside blood pressure, cholesterol, and blood-sugar concerns. He focuses on steady titration and keeping side effects manageable.",
    img: doctor1Img,
  },
  {
    name: "Dr. Rachel Bowen",
    credentials: "MD, Board-Certified in Internal Medicine",
    states: "Licensed in CA, NY, IL, NC",
    bio: "Rachel treats obesity as a metabolic condition, not a discipline problem. She works with patients on appetite control, protein intake, and preserving strength while losing weight.",
    img: doctor2Img,
  },
  {
    name: "Luis Herrera",
    credentials: "MSN, FNP-C, Family Nurse Practitioner",
    states: "Licensed in NV, CO, OH, PA",
    bio: "Luis has managed metabolic and men's health care in primary care for over 20 years. He handles ongoing check-ins, dose adjustments, and questions between refills.",
    img: doctor3Img,
  },
];

function MedicalTeam() {
  return (
    <section id="medical-team" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            MEET OUR MEDICAL TEAM
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            Care led by licensed physicians.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#103942]/70 sm:text-lg">
            Every treatment plan is reviewed by a U.S.-licensed provider experienced in men's metabolic health.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clinicians.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 100}
              className="flex flex-col rounded-2xl bg-[#F5F5F7] p-6 md:p-7"
            >
              <div className="h-24 w-24 overflow-hidden rounded-full bg-white">
                <img
                  src={c.img}
                  alt={`Portrait of ${c.name}`}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-[#103942]">{c.name}</h3>
              <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#103942]/70">
                {c.credentials}
              </p>
              <p className="mt-1 text-[13px] text-[#103942]/60">{c.states}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#103942]/75">{c.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Testimonial = {
  name: string;
  age: number;
  location: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Derek M.",
    age: 41,
    location: "Austin, TX",
    quote:
      "The constant snacking after dinner just stopped. I'm down 34 pounds and my provider actually adjusted my dose when the nausea hit instead of telling me to tough it out.",
  },
  {
    name: "Anthony R.",
    age: 37,
    location: "Columbus, OH",
    quote:
      "The intake took me five minutes on my lunch break. No waiting room, no lecture. The box showed up plain — my neighbors have no idea what's in it.",
  },
  {
    name: "James P.",
    age: 52,
    location: "Charlotte, NC",
    quote:
      "I've been on and off diets since my thirties. This is the first time hunger wasn't running the show. My knees hurt less and I'm back on the bike three mornings a week.",
  },
  {
    name: "Victor S.",
    age: 45,
    location: "Phoenix, AZ",
    quote:
      "I kept lifting through the whole thing and my provider had me push protein hard. Lost the gut, kept most of my strength. That mattered more to me than the scale number.",
  },
  {
    name: "Brandon T.",
    age: 33,
    location: "Denver, CO",
    quote:
      "Pricing was the same every month, no surprise fees. When I had a question about a missed dose I got a straight answer the same day.",
  },
  {
    name: "Michael K.",
    age: 48,
    location: "Naperville, IL",
    quote:
      "Switching from my old provider was painless — they reviewed my history and kept me at the dose I was already on. Energy through the afternoon is the biggest change.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[#42D1C3]" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F5F5F7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            REAL EXPERIENCES
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            What men are saying.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 80}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_1px_0_0_rgba(16,57,66,0.06),0_18px_40px_-30px_rgba(16,57,66,0.35)] md:p-7"
            >
              <Stars />
              <p className="mt-4 text-[15px] leading-relaxed text-[#103942]/80">"{t.quote}"</p>
              <div className="mt-5 border-t border-[#103942]/10 pt-4 text-[13px] font-semibold text-[#103942]">
                {t.name}, {t.age}
                <span className="block font-normal text-[#103942]/60">{t.location}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[12px] leading-relaxed text-[#103942]/60">
          Individual results vary. Testimonials reflect individual experiences and are not guarantees of results.
        </p>
      </div>
    </section>
  );
}

function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#103942]/10 bg-white px-4 py-3 shadow-[0_-8px_24px_-16px_rgba(16,57,66,0.35)] md:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 leading-tight">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
            Plans from
          </div>
          <div className="text-[15px] font-semibold text-[#103942]">$149.99 / 28 days</div>
        </div>
        <a
          href="/intake"
          className="ml-auto inline-flex shrink-0 items-center justify-center rounded-full bg-[#103942] px-5 py-3 text-[13px] font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
        >
          Check if I qualify — free
        </a>
      </div>
    </div>
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
    title: "Energy that lasts past 3pm.",
    subtitle: "Fewer crashes after lunch, and enough left in the tank for the gym or the kids.",
    icon: "bolt",
    img: feelLikeYourselfAsset.url,
    imgAlt: "Father playing with his children in the front yard at golden hour",
    variant: "image-hero",
  },
  {
    id: "confidence",
    title: "Confidence that carries into every room.",
    subtitle: "Feel sharper, move with confidence, and show up like yourself again.",
    icon: "bolt",
    img: mensHealthTelehealthAsset.url,
    imgAlt: "Man in a navy suit presenting confidently in a modern office boardroom",
    variant: "image-hero",
  },
  {
    id: "love",
    title: "Feel confident in your body again.",
    subtitle: "In your clothes, in your relationships, and in the moments that matter.",
    icon: "user",
    img: loveWhatYouSeeAsset.url,
    imgAlt: "Smiling man in a white shirt looking in the mirror with his partner",
    variant: "image-hero",
  },
  { id: "compounded", tag: "POPULAR", title: "Compounded GLP-1", img: cnmSemaVialsAsset.url, imgAlt: "Compounded GLP-1 medication", variant: "row" },
  { id: "brand", tag: "FDA-APPROVED", title: "Brand-name GLP-1", img: tirzepatideImg, imgAlt: "Brand-name GLP-1 medication", variant: "row" },
  { id: "cravings", title: "Curb cravings & appetite", img: oralTablets1Img, imgAlt: "Oral weight-loss tablets", variant: "half" },
  { id: "metabolic", title: "Metabolic health", img: oralTablets2Img, imgAlt: "Oral metabolic health tablets", variant: "half" },
  { id: "dosing", title: "Personalized dosing", img: ctaImg, imgAlt: "Personalized dosing care", variant: "row" },
];




// Insurance / manufacturer-savings configuration.
// Never show an insurance price unless verified values and terms have been
// entered here. Leave insurancePricingEnabled=false until a live offer is
// verified with the manufacturer or savings program.
type InsurancePricing = {
  insurancePricingEnabled: boolean;
  insuranceHeadline?: string;
  insuranceSupplyLabel?: string;
  insuranceExplanation?: string;
  savingsProgramType?: "manufacturer-savings-card" | "coupon" | "coverage-check";
  termsUrl?: string;
  coverageCheckUrl?: string;
  offerExpiration?: string;
  lastVerifiedDate?: string;
  // Display state when enabled=false: "unavailable" (default) or "hidden"
  unavailableState?: "unavailable" | "hidden";
};

type DetailedCard = {
  id: string;
  tags: string[];
  tagTone: "tan" | "lavender";
  name: string;
  desc: string;
  img: string;
  imgAlt: string;
  fullSupplyPrice?: number;
  supplyLabel: string; // e.g. "28-day supply"
  // "fixed" shows a public price. "onRequest" and "pending" suppress it.
  priceMode?: "fixed" | "onRequest" | "pending";
  flatDosePricing?: boolean;
  prepay?: { total: number; perSupply: number; savings: number };
  dosesPerSupply: number;
  doseLabel: string; // e.g. "weekly dose"
  // Placeholder insurance/savings price shown on brand-name rows until a
  // verified manufacturer or program offer is wired in. Easy to swap later.
  insuranceSavingsPrice?: string; // e.g. "$XX.XX" or a verified figure
  insuranceSavingsSupplyLabel?: string; // defaults to supplyLabel
  insurance?: InsurancePricing;
};


const FEATURED_IDS = ["semaglutide", "wegovy-tablets", "zepbound"];
const CARD_META: Record<string, { format: string; activeIngredient: string }> = {
  semaglutide: { format: "Weekly injection", activeIngredient: "Semaglutide" },
  tirzepatide: { format: "Weekly injection", activeIngredient: "Tirzepatide" },
  foundayo: { format: "Once-daily tablet", activeIngredient: "Orforglipron" },
  "wegovy-tablets": { format: "Once-daily tablet", activeIngredient: "Semaglutide" },
  zepbound: { format: "Weekly injection", activeIngredient: "Tirzepatide" },
  "wegovy-pens": { format: "Weekly injection", activeIngredient: "Semaglutide" },
  ozempic: { format: "Weekly injection", activeIngredient: "Semaglutide" },
  mounjaro: { format: "Weekly injection", activeIngredient: "Tirzepatide" },
};

const PER_DOSE_INFO =
  "Per-dose pricing is calculated by dividing the displayed starting supply price by the number of doses in that supply. Your prescribed dose, treatment, final cost, and product availability may differ.";

const INSURANCE_DISCLAIMER =
  "Insurance coverage and out-of-pocket costs vary by plan, diagnosis, deductible, formulary, prior-authorization requirements, pharmacy, and eligibility for manufacturer savings programs. Displayed savings are not guaranteed. Government-sponsored insurance beneficiaries may not qualify for certain manufacturer offers.";

const INSURANCE_UNAVAILABLE_COMPOUNDED =
  "Not currently available for this compounded option";
const INSURANCE_UNVERIFIED_BRAND =
  "Check insurance coverage and available savings";

const ON_REQUEST_COPY =
  "Brand-name medication pricing depends on prescription, insurance or savings-program eligibility, pharmacy pricing, and availability.";
const PENDING_COPY =
  "Insurance & cash-pay options available — see pricing during intake";
const FLAT_DOSE_COPY = "Flat pricing across available prescribed doses.";
const COMPOUNDED_FDA_QUALIFIER =
  "Compounded medications are not FDA-approved for safety, effectiveness, or quality.";
const PRESCRIPTION_QUALIFIER =
  "Prescription required. A licensed provider determines whether treatment is medically appropriate. Medication and dose are not guaranteed.";
const SUPPLY_PERIOD_QUALIFIER =
  "Prices shown apply to the stated supply period and may vary if the prescribed treatment, pharmacy, or product changes.";

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const detailedCards: DetailedCard[] = [
  {
    id: "wegovy-tablets",
    tags: ["BRAND-NAME", "GLP-1", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Wegovy® Tablets",
    desc: "Wegovy® tablets are a once-daily oral semaglutide treatment FDA-approved, together with a reduced-calorie diet and increased physical activity, for chronic weight management in eligible adults.",
    img: wegovyPillAsset.url,
    imgAlt: "Wegovy tablet",
    supplyLabel: "30-day supply",
    dosesPerSupply: 30,
    doseLabel: "daily dose",
    priceMode: "pending",
  },
  {
    id: "semaglutide",
    tags: ["COMPOUNDED", "GLP-1"],
    tagTone: "tan",
    name: "Semaglutide",
    desc: "A clinician-prescribed GLP-1 treatment option that may support appetite regulation and weight management as part of a medically supervised plan. Individual results vary.",
    img: cnmSemaVialsAsset.url,
    imgAlt: "Compounded semaglutide vials with discreet CNM branding",
    fullSupplyPrice: 149.99,
    supplyLabel: "28-day supply",
    dosesPerSupply: 4,
    doseLabel: "weekly dose",
    priceMode: "fixed",
    flatDosePricing: true,
    prepay: { total: 399, perSupply: 133, savings: 50.97 },
  },
  {
    id: "foundayo",
    tags: ["BRAND-NAME", "GLP-1", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Foundayo™ Tablets",
    desc: "Foundayo™ (orforglipron) is a once-daily oral GLP-1 medication FDA-approved, together with a reduced-calorie diet and increased physical activity, to reduce excess body weight and maintain weight reduction long term in eligible adults.",
    img: foundayoPillAsset.url,
    imgAlt: "Foundayo tablet",
    fullSupplyPrice: 199.99,
    priceMode: "fixed",
    supplyLabel: "30-day supply",
    dosesPerSupply: 30,
    doseLabel: "daily dose",
  },
  {
    id: "tirzepatide",
    tags: ["COMPOUNDED", "GLP-1 + GIP"],
    tagTone: "tan",
    name: "Tirzepatide",
    desc: "A clinician-prescribed treatment option that may support appetite regulation and weight management as part of a medically supervised plan. Individual results vary.",
    img: cnmTirzVialsAsset.url,
    imgAlt: "Compounded tirzepatide vials with discreet CNM branding",
    fullSupplyPrice: 279,
    supplyLabel: "28-day supply",
    dosesPerSupply: 4,
    doseLabel: "weekly dose",
    priceMode: "fixed",
    flatDosePricing: true,
    prepay: { total: 747, perSupply: 249, savings: 90 },
  },
  {
    id: "zepbound",
    tags: ["BRAND-NAME", "GLP-1 + GIP", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Zepbound®",
    desc: "Zepbound® (tirzepatide) is a once-weekly injection FDA-approved, together with a reduced-calorie diet and increased physical activity, for chronic weight management in eligible adults and for moderate-to-severe obstructive sleep apnea in adults with obesity.",
    img: zepboundPenAsset.url,
    imgAlt: "Zepbound injection pen",
    supplyLabel: "28-day supply",
    priceMode: "onRequest",
    dosesPerSupply: 4,
    doseLabel: "weekly dose",
  },
  {
    id: "wegovy-pens",
    tags: ["BRAND-NAME", "GLP-1", "FDA-APPROVED"],
    tagTone: "lavender",
    name: "Wegovy® Pens",
    desc: "Wegovy® is a once-weekly semaglutide injection FDA-approved for chronic weight management in eligible adults. It is also approved to reduce the risk of major cardiovascular events in certain adults with cardiovascular disease and overweight or obesity.",
    img: wegovyPenAsset.url,
    imgAlt: "Wegovy injection pen",
    supplyLabel: "28-day supply",
    priceMode: "onRequest",
    dosesPerSupply: 4,
    doseLabel: "weekly dose",
  },
  {
    id: "ozempic",
    tags: ["BRAND-NAME", "GLP-1"],
    tagTone: "lavender",
    name: "Ozempic®",
    desc: "Ozempic® (semaglutide) is a once-weekly injection FDA-approved for adults with type 2 diabetes. It is not FDA-approved for chronic weight management.",
    img: ozempicPenAsset.url,
    imgAlt: "Ozempic injection pen",
    supplyLabel: "28-day supply",
    priceMode: "onRequest",
    dosesPerSupply: 4,
    doseLabel: "weekly dose",
  },
  {
    id: "mounjaro",
    tags: ["BRAND-NAME", "GLP-1 + GIP"],
    tagTone: "lavender",
    name: "Mounjaro®",
    desc: "Mounjaro® (tirzepatide) is a once-weekly injection FDA-approved for adults with type 2 diabetes. It is not FDA-approved for chronic weight management.",
    img: mounjaroPenAsset.url,
    imgAlt: "Mounjaro injection pen",
    supplyLabel: "28-day supply",
    priceMode: "onRequest",
    dosesPerSupply: 4,
    doseLabel: "weekly dose",
  },
];


function MedicationRow({
  card,
  onInfo,
}: {
  card: DetailedCard;
  onInfo: (card: DetailedCard, trigger: HTMLElement) => void;
}) {
  const meta = CARD_META[card.id];
  const isCompounded = card.tags.includes("COMPOUNDED");
  const badgeClass = isCompounded
    ? "bg-[#D5F3EF] text-[#103942]"
    : "bg-[#F5F5F7] text-[#103942]";
  const isWeekly = card.doseLabel.toLowerCase().includes("week");
  const hasPrice = card.priceMode !== "onRequest" && card.priceMode !== "pending" && typeof card.fullSupplyPrice === "number";
  const perDose = Math.round(((card.fullSupplyPrice ?? 0) / card.dosesPerSupply) * 100) / 100;

  const ins = card.insurance;
  const insuranceVerified =
    !!ins &&
    ins.insurancePricingEnabled === true &&
    !!ins.insuranceHeadline &&
    !!ins.insuranceSupplyLabel &&
    !!ins.termsUrl &&
    !!ins.offerExpiration &&
    !!ins.lastVerifiedDate;

  

  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:gap-5 sm:py-6">
      <div className="flex items-start gap-3 sm:contents">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F7] sm:h-20 sm:w-20">
          <img
            src={card.img}
            alt={card.imgAlt}
            className="max-h-12 w-auto object-contain mix-blend-multiply sm:max-h-16"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1 sm:flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-[15px] font-semibold leading-tight text-[#103942] sm:text-[18px]">
              {card.name}
            </h3>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.1em] sm:px-2 sm:text-[10px] ${badgeClass}`}
            >
              {isCompounded ? "COMPOUNDED" : "BRAND-NAME"}
            </span>
          </div>
          <p className="mt-1 text-[12px] text-[#103942]/70 sm:text-[14px]">
            {meta?.format ?? "Prescription treatment"}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => onInfo(card, e.currentTarget)}
          aria-label={`More information about ${card.name}`}
          aria-haspopup="dialog"
          className="ml-auto grid h-9 w-9 shrink-0 place-items-center self-start rounded-full border border-[#103942]/25 text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103942] sm:order-last sm:ml-1"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="10" x2="12" y2="16" />
            <circle cx="12" cy="7.5" r="0.6" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:w-[280px] sm:shrink-0 sm:text-right">
        {isCompounded ? (
          <>
            {/* Cash pay — highlighted for compounded */}
            <div className="rounded-xl bg-[#F5F5F7] px-3 py-2 sm:px-3 sm:py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
                Cash pay
              </p>
              <p className="mt-1 text-[16px] font-bold leading-tight text-[#103942]">
                {formatUSD(card.fullSupplyPrice ?? 0)}
                <span className="ml-1 text-[12px] font-normal text-[#103942]/70">
                  / {card.supplyLabel}
                </span>
              </p>
            </div>
            <p className="px-1 text-[12px] leading-snug text-[#103942]/70">
              Insurance &amp; savings not currently available.
            </p>
          </>
        ) : (
          <>
            {/* Insurance & savings — highlighted for brand-name */}
            <div className="rounded-xl bg-[#F5F5F7] px-3 py-2 sm:px-3 sm:py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
                Eligible insurance &amp; savings
              </p>
              {insuranceVerified && ins ? (
                <p className="mt-1 text-[16px] font-bold leading-tight text-[#103942]">
                  As low as {ins.insuranceHeadline}
                  <span className="ml-1 text-[12px] font-normal text-[#103942]/70">
                    {ins.insuranceSupplyLabel}
                    <span aria-hidden="true">*</span>
                  </span>
                </p>
              ) : (
                <p className="mt-1 text-[16px] font-bold leading-tight text-[#103942]">
                  As low as {card.insuranceSavingsPrice ?? "$XX.XX"}
                  <span className="ml-1 text-[12px] font-normal text-[#103942]/70">
                    per {card.insuranceSavingsSupplyLabel ?? card.supplyLabel}
                    <span aria-hidden="true">*</span>
                  </span>
                </p>
              )}
            </div>
            {/* Cash pay — smaller, underneath */}
            <div className="px-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
                Cash pay
              </p>
              {hasPrice ? (
                <>
                  <p className="mt-0.5 text-[13px] leading-tight text-[#103942]/80">
                    From {formatUSD(card.fullSupplyPrice ?? 0)}
                    <span className="ml-1 text-[11px] text-[#103942]/60">
                      / {card.supplyLabel}
                    </span>
                  </p>
                  {isWeekly && (
                    <p className="mt-0.5 text-[11px] text-[#103942]/55">
                      {formatUSD(perDose)} per {card.doseLabel}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-0.5 text-[13px] leading-tight text-[#103942]/80">
                  {PENDING_COPY}
                </p>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}


function MedicationInfoPanel({
  card,
  onClose,
}: {
  card: DetailedCard | null;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!card) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the panel for keyboard/screen-reader users
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [card, onClose]);



  if (!card) return null;
  const meta = CARD_META[card.id];
  const isCompounded = card.tags.includes("COMPOUNDED");
  const status = isCompounded
    ? "Compounded (not FDA-approved)"
    : "FDA-approved brand-name medication";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-end sm:items-stretch"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.name} information`}
    >
      <button
        type="button"
        aria-label="Close information panel"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div ref={panelRef} className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-full sm:max-h-none sm:w-[440px] sm:rounded-none">
        <div className="flex items-start justify-between gap-4 border-b border-[#103942]/10 px-6 py-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#103942]/60">
              Treatment information
            </p>
            <h3 className="mt-1 text-[22px] font-semibold text-[#103942]">{card.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {card.tags.map((t) => (
                <span
                  key={t}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#103942] ${isCompounded ? "bg-[#D5F3EF]" : "bg-[#F5F5F7]"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close information panel"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#103942]/20 text-[#103942] hover:bg-[#F5F5F7] hover:text-[#103942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103942]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 text-[#103942]">
          <div className="mb-5 flex items-center gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-[#F5F5F7]">
              <img src={card.img} alt={card.imgAlt} className="max-h-16 w-auto object-contain mix-blend-multiply" />
            </div>
            <div className="min-w-0 text-sm">
              <p><span className="text-[#103942]/60">Active ingredient: </span><span className="font-semibold">{meta?.activeIngredient ?? "—"}</span></p>
              <p className="mt-1"><span className="text-[#103942]/60">Format: </span><span className="font-semibold">{meta?.format ?? "—"}</span></p>
              <p className="mt-1"><span className="text-[#103942]/60">Status: </span><span className="font-semibold">{status}</span></p>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">Approved or intended use</p>
            <p className="mt-2 text-[14.5px] leading-relaxed">{card.desc}</p>
          </div>
          <div className="mt-5 rounded-2xl bg-[#F5F5F7] px-4 py-4">
            <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">Starting price</p>
            {typeof card.fullSupplyPrice === "number" && card.priceMode === "fixed" ? (
              <>
                <p className="mt-1 text-[22px] font-bold">
                  {formatUSD(card.fullSupplyPrice)}
                  <span className="ml-1 text-[13px] font-normal text-[#103942]/70">/ {card.supplyLabel}</span>
                </p>
                <p className="mt-1 text-[13px] text-[#103942]/80">
                  {formatUSD(Math.round((card.fullSupplyPrice / card.dosesPerSupply) * 100) / 100)} per {card.doseLabel}
                </p>
                {card.flatDosePricing && (
                  <p className="mt-1 text-[13px] text-[#103942]/80">{FLAT_DOSE_COPY}</p>
                )}
                {card.prepay && (
                  <p className="mt-2 text-[13px] text-[#103942]/80">
                    Or {formatUSD(card.prepay.total)} prepaid for 3 consecutive 28-day supplies (84 days) — equivalent to {formatUSD(card.prepay.perSupply)} per 28-day supply. Save {formatUSD(card.prepay.savings)} compared with purchasing three individual fills.
                  </p>
                )}
                <p className="mt-2 text-[11px] leading-relaxed text-[#103942]/60">{PER_DOSE_INFO}</p>
              </>
            ) : (
              <>
                <p className="mt-1 text-[20px] font-bold">
                  {PENDING_COPY}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-[#103942]/60">{ON_REQUEST_COPY}</p>
              </>
            )}
            <p className="mt-2 text-[11px] leading-relaxed text-[#103942]/60">{PRESCRIPTION_QUALIFIER}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#103942]/60">{SUPPLY_PERIOD_QUALIFIER}</p>
          </div>
          {(() => {
            const ins = card.insurance;
            if (isCompounded) {
              return (
                <div className="mt-4 rounded-2xl border border-[#103942]/15 px-4 py-4">
                  <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">
                    Insurance & savings
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#103942]/80">
                    {INSURANCE_UNAVAILABLE_COMPOUNDED}
                  </p>
                </div>
              );
            }
            if (ins?.insurancePricingEnabled && ins.savingsProgramType !== "coverage-check" && ins.insuranceHeadline && ins.insuranceSupplyLabel && ins.termsUrl && ins.offerExpiration && ins.lastVerifiedDate) {
              return (
                <div className="mt-4 rounded-2xl border border-[#103942]/15 px-4 py-4">
                  <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">
                    Eligible insurance & savings
                  </p>
                  <p className="mt-1 text-[18px] font-bold text-[#103942]">
                    As low as {ins.insuranceHeadline}
                    <span className="ml-1 text-[13px] font-normal text-[#103942]/70">
                      {ins.insuranceSupplyLabel}
                    </span>
                  </p>
                  {ins.insuranceExplanation && (
                    <p className="mt-2 text-[13px] leading-relaxed text-[#103942]/80">
                      {ins.insuranceExplanation}
                    </p>
                  )}
                  <div className="mt-2 space-y-0.5 text-[11px] text-[#103942]/60">
                    <p>Offer valid through {ins.offerExpiration}.</p>
                    <p>Last verified {ins.lastVerifiedDate}.</p>
                  </div>
                  <a
                    href={ins.termsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-[12px] font-semibold text-[#103942] underline"
                  >
                    Official savings-program terms
                  </a>
                </div>
              );
            }
            return (
              <div className="mt-4 rounded-2xl border border-[#103942]/15 px-4 py-4">
                <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">
                  Eligible insurance & savings
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#103942]/80">
                  {INSURANCE_UNVERIFIED_BRAND}
                </p>
              </div>
            );
          })()}
          {isCompounded && (
            <p className="mt-4 text-[12px] italic leading-relaxed text-[#103942]/70">
              Compounded medications are not FDA-approved for safety, effectiveness, or quality. Availability varies.
            </p>
          )}
          <p className="mt-3 text-[12px] leading-relaxed text-[#103942]/70">
            Individual results vary. Weight loss is not guaranteed. A licensed provider determines whether any treatment is medically appropriate.
          </p>
        </div>
        <div className="border-t border-[#103942]/10 px-6 py-4">
          <Link
            to="/medications/$slug"
            params={{ slug: card.id }}
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full border border-[#103942]/25 px-5 py-3 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942]"
          >
            View full medication details
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroTile({ tile }: { tile: Tile }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-3xl bg-[#F5F5F7]">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={tile.img}
          alt={tile.imgAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-4 px-6 py-6 sm:px-7 sm:py-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#103942]/25 text-[#103942] sm:h-12 sm:w-12">
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
          <h3 className="text-[20px] font-bold leading-tight text-[#103942] sm:text-[22px]">{tile.title}</h3>
          {tile.subtitle && (
            <p className="mt-1 text-[14px] leading-snug text-[#103942]/70 sm:text-[15px]">{tile.subtitle}</p>
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
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {heroTiles.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <a href="/intake" className="block h-full" aria-label={`Start intake form for ${t.title}`}>
                <HeroTile tile={t} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCompare({ card }: { card: DetailedCard }) {
  const [plan, setPlan] = useState<"single" | "prepay">("single");
  if (!card.prepay || typeof card.fullSupplyPrice !== "number") return null;
  const p = card.prepay;
  const base =
    "rounded-2xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103942]";
  const on = "border-[#103942] bg-white";
  const off = "border-[#103942]/20 bg-white/60 hover:border-[#103942]/40";
  return (
    <div className="mt-4">
      <div
        role="radiogroup"
        aria-label={`${card.name} supply options`}
        className="grid gap-2 sm:grid-cols-2"
      >
        <button
          type="button"
          role="radio"
          aria-checked={plan === "single"}
          onClick={() => setPlan("single")}
          className={`${base} ${plan === "single" ? on : off}`}
        >
          <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
            Individual fill
          </span>
          <span className="mt-1 block text-[20px] font-bold leading-none text-[#103942]">
            {formatUSD(card.fullSupplyPrice)}
          </span>
          <span className="mt-1 block text-[12px] text-[#103942]/70">/ 28-day supply</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={plan === "prepay"}
          onClick={() => setPlan("prepay")}
          className={`${base} ${plan === "prepay" ? on : off}`}
        >
          <span className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
              3-fill prepay
            </span>
            <span className="rounded-full bg-[#D5F3EF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#103942]">
              Best value
            </span>
          </span>
          <span className="mt-1 block text-[20px] font-bold leading-none text-[#103942]">
            {formatUSD(p.total)}
          </span>
          <span className="mt-1 block text-[12px] text-[#103942]/70">
            prepaid for 3 consecutive 28-day supplies (84 days)
          </span>
          <span className="mt-1 block text-[12px] text-[#103942]/70">
            Equivalent to {formatUSD(p.perSupply)} per 28-day supply.
          </span>
          <span className="mt-0.5 block text-[12px] font-semibold text-[#103942]">
            Save {formatUSD(p.savings)} compared with purchasing three individual fills.
          </span>
        </button>
      </div>
    </div>
  );
}

const MOBILE_SUMMARY: Record<string, string> = {
  semaglutide: "Clinician-prescribed GLP-1 care for eligible patients.",
  tirzepatide: "Clinician-prescribed GLP-1 + GIP care for eligible patients.",
};

function DetailedProductCard({
  card,
  onInfo,
}: {
  card: DetailedCard;
  onInfo?: (card: DetailedCard, trigger: HTMLElement) => void;
}) {
  const isCompounded = card.tags.includes("COMPOUNDED");
  const tagClass = isCompounded
    ? "bg-[#D5F3EF] text-[#103942]"
    : "bg-[#F5F5F7] text-[#103942]";
  const summary =
    MOBILE_SUMMARY[card.id] ?? "Clinician-prescribed treatment for eligible patients.";

  return (
    <article className="h-full rounded-3xl bg-[#F5F5F7] p-[18px] sm:p-8">
      {/* Mobile-only layout (< 640px) */}
      <div className="flex flex-col sm:hidden">
        <div className="flex flex-wrap gap-2">
          {card.tags.map((t) => (
            <span
              key={t}
              className={`rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#103942] ${isCompounded ? "bg-[#D5F3EF]" : ""}`}
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="mt-2.5 text-[26px] font-bold leading-tight text-[#103942]">{card.name}</h3>

        <div className="mt-3 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
          <img
            src={card.img}
            alt={card.imgAlt}
            loading="lazy"
            className="block h-full w-auto max-w-full object-contain"
          />
        </div>

        <div className="mt-3">
          {card.priceMode === "fixed" && typeof card.fullSupplyPrice === "number" ? (
            <>
              <p className="text-[14px] text-[#103942]/80">Starting at</p>
              <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                <span className="text-[32px] font-bold leading-none tracking-tight text-[#103942]">
                  {formatUSD(card.fullSupplyPrice)}
                </span>
                <span className="text-[14px] text-[#103942]/80">/ {card.supplyLabel}</span>
              </p>
              {card.flatDosePricing && (
                <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#103942]">
                  {FLAT_DOSE_COPY}
                </span>
              )}
            </>
          ) : (
            <>
              <p className="text-[20px] font-bold leading-tight text-[#103942]">
                {PENDING_COPY}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-[#103942]/70">{ON_REQUEST_COPY}</p>
            </>
          )}
        </div>

        <PlanCompare card={card} />

        <p className="mt-2.5 text-[15px] leading-snug text-[#103942]/75">{summary}</p>

        <div className="mt-4 flex flex-col gap-2.5">

          <button
            type="button"
            onClick={() => window.location.assign("/intake")}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#103942] px-6 py-3.5 text-sm font-semibold text-white transition active:bg-[#42D1C3] active:text-[#103942]"
          >
            See if I qualify — free
          </button>
          <button
            type="button"
            onClick={(e) => onInfo?.(card, e.currentTarget)}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#103942]/25 bg-white px-6 py-3.5 text-sm font-semibold text-[#103942] transition active:bg-[#F5F5F7]"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
            Details
          </button>
        </div>

        {isCompounded && (
          <p className="mt-3 text-[12px] italic leading-relaxed text-[#103942]/65">
            Compounded medications are not FDA-approved.
          </p>

        )}
      </div>

      {/* Tablet + desktop layout (unchanged) */}
      <div className="hidden gap-6 sm:flex sm:flex-col lg:flex-row lg:items-center lg:gap-10">
        <img
          src={card.img}
          alt={card.imgAlt}
          loading="lazy"
          className="h-28 w-28 shrink-0 self-start rounded-xl object-cover sm:h-32 sm:w-32 lg:order-2 lg:h-40 lg:w-40 lg:self-center"
        />

        <div className="flex min-w-0 flex-1 flex-col lg:order-1">
          <div className="flex flex-wrap gap-2">
            {card.tags.map((t) => (
              <span
                key={t}
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${tagClass}`}
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="mt-4 text-[26px] font-bold leading-tight text-[#103942] sm:text-[30px]">
            {card.name}
          </h3>

          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#103942]/75 sm:text-base">
            {card.desc}
          </p>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              {card.priceMode === "fixed" && typeof card.fullSupplyPrice === "number" ? (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[15px] text-[#103942]/80">Starting at</span>
                    <span className="text-[32px] font-bold leading-none tracking-tight text-[#103942] sm:text-[38px]">
                      {formatUSD(card.fullSupplyPrice)}
                    </span>
                    <span className="text-[15px] text-[#103942]/80">/ {card.supplyLabel}</span>
                  </div>
                  {card.flatDosePricing && (
                    <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#103942]">
                      {FLAT_DOSE_COPY}
                    </span>
                  )}
                  <PlanCompare card={card} />
                </>
              ) : (
                <>
                  <div className="text-[24px] font-bold leading-tight text-[#103942] sm:text-[28px]">
                    {PENDING_COPY}
                  </div>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#103942]/70">
                    {ON_REQUEST_COPY}
                  </p>
                </>
              )}

              {isCompounded && (
                <p className="mt-3 max-w-md text-[12px] italic leading-relaxed text-[#103942]/65">
                  {COMPOUNDED_FDA_QUALIFIER}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <button
                type="button"
                onClick={() => window.location.assign("/intake")}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#103942] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942] lg:flex-none"
              >
                See if I qualify — free
              </button>
              <Link
                to="/medications/$slug"
                params={{ slug: card.id }}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942] lg:flex-none"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}



function MedicationOptions() {
  const [expanded, setExpanded] = useState(false);
  const [infoCard, setInfoCard] = useState<DetailedCard | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openInfo = (card: DetailedCard, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setInfoCard(card);
  };
  const closeInfo = () => {
    setInfoCard(null);
    window.setTimeout(() => triggerRef.current?.focus?.(), 0);
  };

  const byId = Object.fromEntries(detailedCards.map((c) => [c.id, c]));
  const featured = FEATURED_IDS.map((id) => byId[id]).filter(Boolean) as DetailedCard[];
  const remaining = detailedCards.filter((c) => !FEATURED_IDS.includes(c.id));

  return (
    <section id="medications" className="bg-white px-4 pt-12 md:pt-16 pb-16 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col">
        <Reveal className="mb-6 text-center">
          <h2 className="font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            Plans start at $149.99 / 28-day supply.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#103942]/70 sm:text-lg">
            Your licensed provider will determine which available treatment option may be medically appropriate for you.
          </p>
        </Reveal>

        <div id="pricing" className="mt-2">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#103942]/60">
            Featured treatment options
          </p>
          <div className="grid grid-cols-1 gap-6 sm:gap-5">
            {featured.map((c, i) => (
              <Reveal key={c.id} delay={i * 80} className="h-full">
                <DetailedProductCard card={c} onInfo={openInfo} />
              </Reveal>
            ))}
            {expanded &&
              remaining.map((c, i) => (
                <Reveal key={c.id} delay={i * 60} className="h-full">
                  <DetailedProductCard card={c} onInfo={openInfo} />
                </Reveal>
              ))}
          </div>
        </div>


        <div className="mt-4 space-y-1.5 text-[11px] leading-relaxed text-[#103942]/70">
          <p>{COMPOUNDED_FDA_QUALIFIER}</p>
          <p>{PRESCRIPTION_QUALIFIER}</p>
          <p>{SUPPLY_PERIOD_QUALIFIER}</p>
          <p>
            <span aria-hidden="true">*</span>
            {INSURANCE_DISCLAIMER}
          </p>
        </div>

        {remaining.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-[#103942]/25 bg-white px-5 py-2.5 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942]"
              aria-expanded={expanded}
            >
              {expanded ? "Show fewer treatment options" : "Show more treatment options"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <button
            type="button"
            onClick={() => window.location.assign("/intake")}
            className="inline-flex items-center justify-center rounded-full bg-[#103942] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
          >
            See which treatment may be right for me
          </button>
          <p className="text-[12px] text-[#103942]/60">
            Educational information only. This list is not a product selector — a licensed provider decides what may be appropriate.
          </p>
        </div>
      </div>

      <MedicationInfoPanel card={infoCard} onClose={closeInfo} />
    </section>
  );
}


function TrustMarquee() {
  const items = (
    <>
      {marqueeItems.map((t) => (
        <li key={t} className="flex shrink-0 items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em] sm:text-sm">{t}</span>
        </li>
      ))}
    </>
  );

  return (
    <section className="overflow-hidden bg-[#103942] py-5 text-white">
      <ul className="marquee-track" aria-label="Trust bar">
        {items}
        {items}
      </ul>
    </section>
  );
}

function SwitchingCare() {
  return (
    <section id="switching" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-3xl border border-[#103942]/8 bg-[#F5F5F7] p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 md:p-12 lg:p-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
              ALREADY TAKING A GLP-1?
            </div>
            <h2 className="mt-4 font-serif text-[34px] leading-[1.05] tracking-tight text-[#103942] md:text-[44px] lg:text-[52px]">
              Switching your care can be simple.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[#103942]/85 md:text-[17px]">
              Already taking semaglutide or tirzepatide through another provider? Complete a brief online intake and share your current medication, dose, and treatment history. A licensed provider will review whether continuing your treatment—and at what dose—is medically appropriate.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-start">
            <p className="text-[15px] leading-relaxed text-[#103942]/80 md:text-[16px]">
              If prescribed, medication is dispensed by a licensed U.S. pharmacy and delivered discreetly to your door where available.
            </p>
            <a
              href="/intake"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#103942] bg-white px-6 py-3.5 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942]"
            >
              Switch and keep my momentum →
            </a>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-[#103942]/60">
              Continuation of treatment and dosing are determined by the licensed provider based on your medical history and current treatment.
            </p>
          </div>
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
    "flex-1 rounded-full px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition sm:px-4 sm:py-2.5 sm:text-[12px] sm:tracking-[0.14em]";
  const tabOn = "bg-white text-[#103942]";
  const tabOff = "bg-transparent text-white/75 hover:text-white";

  return (
    <section className="bg-[#F5F5F7] px-4 pb-14 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[#103942] p-5 text-white shadow-sm sm:p-8 md:p-14">
        <h2 className="font-serif text-[24px] leading-[1.12] tracking-tight sm:text-[36px] md:text-[52px]">
          What could {potentialLoss} fewer pounds change for you?
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-white/80 sm:mt-5 sm:text-[15px] md:text-base">
          More confidence in your clothes. More energy for the people and moments that matter.
        </p>

        <div className="mt-4 sm:mt-8" role="tablist" aria-label="Trial average">
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

        <div className="mt-5 text-center sm:mt-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-[11px]">
            Your current weight (lbs):
          </div>
          <div className="mt-1.5 font-serif text-[44px] leading-none sm:mt-3 sm:text-[72px] md:text-[96px]">
            {weight}
          </div>
        </div>

        <div className="mt-4 sm:mt-8">
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

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-12 sm:flex sm:flex-col sm:justify-center sm:gap-8 md:flex-row md:gap-10">
          <div className="text-center md:min-w-[140px]">
            <div className="text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-white/85 sm:text-[11px] sm:tracking-[0.18em]">
              Your starting point
            </div>
            <div className="mt-1 font-serif text-[30px] leading-none sm:mt-2 sm:text-[48px] md:text-[64px]">
              {weight} <span className="text-[15px] sm:text-[24px] md:text-[28px]">lbs</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 sm:gap-3">
            <svg
              className="hidden h-6 w-14 text-white/60 sm:block md:h-8 md:w-20"
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
            <div className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-center font-button text-[12px] font-extrabold text-[#103942] shadow-md sm:px-5 sm:py-2.5 sm:text-[15px]">
              −{potentialLoss} lbs
            </div>
          </div>

          <div className="text-center md:min-w-[140px]">
            <div className="text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-white/85 sm:text-[11px] sm:tracking-[0.18em]">
              {endingLabel}
            </div>
            <div className="mt-1 font-serif text-[30px] leading-none sm:mt-2 sm:text-[48px] md:text-[64px]">
              {illustrativeWeight} <span className="text-[15px] sm:text-[24px] md:text-[28px]">lbs</span>
            </div>
          </div>
        </div>

        <p className="mt-5 hidden text-center text-[15px] text-white/90 sm:block md:text-base">
          Imagine what carrying {potentialLoss} fewer pounds could mean for your confidence, energy, and everyday movement.
        </p>

        <div className="mt-5 text-center sm:mt-8">
          <a
            href="/intake"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#42D1C3] px-6 py-3 text-[15px] font-semibold text-[#103942] shadow-sm transition hover:bg-white hover:text-[#103942] sm:w-auto sm:px-8 sm:py-4 sm:text-base md:px-14"
          >
            See what's realistic for me — free
          </a>
          <p className="mt-2 text-[12px] text-white/70 sm:mt-3 sm:text-[13px]">
            Free eligibility check. Takes about 60 seconds.
          </p>
        </div>

        <p className="mx-auto mt-5 max-w-xl text-center text-[11px] leading-relaxed text-white/70 sm:mt-12 sm:text-[13px]">
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
        ["Cost", "$149.99–$279 / 28-day supply, out of pocket. No insurance required."],
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
        ["Cost", "Insurance & cash-pay options available — see pricing during intake. Brand-name medication pricing depends on prescription, insurance or savings-program eligibility, pharmacy pricing, and availability."],
        ["Available formats", "Product-specific oral tablets or pre-filled injection pens."],
        ["Supply", "Subject to manufacturer shortages from time to time."],
      ],
    },
  ];

  return (
    <section className="bg-[#F5F5F7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            Compounded vs Brand-name
          </div>
          <h2 className="mt-5 font-serif text-[40px] leading-[1.05] tracking-tight text-[#103942] md:text-[64px]">
            <em className="italic text-[#103942]">Different treatment options.</em>{" "}
            Different regulatory pathways.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {cards.map((c, idx) => (
            <Reveal
              key={c.tag}
              delay={idx * 120}
              className="rounded-3xl bg-[#F5F5F7] p-7 md:p-10"
            >
              <div className="flex justify-center">
                <span className="inline-block rounded-md bg-[#103942] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  {c.tag}
                </span>
              </div>
              <h3 className="mt-7 font-serif text-[32px] leading-tight text-[#103942] md:text-[40px]">
                {c.title}
              </h3>
              <p className="mt-4 text-[16px] font-medium text-[#103942]">{c.meds}</p>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#103942]/85 md:text-[16px]">
                {c.rows.map(([label, body]) => (
                  <li key={label} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#103942]" />
                    <span>
                      <strong className="font-semibold text-[#103942]">{label}:</strong> {body}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center md:mt-14">
          <p className="font-semibold text-[#103942]">
            A licensed provider will determine whether a compounded or FDA-approved treatment option may be medically appropriate based on your individual needs and product availability.
          </p>
          <p className="mt-3 text-sm text-[#103942]/70">
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
      title: "Appetite you're not fighting all day.",
      body: "GLP-1 treatment targets hunger signaling, so the 3pm vending machine run and the late-night grazing get easier to skip.",
    },
    {
      title: "Handled privately, start to finish.",
      body: "Intake, provider review, and refills happen online. Medication arrives in plain packaging with no branding on the box.",
    },
    {
      title: "Fits a real work week.",
      body: "Do the intake at 6am or 11pm, dose once a week, and message your provider between refills instead of taking time off for appointments.",
    },
    {
      title: "Consistency, not another crash diet.",
      body: "A licensed provider titrates your dose, tracks how you're tolerating it, and adjusts — so you can keep training and keep going.",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            WHY MEN CHOOSE CHUBBYNOMORE
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            Straightforward care, without the usual friction.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#103942]/70 sm:text-lg">
            Chubby No More is designed for men who want direct answers, private care, transparent pricing, and a medically supervised plan that fits into real life.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 100}
              className="flex flex-col rounded-2xl bg-[#F5F5F7] p-7 md:p-8"
            >
              <h3 className="font-serif text-xl text-[#103942] md:text-2xl">
                {b.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#103942]/75">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-12 text-center md:mt-14">
          <PillButton href="/intake">See if I qualify — free</PillButton>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {

  return (
    <section id="how" className="bg-[#F5F5F7] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal as="h2" className="text-center font-serif text-4xl leading-tight text-[#103942] md:text-5xl">
          How it works in <em className="italic">3 steps.</em>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, idx) => (
            <Reveal key={s.n} delay={idx * 150} className="card-lift rounded-2xl p-2 -m-2">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white">
                <img src={s.img} alt={s.imgAlt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#103942]/70">Step {s.n}</div>
              <h3 className="mt-2 font-serif text-2xl text-[#103942]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#103942]/70">{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <PillButton href="/intake">See if I qualify — free</PillButton>
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
          <h2 className="font-serif text-4xl leading-[1.1] text-[#103942] md:text-5xl">
            Frequently asked <em className="italic">questions.</em>
          </h2>
        </Reveal>
        <div>
          <div className="divide-y divide-[#103942]/12 border-y border-[#103942]/12">
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
                    className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#103942] focus-visible:ring-offset-2"
                  >
                    <span className="font-serif text-lg text-[#103942] md:text-xl">{f.q}</span>
                    <ChevronDown
                      aria-hidden
                      className={`h-5 w-5 shrink-0 text-[#103942] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                      <p className="max-w-2xl text-sm leading-relaxed text-[#103942]/70 md:text-base">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[#103942]/70 md:text-sm">
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
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#103942]/60">
            Trusted care
          </div>
          <h2
            id="trusted-care-heading"
            className="mt-4 font-serif text-4xl leading-[1.1] text-[#103942] md:text-5xl"
          >
            Trusted care, built around real medical review
          </h2>
        </div>

        {/* Provider area */}
        <div className="mt-14 rounded-2xl border border-[#103942]/10 bg-[#F5F5F7] p-8 md:p-12">
          <h3 className="font-serif text-2xl text-[#103942] md:text-3xl">
            Care reviewed by licensed medical professionals
          </h3>

          {providerConfig.verified ? (
            <div className="mt-8 grid gap-8 md:grid-cols-[180px_1fr] md:items-start">
              <div className="h-40 w-40 overflow-hidden rounded-full bg-white ring-1 ring-[#103942]/10 md:h-44 md:w-44">
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
                  <div className="font-serif text-xl text-[#103942]">{providerConfig.name}</div>
                )}
                {providerConfig.title && (
                  <div className="mt-1 text-sm text-[#103942]/70">{providerConfig.title}</div>
                )}
                {providerConfig.credential && (
                  <div className="mt-1 text-sm text-[#103942]/70">{providerConfig.credential}</div>
                )}
                {providerConfig.license && (
                  <div className="mt-1 text-sm text-[#103942]/70">{providerConfig.license}</div>
                )}
                {providerConfig.bio && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#103942]/80">
                    {providerConfig.bio}
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Testimonial area — only rendered when enabled */}
        {testimonialsEnabled && testimonialConfig.length > 0 && (
          <div className="mt-12">
            <h3 className="font-serif text-2xl text-[#103942] md:text-3xl">
              What patients are saying
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonialConfig.slice(0, 3).map((t, i) => (
                <figure
                  key={i}
                  className="flex h-full flex-col rounded-2xl border border-[#103942]/10 bg-white p-6 shadow-sm"
                >
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={`Portrait of ${t.firstName} ${t.lastInitial}.`}
                      className="mb-4 h-14 w-14 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <blockquote className="text-sm leading-relaxed text-[#103942]/85">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-[#103942]">
                    {t.firstName} {t.lastInitial}.
                  </figcaption>
                  <div className="mt-2 space-y-1 text-xs text-[#103942]/60">
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
          <div className="mt-12 grid gap-6 rounded-2xl bg-[#103942] p-8 text-white sm:grid-cols-2 md:grid-cols-3 md:p-10">
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
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#103942]/60">
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
    <section id="start" className="w-full bg-[#F5F5F7] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2 md:gap-14 lg:gap-20">
        <div className="overflow-hidden rounded-[1.75rem] bg-[#103942] shadow-[0_30px_60px_-40px_rgba(16,57,66,0.55)]">
          <img
            src={dinnerCoupleAsset.url}
            alt="Couple enjoying a candlelit dinner at an upscale restaurant"
            className="aspect-[4/3] h-full w-full object-cover object-center md:aspect-[5/6] lg:aspect-[4/5]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-3xl leading-[1.12] text-[#103942] sm:text-4xl lg:text-[46px]">
            Ready to see if GLP-1 is right for you? <em className="italic">ChubbyNoMore is with you every step.</em>
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-[#103942]">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-[#103942]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <PillButton href="/intake">See if I qualify — free</PillButton>
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
    <footer className="bg-[#F5F5F7] text-[#103942]">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={cnmLogoFullAsset.url} alt="Chubby No More" className="h-24 w-auto shrink-0 md:h-28" />
            </div>

            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#103942]/70 md:text-lg">
              Online prescription weight-management care with clinician review and home delivery, where available.
            </p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-[#103942]/65">Program</div>
            <ul className="mt-4 space-y-3 text-base md:text-lg">
              {programLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#103942] transition hover:text-[#42D1C3]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-[#103942]/65">Legal</div>
            <ul className="mt-4 space-y-3 text-base md:text-lg">
              {LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[#103942] transition hover:text-[#42D1C3]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#103942]/10 pt-8 text-sm text-[#103942]/65 md:flex-row">
          <span>© 2026 Chubby No More Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}


/* ───────────── Query-driven SEO sections ───────────── */

function WhoQualifies() {
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            Eligibility
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#103942] md:text-[52px]">
            Who may qualify for prescription weight loss treatment?
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#103942]/85 md:text-[17px]">
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
            href="/intake"
            className="inline-flex rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#42D1C3] hover:text-[#103942]"
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
    <section className="bg-[#F5F5F7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]/70">
            Safety first
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#103942] md:text-[48px]">
            Important safety considerations
          </h2>
          <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-[#103942]/90 md:text-[17px]">
            Prescription GLP-1 and GIP/GLP-1 medications are not appropriate for everyone. Safety and eligibility depend on the specific medication, your medical history, current medications, and other clinical factors. Tell your licensed provider if any of the following apply to you:
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 md:mt-10">
          <ul className="divide-y divide-[#103942]/10">
            {items.map((item) => (
              <li key={item} className="flex gap-4 py-5 md:py-6">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#42D1C3]" />
                <span className="text-[15px] leading-relaxed text-[#103942] md:text-[16px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180} className="mt-10 border-t border-[#103942]/10 pt-6 md:mt-12 md:pt-8">
          <p className="max-w-4xl text-[15px] leading-relaxed text-[#103942]/80 md:text-[16px]">
            This is not a complete list of risks, warnings, or reasons a medication may be inappropriate. Complete the private online intake so a licensed provider can review your health history and determine whether an available treatment option may be medically appropriate. Do not start, stop, or change a prescription medication without guidance from a qualified healthcare professional.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
