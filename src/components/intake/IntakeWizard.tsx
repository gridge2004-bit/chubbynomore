import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { savePartialLead } from "@/lib/leads.functions";
import { ArrowLeft, ArrowRight, Check, CreditCard } from "lucide-react";
import cnmHeaderLogoAsset from "@/assets/cnm-header-logo.png.asset.json";
import heroImg from "@/assets/tirz-hero.jpg";
import {
  BinaryCards,
  ChoiceCard,
  ComplianceFooter,
  Field,
  Fieldset,
  PrimaryButton,
  US_STATE_LIST,
  inputClass,
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

const DEFAULT_PRODUCT = PRODUCTS["compounded-tirzepatide-injection"];

/* ─────────────── state ─────────────── */

type Answers = {
  goal: string | null;
  tried: string[];
  heightFt: string;
  heightIn: string;
  weightLbs: string;
  bmi: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  sex: string | null;
  // step 2
  mtcMen2: string | null;
  pancreatitis: string | null;
  pregnancy: string | null;
  otherGlp1: string | null;
  // step 3
  conditions: string[];
  takingMeds: string | null;
  medsList: string;
  allergies: string | null;
  allergiesList: string;
  priorGlp1: string | null;
  priorGlp1Med: string;
  priorGlp1Dose: string;
  // step 4
  plan: string;
  // step 5
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  consentAccurate: boolean;
  consentTerms: boolean;
  consentCompounded: boolean;
};

const EMPTY: Answers = {
  goal: null,
  tried: [],
  heightFt: "",
  heightIn: "",
  weightLbs: "",
  bmi: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  sex: null,
  mtcMen2: null,
  pancreatitis: null,
  pregnancy: null,
  otherGlp1: null,
  conditions: [],
  takingMeds: null,
  medsList: "",
  allergies: null,
  allergiesList: "",
  priorGlp1: null,
  priorGlp1Med: "",
  priorGlp1Dose: "",
  plan: "6-month",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  consentAccurate: false,
  consentTerms: false,
  consentCompounded: false,
};

const PLANS = [
  { id: "6-month", title: "6-month", price: "$249/mo", note: "Best value, billed monthly", best: true },
  { id: "3-month", title: "3-month", price: "$269/mo", note: "Billed monthly" },
  { id: "monthly", title: "Month-to-month", price: "$289/mo", note: "Cancel anytime" },
];

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

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F5F5F7]">
          <div
            className="h-full rounded-full bg-[#42D1C3] transition-all duration-300"
            style={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─────────────── wizard ─────────────── */

export function IntakeWizard({ product: productSlug }: { product?: string }) {
  
  const product = (productSlug && PRODUCTS[productSlug]) || DEFAULT_PRODUCT;

  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [stopped, setStopped] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  /* progressive lead capture — saved as soon as email + phone are valid */
  const savePartial = useServerFn(savePartialLead);
  const leadIdRef = useRef<string | null>(null);
  const lastSavedRef = useRef<string>("");

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setA((prev) => ({ ...prev, [key]: value }));

  // Track which section is in view while the user scrolls through the form.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.findIndex((r) => r.current === entry.target);
            if (index >= 0) setStep(index + 1);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    stepRefs.forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const scrollToStep = (next: number) => {
    stepRefs[next - 1]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // silent BMI
  useEffect(() => {
    const ft = Number(a.heightFt);
    const inch = Number(a.heightIn || 0);
    const lbs = Number(a.weightLbs);
    const totalIn = ft * 12 + inch;
    const bmi = ft && lbs && totalIn > 0 ? Math.round((703 * lbs) / (totalIn * totalIn) * 10) / 10 : null;
    setA((prev) => (prev.bmi === bmi ? prev : { ...prev, bmi }));
  }, [a.heightFt, a.heightIn, a.weightLbs]);

  const age = dobAge(a.dob);
  const dobError =
    a.dob.length === 10 && (age === null || age < 18)
      ? "You must be 18 or older to continue."
      : null;

  const step1Valid =
    !!a.goal &&
    a.tried.length > 0 &&
    !!a.heightFt &&
    a.heightIn !== "" &&
    !!a.weightLbs &&
    a.firstName.trim().length > 0 &&
    a.lastName.trim().length > 0 &&
    emailOk(a.email) &&
    digits(a.phone).length === 10 &&
    age !== null &&
    age >= 18 &&
    !!a.sex;

  const needsPregnancy = a.sex === "Female";
  const step2Valid =
    !!a.mtcMen2 &&
    !!a.pancreatitis &&
    (!needsPregnancy || !!a.pregnancy) &&
    !!a.otherGlp1;

  const hardStop =
    a.mtcMen2 === "Yes" ||
    a.pancreatitis === "Yes" ||
    (needsPregnancy && a.pregnancy === "Yes") ||
    a.otherGlp1 === "Yes";

  const step3Valid =
    a.conditions.length > 0 &&
    !!a.takingMeds &&
    (a.takingMeds === "No" || a.medsList.trim().length > 0) &&
    !!a.allergies &&
    (a.allergies === "No" || a.allergiesList.trim().length > 0) &&
    !!a.priorGlp1 &&
    (a.priorGlp1 === "No" || (!!a.priorGlp1Med && !!a.priorGlp1Dose));

  const step4Valid = !!a.plan;

  const step5Valid =
    a.address1.trim().length > 0 &&
    a.city.trim().length > 0 &&
    !!a.state &&
    /^\d{5}$/.test(a.zip) &&
    a.consentAccurate &&
    a.consentTerms &&
    a.consentCompounded;

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

  // Save contact info as soon as it's valid, before any final submission.
  useEffect(() => {
    if (!contactReady) return;
    const t = window.setTimeout(() => {
      void persistContact(`step_${step}_in_progress`);
    }, 900);
    return () => window.clearTimeout(t);
  }, [contactReady, persistContact, step]);


  const toggleMulti = (key: "tried" | "conditions", label: string, noneLabel: string) => {
    setA((prev) => {
      const cur = prev[key];
      let next: string[];
      if (label === noneLabel) next = cur.includes(noneLabel) ? [] : [noneLabel];
      else {
        next = cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label];
        next = next.filter((x) => x !== noneLabel);
      }
      return { ...prev, [key]: next };
    });
  };

  const handleContinue = async () => {
    await persistContact("intake_submitted");

    const payload = {
      product: { slug: productSlug ?? "compounded-tirzepatide-injection", ...product },
      answers: a,
      submittedAt: new Date().toISOString(),
    };
    // eslint-disable-next-line no-console
    console.log("[intake] submit", payload);
    try {
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* placeholder endpoint — ignore transport errors for now */
    }
    setSubmitted(true);
  };

  const startOver = () => {
    if (window.confirm("Start over? Your answers on this form will be cleared.")) {
      setA(EMPTY);
      setStep(1);
      setStopped(false);
      setSubmitted(false);
    }
  };


  return (
    <div className="min-h-[100dvh] overflow-visible bg-white pb-20" ref={topRef}>
      {/* top bar */}
      <header className="sticky top-0 z-10 mx-auto flex max-w-[560px] items-center justify-between bg-white/95 px-5 pt-5 pb-3 backdrop-blur-sm">
        <Link to="/" aria-label="Chubby No More home">
          <img src={cnmHeaderLogoAsset.url} alt="Chubby No More" className="h-7 w-auto max-w-[150px] object-contain" />
        </Link>
        <button
          type="button"
          onClick={startOver}
          className="min-h-[44px] text-[13px] font-semibold text-[#103942]/70 underline-offset-4 hover:underline"
        >
          Start over
        </button>
      </header>

      <div className="mx-auto max-w-[560px] px-5">
        {/* hero band */}
        <div className="mt-4 aspect-[16/7] w-full overflow-hidden rounded-2xl bg-[#F5F5F7]">
          <img src={heroImg} alt="" aria-hidden className="h-full w-full object-cover" />
        </div>

        <div className="mt-4">
          <ProgressBar step={submitted ? 5 : step} />
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
          <div className="mt-6">
            <Confirmation />
          </div>
        ) : stopped ? (
          <div className="mt-6">
            <NotEligible onBack={() => { setStopped(false); scrollToStep(step); }} />
          </div>
        ) : (
          <div className="relative mt-6 space-y-12">
            {/* Step 1 — Goals & contact */}
            <section
              ref={stepRefs[0]}
              id="step-1"
              className="scroll-mt-32"
            >
              <Step1 a={a} set={set} toggleMulti={toggleMulti} dobError={dobError} />
              <div className="mt-8 pb-4">
                <PrimaryButton disabled={!step1Valid} onClick={() => scrollToStep(2)}>
                  Continue <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </section>

            {/* Step 2 — Safety */}
            <section
              ref={stepRefs[1]}
              id="step-2"
              className="scroll-mt-32"
            >
              <button
                type="button"
                onClick={() => scrollToStep(1)}
                aria-label="Go back"
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#103942]/15 bg-white text-[#103942] transition-colors hover:border-[#103942]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Step2 a={a} set={set} needsPregnancy={needsPregnancy} />
              <div className="mt-8 pb-4">
                <PrimaryButton
                  disabled={!step2Valid}
                  onClick={() => {
                    if (hardStop) {
                      void persistContact("step_2_safety_stop");
                      setStopped(true);
                      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      return;
                    }
                    void persistContact("step_2_completed");
                    scrollToStep(3);
                  }}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </section>

            {/* Step 3 — Medical history */}
            <section
              ref={stepRefs[2]}
              id="step-3"
              className="scroll-mt-32"
            >
              <button
                type="button"
                onClick={() => scrollToStep(2)}
                aria-label="Go back"
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#103942]/15 bg-white text-[#103942] transition-colors hover:border-[#103942]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Step3 a={a} set={set} toggleMulti={toggleMulti} />
              <div className="mt-8 pb-4">
                <PrimaryButton disabled={!step3Valid} onClick={() => { void persistContact("step_3_completed"); scrollToStep(4); }}>
                  Continue <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </section>

            {/* Step 4 — Plan */}
            <section
              ref={stepRefs[3]}
              id="step-4"
              className="scroll-mt-32"
            >
              <button
                type="button"
                onClick={() => scrollToStep(3)}
                aria-label="Go back"
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#103942]/15 bg-white text-[#103942] transition-colors hover:border-[#103942]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Step4 a={a} set={set} />
              <div className="mt-8 pb-4">
                <PrimaryButton disabled={!step4Valid} onClick={() => { void persistContact("step_4_completed"); scrollToStep(5); }}>
                  Continue <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </section>

            {/* Step 5 — Shipping & payment */}
            <section
              ref={stepRefs[4]}
              id="step-5"
              className="scroll-mt-32"
            >
              <button
                type="button"
                onClick={() => scrollToStep(4)}
                aria-label="Go back"
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#103942]/15 bg-white text-[#103942] transition-colors hover:border-[#103942]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Step5 a={a} set={set} />
              <div className="mt-8 pb-4">
                <PrimaryButton disabled={!step5Valid} onClick={handleContinue}>
                  Submit for provider review
                </PrimaryButton>
              </div>
            </section>
          </div>
        )}
      </div>

      <ComplianceFooter />
    </div>
  );
}

