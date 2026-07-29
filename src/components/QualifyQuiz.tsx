import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ContactCaptureStep } from "@/components/ContactCaptureStep";

const MINT = "#42D1C3";

/**
 * Verified Chubby No More support email. The mailto link carries no health
 * information — subject and body are fixed, generic, and URL-encoded.
 */
const SUPPORT_EMAIL = "hello@chubbynomore.com";
const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Question about Chubby No More",
)}&body=${encodeURIComponent(
  "Hi Chubby No More team,\n\nI completed the online questionnaire and have a question about my results.",
)}`;

type Answers = Record<string, unknown>;

type QuestionStep = {
  id: string;
  render: (ctx: {
    answers: Answers;
    setAnswer: (id: string, value: unknown) => void;
  }) => React.ReactNode;
  isAnswered: (answers: Answers) => boolean;
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
   Any selection in `reviewRequired` routes to the provider-review
   outcome regardless of BMI group.
   ---------------------------------------------------- */
const HEALTH_ROUTING: {
  reviewRequired: string[];
  continueIntake: string[];
} = {
  reviewRequired: [
    HEALTH_OPTIONS[0],
    HEALTH_OPTIONS[1],
    HEALTH_OPTIONS[2],
    HEALTH_OPTIONS[3],
    HEALTH_OPTIONS[4],
  ],
  continueIntake: [
    HEALTH_OPTIONS[5],
    HEALTH_OPTIONS[6],
    HEALTH_OPTIONS[7],
    HEALTH_OPTIONS[8],
    HEALTH_OPTIONS[9],
    HEALTH_NONE,
  ],
};

/* ─────────── BMI CONFIG ───────────
   BMI = 703 × weight(lb) ÷ height(in)²  — rounded to one decimal.
   Screening measure only; never an eligibility or medical determination. */
const BMI_THRESHOLDS = {
  possibleFit: 30, // >= 30.0            -> possible_fit
  conditional: 27, // 27.0 – 29.9        -> conditional question
  alternative: 18.5, // 18.5 – 26.9      -> alternative_path
  // < 18.5                              -> safety_path
};

export function computeBmi(
  feet: number,
  inches: number,
  pounds: number,
): number | null {
  const totalIn = feet * 12 + inches;
  if (!Number.isFinite(totalIn) || totalIn <= 0 || !Number.isFinite(pounds))
    return null;
  return Math.round(((703 * pounds) / (totalIn * totalIn)) * 10) / 10;
}

type Outcome =
  | "possible_fit"
  | "provider_review"
  | "alternative_path"
  | "safety_path"
  | "adults_only";

const numInput =
  "w-full rounded-2xl border border-[#103942]/12 bg-white px-5 py-4 text-lg font-semibold text-[#103942] outline-none transition focus:border-[#103942] focus:ring-2 focus:ring-[#42D1C3]";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      id="qualify-modal-title"
      className="font-serif text-2xl font-semibold leading-tight text-[#103942] sm:text-3xl"
    >
      {children}
    </h2>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="mt-6 flex flex-col gap-3"
    >
      {options.map((o) => {
        const selected = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.id)}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3] ${
              selected
                ? "border-[#103942] bg-[#103942] text-white"
                : "border-[#103942]/12 bg-white text-[#103942] hover:border-[#103942]"
            }`}
          >
            <span>{o.label}</span>
            <span
              aria-hidden="true"
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                selected ? "border-white" : "border-[#103942]/30"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const BMI_NOTE =
  "BMI is one screening measure. A licensed provider considers your complete health information when determining whether treatment may be appropriate.";

const adultStep: QuestionStep = {
  id: "is_adult",
  isAnswered: (a) => a["is_adult"] === "yes" || a["is_adult"] === "no",
  render: ({ answers, setAnswer }) => (
    <div>
      <Heading>Are you 18 or older?</Heading>
      <p className="mt-3 text-sm leading-relaxed text-[#103942]/70">
        Chubby No More is intended for adults only.
      </p>
      <ChoiceGroup
        label="Are you 18 or older?"
        options={[
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ]}
        value={answers["is_adult"] as string | undefined}
        onChange={(id) => setAnswer("is_adult", id)}
      />
    </div>
  ),
};

