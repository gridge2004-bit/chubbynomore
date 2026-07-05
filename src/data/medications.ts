import semaglutideImg from "@/assets/compounded-weightloss.jpg";
import tirzepatideImg from "@/assets/brand-weightloss.jpg";
import foundayoPillAsset from "@/assets/foundayo-pill.png.asset.json";
import wegovyPillAsset from "@/assets/wegovy-pill.png.asset.json";
import zepboundPenAsset from "@/assets/zepbound-pen.png.asset.json";
import wegovyPenAsset from "@/assets/wegovy-pen.png.asset.json";
import ozempicPenAsset from "@/assets/ozempic-pen.png.asset.json";
import mounjaroPenAsset from "@/assets/mounjaro-pen.png.asset.json";

export type MedicationFAQ = { q: string; a: string };
export type DosageRow = { week: string; dose: string; notes?: string };

export type Medication = {
  slug: string;
  name: string;
  category: "Compounded" | "Brand-name";
  activeIngredient: string;
  drugClass: string; // e.g. "GLP-1 receptor agonist"
  form: string; // e.g. "Once-weekly subcutaneous injection"
  fdaApproved: boolean;
  brandEquivalents?: string[];
  price: string; // display price
  priceUnit: string; // /28-day supply, /mo, etc.
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  candidateProfile: string[]; // who this is for
  notForList: string[]; // who this is not for
  dosage: DosageRow[];
  commonSideEffects: string[];
  seriousSideEffects: string[];
  monitoringPlan: string[];
  pricingNotes: string[];
  faqs: MedicationFAQ[];
};