/* ─────────────── steps ─────────────── */

type SetFn = <K extends keyof Answers>(key: K, value: Answers[K]) => void;

function H({ children }: { children: React.ReactNode }) {
  return <h1 className="font-sans text-[28px] font-bold leading-tight text-[#103942]">{children}</h1>;
}

function Step1({
  a,
  set,
  toggleMulti,
  dobError,
}: {
  a: Answers;
  set: SetFn;
  toggleMulti: (k: "tried" | "conditions", label: string, none: string) => void;
  dobError: string | null;
}) {
  const goals = [
    "Lose 1-20lbs for good",
    "Lose 21-50lbs for good",
    "Lose over 50 for good",
    "Maintain my healthy weight",
    "None of the above",
    "Other",
  ];
  const tried = [
    "Exercise",
    "Dieting",
    "Weight-loss Supplements",
    "Intermittent Fasting",
    "None of the Above",
  ];
  return (
    <div className="space-y-7">
      <H>Your 60 Second Health Intake Form</H>

      <Fieldset legend="What are your weight loss goals?">
        {goals.map((g) => (
          <ChoiceCard key={g} label={g} selected={a.goal === g} onSelect={() => set("goal", g)} />
        ))}
      </Fieldset>

      <Fieldset legend="What weight loss initiatives have you tried in the past?">
        {tried.map((t) => (
          <ChoiceCard
            key={t}
            multi
            label={t}
            selected={a.tried.includes(t)}
            onSelect={() => toggleMulti("tried", t, "None of the Above")}
          />
        ))}
      </Fieldset>

      <Fieldset legend="What are your height and weight?">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Height (ft)">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="-"
              value={a.heightFt}
              onChange={(e) => set("heightFt", digits(e.target.value).slice(0, 1))}
            />
          </Field>
          <Field label="Height (in)">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="-"
              value={a.heightIn}
              onChange={(e) => set("heightIn", digits(e.target.value).slice(0, 2))}
            />
          </Field>
          <Field label="Weight (lbs)">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="-"
              value={a.weightLbs}
              onChange={(e) => set("weightLbs", digits(e.target.value).slice(0, 4))}
            />
          </Field>
        </div>
      </Fieldset>

      <div className="flex flex-col gap-3">
        <Field label="First name">
          <input className={inputClass} autoComplete="given-name" value={a.firstName} onChange={(e) => set("firstName", e.target.value)} />
        </Field>
        <Field label="Last name">
          <input className={inputClass} autoComplete="family-name" value={a.lastName} onChange={(e) => set("lastName", e.target.value)} />
        </Field>
        <Field
          label="Email"
          error={a.email.length > 3 && !emailOk(a.email) ? "Enter a valid email address." : null}
        >
          <input className={inputClass} type="email" autoComplete="email" value={a.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Phone number">
          <input
            className={inputClass}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 123-4567"
            value={a.phone}
            onChange={(e) => set("phone", formatPhone(e.target.value))}
          />
        </Field>
        <Field label="Date of birth" error={dobError}>
          <input
            className={inputClass}
            inputMode="numeric"
            placeholder="MM/DD/YYYY"
            value={a.dob}
            onChange={(e) => set("dob", formatDob(e.target.value))}
          />
        </Field>
      </div>

      <Fieldset legend="Sex assigned at birth">
        <BinaryCards
          name="Sex assigned at birth"
          options={["Male", "Female"]}
          value={a.sex}
          onChange={(v) => set("sex", v)}
        />
      </Fieldset>
    </div>
  );
}

function Step2({
  a,
  set,
  needsPregnancy,
}: {
  a: Answers;
  set: SetFn;
  needsPregnancy: boolean;
}) {
  return (
    <div className="space-y-7">
      <div>
        <H>A few safety questions</H>
        <p className="mt-2 text-[14px] text-[#103942]/60">
          These determine whether a provider can safely prescribe. Answer honestly.
        </p>
      </div>

      <Fieldset legend="Have you or anyone in your family had medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN2)?">
        <BinaryCards value={a.mtcMen2} onChange={(v) => set("mtcMen2", v)} />
      </Fieldset>

      <Fieldset legend="Have you ever had pancreatitis?">
        <BinaryCards value={a.pancreatitis} onChange={(v) => set("pancreatitis", v)} />
      </Fieldset>

      {needsPregnancy ? (
        <Fieldset legend="Are you currently pregnant, breastfeeding, or planning to become pregnant?">
          <BinaryCards value={a.pregnancy} onChange={(v) => set("pregnancy", v)} />
        </Fieldset>
      ) : null}

      <Fieldset legend="Are you currently taking another GLP-1 or GIP/GLP-1 medication?">
        <BinaryCards value={a.otherGlp1} onChange={(v) => set("otherGlp1", v)} />
      </Fieldset>
    </div>
  );
}

function Step3({
  a,
  set,
  toggleMulti,
}: {
  a: Answers;
  set: SetFn;
  toggleMulti: (k: "tried" | "conditions", label: string, none: string) => void;
}) {
  const conditions = [
    "Type 2 diabetes",
    "Type 1 diabetes",
    "High blood pressure",
    "High cholesterol",
    "Sleep apnea",
    "Fatty liver disease",
    "Gallbladder disease",
    "Kidney disease",
    "Thyroid disease",
    "Depression or anxiety",
    "Eating disorder history",
    "None of the above",
  ];
  return (
    <div className="space-y-7">
      <H>Your medical history</H>

      <Fieldset legend="Do you have any of the following conditions?">
        {conditions.map((c) => (
          <ChoiceCard
            key={c}
            multi
            label={c}
            selected={a.conditions.includes(c)}
            onSelect={() => toggleMulti("conditions", c, "None of the above")}
          />
        ))}
      </Fieldset>

      <Fieldset legend="Are you currently taking any medications?">
        <BinaryCards value={a.takingMeds} onChange={(v) => set("takingMeds", v)} />
        {a.takingMeds === "Yes" ? (
          <textarea
            className={cn(inputClass, "min-h-[96px]")}
            placeholder="List medication name and dose."
            aria-label="Current medications"
            value={a.medsList}
            onChange={(e) => set("medsList", e.target.value.slice(0, 2000))}
          />
        ) : null}
      </Fieldset>

      <Fieldset legend="Do you have any drug allergies?">
        <BinaryCards value={a.allergies} onChange={(v) => set("allergies", v)} />
        {a.allergies === "Yes" ? (
          <textarea
            className={cn(inputClass, "min-h-[96px]")}
            placeholder="List the drug and the reaction you had."
            aria-label="Drug allergies"
            value={a.allergiesList}
            onChange={(e) => set("allergiesList", e.target.value.slice(0, 2000))}
          />
        ) : null}
      </Fieldset>

      <Fieldset legend="Have you used a GLP-1 medication before?">
        <BinaryCards value={a.priorGlp1} onChange={(v) => set("priorGlp1", v)} />
        {a.priorGlp1 === "Yes" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Which medication">
              <select
                className={inputClass}
                value={a.priorGlp1Med}
                onChange={(e) => set("priorGlp1Med", e.target.value)}
              >
                <option value="">Select</option>
                <option>Semaglutide</option>
                <option>Tirzepatide</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Highest dose reached">
              <select
                className={inputClass}
                value={a.priorGlp1Dose}
                onChange={(e) => set("priorGlp1Dose", e.target.value)}
              >
                <option value="">Select</option>
                <option>Starting dose only</option>
                <option>Low dose</option>
                <option>Mid dose</option>
                <option>Highest available dose</option>
                <option>Not sure</option>
              </select>
            </Field>
          </div>
        ) : null}
      </Fieldset>
    </div>
  );
}