const heightStep: QuestionStep = {
  id: "height",
  isAnswered: (a) => {
    const ft = Number(a["height_ft"]);
    const inch = Number(a["height_in"]);
    return (
      a["height_ft"] !== undefined &&
      a["height_ft"] !== "" &&
      a["height_in"] !== undefined &&
      a["height_in"] !== "" &&
      Number.isInteger(ft) &&
      Number.isInteger(inch) &&
      ft >= 3 &&
      ft <= 8 &&
      inch >= 0 &&
      inch <= 11
    );
  },
  render: ({ answers, setAnswer }) => {
    const ftRaw = (answers["height_ft"] as string) ?? "";
    const inRaw = (answers["height_in"] as string) ?? "";
    const touched = Boolean(answers["height_touched"]);
    const ft = Number(ftRaw);
    const inch = Number(inRaw);
    const ftValid = ftRaw !== "" && Number.isInteger(ft) && ft >= 3 && ft <= 8;
    const inValid =
      inRaw !== "" && Number.isInteger(inch) && inch >= 0 && inch <= 11;
    return (
      <div>
        <Heading>How tall are you?</Heading>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="q-height-ft"
              className="text-sm font-semibold text-[#103942]/70"
            >
              Feet
            </label>
            <input
              id="q-height-ft"
              type="number"
              inputMode="numeric"
              min={3}
              max={8}
              step={1}
              value={ftRaw}
              onChange={(e) => {
                setAnswer("height_ft", e.target.value.replace(/[^\d]/g, ""));
                setAnswer("height_touched", true);
              }}
              aria-invalid={(touched && !ftValid) || undefined}
              className={`mt-1.5 ${numInput}`}
            />
          </div>
          <div>
            <label
              htmlFor="q-height-in"
              className="text-sm font-semibold text-[#103942]/70"
            >
              Inches
            </label>
            <input
              id="q-height-in"
              type="number"
              inputMode="numeric"
              min={0}
              max={11}
              step={1}
              value={inRaw}
              onChange={(e) => {
                setAnswer("height_in", e.target.value.replace(/[^\d]/g, ""));
                setAnswer("height_touched", true);
              }}
              aria-invalid={(touched && !inValid) || undefined}
              className={`mt-1.5 ${numInput}`}
            />
          </div>
        </div>
        {touched && (!ftValid || !inValid) && (
          <p className="mt-2 text-sm text-[#B00020]">
            {!ftValid
              ? "Please enter your height in feet (3–8)."
              : "Inches must be a whole number between 0 and 11."}
          </p>
        )}
        <p className="mt-4 text-xs leading-relaxed text-[#103942]/70">
          {BMI_NOTE}
        </p>
      </div>
    );
  },
};

