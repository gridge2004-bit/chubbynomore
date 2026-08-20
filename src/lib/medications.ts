import cnmSemaVialsAsset from "@/assets/cnm-sema-vials.jpg.asset.json";
import cnmTirzVialsAsset from "@/assets/cnm-tirz-vials.jpg.asset.json";

export type Medication = {
  slug: string;
  name: string;
  category: "Compounded";
  drugClass: string;
  form: string;
  frequency: string;
  price: string;
  period: string;
  img: string;
  imgAlt: string;
  summary: string;
  candidateProfile: string[];
  notFor: string[];
  dosage: { label: string; detail: string }[];
  sideEffects: { common: string[]; serious: string[] };
  monitoring: string[];
  faqs: { q: string; a: string }[];
};

export const medications: Medication[] = [
  {
    slug: "semaglutide",
    name: "Compounded Semaglutide",
    category: "Compounded",
    drugClass: "GLP-1 receptor agonist",
    form: "Vial + syringe (subcutaneous injection)",
    frequency: "Once weekly",
    price: "$149.99",
    period: " / 28-day supply",
    img: cnmSemaVialsAsset.url,
    imgAlt: "Compounded semaglutide vials with discreet CNM branding",
    summary:
      "Semaglutide mimics the GLP-1 hormone your body already makes, slowing digestion and reducing appetite so it's easier to stay in a calorie deficit. Compounded versions contain the same active ingredient as Ozempic® and Wegovy® and are prepared by licensed US pharmacies.",
    candidateProfile: [
      "Adults 18+ with a BMI of 30+, or 27+ with a weight-related condition (type 2 diabetes, hypertension, high cholesterol, sleep apnea).",
      "Ready to pair the medication with sustainable diet and activity changes.",
      "No history of medullary thyroid carcinoma or MEN 2.",
    ],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Currently pregnant, trying to conceive, or breastfeeding.",
      "History of pancreatitis, severe gastroparesis, or active gallbladder disease.",
      "Type 1 diabetes or diabetic ketoacidosis.",
    ],
    dosage: [
      { label: "Weeks 1–4", detail: "0.25 mg once weekly (starter dose to reduce GI side effects)." },
      { label: "Weeks 5–8", detail: "0.5 mg once weekly." },
      { label: "Weeks 9+", detail: "Titrated up to 1.0–2.4 mg based on tolerance and response." },
    ],
    sideEffects: {
      common: ["Nausea", "Constipation or diarrhea", "Fatigue", "Injection-site tenderness", "Reduced appetite"],
      serious: [
        "Pancreatitis (severe, persistent abdominal pain)",
        "Gallbladder problems",
        "Kidney injury from dehydration",
        "Low blood sugar (mainly if combined with insulin or sulfonylureas)",
      ],
    },
    monitoring: [
      "Physician check-in at weeks 4, 12, and quarterly thereafter.",
      "Weight, blood pressure, and side-effect review at each visit.",
      "Labs (A1c, lipid panel) reviewed if you have metabolic conditions.",
    ],
    faqs: [
      {
        q: "How is compounded semaglutide different from Ozempic or Wegovy?",
        a: "Same active ingredient (semaglutide) but prepared by a licensed US compounding pharmacy rather than manufactured by Novo Nordisk. Compounded medications are not FDA-approved for safety, efficacy, or quality.",
      },
      {
        q: "How much weight can I expect to lose?",
        a: "In the STEP-1 trial, adults on semaglutide 2.4 mg lost roughly 15% of body weight over 68 weeks alongside lifestyle changes. Individual results vary.",
      },
      { q: "Can I stop the medication once I hit my goal?", a: "Your physician will discuss a maintenance or taper plan. Many patients regain weight after stopping, so long-term planning matters." },
    ],
  },
  {
    slug: "tirzepatide",
    name: "Compounded Tirzepatide",
    category: "Compounded",
    drugClass: "Dual GLP-1 / GIP receptor agonist",
    form: "Vial + syringe (subcutaneous injection)",
    frequency: "Once weekly",
    price: "$279",
    period: " / 28-day supply",
    img: cnmTirzVialsAsset.url,
    imgAlt: "Compounded tirzepatide vials with discreet CNM branding",
    summary:
      "Tirzepatide activates both GLP-1 and GIP receptors, producing greater average weight loss than GLP-1 alone in clinical trials. Compounded versions contain the same active ingredient as Mounjaro® and Zepbound®.",
    candidateProfile: [
      "Adults 18+ with a BMI of 30+, or 27+ with a weight-related condition.",
      "Have tried GLP-1 mono-therapy or want the highest average efficacy option.",
      "No contraindications to GLP-1/GIP therapy.",
    ],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Currently pregnant, trying to conceive, or breastfeeding.",
      "History of pancreatitis or severe GI motility disorders.",
      "Type 1 diabetes.",
    ],
    dosage: [
      { label: "Weeks 1–4", detail: "2.5 mg once weekly." },
      { label: "Weeks 5–8", detail: "5 mg once weekly." },
      { label: "Weeks 9+", detail: "Titrated up to 7.5–15 mg based on tolerance and goals." },
    ],
    sideEffects: {
      common: ["Nausea", "Diarrhea or constipation", "Decreased appetite", "Vomiting", "Injection-site reactions"],
      serious: ["Pancreatitis", "Gallbladder disease", "Acute kidney injury", "Severe GI reactions"],
    },
    monitoring: [
      "Physician check-in at weeks 4, 12, and quarterly.",
      "Weight, blood pressure, side-effect and hydration review at each visit.",
      "Metabolic labs reviewed as clinically indicated.",
    ],
    faqs: [
      { q: "Is tirzepatide more effective than semaglutide?", a: "In head-to-head trials (SURMOUNT-1 vs STEP-1), tirzepatide 15 mg produced roughly 20–22% average body weight loss vs ~15% for semaglutide 2.4 mg. Individual results vary." },
      { q: "Why is tirzepatide priced higher?", a: "It's a newer, more complex molecule and dual-target formulation." },
    ],
  },
];

export const getMedication = (slug: string): Medication | undefined =>
  medications.find((m) => m.slug === slug);