export const medications: Record<string, Medication> = {
  semaglutide: {
    slug: "semaglutide",
    name: "Compounded Semaglutide",
    category: "Compounded",
    activeIngredient: "Semaglutide",
    drugClass: "GLP-1 receptor agonist",
    form: "Once-weekly subcutaneous injection",
    fdaApproved: false,
    brandEquivalents: ["Wegovy®", "Ozempic®"],
    price: "$149.99",
    priceUnit: "/28-day supply",
    image: semaglutideImg,
    imageAlt: "Compounded semaglutide vial",
    seoTitle: "Compounded Semaglutide — Online prescription & pricing | ChubbyNoMore",
    seoDescription:
      "Compounded semaglutide prescribed online by US-licensed physicians, from $149.99/mo. Same active ingredient as Wegovy® and Ozempic®, shipped discreetly.",
    summary:
      "Semaglutide is a GLP-1 receptor agonist studied for chronic weight management. Our compounded formulation is prepared by a licensed US pharmacy and prescribed online by a board-certified physician after a full health review. Used together with reduced-calorie eating and increased physical activity.",
    candidateProfile: [
      "Adults 18+ with a BMI of 30 or higher, or 27+ with a weight-related condition (type 2 diabetes, high blood pressure, high cholesterol, sleep apnea).",
      "Have tried lifestyle changes and want ongoing physician-managed support.",
      "Comfortable with a once-weekly self-administered injection.",
    ],
    notForList: [
      "Personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
      "History of pancreatitis or severe gastrointestinal disease (e.g., gastroparesis).",
      "Pregnant, planning pregnancy within 2 months, or breastfeeding.",
      "Type 1 diabetes or history of diabetic ketoacidosis.",
      "Under 18 years of age.",
    ],
    dosage: [
      { week: "Weeks 1–4", dose: "0.25 mg once weekly", notes: "Starter dose to reduce GI side effects." },
      { week: "Weeks 5–8", dose: "0.5 mg once weekly" },
      { week: "Weeks 9–12", dose: "1.0 mg once weekly" },
      { week: "Weeks 13–16", dose: "1.7 mg once weekly", notes: "If tolerated." },
      { week: "Week 17+", dose: "Up to 2.4 mg once weekly", notes: "Maintenance dose." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Constipation", "Vomiting", "Abdominal pain", "Fatigue", "Headache"],
    seriousSideEffects: [
      "Pancreatitis (severe, persistent stomach pain)",
      "Gallbladder disease",
      "Kidney injury from dehydration",
      "Serious hypoglycemia (especially with insulin or sulfonylureas)",
      "Allergic reactions",
      "Boxed warning: thyroid C-cell tumors (based on rodent studies)",
    ],
    monitoringPlan: [
      "Weekly progress check-ins for the first month, then monthly.",
      "Provider-reviewed dose titration based on tolerance and response.",
      "Message your physician any time through the secure portal.",
    ],
    pricingNotes: [
      "$149.99 per 28-day supply, billed monthly.",
      "No insurance required. HSA/FSA eligible.",
      "Free discreet shipping. Cancel anytime.",
    ],
    faqs: [
      { q: "How is compounded semaglutide different from Wegovy® or Ozempic®?", a: "It contains the same active ingredient (semaglutide) but is prepared by a licensed US compounding pharmacy rather than manufactured by Novo Nordisk. Compounded medications are not FDA-approved for safety, efficacy, or quality." },
      { q: "How much weight can I expect to lose?", a: "In the STEP-1 trial, adults on semaglutide lost about 15% of body weight on average over 68 weeks. Individual results vary based on adherence, diet, and activity." },
      { q: "How is it shipped?", a: "In a discreet, temperature-controlled package to your door, with syringes and needles included." },
      { q: "What if I miss a dose?", a: "Take it as soon as you remember if it's within 5 days. Otherwise skip it and take your next dose on your regular day. Never double up." },
      { q: "Can I switch to a brand-name option later?", a: "Yes. Your ChubbyNoMore physician can transition you between compounded and brand-name GLP-1 medications as your needs change." },
    ],
  },
  tirzepatide: {
    slug: "tirzepatide",
    name: "Compounded Tirzepatide",
    category: "Compounded",
    activeIngredient: "Tirzepatide",
    drugClass: "Dual GLP-1 and GIP receptor agonist",
    form: "Once-weekly subcutaneous injection",
    fdaApproved: false,
    brandEquivalents: ["Zepbound®", "Mounjaro®"],
    price: "$249.99",
    priceUnit: "/28-day supply",
    image: semaglutideImg,
    imageAlt: "Compounded tirzepatide vial",
    seoTitle: "Compounded Tirzepatide — Online prescription & pricing | ChubbyNoMore",
    seoDescription:
      "Compounded tirzepatide prescribed online by US-licensed physicians, from $249.99/mo. Dual GLP-1/GIP action, same active ingredient as Zepbound® and Mounjaro®.",
    summary:
      "Tirzepatide is a dual GLP-1 and GIP receptor agonist studied for chronic weight management. Our compounded formulation is prepared by a licensed US pharmacy and prescribed online after a full physician review. Used together with reduced-calorie eating and increased physical activity.",
    candidateProfile: [
      "Adults 18+ with BMI ≥ 30, or ≥ 27 with a weight-related condition.",
      "Interested in the dual-hormone mechanism (GLP-1 + GIP) shown to drive greater average weight loss in trials.",
      "Comfortable with a once-weekly self-administered injection.",
    ],
    notForList: [
      "Personal or family history of medullary thyroid carcinoma (MTC) or MEN 2.",
      "History of pancreatitis or severe GI disease.",
      "Pregnant, planning pregnancy within 2 months, or breastfeeding.",
      "Type 1 diabetes.",
      "Under 18 years of age.",
    ],
    dosage: [
      { week: "Weeks 1–4", dose: "2.5 mg once weekly", notes: "Starter dose to build tolerance." },
      { week: "Weeks 5–8", dose: "5 mg once weekly" },
      { week: "Weeks 9–12", dose: "7.5 mg once weekly" },
      { week: "Weeks 13–16", dose: "10 mg once weekly" },
      { week: "Week 17+", dose: "Up to 15 mg once weekly", notes: "Maintenance dose based on response." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Abdominal pain", "Decreased appetite", "Injection-site reaction"],
    seriousSideEffects: [
      "Pancreatitis",
      "Gallbladder disease",
      "Kidney injury from dehydration",
      "Serious hypoglycemia (with insulin/sulfonylureas)",
      "Allergic reactions",
      "Boxed warning: thyroid C-cell tumors (rodent data)",
    ],
    monitoringPlan: [
      "Weekly check-ins for the first month, then monthly.",
      "Physician-managed dose titration on the schedule above.",
      "Ongoing messaging access to your care team.",
    ],
    pricingNotes: [
      "$249.99 per 28-day supply, billed monthly.",
      "HSA/FSA eligible. Free shipping.",
      "Cancel anytime.",
    ],
    faqs: [
      { q: "Is tirzepatide more effective than semaglutide?", a: "In head-to-head trial data (SURMOUNT-1 vs STEP-1), tirzepatide produced greater average weight loss (~20% at the top dose) compared to semaglutide (~15%). Your physician will help decide which is right for you." },
      { q: "How is compounded tirzepatide different from Zepbound® or Mounjaro®?", a: "Same active ingredient, prepared by a licensed US compounding pharmacy instead of Eli Lilly. Compounded medications are not FDA-approved." },
      { q: "How often do I inject?", a: "Once per week, on the same day each week, at any time of day, with or without food." },
      { q: "What if I miss a dose?", a: "If it's been fewer than 4 days, take it as soon as you remember. Otherwise skip and resume your normal schedule." },
    ],
  },
  foundayo: {
    slug: "foundayo",
    name: "Foundayo™ (Orforglipron) Tablets",
    category: "Brand-name",
    activeIngredient: "Orforglipron",
    drugClass: "Oral GLP-1 receptor agonist",
    form: "Once-daily oral tablet",
    fdaApproved: true,
    price: "$199.99",
    priceUnit: "/mo",
    image: foundayoPillAsset.url,
    imageAlt: "Foundayo orforglipron tablet",
    seoTitle: "Foundayo™ (orforglipron) — GLP-1 pill for weight loss | ChubbyNoMore",
    seoDescription:
      "Foundayo™ is the only GLP-1 pill for weight loss you can take any time of day, with or without food. FDA-approved for chronic weight management. From $199.99/mo.",
    summary:
      "Foundayo™ (orforglipron) is the first oral, non-peptide GLP-1 receptor agonist FDA-approved for chronic weight management in adults with obesity, or overweight with a weight-related condition. Unlike other oral GLP-1s, it does not require fasting or water restrictions.",
    candidateProfile: [
      "Adults 18+ with BMI ≥ 30, or ≥ 27 with a weight-related condition.",
      "Prefer a daily pill over a weekly injection.",
      "Want a flexible dosing schedule (any time of day, with or without food).",
    ],
    notForList: [
      "Personal or family history of medullary thyroid carcinoma or MEN 2.",
      "History of pancreatitis.",
      "Pregnant, planning pregnancy soon, or breastfeeding.",
      "Under 18.",
    ],
    dosage: [
      { week: "Weeks 1–4", dose: "3 mg once daily" },
      { week: "Weeks 5–8", dose: "6 mg once daily" },
      { week: "Weeks 9–12", dose: "12 mg once daily" },
      { week: "Week 13+", dose: "Up to 36 mg once daily", notes: "Maintenance dose." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Decreased appetite", "Dyspepsia"],
    seriousSideEffects: [
      "Pancreatitis",
      "Gallbladder problems",
      "Kidney injury",
      "Serious hypoglycemia (with other diabetes meds)",
      "Boxed warning: thyroid C-cell tumors",
    ],
    monitoringPlan: [
      "Physician check-in at each titration step.",
      "Bloodwork as clinically indicated.",
      "Message your care team any time.",
    ],
    pricingNotes: [
      "$199.99/mo, out of pocket.",
      "HSA/FSA eligible.",
      "Free discreet shipping.",
    ],
    faqs: [
      { q: "Do I have to take it fasting like Rybelsus®?", a: "No. Foundayo™ can be taken any time of day, with or without food or water restrictions — a key difference from other oral GLP-1s." },
      { q: "How effective is orforglipron?", a: "Late-stage trials showed adults with obesity lost roughly 12–15% of body weight on the top doses. Results vary." },
      { q: "Can I switch from an injection to Foundayo™?", a: "Yes, with physician guidance. Your ChubbyNoMore provider will step you across safely." },
    ],
  },
  "wegovy-tablets": {
    slug: "wegovy-tablets",
    name: "Wegovy® Tablets",
    category: "Brand-name",
    activeIngredient: "Semaglutide",
    drugClass: "Oral GLP-1 receptor agonist",
    form: "Once-daily oral tablet",
    fdaApproved: true,
    price: "$249.99",
    priceUnit: "/mo",
    image: wegovyPillAsset.url,
    imageAlt: "Wegovy semaglutide tablet",
    seoTitle: "Wegovy® Tablets (oral semaglutide) — Prescription & pricing | ChubbyNoMore",
    seoDescription:
      "Wegovy® tablets are the first and only FDA-approved oral semaglutide for weight loss in adults with obesity or overweight with a weight-related condition. From $249.99/mo.",
    summary:
      "Wegovy® tablets (oral semaglutide) deliver the same active ingredient as the Wegovy® injection in a once-daily pill. FDA-approved for chronic weight management as an adjunct to reduced-calorie diet and increased physical activity.",
    candidateProfile: [
      "Adults 18+ with BMI ≥ 30, or ≥ 27 with a weight-related condition.",
      "Prefer a daily pill over an injection.",
      "Can take medication first thing in the morning on an empty stomach.",
    ],
    notForList: [
      "Personal or family history of medullary thyroid carcinoma or MEN 2.",
      "History of pancreatitis.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "Under 18.",
    ],
    dosage: [
      { week: "Month 1", dose: "3 mg once daily", notes: "Take on empty stomach with ≤4 oz water; wait 30 min before food/other meds." },
      { week: "Month 2", dose: "7 mg once daily" },
      { week: "Month 3+", dose: "Up to 14 mg once daily", notes: "Maintenance dose." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Abdominal pain", "Fatigue"],
    seriousSideEffects: [
      "Pancreatitis",
      "Gallbladder disease",
      "Kidney problems",
      "Serious hypoglycemia (with other diabetes meds)",
      "Boxed warning: thyroid C-cell tumors",
    ],
    monitoringPlan: [
      "Physician review at each dose step.",
      "Ongoing messaging support.",
      "Bloodwork as clinically indicated.",
    ],
    pricingNotes: [
      "$249.99/mo, out of pocket.",
      "HSA/FSA eligible. Insurance may cover — we do not process claims.",
      "Free shipping.",
    ],
    faqs: [
      { q: "Do I have to take it on an empty stomach?", a: "Yes — take Wegovy® tablets first thing in the morning with no more than 4 oz of plain water, then wait at least 30 minutes before eating, drinking, or taking other medications." },
      { q: "Is it as effective as the Wegovy® injection?", a: "At the maintenance dose (25 mg oral is equivalent studied dose), oral semaglutide produced weight loss comparable to the injection. The FDA-approved oral weight-loss dose is 14 mg." },
    ],
  },
  zepbound: {
    slug: "zepbound",
    name: "Zepbound® (Tirzepatide)",
    category: "Brand-name",
    activeIngredient: "Tirzepatide",
    drugClass: "Dual GLP-1 and GIP receptor agonist",
    form: "Once-weekly subcutaneous injection",
    fdaApproved: true,
    price: "$449.99",
    priceUnit: "/mo",
    image: zepboundPenAsset.url,
    imageAlt: "Zepbound tirzepatide pen",
    seoTitle: "Zepbound® (tirzepatide) — Prescription & pricing | ChubbyNoMore",
    seoDescription:
      "Zepbound® is a once-weekly tirzepatide injection FDA-approved for chronic weight management and for moderate-to-severe obstructive sleep apnea in adults with obesity.",
    summary:
      "Zepbound® (tirzepatide) is a once-weekly injection from Eli Lilly. FDA-approved for chronic weight management in adults with obesity, or overweight with a weight-related condition, and for moderate-to-severe obstructive sleep apnea in adults with obesity.",
    candidateProfile: [
      "Adults 18+ with BMI ≥ 30, or ≥ 27 with a weight-related condition.",
      "Adults with obesity and moderate-to-severe obstructive sleep apnea.",
      "Prefer the pre-filled pen dosing format of a brand-name product.",
    ],
    notForList: [
      "Personal or family history of medullary thyroid carcinoma or MEN 2.",
      "History of pancreatitis.",
      "Pregnancy, planning pregnancy, or breastfeeding.",
      "Type 1 diabetes.",
    ],
    dosage: [
      { week: "Weeks 1–4", dose: "2.5 mg once weekly" },
      { week: "Weeks 5–8", dose: "5 mg once weekly" },
      { week: "Weeks 9–12", dose: "7.5 mg once weekly" },
      { week: "Weeks 13–16", dose: "10 mg once weekly" },
      { week: "Week 17+", dose: "Up to 15 mg once weekly", notes: "Maintenance dose based on response." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Injection-site reactions", "Fatigue"],
    seriousSideEffects: [
      "Pancreatitis",
      "Gallbladder disease",
      "Kidney injury",
      "Serious hypoglycemia (with insulin/sulfonylureas)",
      "Boxed warning: thyroid C-cell tumors",
    ],
    monitoringPlan: [
      "Physician review at every titration step.",
      "Ongoing message-based follow-up.",
    ],
    pricingNotes: [
      "$449.99/mo, out of pocket.",
      "Manufacturer savings card may apply.",
      "HSA/FSA eligible.",
    ],
    faqs: [
      { q: "How much weight can I expect to lose on Zepbound®?", a: "In SURMOUNT-1, adults on the top dose lost about 20% of body weight over 72 weeks on average. Results vary." },
      { q: "Is Zepbound® the same as Mounjaro®?", a: "Same active ingredient (tirzepatide) and same manufacturer (Eli Lilly). Zepbound® is FDA-approved for weight management; Mounjaro® is FDA-approved for type 2 diabetes." },
    ],
  },
  "wegovy-pens": {
    slug: "wegovy-pens",
    name: "Wegovy® Pens",
    category: "Brand-name",
    activeIngredient: "Semaglutide",
    drugClass: "GLP-1 receptor agonist",
    form: "Once-weekly subcutaneous injection",
    fdaApproved: true,
    price: "$349.99",
    priceUnit: "/mo",
    image: wegovyPenAsset.url,
    imageAlt: "Wegovy semaglutide injection pen",
    seoTitle: "Wegovy® Pens (semaglutide) — Prescription & pricing | ChubbyNoMore",
    seoDescription:
      "Wegovy® is a once-weekly semaglutide injection FDA-approved for chronic weight management in adults with obesity and for cardiovascular risk reduction. From $349.99/mo.",
    summary:
      "Wegovy® is Novo Nordisk's once-weekly semaglutide injection, FDA-approved for chronic weight management in adults with obesity, or overweight with a weight-related condition, and to reduce the risk of major cardiovascular events in adults with established CV disease and obesity or overweight.",
    candidateProfile: [
      "Adults 18+ with BMI ≥ 30, or ≥ 27 with a weight-related condition.",
      "Adults with cardiovascular disease plus obesity/overweight seeking CV risk reduction.",
      "Prefer the pre-filled pen dosing format of a brand-name product.",
    ],
    notForList: [
      "Personal or family history of medullary thyroid carcinoma or MEN 2.",
      "History of pancreatitis.",
      "Pregnancy or breastfeeding.",
    ],
    dosage: [
      { week: "Weeks 1–4", dose: "0.25 mg once weekly" },
      { week: "Weeks 5–8", dose: "0.5 mg once weekly" },
      { week: "Weeks 9–12", dose: "1.0 mg once weekly" },
      { week: "Weeks 13–16", dose: "1.7 mg once weekly" },
      { week: "Week 17+", dose: "2.4 mg once weekly", notes: "Maintenance dose." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Abdominal pain", "Fatigue", "Headache"],
    seriousSideEffects: [
      "Pancreatitis",
      "Gallbladder disease",
      "Kidney injury",
      "Serious hypoglycemia (with insulin/sulfonylureas)",
      "Boxed warning: thyroid C-cell tumors",
    ],
    monitoringPlan: [
      "Physician review at each titration step.",
      "Ongoing messaging with your care team.",
    ],
    pricingNotes: [
      "$349.99/mo, out of pocket.",
      "Manufacturer savings card may apply.",
      "HSA/FSA eligible.",
    ],
    faqs: [
      { q: "How much weight can I expect to lose on Wegovy®?", a: "In STEP-1, adults lost about 15% of body weight over 68 weeks on average at the 2.4 mg dose." },
      { q: "Can Wegovy® reduce heart attack risk?", a: "The SELECT trial showed a 20% relative reduction in major adverse cardiovascular events for adults with established CVD and obesity/overweight." },
    ],
  },
  ozempic: {
    slug: "ozempic",
    name: "Ozempic® (Semaglutide)",
    category: "Brand-name",
    activeIngredient: "Semaglutide",
    drugClass: "GLP-1 receptor agonist",
    form: "Once-weekly subcutaneous injection",
    fdaApproved: true,
    price: "$349.99",
    priceUnit: "/mo",
    image: ozempicPenAsset.url,
    imageAlt: "Ozempic semaglutide injection pen",
    seoTitle: "Ozempic® (semaglutide) — Prescription & pricing | ChubbyNoMore",
    seoDescription:
      "Ozempic® is a once-weekly semaglutide injection FDA-approved for type 2 diabetes. Prescribed online by US-licensed physicians when clinically appropriate. From $349.99/mo.",
    summary:
      "Ozempic® is Novo Nordisk's once-weekly semaglutide injection, FDA-approved to improve blood sugar in adults with type 2 diabetes and to reduce major cardiovascular events in adults with type 2 diabetes and known heart disease. It is not FDA-approved for weight loss.",
    candidateProfile: [
      "Adults with type 2 diabetes seeking better glycemic control.",
      "Adults with type 2 diabetes and cardiovascular disease.",
    ],
    notForList: [
      "People without type 2 diabetes seeking weight loss (Wegovy® is FDA-approved for that use).",
      "Personal or family history of MTC or MEN 2.",
      "History of pancreatitis.",
      "Pregnancy or breastfeeding.",
      "Type 1 diabetes.",
    ],
    dosage: [
      { week: "Weeks 1–4", dose: "0.25 mg once weekly", notes: "Starting dose, not for glycemic control." },
      { week: "Weeks 5–8", dose: "0.5 mg once weekly" },
      { week: "Week 9+", dose: "Up to 2 mg once weekly", notes: "Titrated based on A1c response." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Abdominal pain"],
    seriousSideEffects: [
      "Pancreatitis",
      "Diabetic retinopathy complications",
      "Serious hypoglycemia (with insulin/sulfonylureas)",
      "Kidney injury",
      "Boxed warning: thyroid C-cell tumors",
    ],
    monitoringPlan: [
      "A1c and fasting glucose review at each titration step.",
      "Ongoing physician messaging.",
    ],
    pricingNotes: [
      "$349.99/mo, out of pocket.",
      "Manufacturer savings card may apply.",
    ],
    faqs: [
      { q: "Is Ozempic® FDA-approved for weight loss?", a: "No. Ozempic® is FDA-approved for type 2 diabetes. Wegovy® is the FDA-approved semaglutide for weight management." },
      { q: "What if my physician thinks Wegovy® is a better fit?", a: "They'll recommend switching you to the appropriate product during your consultation." },
    ],
  },
  mounjaro: {
    slug: "mounjaro",
    name: "Mounjaro® (Tirzepatide)",
    category: "Brand-name",
    activeIngredient: "Tirzepatide",
    drugClass: "Dual GLP-1 and GIP receptor agonist",
    form: "Once-weekly subcutaneous injection",
    fdaApproved: true,
    price: "$1,249.99",
    priceUnit: "/mo",
    image: mounjaroPenAsset.url,
    imageAlt: "Mounjaro tirzepatide injection pen",
    seoTitle: "Mounjaro® (tirzepatide) — Prescription & pricing | ChubbyNoMore",
    seoDescription:
      "Mounjaro® is a once-weekly tirzepatide injection FDA-approved for type 2 diabetes. Prescribed online by US-licensed physicians when clinically appropriate.",
    summary:
      "Mounjaro® is Eli Lilly's once-weekly tirzepatide injection, FDA-approved to improve blood sugar in adults with type 2 diabetes. It activates both GLP-1 and GIP receptors to reduce appetite, slow gastric emptying, and improve insulin response.",
    candidateProfile: [
      "Adults with type 2 diabetes seeking improved glycemic control.",
    ],
    notForList: [
      "People without type 2 diabetes seeking weight loss (Zepbound® is FDA-approved for that use).",
      "Personal or family history of MTC or MEN 2.",
      "History of pancreatitis.",
      "Pregnancy or breastfeeding.",
      "Type 1 diabetes.",
    ],
    dosage: [
      { week: "Weeks 1–4", dose: "2.5 mg once weekly", notes: "Starting dose." },
      { week: "Weeks 5–8", dose: "5 mg once weekly" },
      { week: "Week 9+", dose: "Up to 15 mg once weekly", notes: "Titrated based on A1c response." },
    ],
    commonSideEffects: ["Nausea", "Diarrhea", "Vomiting", "Constipation", "Decreased appetite"],
    seriousSideEffects: [
      "Pancreatitis",
      "Gallbladder disease",
      "Serious hypoglycemia (with insulin/sulfonylureas)",
      "Kidney injury",
      "Boxed warning: thyroid C-cell tumors",
    ],
    monitoringPlan: [
      "A1c and fasting glucose at each titration step.",
      "Ongoing messaging with your care team.",
    ],
    pricingNotes: [
      "$1,249.99/mo, out of pocket.",
      "Manufacturer savings card may apply.",
    ],
    faqs: [
      { q: "Is Mounjaro® the same as Zepbound®?", a: "Same active ingredient (tirzepatide) and same manufacturer. Mounjaro® is FDA-approved for type 2 diabetes; Zepbound® is FDA-approved for weight management." },
    ],
  },
};

export const medicationSlugs = Object.keys(medications);
