// Copy, pricing data and section config for the landing page.
import oralTablets1Img from "@/assets/oral-tablets-1.png";
import oralTablets2Img from "@/assets/oral-tablets-2.png";
import step2Img from "@/assets/step2.jpg";
import ctaImg from "@/assets/cta.jpg";
import cnmSemaVialsAsset from "@/assets/cnm-sema-vials.jpg.asset.json";
import cnmTirzVialsAsset from "@/assets/cnm-tirz-vials.jpg.asset.json";
import cnmBoxAsset from "@/assets/cnm-box.png.asset.json";
import feelLikeYourselfAsset from "@/assets/feel-like-yourself.jpg.asset.json";
import loveWhatYouSeeAsset from "@/assets/love-what-you-see.jpg.asset.json";
import intakeManAsset from "@/assets/intake-man.png.asset.json";
import mensHealthTelehealthAsset from "@/assets/mens-health-telehealth.png.asset.json";
import doctor1Img from "@/assets/doctor-1.jpg";
import doctor2Img from "@/assets/doctor-2.jpg";
import doctor3Img from "@/assets/doctor-3.jpg";

export const navLinks = [
  { label: "How It Works", href: "#how" },
  { label: "Medications", href: "#medications" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const marqueeItems = [
  "Online health intake",
  "Licensed-provider review",
  "Medication dispensed by a licensed US pharmacy",
  "Transparent starting prices",
  "Discreet home delivery",
  "Ongoing clinical support",
];

export const products = [
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
      { label: "GLP-1 (Semaglutide)", price: "$179.99", period: "/ 28-day supply" },
    ],
    img: cnmSemaVialsAsset.url,
  },
];

export const steps = [
  { n: "01", img: intakeManAsset.url, title: "Complete your intake", imgAlt: "Man completing his online health intake on his phone while seated at a desk", desc: "Fill out your health history online in about 60 seconds. No awkward waiting rooms. Your health information is submitted through a private online intake." },
  { n: "02", img: step2Img, title: "Clinical review", imgAlt: "Licensed provider reviewing a patient’s health information", desc: "Our licensed provider reviews your health history, evaluates your eligibility, and determines whether an available treatment option may be medically appropriate for you." },
  { n: "03", img: cnmBoxAsset.url, title: "Receive your medication", imgAlt: "Plain white shipping box with a subtle CNM logo on a kitchen counter", desc: "Your medication is dispensed by a licensed US pharmacy and shipped discreetly to your door — with ongoing support." },
];


export const faqs = [
  { q: "What are the common side effects of GLP-1 medications?", a: "Common side effects may include nausea, diarrhea, vomiting, constipation, and stomach discomfort, particularly when beginning treatment or increasing a dose. Side effects vary by person. Our licensed provider will review the potential risks and help determine an appropriate treatment and titration plan." },
  { q: "How much weight can I expect to lose?", a: "Results vary significantly from person to person, and no specific result is guaranteed. Your provider can discuss what may be realistic based on your medication, starting weight, medical history, lifestyle, and consistency with your treatment plan." },
  { q: "What determines whether I qualify for treatment?", a: "Our licensed provider will review factors including your medical history, current medications, height, weight, BMI, existing health conditions, and treatment goals. Completing the questionnaire does not guarantee approval or a prescription." },
  { q: "Can I eventually stop taking GLP-1 medication?", a: "The appropriate length of treatment differs for each patient. Your provider will help determine whether continuing, adjusting, or stopping treatment is appropriate. Do not stop or change a prescribed medication without medical guidance." },
  { q: "What happens if GLP-1 treatment is not right for me?", a: "A prescription will not be issued if our licensed provider determines that treatment is not medically appropriate. The provider may discuss other possible next steps or recommend that you follow up with your primary-care provider or another specialist." },
  { q: "Can I switch from my current GLP-1 provider?", a: "Yes. If you are currently taking semaglutide, tirzepatide, or another GLP-1 medication, you can complete our online intake and provide information about your current medication, dose, treatment history, and prescribing provider. Our licensed provider will review your information and determine whether continuing treatment, changing medications, or adjusting your dose may be medically appropriate. Continuation of treatment or a particular dose is not guaranteed." },
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
  { q: "How much does the program cost?", a: "ChubbyNoMore is a cash-pay program, and insurance is not required. Plans start at $179.99 / 28-day supply. Your final cost depends on the treatment prescribed and the current price of that treatment." },
  { q: "What does a typical month actually cost, all in?", a: "For compounded plans, the medication price shown covers the 28-day supply, the online provider review, and standard shipping — there is no separate consult fee or delivery charge. Compounded semaglutide starts at $179.99 per 28-day supply and compounded tirzepatide at $279 per 28-day supply. Your final cost depends on what our licensed provider prescribes." },
  { q: "Will a GLP-1 affect my muscle mass or gym performance?", a: "Weight lost on any calorie deficit, including with GLP-1 treatment, can include lean mass as well as fat. Research on strategies to limit lean-mass loss generally points to adequate protein intake and regular resistance training, though individual results vary. Some men also notice lower energy during hard training early on, particularly while appetite and food intake are dropping. Discuss your training goals with your licensed provider so your plan and titration pace can account for them." },
  { q: "Do I have to use needles, or are there oral options?", a: "Both formats exist. Compounded semaglutide and tirzepatide are once-weekly injections using a short, fine needle placed under the skin of the abdomen or thigh — most patients self-administer at home in under a minute. Which format is appropriate depends on your medical history, tolerance, and provider judgment; a specific medication or format is not guaranteed." },
  { q: "How private and discreet is the process?", a: "The intake, provider review, and follow-up messaging all happen online — there is no in-person visit and no waiting room. Medication is shipped in plain packaging with no medication branding on the outside of the box. Your health information is used to evaluate and coordinate your care and is shared only with the providers, pharmacies, and service partners involved in delivering it, as described in the Privacy Policy." },
];