const weightStep: QuestionStep = {
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
    const valid = raw !== "" && Number.isInteger(n) && n >= 70 && n <= 800;
    const showError = touched && !valid;
    return (
      <div>
        <Heading>What is your current weight?</Heading>
        <div className="mt-6">
          <label htmlFor="q-current-weight" className="sr-only">
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
              className={`${numInput} pr-16`}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-sm font-semibold text-[#103942]/70"
            >
              lbs
            </span>
          </div>
          {showError && (
            <p id="q-current-weight-err" className="mt-2 text-sm text-[#B00020]">
              Please enter a weight between 70 and 800 pounds.
            </p>
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[#103942]/70">
          {BMI_NOTE}
        </p>
      </div>
    );
  },
};

const glp1Step: QuestionStep = {
  id: "current_glp1",
  isAnswered: (a) => {
    const v = a["current_glp1"];
    return v === "yes" || v === "no" || v === "unsure";
  },
  render: ({ answers, setAnswer }) => (
    <div>
      <Heading>Are you currently taking a GLP-1 medication?</Heading>
      <p className="mt-3 text-sm leading-relaxed text-[#103942]/70">
        Examples may include semaglutide, tirzepatide, Wegovy, Zepbound,
        Ozempic, or Mounjaro.
      </p>
      <ChoiceGroup
        label="Are you currently taking a GLP-1 medication?"
        options={[
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
          { id: "unsure", label: "I’m not sure" },
        ]}
        value={answers["current_glp1"] as string | undefined}
        onChange={(id) => setAnswer("current_glp1", id)}
      />
    </div>
  ),
};

const healthStep: QuestionStep = {
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
          withoutNone.filter((s) => s !== opt),
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
              ? "border-[#103942] bg-[#F5F5F7] text-[#103942]"
              : "border-[#103942]/12 bg-white text-[#103942] hover:border-[#103942]"
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
                ? "border-[#103942] bg-[#103942] text-white"
                : "border-[#103942]/30 bg-white"
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
        <Heading>Do any of the following apply to you?</Heading>
        <p className="mt-3 text-sm leading-relaxed text-[#103942]/70">
          Select all that apply.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          {HEALTH_OPTIONS.map((opt) => (
            <Row key={opt} opt={opt} />
          ))}
          <div className="mt-2 border-t border-[#103942]/12 pt-2.5">
            <Row opt={HEALTH_NONE} />
          </div>
        </div>
      </div>
    );
  },
};

const weightRelatedStep: QuestionStep = {
  id: "weight_related_condition",
  isAnswered: (a) => {
    const v = a["weight_related_condition"];
    return v === "yes" || v === "no" || v === "unsure";
  },
  render: ({ answers, setAnswer }) => (
    <div>
      <Heading>
        Has a licensed healthcare professional ever told you that you have a
        weight-related health condition?
      </Heading>
      <p className="mt-3 text-xs leading-relaxed text-[#103942]/70">
        Examples may include high blood pressure, high cholesterol, type 2
        diabetes, obstructive sleep apnea, or cardiovascular disease.
      </p>
      <ChoiceGroup
        label="Weight-related health condition"
        options={[
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
          { id: "unsure", label: "I’m not sure" },
        ]}
        value={answers["weight_related_condition"] as string | undefined}
        onChange={(id) => setAnswer("weight_related_condition", id)}
      />
    </div>
  ),
};

/**
 * Full-page screening questionnaire. All answers (height, weight, BMI,
 * health responses, result path) live in React state only — never in
 * localStorage, URLs, analytics, or the marketing sync payload.
 */
export function QualifyQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [showContact, setShowContact] = useState(false);
  const [startedAt] = useState(() => new Date().toISOString());

  const setAnswer = (id: string, value: unknown) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  // Clear temporary screening data when the session ends.
  useEffect(() => {
    const clear = () => setAnswers({});
    window.addEventListener("pagehide", clear);
    return () => window.removeEventListener("pagehide", clear);
  }, []);

  const bmi = useMemo(() => {
    const ft = Number(answers["height_ft"]);
    const inch = Number(answers["height_in"]);
    const lbs = Number(answers["current_weight"]);
    if (!Number.isFinite(ft) || !Number.isFinite(inch) || !Number.isFinite(lbs))
      return null;
    if (!answers["height_ft"] || !answers["current_weight"]) return null;
    return computeBmi(ft, inch, lbs);
  }, [answers]);

  const needsConditional =
    bmi !== null &&
    bmi >= BMI_THRESHOLDS.conditional &&
    bmi < BMI_THRESHOLDS.possibleFit;

  const steps: QuestionStep[] = useMemo(() => {
    const list = [adultStep, heightStep, weightStep, glp1Step, healthStep];
    if (needsConditional) list.push(weightRelatedStep);
    return list;
  }, [needsConditional]);

  const underAge = answers["is_adult"] === "no";
  const totalSteps = steps.length + 1; // + result
  const currentQuestion = step <= steps.length ? steps[step - 1] : null;
  const isResult = underAge || step > steps.length;

  const outcome: Outcome | null = useMemo(() => {
    if (underAge) return "adults_only";
    if (!isResult || bmi === null) return null;
    const selectedHealth = (answers["health_conditions"] as string[]) ?? [];
    const flagged = selectedHealth.some((s) =>
      HEALTH_ROUTING.reviewRequired.includes(s),
    );
    if (bmi < BMI_THRESHOLDS.alternative) return "safety_path";
    if (bmi < BMI_THRESHOLDS.conditional) return "alternative_path";
    if (flagged) return "provider_review";
    if (bmi >= BMI_THRESHOLDS.possibleFit) return "possible_fit";
    const cond = answers["weight_related_condition"];
    return cond === "yes" ? "possible_fit" : "provider_review";
  }, [underAge, isResult, bmi, answers]);

  const nextEnabled = currentQuestion
    ? currentQuestion.isAnswered(answers)
    : true;

  const goNext = () => {
    if (!nextEnabled) return;
    if (currentQuestion?.id === "is_adult" && answers["is_adult"] === "no")
      return; // result renders automatically
    setStep((s) => Math.min(s + 1, totalSteps));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const pct = underAge ? 100 : Math.round((step / totalSteps) * 100);
  const stepLabel = isResult
    ? "Your result"
    : `Step ${step} of ${totalSteps}`;

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-8 sm:py-12">
      <div className="overflow-hidden rounded-3xl border border-[#103942]/12 bg-white shadow-sm">
        <div className="border-b border-[#103942]/12 px-6 pt-6 pb-4 sm:px-8">
          <span className="font-serif text-[20px] font-bold text-[#103942]">
            ChubbyNoMore
          </span>
          <div
            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F5F7]"
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

        <div className="px-6 py-7 sm:px-8 sm:py-8">
          {!isResult && currentQuestion && (
            <div>
              {currentQuestion.render({ answers, setAnswer })}
              <ModalNav
                onBack={goBack}
                onNext={goNext}
                nextLabel={step === steps.length ? "See my result" : "Next"}
                nextDisabled={!nextEnabled}
                showBack={step > 1}
              />
            </div>
          )}

          {isResult && outcome && !showContact && (
            <ResultCard
              outcome={outcome}
              onJoin={() => setShowContact(true)}
              onBack={underAge ? () => setAnswer("is_adult", undefined) : goBack}
            />
          )}

          {isResult && showContact && (
            <ContactCaptureStep
              onBack={() => setShowContact(false)}
              screening={{
                isAdult: answers["is_adult"] === "no" ? "no" : "yes",
                priorGlp1Use: answers["current_glp1"] as
                  | "yes"
                  | "no"
                  | "unsure"
                  | undefined,
                healthConditions:
                  (answers["health_conditions"] as string[]) ?? [],
                heightFeet: answers["height_ft"]
                  ? Number(answers["height_ft"])
                  : undefined,
                heightInches:
                  answers["height_in"] !== undefined &&
                  answers["height_in"] !== ""
                    ? Number(answers["height_in"])
                    : undefined,
                weightPounds: answers["current_weight"]
                  ? Number(answers["current_weight"])
                  : undefined,
                weightRelatedConditionResponse: answers[
                  "weight_related_condition"
                ] as "yes" | "no" | "unsure" | undefined,
                startedAt: startedAt,
              }}
              onSaved={(leadId) => {
                try {
                  sessionStorage.setItem("cnm_lead_id", leadId);
                } catch {
                  /* storage unavailable — continue anyway */
                }
                setAnswers({}); // clear temporary screening data
                navigate({ to: "/intake/clinical" });
              }}
            />
          )}
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-md text-center text-xs leading-relaxed text-[#103942]/70">
        This questionnaire is not a determination of eligibility and does not
        guarantee a prescription. A licensed provider reviews your complete
        health information before any treatment decision.
      </p>
    </div>
  );
}

