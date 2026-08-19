import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { savePartialLead } from "@/lib/leads.functions";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import cnmHeaderLogoAsset from "@/assets/cnm-header-logo.png.asset.json";
import heroImg from "@/assets/tirz-hero.jpg";
import {
  ChoiceCard,
  ComplianceFooter,
  Field,
  Fieldset,
  PrimaryButton,
  inputClass,
  inputCls,
} from "./ui";

import { cn } from "@/lib/utils";

/* ─────────────── product catalog for URL preselection ─────────────── */

type ProductInfo = { name: string; from: string };

const PRODUCTS: Record<string, ProductInfo> = {
  "compounded-tirzepatide-injection": {
    name: "Compounded Tirzepatide Injection",
    from: "from $249/mo",
  },
  "compounded-semaglutide-injection": {
    name: "Compounded Semaglutide Injection",
    from: "from $149.99/mo",
  },
};

const DEFAULT_PRODUCT = PRODUCTS["compounded-tirzepatide-injection"]!;

/* ─────────────── option sets ─────────────── */

const GOALS = [
  "Lose 1-20lbs for good",
  "Lose 21-50lbs for good",
  "Lose over 50 for good",
  "Maintain my healthy weight",
  "None of the above",
  "Other",
];

const INITIATIVES = [
  "Exercise",
  "Dieting",
  "Weight-loss Supplements",
  "Intermittent Fasting",
  "None of the Above",
];

const PACE_OPTIONS = ["That works for me", "I want it faster", "That's too fast"];

const GLP1_MEDICATIONS = [
  "Compounded Semaglutide Injections",
  "Compounded Tirzepatide Injections",
  "Branded Semaglutide (Wegovy or Ozempic)",
  "Branded Tirzepatide (Zepbound or Mounjaro)",
  "Oral Semaglutide",
  "Oral Tirzepatide",
];

const HIGH_RISK_CONDITIONS = [
  "Gastroparesis",
  "Pancreatic Cancer",
  "Pancreatitis",
  "Type 1 Diabetes or Diabetes Requiring Insulin",
  "Hypoglycemia",
  "Medullary Thyroid Cancer (MTC) or family history of MTC",
  "Bipolar Disorder",
  "Schizophrenia",
  "Multiple Endocrine Neoplasia syndrome type 2 (MEN-2) or family history of MEN-2",
  "Anorexia or Bulimia",
  "Current Symptomatic Gallstones or Active Gallbladder Disease",
  "Active Substance Abuse Disorder",
  "None of the above",
];

const MEDICAL_CONDITIONS = [
  "Hypertension (high blood pressure)",
  "High cholesterol",
  "Type 2 diabetes",
  "Obstructive sleep apnea",
  "Gout",
  "Metabolic syndrome",
  "Heart disease",
  "Stroke",
  "Peripheral vascular disease",
  "Heart Failure",
  "Atrial fibrillation or flutter",
  "Tachycardia or fast heart rate",
  "Any ECG abnormality or heart rhythm abnormality",
  "Gallbladder removed",
  "Fatty Liver (MASLD or MASH)",
  "Cirrhosis or end-stage liver disease",
  "Chronic Kidney Disease Stage 3 or greater",
  "Hypothyroidism",
  "Hyperthyroidism",
  "Thyroid Issues",
  "None of the above",
];

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
  "District of Columbia",
];

/* ─────────────── state ─────────────── */

type Answers = {
  goal: string | null;
  tried: string[];
  heightFt: string;
  heightIn: string;
  weightLbs: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  sex: string | null;
  goalWeight: string;
  pace: string | null;
  currentGlp1: string | null;
  glp1Medication: string;
  glp1Strength: string;
  glp1LastDose: string;
  glp1Notes: string;
  otherMeds: string | null;
  otherMedsList: string;
  highRisk: string[];
  conditions: string[];
  surgeries: string;
  allergies: string;
  state: string;
  attest: boolean;
  address1: string;
  address2: string;
  city: string;
  shipState: string;
  zip: string;
  consentTelehealth: boolean;
  consentCompounded: boolean;
  consentPrivacy: boolean;
};

const EMPTY: Answers = {
  goal: null,
  tried: [],
  heightFt: "",
  heightIn: "",
  weightLbs: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  sex: null,
  goalWeight: "",
  pace: null,
  currentGlp1: null,
  glp1Medication: "",
  glp1Strength: "",
  glp1LastDose: "",
  glp1Notes: "",
  otherMeds: null,
  otherMedsList: "",
  highRisk: [],
  conditions: [],
  surgeries: "",
  allergies: "",
  state: "",
  attest: false,
  address1: "",
  address2: "",
  city: "",
  shipState: "",
  zip: "",
  consentTelehealth: false,
  consentCompounded: false,
  consentPrivacy: false,
};

/* ─────────────── helpers ─────────────── */

const digits = (v: string) => v.replace(/\D/g, "");