export const NAVY = "#103942";

export type Clinician = {
  name: string;
  credentials: string;
  states: string;
  bio: string;
  img: string;
};

export const clinicians: Clinician[] = [
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

export type Testimonial = {
  name: string;
  age: number;
  location: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
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

export type Tile = {
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

export const tiles: Tile[] = [
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
  
  { id: "cravings", title: "Curb cravings & appetite", img: oralTablets1Img, imgAlt: "Oral weight-loss tablets", variant: "half" },
  { id: "metabolic", title: "Metabolic health", img: oralTablets2Img, imgAlt: "Oral metabolic health tablets", variant: "half" },
  { id: "dosing", title: "Personalized dosing", img: ctaImg, imgAlt: "Personalized dosing care", variant: "row" },
];




// Insurance / manufacturer-savings configuration.
// Never show an insurance price unless verified values and terms have been
// entered here. Leave insurancePricingEnabled=false until a live offer is
// verified with the manufacturer or savings program.

export type InsurancePricing = {
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

export type DetailedCard = {
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


export const FEATURED_IDS = ["semaglutide", "tirzepatide"];
export const CARD_META: Record<string, { format: string; activeIngredient: string }> = {
  semaglutide: { format: "Weekly injection", activeIngredient: "Semaglutide" },
  tirzepatide: { format: "Weekly injection", activeIngredient: "Tirzepatide" },
};

export const PER_DOSE_INFO =
  "Per-dose pricing is calculated by dividing the displayed starting supply price by the number of doses in that supply. Your prescribed dose, treatment, final cost, and product availability may differ.";

export const INSURANCE_DISCLAIMER =
  "Insurance coverage and out-of-pocket costs vary by plan, diagnosis, deductible, formulary, prior-authorization requirements, pharmacy, and eligibility for manufacturer savings programs. Displayed savings are not guaranteed. Government-sponsored insurance beneficiaries may not qualify for certain manufacturer offers.";

export const INSURANCE_UNAVAILABLE_COMPOUNDED =
  "Not currently available for this compounded option";
export const INSURANCE_UNVERIFIED_BRAND =
  "Check insurance coverage and available savings";

export const ON_REQUEST_COPY =
  "Brand-name medication pricing depends on prescription, insurance or savings-program eligibility, pharmacy pricing, and availability.";
export const PENDING_COPY =
  "Insurance & cash-pay options available — see pricing during intake";
export const FLAT_DOSE_COPY = "Flat pricing across available prescribed doses.";
export const COMPOUNDED_FDA_QUALIFIER =
  "Compounded medications are not FDA-approved for safety, effectiveness, or quality.";
export const PRESCRIPTION_QUALIFIER =
  "Prescription required. Our licensed provider determines whether treatment is medically appropriate. Medication and dose are not guaranteed.";
export const SUPPLY_PERIOD_QUALIFIER =
  "Prices shown apply to the stated supply period and may vary if the prescribed treatment, pharmacy, or product changes.";

export function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const detailedCards: DetailedCard[] = [
  {
    id: "semaglutide",
    tags: ["COMPOUNDED", "GLP-1"],
    tagTone: "tan",
    name: "Semaglutide",
    desc: "A clinician-prescribed GLP-1 treatment option that may support appetite regulation and weight management as part of a medically supervised plan. Individual results vary.",
    img: cnmSemaVialsAsset.url,
    imgAlt: "Compounded semaglutide vials with discreet CNM branding",
    fullSupplyPrice: 179.99,
    supplyLabel: "28-day supply",
    dosesPerSupply: 4,
    doseLabel: "weekly dose",
    priceMode: "fixed",
    flatDosePricing: true,
    prepay: { total: 399, perSupply: 133, savings: 50.97 },
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
];

export const MOBILE_SUMMARY: Record<string, string> = {
  semaglutide: "Clinician-prescribed GLP-1 care for eligible patients.",
  tirzepatide: "Clinician-prescribed GLP-1 + GIP care for eligible patients.",
};

// ============================================================
// TrustedCare section
// Configuration-driven. Do NOT display placeholder credentials,
// testimonials, statistics, badges, or ratings unless verified
// data has been supplied and substantiated.
// ============================================================

export type ProviderConfig = {
  verified: boolean;
  name?: string;
  title?: string;
  headshot?: string;
  license?: string; // medical license or states served
  credential?: string; // relevant credential (e.g. specialty)
  bio?: string;
};

export type TestimonialConfig = {
  firstName: string;
  lastInitial: string;
  photo?: string; // only when written permission exists
  text: string;
  compensated: boolean;
  disclaimer?: string;
};

export type StatisticConfig = {
  label: string;
  value?: string; // hidden if not supplied
};

export const providerConfig: ProviderConfig = {
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
export const showTrustedCareSection = false;

// Single toggle. Keep false until real, consented testimonials exist.
export const testimonialsEnabled = false;
export const testimonialConfig: TestimonialConfig[] = [
  // TODO: Add up to three consented testimonials.
];

export const statisticsConfig: StatisticConfig[] = [
  { label: "Patients served" },
  { label: "Average review score" },
  { label: "States available" },
];
