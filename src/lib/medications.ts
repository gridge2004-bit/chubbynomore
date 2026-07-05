import semaglutideImg from "@/assets/compounded-weightloss.jpg";
import foundayoPillAsset from "@/assets/foundayo-pill.png.asset.json";
import wegovyPillAsset from "@/assets/wegovy-pill.png.asset.json";
import zepboundPenAsset from "@/assets/zepbound-pen.png.asset.json";
import wegovyPenAsset from "@/assets/wegovy-pen.png.asset.json";
import ozempicPenAsset from "@/assets/ozempic-pen.png.asset.json";
import mounjaroPenAsset from "@/assets/mounjaro-pen.png.asset.json";

export type Medication = {
  slug: string;
  name: string;
  category: "Compounded" | "Brand-name";
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
    period: "/28-day supply",
    img: semaglutideImg,
    imgAlt: "Compounded semaglutide vial",
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
    price: "$249.99",
    period: "/28-day supply",
    img: semaglutideImg,
    imgAlt: "Compounded tirzepatide vial",
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
  {
    slug: "foundayo",
    name: "Foundayo™ Tablets",
    category: "Brand-name",
    drugClass: "GLP-1 receptor agonist (orforglipron)",
    form: "Oral tablet",
    frequency: "Once daily",
    price: "$199.99",
    period: "/mo",
    img: foundayoPillAsset.url,
    imgAlt: "Foundayo tablet",
    summary:
      "Foundayo™ (orforglipron) is the only GLP-1 pill for weight loss that can be taken any time of day, with or without food or water restrictions. FDA-approved for chronic weight management in adults with obesity or overweight with a weight-related condition.",
    candidateProfile: [
      "Adults 18+ who prefer an oral option over injections.",
      "BMI 30+, or 27+ with a weight-related condition.",
      "Able to take a daily medication consistently.",
    ],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "Prior serious hypersensitivity to GLP-1 agonists.",
    ],
    dosage: [
      { label: "Starter", detail: "Low starting dose, taken once daily." },
      { label: "Titration", detail: "Escalated monthly per physician guidance to target dose." },
    ],
    sideEffects: {
      common: ["Nausea", "Diarrhea", "Constipation", "Decreased appetite"],
      serious: ["Pancreatitis", "Gallbladder problems", "Kidney injury"],
    },
    monitoring: ["Monthly physician review during titration.", "Quarterly follow-up once at maintenance dose."],
    faqs: [
      { q: "Is Foundayo as effective as injections?", a: "Trials show meaningful weight loss with orforglipron, but average results are typically lower than tirzepatide injections. Your physician can help you weigh trade-offs." },
    ],
  },
  {
    slug: "wegovy-tablets",
    name: "Wegovy® Tablets",
    category: "Brand-name",
    drugClass: "GLP-1 receptor agonist (oral semaglutide)",
    form: "Oral tablet",
    frequency: "Once daily",
    price: "$249.99",
    period: "/mo",
    img: wegovyPillAsset.url,
    imgAlt: "Wegovy tablet",
    summary:
      "The first and only FDA-approved semaglutide pill for weight loss in adults with obesity or overweight with a weight-related condition. Same active ingredient as Wegovy® injection in a once-daily oral form.",
    candidateProfile: [
      "Adults 18+ who prefer a pill.",
      "BMI 30+, or 27+ with a weight-related condition.",
      "Can take the tablet on an empty stomach with a small sip of water as directed.",
    ],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "History of pancreatitis.",
    ],
    dosage: [
      { label: "Weeks 1–4", detail: "Starter dose once daily." },
      { label: "Titration", detail: "Escalated per label to target maintenance dose." },
    ],
    sideEffects: {
      common: ["Nausea", "Diarrhea", "Constipation", "Abdominal pain"],
      serious: ["Pancreatitis", "Gallbladder disease", "Kidney injury"],
    },
    monitoring: ["Monthly physician review during titration.", "Quarterly follow-up at maintenance."],
    faqs: [
      { q: "How does the oral form compare to Wegovy injections?", a: "Same active ingredient. Absorption is lower with oral dosing, so total-body exposure and average weight loss can differ." },
    ],
  },
  {
    slug: "zepbound",
    name: "Zepbound®",
    category: "Brand-name",
    drugClass: "Dual GLP-1 / GIP receptor agonist (tirzepatide)",
    form: "Pre-filled injection pen",
    frequency: "Once weekly",
    price: "$449.99",
    period: "/mo",
    img: zepboundPenAsset.url,
    imgAlt: "Zepbound injection pen",
    summary:
      "Zepbound® (tirzepatide) once-weekly injection. FDA-approved for chronic weight management and for moderate-to-severe obstructive sleep apnea in adults with obesity.",
    candidateProfile: [
      "Adults 18+ with BMI 30+, or 27+ with a weight-related condition.",
      "Want the FDA-approved brand version of tirzepatide.",
      "Comfortable with a once-weekly self-injection.",
    ],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "History of pancreatitis or severe GI disorders.",
    ],
    dosage: [
      { label: "Weeks 1–4", detail: "2.5 mg once weekly (non-therapeutic starter dose)." },
      { label: "Weeks 5+", detail: "Escalated in 2.5 mg increments no faster than every 4 weeks, up to 15 mg." },
    ],
    sideEffects: {
      common: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Injection-site reactions"],
      serious: ["Pancreatitis", "Gallbladder disease", "Kidney injury", "Severe hypersensitivity"],
    },
    monitoring: ["Monthly during titration, then quarterly at maintenance.", "Renal, GI, and gallbladder symptom review at each visit."],
    faqs: [
      { q: "Is Zepbound covered by insurance?", a: "Coverage varies by plan and indication. Many plans require prior authorization; Eli Lilly offers a savings card for eligible patients." },
    ],
  },
  {
    slug: "wegovy-pens",
    name: "Wegovy® Pens",
    category: "Brand-name",
    drugClass: "GLP-1 receptor agonist (semaglutide)",
    form: "Pre-filled injection pen",
    frequency: "Once weekly",
    price: "$349.99",
    period: "/mo",
    img: wegovyPenAsset.url,
    imgAlt: "Wegovy injection pen",
    summary:
      "Wegovy® once-weekly injection for chronic weight management in adults with obesity with a weight-related condition, and to reduce the risk of major cardiovascular events.",
    candidateProfile: [
      "Adults 18+ with BMI 30+, or 27+ with a weight-related condition.",
      "Established cardiovascular disease and elevated cardiac risk (per label).",
    ],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "History of pancreatitis.",
    ],
    dosage: [
      { label: "Weeks 1–4", detail: "0.25 mg once weekly." },
      { label: "Titration", detail: "Increased every 4 weeks to a maintenance dose of 2.4 mg." },
    ],
    sideEffects: {
      common: ["Nausea", "Diarrhea", "Vomiting", "Constipation"],
      serious: ["Pancreatitis", "Gallbladder disease", "Kidney injury", "Diabetic retinopathy complications in type 2 diabetes"],
    },
    monitoring: ["Monthly during titration, quarterly at maintenance.", "Cardiovascular symptom review if indicated."],
    faqs: [{ q: "Is Wegovy the same as Ozempic?", a: "Same active ingredient (semaglutide). Wegovy is approved for weight management; Ozempic is approved for type 2 diabetes. Doses and pens differ." }],
  },
  {
    slug: "ozempic",
    name: "Ozempic®",
    category: "Brand-name",
    drugClass: "GLP-1 receptor agonist (semaglutide)",
    form: "Pre-filled injection pen",
    frequency: "Once weekly",
    price: "$349.99",
    period: "/mo",
    img: ozempicPenAsset.url,
    imgAlt: "Ozempic injection pen",
    summary:
      "A once-weekly semaglutide injection FDA-approved for type 2 diabetes. Prescribed off-label for weight management in select patients when clinically appropriate.",
    candidateProfile: [
      "Adults 18+ with type 2 diabetes needing improved glycemic control.",
      "Off-label use for weight requires physician judgement.",
    ],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "Type 1 diabetes.",
    ],
    dosage: [
      { label: "Weeks 1–4", detail: "0.25 mg once weekly." },
      { label: "Titration", detail: "Increased every 4 weeks to 0.5, 1.0, or 2.0 mg based on response." },
    ],
    sideEffects: {
      common: ["Nausea", "Diarrhea", "Vomiting", "Abdominal pain"],
      serious: ["Pancreatitis", "Retinopathy complications", "Kidney injury"],
    },
    monitoring: ["A1c and weight review each visit.", "Hypoglycemia risk assessment when combined with insulin or sulfonylureas."],
    faqs: [{ q: "Can I get Ozempic just for weight loss?", a: "Physicians typically prefer FDA-approved weight-loss options (Wegovy, Zepbound, compounded semaglutide/tirzepatide). Ozempic may be considered off-label case by case." }],
  },
  {
    slug: "mounjaro",
    name: "Mounjaro®",
    category: "Brand-name",
    drugClass: "Dual GLP-1 / GIP receptor agonist (tirzepatide)",
    form: "Pre-filled injection pen",
    frequency: "Once weekly",
    price: "$1,249.99",
    period: "/mo",
    img: mounjaroPenAsset.url,
    imgAlt: "Mounjaro injection pen",
    summary:
      "A once-weekly tirzepatide injection FDA-approved for type 2 diabetes. Activates both GIP and GLP-1 receptors to improve glycemic control and reduce appetite.",
    candidateProfile: ["Adults 18+ with type 2 diabetes needing improved glycemic control."],
    notFor: [
      "Personal or family history of medullary thyroid cancer or MEN 2.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "Type 1 diabetes.",
    ],
    dosage: [
      { label: "Weeks 1–4", detail: "2.5 mg once weekly (starter)." },
      { label: "Titration", detail: "Increased no faster than every 4 weeks up to 15 mg based on response." },
    ],
    sideEffects: {
      common: ["Nausea", "Diarrhea", "Decreased appetite", "Vomiting"],
      serious: ["Pancreatitis", "Gallbladder disease", "Kidney injury", "Severe GI reactions"],
    },
    monitoring: ["A1c, weight, and side effects each visit.", "Hydration and renal function review as indicated."],
    faqs: [{ q: "How is Mounjaro different from Zepbound?", a: "Same active ingredient (tirzepatide) and same manufacturer (Eli Lilly). Mounjaro is approved for type 2 diabetes; Zepbound for chronic weight management." }],
  },
];

export const getMedication = (slug: string): Medication | undefined =>
  medications.find((m) => m.slug === slug);