const RESULT_COPY: Record<
  Outcome,
  { eyebrow: string; headline: string; body: string; primary: string }
> = {
  possible_fit: {
    eyebrow: "YOUR NEXT STEP",
    headline: "We may be a good fit for you.",
    body: "Based on what you’ve shared so far, Chubby No More may be able to help. A licensed provider would still need to review your complete health information before deciding whether treatment is appropriate.",
    primary: "Join the list",
  },
  provider_review: {
    eyebrow: "LET’S FIND THE RIGHT PATH",
    headline: "A provider can help determine your next step.",
    body: "Your BMI is only one part of the picture. A licensed provider can review your health history and determine whether a weight-management treatment may be appropriate.",
    primary: "Join the list",
  },
  alternative_path: {
    eyebrow: "LET’S FIND THE RIGHT PATH",
    headline: "GLP-1 treatment may not be the best starting point.",
    body: "Based on the information you shared, Chubby No More may not be the right fit at this time. BMI is only one screening measure, and a healthcare professional can consider your complete health picture and discuss other options that may support your goals.",
    primary: "Return to Chubby No More",
  },
  safety_path: {
    eyebrow: "YOUR HEALTH COMES FIRST",
    headline: "Weight-loss treatment may not be appropriate right now.",
    body: "Based on the height and weight entered, we recommend speaking with a healthcare professional before pursuing weight-loss treatment. A provider can review your complete health information and help determine the right next step.",
    primary: "Return to Chubby No More",
  },
  adults_only: {
    eyebrow: "YOUR HEALTH COMES FIRST",
    headline: "This service is intended for adults.",
    body: "Chubby No More is currently available to adults 18 and older. A healthcare professional can review your health information and help determine the right next step.",
    primary: "Return to Chubby No More",
  },
};

function ResultCard({
  outcome,
  onJoin,
  onBack,
}: {
  outcome: Outcome;
  onJoin: () => void;
  onBack?: () => void;
}) {
  const copy = RESULT_COPY[outcome];
  const isJoin = outcome === "possible_fit" || outcome === "provider_review";
  return (
    <div className="py-2">
      <div
        className="text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: MINT }}
      >
        {copy.eyebrow}
      </div>
      <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#103942] sm:text-3xl">
        {copy.headline}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[#103942]/80">
        {copy.body}
      </p>

      <div className="mt-8 flex flex-col items-center gap-4">
        {isJoin ? (
          <button
            type="button"
            onClick={onJoin}
            className="w-full rounded-full bg-[#103942] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
          >
            {copy.primary}
          </button>
        ) : (
          <a
            href="/"
            className="w-full rounded-full bg-[#103942] px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
          >
            {copy.primary}
          </a>
        )}

        <a
          href={SUPPORT_MAILTO}
          className="text-sm font-semibold text-[#103942] underline-offset-4 hover:underline"
        >
          Have a question? Email our team
        </a>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-[#103942]/70 underline-offset-4 hover:underline"
          >
            ← Back
          </button>
        )}
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
          className="rounded-full border border-[#103942]/12 bg-white px-5 py-2.5 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3]"
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
        className="inline-flex items-center gap-2 rounded-full bg-[#103942] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {nextLabel} →
      </button>
    </div>
  );
}