function formatPhone(v: string) {
  const d = digits(v).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function formatDob(v: string) {
  const d = digits(v).slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

function dobAge(v: string): number | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (!m) return null;
  const [, mm, dd, yyyy] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (d.getMonth() !== Number(mm) - 1 || d.getDate() !== Number(dd)) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const before =
    now.getMonth() < d.getMonth() ||
    (now.getMonth() === d.getMonth() && now.getDate() < d.getDate());
  if (before) age -= 1;
  return age;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/* ─────────────── chrome ─────────────── */

const TOTAL_SEGMENTS = 5;

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
        const start = (i / TOTAL_SEGMENTS) * 100;
        const fill = Math.max(0, Math.min(1, (pct - start) / (100 / TOTAL_SEGMENTS)));
        return (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F5F5F7]">
            <div
              className="h-full rounded-full bg-[#42D1C3] transition-all duration-300"
              style={{ width: `${fill * 100}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-serif text-[26px] leading-tight text-[#103942] sm:text-[30px]">
      {children}
    </h1>
  );
}

function Helper({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[13px] leading-relaxed text-[#103942]/60">{children}</p>;
}

/* ─────────────── wizard ─────────────── */

export function IntakeWizard({ product: productSlug }: { product?: string }) {
  const product = (productSlug && PRODUCTS[productSlug]) || DEFAULT_PRODUCT;

  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setA((prev) => ({ ...prev, [key]: value }));

  /* progressive lead capture */
  const savePartial = useServerFn(savePartialLead);
  const leadIdRef = useRef<string | null>(null);
  const lastSavedRef = useRef<string>("");

  const bmi = useMemo(() => {
    const ft = Number(a.heightFt);
    const inch = Number(a.heightIn || 0);
    const lbs = Number(a.weightLbs);
    const totalIn = ft * 12 + inch;
    if (!ft || !lbs || totalIn <= 0) return null;
    return Math.round(((703 * lbs) / (totalIn * totalIn)) * 10) / 10;
  }, [a.heightFt, a.heightIn, a.weightLbs]);

  const startWeight = Number(a.weightLbs) || 0;
  const goalWeight = Number(a.goalWeight) || 0;
  const lossTarget = Math.max(0, startWeight - goalWeight);
  const paceLow = Math.round(startWeight * 0.0152 * 10) / 10;
  const paceHigh = Math.round(startWeight * 0.02 * 10) / 10;
  const weeksToGoal = paceLow > 0 ? Math.round((lossTarget / paceLow) * 100) / 100 : 0;

  const age = dobAge(a.dob);

  /* ── field-level validation ── */
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showErrors, setShowErrors] = useState(false);
  const touch = (key: string) => setTouched((prev) => ({ ...prev, [key]: true }));

  const fieldErrors: Record<string, string | null> = {
    goal: a.goal ? null : "Please choose a goal to continue.",
    tried: a.tried.length > 0 ? null : "Please select at least one option.",
    heightFt: a.heightFt === ""
      ? "Enter your height in feet."
      : Number(a.heightFt) < 3 || Number(a.heightFt) > 8
        ? "Height must be between 3 and 8 feet."
        : null,
    heightIn: a.heightIn === ""
      ? "Enter the remaining inches (0–11)."
      : Number(a.heightIn) > 11
        ? "Inches must be between 0 and 11."
        : null,
    weightLbs: a.weightLbs === ""
      ? "Enter your current weight in pounds."
      : Number(a.weightLbs) < 70 || Number(a.weightLbs) > 800
        ? "Enter a weight between 70 and 800 lbs."
        : null,
    firstName: a.firstName.trim().length > 0 ? null : "Please enter your first name.",
    lastName: a.lastName.trim().length > 0 ? null : "Please enter your last name.",
    email: a.email.trim().length === 0
      ? "Please enter your email address."
      : !a.email.includes("@")
        ? "Email must include an @ sign (e.g. name@example.com)."
        : !emailOk(a.email)
          ? "Enter a valid email address, like name@example.com."
          : null,
    phone: digits(a.phone).length === 0
      ? "Please enter your phone number."
      : digits(a.phone).length !== 10
        ? "Enter a 10-digit US phone number, like (555) 123-4567."
        : null,
    dob: a.dob.trim().length === 0
      ? "Please enter your date of birth."
      : a.dob.length < 10 || age === null
        ? "Enter your date of birth as MM/DD/YYYY."
        : age < 18
          ? "You must be 18 or older to continue."
          : age > 100
            ? "Please double-check your date of birth."
            : null,
    sex: a.sex ? null : "Please select an option.",
    goalWeight: a.goalWeight === ""
      ? "Enter your goal weight in pounds."
      : Number(a.goalWeight) <= 0
        ? "Enter a valid goal weight."
        : startWeight > 0 && Number(a.goalWeight) >= startWeight
          ? "Your goal weight must be lower than your current weight."
          : null,
    pace: a.pace ? null : "Please choose one option.",
    currentGlp1: a.currentGlp1 ? null : "Please choose one option.",
    glp1Medication: a.glp1Medication ? null : "Please select the medication.",
    glp1Strength: a.glp1Strength.trim().length > 0 ? null : "Please enter your last dose strength.",
    otherMeds: a.otherMeds ? null : "Please choose one option.",
    otherMedsList: a.otherMedsList.trim().length > 0 ? null : "Please list your medications.",
    highRisk: a.highRisk.length > 0
      ? null
      : "Please select at least one option, or choose “None of the Above”.",
    conditions: a.conditions.length > 0
      ? null
      : "Please select at least one option, or choose “None of the Above”.",
    surgeries: a.surgeries.trim().length > 0 ? null : "Please answer, or tap N/A.",
    allergies: a.allergies.trim().length > 0 ? null : "Please answer, or tap N/A.",
    state: a.state ? null : "Please select the state you live in.",
    attest: a.attest ? null : "You must attest before continuing.",
    address1: a.address1.trim().length > 0 ? null : "Please enter your street address.",
    city: a.city.trim().length > 0 ? null : "Please enter your city.",
    shipState: a.shipState ? null : "Please select a state.",
    zip: a.zip.length === 0
      ? "Please enter your ZIP code."
      : !/^\d{5}$/.test(a.zip)
        ? "ZIP code must be 5 digits."
        : null,
    consentTelehealth: a.consentTelehealth ? null : "Please accept to continue.",
    consentCompounded: a.consentCompounded ? null : "Please accept to continue.",
    consentPrivacy: a.consentPrivacy ? null : "Please accept to continue.",
  };

  const err = (key: string): string | null =>
    showErrors || touched[key] ? (fieldErrors[key] ?? null) : null;


  /* ── step map (steps 7 & 8b are conditional) ── */
  const showGlp1Details = a.currentGlp1 === "Yes, I am";
  const showOtherMedsDetails = a.otherMeds === "Yes, I am";

  const contactReady = emailOk(a.email) && digits(a.phone).length === 10;

  const persistContact = useCallback(
    async (lastCompletedStep: string) => {
      if (!emailOk(a.email) || digits(a.phone).length !== 10) return;
      const signature = [
        a.email.trim().toLowerCase(),
        a.phone,
        a.firstName.trim(),
        a.lastName.trim(),
        lastCompletedStep,
      ].join("|");
      if (signature === lastSavedRef.current) return;
      lastSavedRef.current = signature;
      try {
        const res = await savePartial({
          data: {
            leadId: leadIdRef.current,
            firstName: a.firstName.trim() || undefined,
            lastName: a.lastName.trim() || undefined,
            email: a.email.trim(),
            phone: a.phone,
            lastCompletedStep,
            funnelSource: "website_intake",
            referringPage:
              typeof window !== "undefined" ? window.location.pathname : undefined,
          },
        });
        leadIdRef.current = res.leadId;
      } catch {
        lastSavedRef.current = "";
      }
    },
    [a.email, a.phone, a.firstName, a.lastName, savePartial],
  );

  useEffect(() => {
    if (!contactReady) return;
    const t = window.setTimeout(() => {
      void persistContact(`step_${step}_in_progress`);
    }, 900);
    return () => window.clearTimeout(t);
  }, [contactReady, persistContact, step]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, submitted]);

  const toggleMulti = (key: "tried" | "highRisk" | "conditions", label: string) => {
    const noneLabels = ["None of the Above", "None of the above"];
    setA((prev) => {
      const cur = prev[key];
      let next: string[];
      if (noneLabels.includes(label)) next = cur.includes(label) ? [] : [label];
      else {
        next = cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label];
        next = next.filter((x) => !noneLabels.includes(x));
      }
      return { ...prev, [key]: next };
    });
  };

  /* ── ordered step list ── */
  const steps: string[] = [
    "intro",
    "goalWeight",
    "flatPrice",
    "pace",
    "encouragement",
    "currentGlp1",
    ...(showGlp1Details ? ["glp1Details"] : []),
    "otherMeds",
    ...(showOtherMedsDetails ? ["otherMedsDetails"] : []),
    "highRisk",
    "conditions",
    "surgeries",
    "allergies",
    "state",
    "confirm",
    "final",
  ];
  const currentKey = steps[Math.min(step, steps.length) - 1] ?? "intro";
  const isFinal = currentKey === "final";
  const pct = (Math.min(step, steps.length) / steps.length) * 100;

  const STEP_FIELDS: Record<string, string[]> = {
    intro: [
      "goal",
      "tried",
      "heightFt",
      "heightIn",
      "weightLbs",
      "firstName",
      "lastName",
      "email",
      "phone",
      "dob",
      "sex",
    ],
    goalWeight: ["goalWeight"],
    flatPrice: [],
    encouragement: [],
    pace: ["pace"],
    currentGlp1: ["currentGlp1"],
    glp1Details: ["glp1Medication", "glp1Strength"],
    otherMeds: ["otherMeds"],
    otherMedsDetails: ["otherMedsList"],
    highRisk: ["highRisk"],
    conditions: ["conditions"],
    surgeries: ["surgeries"],
    allergies: ["allergies"],
    state: ["state"],
    confirm: ["firstName", "lastName", "email", "phone", "attest"],
    final: [
      "address1",
      "city",
      "shipState",
      "zip",
      "consentTelehealth",
      "consentCompounded",
      "consentPrivacy",
    ],
  };

  const currentFields = STEP_FIELDS[currentKey] ?? [];
  const valid = currentFields.every((k) => !fieldErrors[k]);

  const buttonLabel =
    isFinal
      ? "Submit"
      : ["goalWeight", "flatPrice", "pace", "encouragement"].includes(currentKey)
        ? "Next"
        : "Continue";

  const advance = async () => {
    if (!valid) {
      setShowErrors(true);
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          const firstError = document.querySelector('[role="alert"]');
          firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 60);
      }
      return;
    }

    if (!isFinal) {
      await persistContact(`step_${step}_${currentKey}`);
      setShowErrors(false);
      setStep((s) => s + 1);
      return;
    }

    setSending(true);
    await persistContact("intake_submitted");
    try {
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: { slug: productSlug ?? "compounded-tirzepatide-injection", ...product },
          answers: { ...a, bmi },
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      /* placeholder endpoint */
    }
    setSending(false);
    setSubmitted(true);
  };

  const startOver = () => {
    if (window.confirm("Start over? Your answers on this form will be cleared.")) {
      setA(EMPTY);
      setStep(1);
      setSubmitted(false);
      setTouched({});
      setShowErrors(false);
    }
  };


  return (
    <div className="min-h-[100dvh] bg-white pb-10">
      <header className="sticky top-0 z-10 mx-auto flex max-w-[560px] items-center justify-between bg-white/95 px-5 pt-5 pb-3 backdrop-blur-sm">
        <Link to="/" aria-label="Chubby No More home">
          <img
            src={cnmHeaderLogoAsset.url}
            alt="Chubby No More"
            className="h-7 w-auto max-w-[150px] object-contain"
          />
        </Link>
        <button
          type="button"
          onClick={startOver}
          className="flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold text-[#103942]/70 underline-offset-4 hover:underline"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Start over
        </button>
      </header>

      <div className="mx-auto max-w-[560px] px-5">
        <div className="mt-2 aspect-[16/7] w-full overflow-hidden rounded-2xl bg-[#F5F5F7]">
          <img src={heroImg} alt="" aria-hidden className="h-full w-full object-cover" />
        </div>

        <div className="mt-4">
          <ProgressBar pct={submitted ? 100 : pct} />
        </div>

        {/* product summary */}
        <div className="mt-3 border-b border-[#103942]/10 pb-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] font-semibold text-[#103942]">{product.name}</span>
            <span className="text-[15px] font-semibold text-[#42D1C3]">{product.from}</span>
          </div>
          <p className="mt-1 text-[12px] text-[#103942]/55">
            Your dose may need to go up. Your price won&apos;t.
          </p>
        </div>

        {submitted ? (
          <Confirmation />
        ) : (
          <>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="mt-4 flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold text-[#103942]/70 hover:text-[#103942]"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : null}

            <div className="mt-4">
              {currentKey === "intro" && (
                <IntroStep
                  a={a}
                  set={set}
                  toggleMulti={toggleMulti}
                  bmi={bmi}
                  err={err}
                  touch={touch}
                />
              )}

              {currentKey === "goalWeight" && (
                <div>
                  <StepTitle>What&rsquo;s your goal weight?</StepTitle>
                  <div className="mt-5">
                    <Field label="Goal weight (lbs)" error={err("goalWeight")}>
                      <input
                        className={inputCls(err("goalWeight"))}
                        inputMode="numeric"
                        placeholder="-"
                        value={a.goalWeight}
                        onBlur={() => touch("goalWeight")}
                        onChange={(e) => set("goalWeight", digits(e.target.value).slice(0, 4))}
                      />
                    </Field>
                    <Helper>A realistic target in pounds.</Helper>
                  </div>
                </div>
              )}


              {currentKey === "flatPrice" && (
                <div className="py-4">
                  <StepTitle>Your dose may need to go up. Your price won&rsquo;t.</StepTitle>
                  <p className="mt-4 text-[16px] leading-relaxed text-[#103942]/75">
                    One flat price covers your provider, prescription, medication, and shipping.
                  </p>
                </div>
              )}

              {currentKey === "pace" && (
                <div>
                  <StepTitle>
                    With medication, you may lose {paceLow} to {paceHigh} pounds per week.
                  </StepTitle>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#103942]/75">
                    It will take about {weeksToGoal} weeks to reach your goal weight of{" "}
                    {a.goalWeight}.
                  </p>
                  <div className="mt-6">
                    <Fieldset legend="How is that pace for you?" error={err("pace")}>
                      {PACE_OPTIONS.map((o) => (
                        <ChoiceCard
                          key={o}
                          label={o}
                          selected={a.pace === o}
                          onSelect={() => set("pace", o)}
                        />
                      ))}
                    </Fieldset>
                  </div>
                </div>
              )}

              {currentKey === "encouragement" && (
                <div className="py-4">
                  <StepTitle>Perfect!</StepTitle>
                  <p className="mt-4 text-[16px] leading-relaxed text-[#103942]/75">
                    Losing {lossTarget}lbs is easier than you think &ndash; and it doesn&rsquo;t
                    involve restrictive diets.
                  </p>
                </div>
              )}

              {currentKey === "currentGlp1" && (
                <div>
                  <StepTitle>Are you currently taking any GLP-1 medications?</StepTitle>
                  <Helper>
                    Selecting &ldquo;Yes&rdquo; will not disqualify you. Our providers will review
                    your current prescription and recommend the appropriate dose.
                  </Helper>
                  <div className="mt-5 flex flex-col gap-[10px]">
                    {["Yes, I am", "No, I'm not"].map((o) => (
                      <ChoiceCard
                        key={o}
                        label={o}
                        selected={a.currentGlp1 === o}
                        onSelect={() => set("currentGlp1", o)}
                      />
                    ))}
                  </div>
                  {err("currentGlp1") ? (
                    <p role="alert" className="mt-2 text-[12px] font-medium text-red-600">
                      {err("currentGlp1")}
                    </p>
                  ) : null}
                </div>
              )}

              {currentKey === "glp1Details" && (
                <div>
                  <StepTitle>
                    Please provide details about the medication you&rsquo;re currently taking
                  </StepTitle>
                  <div className="mt-5 space-y-4">
                    <Field label="Which medication?" error={err("glp1Medication")}>
                      <select
                        className={inputCls(err("glp1Medication"))}
                        value={a.glp1Medication}
                        onBlur={() => touch("glp1Medication")}
                        onChange={(e) => set("glp1Medication", e.target.value)}
                      >
                        <option value="">Select medication</option>
                        {GLP1_MEDICATIONS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Strength of your last dose (mg)" error={err("glp1Strength")}>
                      <input
                        className={inputCls(err("glp1Strength"))}
                        placeholder="e.g. 5"
                        value={a.glp1Strength}
                        onBlur={() => touch("glp1Strength")}
                        onChange={(e) => set("glp1Strength", e.target.value.slice(0, 20))}
                      />
                    </Field>
                    <Field label="Approximate date of your last dose">
                      <input
                        type="date"
                        className={inputClass}
                        value={a.glp1LastDose}
                        onChange={(e) => set("glp1LastDose", e.target.value)}
                      />
                    </Field>
                    <Field label="Anything else you’d like your provider to know? (optional)">
                      <textarea
                        className={cn(inputClass, "min-h-[96px]")}
                        placeholder="e.g., side effects like nausea, questions, or anything relevant"
                        value={a.glp1Notes}
                        onChange={(e) => set("glp1Notes", e.target.value.slice(0, 1000))}
                      />
                    </Field>
                    <Helper>This helps your provider create the perfect plan for you</Helper>
                  </div>
                </div>
              )}

              {currentKey === "otherMeds" && (
                <div>
                  <StepTitle>
                    Are you currently taking any other medications (Rx, OTC, supplements)?
                  </StepTitle>
                  <Helper>This helps your provider create the perfect plan for you</Helper>
                  <div className="mt-5 flex flex-col gap-[10px]">
                    {["Yes, I am", "No, I'm not"].map((o) => (
                      <ChoiceCard
                        key={o}
                        label={o}
                        selected={a.otherMeds === o}
                        onSelect={() => set("otherMeds", o)}
                      />
                    ))}
                  </div>
                  {err("otherMeds") ? (
                    <p role="alert" className="mt-2 text-[12px] font-medium text-red-600">
                      {err("otherMeds")}
                    </p>
                  ) : null}
                </div>
              )}

              {currentKey === "otherMedsDetails" && (
                <div>
                  <StepTitle>Please list all medications you are currently taking:</StepTitle>
                  <div className="mt-5">
                    <textarea
                      className={cn(inputCls(err("otherMedsList")), "min-h-[96px]")}
                      placeholder="e.g., Metformin 500mg twice daily"
                      value={a.otherMedsList}
                      onBlur={() => touch("otherMedsList")}
                      onChange={(e) => set("otherMedsList", e.target.value.slice(0, 2000))}
                    />
                    {err("otherMedsList") ? (
                      <p role="alert" className="mt-1 text-[12px] font-medium text-red-600">
                        {err("otherMedsList")}
                      </p>
                    ) : null}
                    <Helper>This helps your provider create the perfect plan for you</Helper>
                  </div>
                </div>
              )}


              {currentKey === "highRisk" && (
                <div>
                  <StepTitle>Let&rsquo;s talk about your health ...</StepTitle>
                  <Helper>
                    Knowing your health history helps us give you better and safer care. If you
                    don&rsquo;t have any medical issues, choose None Of the Above from the list!
                  </Helper>
                  <div className="mt-6">
                    <Fieldset legend="Do you currently have any of the following high-risk medical conditions?" error={err("highRisk")}>
                      {HIGH_RISK_CONDITIONS.map((c) => (
                        <ChoiceCard
                          key={c}
                          multi
                          label={c}
                          selected={a.highRisk.includes(c)}
                          onSelect={() => toggleMulti("highRisk", c)}
                        />
                      ))}
                    </Fieldset>
                  </div>
                </div>
              )}

              {currentKey === "conditions" && (
                <div>
                  <StepTitle>Let&rsquo;s talk about your health ...</StepTitle>
                  <Helper>
                    Understanding your health history helps us provide safer, more effective care
                  </Helper>
                  <div className="mt-6">
                    <Fieldset legend="Please check all current or past medical conditions." error={err("conditions")}>
                      {MEDICAL_CONDITIONS.map((c) => (
                        <ChoiceCard
                          key={c}
                          multi
                          label={c}
                          selected={a.conditions.includes(c)}
                          onSelect={() => toggleMulti("conditions", c)}
                        />
                      ))}
                    </Fieldset>
                  </div>
                </div>
              )}

              {currentKey === "surgeries" && (
                <div>
                  <StepTitle>Let&rsquo;s talk about your health ...</StepTitle>
                  <Helper>Select &lsquo;N/A&rsquo; if you don&rsquo;t have any surgeries to share!</Helper>
                  <div className="mt-6">
                    <Field label="List any surgeries you have had in the past:" error={err("surgeries")}>
                      <div className="flex gap-2">
                        <input
                          className={inputCls(err("surgeries"))}
                          placeholder="e.g., Appendectomy (2019) or N/A"
                          value={a.surgeries}
                          onBlur={() => touch("surgeries")}
                          onChange={(e) => set("surgeries", e.target.value.slice(0, 500))}
                        />
                        <NAButton onClick={() => set("surgeries", "N/A")} />
                      </div>
                    </Field>

                    <Helper>
                      Thank you for being so thorough, this gives us a complete picture
                    </Helper>
                  </div>
                </div>
              )}

              {currentKey === "allergies" && (
                <div>
                  <StepTitle>Can you share a bit about your health history?</StepTitle>
                  <Helper>
                    Let&rsquo;s make sure we know about everything you&rsquo;re taking and sensitive
                    to
                  </Helper>
                  <div className="mt-6">
                    <Field label="Please list all of your known allergies:" error={err("allergies")}>
                      <div className="flex gap-2">
                        <input
                          className={inputCls(err("allergies"))}
                          placeholder="e.g., Penicillin, Pollen, Shellfish, Latex or N/A"
                          value={a.allergies}
                          onBlur={() => touch("allergies")}
                          onChange={(e) => set("allergies", e.target.value.slice(0, 500))}
                        />
                        <NAButton onClick={() => set("allergies", "N/A")} />
                      </div>
                    </Field>

                    <Helper>Type here, or tap N/A on right if not applicable</Helper>
                  </div>
                </div>
              )}

              {currentKey === "state" && (
                <div>
                  <StepTitle>We just need a couple more things.</StepTitle>
                  <Helper>
                    We need to verify your identity and understand how you&rsquo;d like to connect
                    with your provider
                  </Helper>
                  <div className="mt-6">
                    <Field label="The state I live in" error={err("state")}>
                      <select
                        className={inputCls(err("state"))}
                        value={a.state}
                        onBlur={() => touch("state")}
                        onChange={(e) => set("state", e.target.value)}
                      >
                        <option value="">Select state</option>
                        {STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {currentKey === "confirm" && (
                <div>
                  <StepTitle>
                    Let&rsquo;s double-check that we have everything. Once we do, we&rsquo;re all
                    set to go!
                  </StepTitle>
                  <div className="mt-5 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="First name" error={err("firstName")}>
                        <input
                          className={inputCls(err("firstName"))}
                          autoComplete="given-name"
                          value={a.firstName}
                          onBlur={() => touch("firstName")}
                          onChange={(e) => set("firstName", e.target.value)}
                        />
                      </Field>
                      <Field label="Last name" error={err("lastName")}>
                        <input
                          className={inputCls(err("lastName"))}
                          autoComplete="family-name"
                          value={a.lastName}
                          onBlur={() => touch("lastName")}
                          onChange={(e) => set("lastName", e.target.value)}
                        />
                      </Field>
                    </div>
                    <Field label="Email" error={err("email")}>
                      <input
                        className={inputCls(err("email"))}
                        type="email"
                        autoComplete="email"
                        value={a.email}
                        onBlur={() => touch("email")}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </Field>
                    <Field label="Phone number" error={err("phone")}>
                      <input
                        className={inputCls(err("phone"))}
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="(555) 123-4567"
                        value={a.phone}
                        onBlur={() => touch("phone")}
                        onChange={(e) => set("phone", formatPhone(e.target.value))}
                      />
                    </Field>
                    <Helper>
                      Please attest to the following confirming that all information you have
                      provided to us is true and complete. If you do not agree, you may not submit
                      this form.
                    </Helper>
                    <CheckRow
                      checked={a.attest}
                      onChange={(v) => set("attest", v)}
                      error={err("attest")}
                      label="I confirm that I am the patient completing this intake form and have reviewed all questions carefully. I attest that my answers are true, accurate, and complete to the best of my knowledge. I understand the importance of providing my provider with complete and accurate health information for my care."
                    />
                  </div>

                </div>
              )}

              {currentKey === "final" && (
                <div>
                  <StepTitle>Where should we send your treatment?</StepTitle>
                  <Helper>
                    Your card is not charged today. If our licensed provider determines treatment
                    is appropriate, Chubby No More will contact you before anything ships.
                  </Helper>
                  <div className="mt-6 space-y-4">
                    <Field label="Address line 1" error={err("address1")}>
                      <input
                        className={inputCls(err("address1"))}
                        autoComplete="address-line1"
                        value={a.address1}
                        onBlur={() => touch("address1")}
                        onChange={(e) => set("address1", e.target.value)}
                      />
                    </Field>
                    <Field label="Address line 2 (optional)">
                      <input
                        className={inputClass}
                        autoComplete="address-line2"
                        value={a.address2}
                        onChange={(e) => set("address2", e.target.value)}
                      />
                    </Field>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field label="City" className="sm:col-span-1" error={err("city")}>
                        <input
                          className={inputCls(err("city"))}
                          autoComplete="address-level2"
                          value={a.city}
                          onBlur={() => touch("city")}
                          onChange={(e) => set("city", e.target.value)}
                        />
                      </Field>
                      <Field label="State" className="sm:col-span-1" error={err("shipState")}>
                        <select
                          className={inputCls(err("shipState"))}
                          value={a.shipState}
                          onBlur={() => touch("shipState")}
                          onChange={(e) => set("shipState", e.target.value)}
                        >
                          <option value="">State</option>
                          {STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="ZIP code" className="sm:col-span-1" error={err("zip")}>
                        <input
                          className={inputCls(err("zip"))}
                          inputMode="numeric"
                          placeholder="12345"
                          autoComplete="postal-code"
                          value={a.zip}
                          onBlur={() => touch("zip")}
                          onChange={(e) => set("zip", digits(e.target.value).slice(0, 5))}
                        />
                      </Field>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-[#103942]/10 bg-[#F5F5F7] p-4">
                      <CheckRow
                        checked={a.consentTelehealth}
                        onChange={(v) => set("consentTelehealth", v)}
                        error={err("consentTelehealth")}
                        label={
                          <span>
                            I consent to receive care through telehealth from an independent licensed provider and agree to Chubby No More’s{" "}
                            <Link
                              to="/telehealth-consent"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold underline underline-offset-2 hover:text-[#42D1C3]"
                            >
                              Telehealth Consent
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/terms-of-use"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold underline underline-offset-2 hover:text-[#42D1C3]"
                            >
                              Terms of Use
                            </Link>
                            .
                          </span>
                        }
                      />
                      <CheckRow
                        checked={a.consentCompounded}
                        onChange={(v) => set("consentCompounded", v)}
                        error={err("consentCompounded")}
                        label="I understand compounded medications are not approved by the FDA and are not reviewed by the FDA for safety, effectiveness, or quality."
                      />
                      <CheckRow
                        checked={a.consentPrivacy}
                        onChange={(v) => set("consentPrivacy", v)}
                        error={err("consentPrivacy")}
                        label={
                          <span>
                            I have reviewed the{" "}
                            <Link
                              to="/notice-of-privacy-practices"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold underline underline-offset-2 hover:text-[#42D1C3]"
                            >
                              Notice of Privacy Practices
                            </Link>{" "}
                            and consent to Chubby No More contacting me about my care.
                          </span>
                        }
                      />
                    </div>

                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <PrimaryButton disabled={!valid || sending} onClick={() => void advance()}>
                {sending ? "Submitting…" : buttonLabel}
                {isFinal ? null : <ArrowRight className="h-4 w-4" />}
              </PrimaryButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────── pieces ─────────────── */

function NAButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] shrink-0 rounded-xl border border-[#103942]/15 bg-white px-4 text-[14px] font-semibold text-[#103942] hover:border-[#42D1C3]"
    >
      N/A
    </button>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  error?: string | null;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[#103942]">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          aria-hidden
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border",
            checked
              ? "border-[#42D1C3] bg-[#42D1C3]"
              : error
                ? "border-red-500 bg-red-50"
                : "border-[#103942]/25 bg-white",
          )}
        >
          {checked ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
        </span>
        <span>{label}</span>
      </label>
      {error ? (
        <p role="alert" className="mt-1 pl-8 text-[12px] font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}


function IntroStep({
  a,
  set,
  toggleMulti,
  bmi,
  err,
  touch,
}: {
  a: Answers;
  set: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  toggleMulti: (key: "tried" | "highRisk" | "conditions", label: string) => void;
  bmi: number | null;
  err: (key: string) => string | null;
  touch: (key: string) => void;
}) {
  return (
    <div>
      <StepTitle>Your 60 Second Health Intake Form</StepTitle>

      <div className="mt-6">
        <Fieldset legend="What are your weight loss goals?" error={err("goal")}>
          {GOALS.map((g) => (
            <ChoiceCard
              key={g}
              label={g}
              selected={a.goal === g}
              onSelect={() => set("goal", g)}
            />
          ))}
        </Fieldset>
      </div>

      <div className="mt-8">
        <Fieldset
          legend="What weight loss initiatives have you tried in the past?"
          error={err("tried")}
        >
          {INITIATIVES.map((t) => (
            <ChoiceCard
              key={t}
              multi
              label={t}
              selected={a.tried.includes(t)}
              onSelect={() => toggleMulti("tried", t)}
            />
          ))}
        </Fieldset>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[15px] font-semibold text-[#103942]">
          What are your height and weight?
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Height (ft)" error={err("heightFt")}>
            <input
              className={inputCls(err("heightFt"))}
              inputMode="numeric"
              placeholder="-"
              value={a.heightFt}
              onBlur={() => touch("heightFt")}
              onChange={(e) => set("heightFt", digits(e.target.value).slice(0, 1))}
            />
          </Field>
          <Field label="Height (in)" error={err("heightIn")}>
            <input
              className={inputCls(err("heightIn"))}
              inputMode="numeric"
              placeholder="-"
              value={a.heightIn}
              onBlur={() => touch("heightIn")}
              onChange={(e) => set("heightIn", digits(e.target.value).slice(0, 2))}
            />
          </Field>
          <Field
            label="Weight (lbs)"
            className="col-span-2 sm:col-span-1"
            error={err("weightLbs")}
          >
            <input
              className={inputCls(err("weightLbs"))}
              inputMode="numeric"
              placeholder="-"
              value={a.weightLbs}
              onBlur={() => touch("weightLbs")}
              onChange={(e) => set("weightLbs", digits(e.target.value).slice(0, 4))}
            />
          </Field>
        </div>
        {bmi ? (
          <p className="mt-3 text-[14px] font-semibold text-[#103942]">Your BMI: {bmi}</p>
        ) : null}
      </div>

      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First name" error={err("firstName")}>
            <input
              className={inputCls(err("firstName"))}
              autoComplete="given-name"
              value={a.firstName}
              onBlur={() => touch("firstName")}
              onChange={(e) => set("firstName", e.target.value)}
            />
          </Field>
          <Field label="Last name" error={err("lastName")}>
            <input
              className={inputCls(err("lastName"))}
              autoComplete="family-name"
              value={a.lastName}
              onBlur={() => touch("lastName")}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Email" error={err("email")}>
          <input
            className={inputCls(err("email"))}
            type="email"
            autoComplete="email"
            value={a.email}
            onBlur={() => touch("email")}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field label="Phone number" error={err("phone")}>
          <input
            className={inputCls(err("phone"))}
            inputMode="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            value={a.phone}
            onBlur={() => touch("phone")}
            onChange={(e) => set("phone", formatPhone(e.target.value))}
          />
        </Field>
        <Field label="Date of birth" error={err("dob")}>
          <input
            className={inputCls(err("dob"))}
            inputMode="numeric"
            placeholder="MM/DD/YYYY"
            value={a.dob}
            onBlur={() => touch("dob")}
            onChange={(e) => set("dob", formatDob(e.target.value))}
          />
        </Field>
        <Fieldset legend="Sex assigned at birth" error={err("sex")}>
          <div className="grid grid-cols-2 gap-[10px]">
            {["Male", "Female"].map((s) => (
              <ChoiceCard
                key={s}
                label={s}
                selected={a.sex === s}
                onSelect={() => set("sex", s)}
              />
            ))}
          </div>
        </Fieldset>
      </div>

      <ComplianceFooter />
    </div>
  );
}


function Confirmation() {
  return (
    <div className="mt-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#42D1C3]/15">
        <Check className="h-7 w-7 text-[#42D1C3]" strokeWidth={3} />
      </div>
      <h1 className="mt-5 font-serif text-[26px] leading-tight text-[#103942]">
        Thanks — your intake is in.
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#103942]/70">
        Our licensed provider will review your information and Chubby No More will follow up by
        email or text. No charge today.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#103942]/15 px-6 text-[15px] font-semibold text-[#103942]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