function Step4({ a }: { a: Answers }) {
  const included = [
    "Licensed provider review, available in all 50 states",
    "Medication from a licensed U.S. compounding pharmacy",
    "Cold-chain shipping direct to your door",
    "Provider-reviewed refills",
    "One flat monthly charge with no membership fees and no consultation fees",
  ];
  return (
    <div className="space-y-6">
      <div>
        <H>What&apos;s included</H>
        <p className="mt-2 text-[14px] text-[#103942]/60">
          One flat monthly charge with no membership fees and no consultation fees.
        </p>
      </div>

      <div className="rounded-xl border border-[#103942]/15 p-4">
        <p className="text-[15px] font-semibold text-[#103942]">What&apos;s included</p>
        <ul className="mt-3 space-y-2.5">
          {included.map((i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-[#103942]/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#42D1C3]" strokeWidth={3} />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[12px] text-[#103942]/55">
        $0 today. You are not charged until a licensed provider approves your prescription.
      </p>
    </div>
  );
}

function Step5({ a, set }: { a: Answers; set: SetFn }) {
  return (
    <div className="space-y-7">
      <H>Where should we ship it?</H>

      <div className="flex flex-col gap-3">
        <Field label="Street address">
          <input className={inputClass} autoComplete="address-line1" value={a.address1} onChange={(e) => set("address1", e.target.value)} />
        </Field>
        <Field label="Apt/Suite (optional)">
          <input className={inputClass} autoComplete="address-line2" value={a.address2} onChange={(e) => set("address2", e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="City">
            <input className={inputClass} autoComplete="address-level2" value={a.city} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label="State">
            <select className={inputClass} autoComplete="address-level1" value={a.state} onChange={(e) => set("state", e.target.value)}>
              <option value="">Select</option>
              {US_STATE_LIST.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="ZIP">
          <input
            className={inputClass}
            inputMode="numeric"
            autoComplete="postal-code"
            value={a.zip}
            onChange={(e) => set("zip", digits(e.target.value).slice(0, 5))}
          />
        </Field>
      </div>

      <div>
        <p className="text-[15px] font-bold text-[#103942]">
          $0 today — your card is only charged if a provider approves you.
        </p>
        <div
          className="mt-3 flex min-h-[52px] items-center gap-3 rounded-xl border border-dashed border-[#103942]/25 bg-[#F5F5F7] px-4 py-3 text-[14px] text-[#103942]/60"
          aria-label="Secure card details"
        >
          <CreditCard className="h-4 w-4 shrink-0" />
          <span>Secure card field (Stripe Elements mounts here once payment keys are connected).</span>
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Required consents</legend>
        <ConsentRow
          checked={a.consentAccurate}
          onChange={(v) => set("consentAccurate", v)}
          label="I confirm the information I've provided is accurate and complete."
        />
        <ConsentRow
          checked={a.consentTerms}
          onChange={(v) => set("consentTerms", v)}
          label={
            <>
              I agree to the{" "}
              <Link to="/terms-of-use" className="underline">Terms of Service</Link>,{" "}
              <Link to="/privacy-policy" className="underline">Privacy Policy</Link>,{" "}
              <Link to="/telehealth-consent" className="underline">Telehealth Consent</Link>, and{" "}
              <Link to="/notice-of-privacy-practices" className="underline">HIPAA Notice</Link>.
            </>
          }
        />
        <ConsentRow
          checked={a.consentCompounded}
          onChange={(v) => set("consentCompounded", v)}
          label="I understand that compounded medications are not FDA-approved and are not reviewed by the FDA for safety, effectiveness, or quality."
        />
      </fieldset>
    </div>
  );
}

function ConsentRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-xl border border-[#103942]/15 px-4 py-3 text-[13px] leading-snug text-[#103942]/85">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 accent-[#42D1C3]"
      />
      <span>{label}</span>
    </label>
  );
}

function NotEligible({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <H>We&apos;re not able to move forward right now</H>
      <p className="mt-4 text-[15px] leading-relaxed text-[#103942]/75">
        Based on the answers you gave, this treatment is not appropriate for you. Please speak with
        your own physician about your health and the options that may be right for you.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 flex min-h-[44px] w-full items-center justify-center rounded-xl border border-[#103942]/15 bg-white text-[14px] font-semibold text-[#103942] transition-colors hover:border-[#103942]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
      >
        Go back and review my answers
      </button>
      <Link
        to="/"
        className="mt-4 inline-block min-h-[44px] pt-3 text-[14px] font-semibold text-[#103942] underline underline-offset-4"
      >
        Return to the homepage
      </Link>
    </div>
  );
}

function Confirmation() {

  return (
    <div className="space-y-4">
      <H>Your intake is with a provider.</H>
      <p className="text-[15px] leading-relaxed text-[#103942]/75">
        A licensed provider will review your information within 24 hours. You&apos;ll get an email
        either way — whether or not treatment is appropriate for you.
      </p>
      <p className="text-[15px] leading-relaxed text-[#103942]/75">
        Nothing has been charged. You are only charged if a provider approves a prescription.
      </p>
      <Link
        to="/"
        className="inline-block min-h-[44px] pt-3 text-[14px] font-semibold text-[#103942] underline underline-offset-4"
      >
        Back to homepage
      </Link>
    </div>
  );
}

export function useNoop() {
  return useMemo(() => null, []);
}
