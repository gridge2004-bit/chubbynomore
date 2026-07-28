import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ContactCaptureStep } from "@/components/ContactCaptureStep";

const MINT = "#42D1C3";

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
            className="font-serif text-2xl font-semibold leading-tight text-[#103942] sm:text-3xl"
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
                className="w-full rounded-2xl border border-[#103942]/12 bg-white px-5 py-4 pr-16 text-lg font-semibold text-[#103942] outline-none transition focus:border-[#103942] focus:ring-2 focus:ring-[#42D1C3]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-sm font-semibold text-[#103942]/70"
              >
                lbs
              </span>
            </div>
            {showError && (
              <p
                id="q-current-weight-err"
                className="mt-2 text-sm text-[#B00020]"
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
            className="font-serif text-2xl font-semibold leading-tight text-[#103942] sm:text-3xl"
          >
            Are you currently taking a GLP-1 medication?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#103942]/70">
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
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3] ${
                    selected
                      ? "border-[#103942] bg-[#103942] text-white"
                      : "border-[#103942]/12 bg-white text-[#103942] hover:border-[#103942]"
                  }`}
                >
                  <span>{o.label}</span>
                  <span
                    aria-hidden="true"
                    className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                      selected ? "border-white" : "border-[#103942]/30"
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
          <h2
            id="qualify-modal-title"
            className="font-serif text-2xl font-semibold leading-tight text-[#103942] sm:text-3xl"
          >
            Do any of the following apply to you?
          </h2>
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
  },
];

/**
 * Full-page eligibility quiz: 3 screening questions, then contact capture.
 * No health answers are persisted or transmitted anywhere.
 */
export function QualifyQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  const totalQuestions = questionSteps.length;
  const setAnswer = (id: string, value: unknown) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const contactStep = totalQuestions + 1;
  const isContact = step === contactStep;
  const currentQuestion =
    step >= 1 && step <= totalQuestions ? questionSteps[step - 1] : null;
  const nextEnabled = currentQuestion ? currentQuestion.isAnswered(answers) : true;

  const goNext = () => {
    if (!nextEnabled) return;
    setStep((s) => Math.min(s + 1, contactStep));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const pct = Math.round((step / (totalQuestions + 1)) * 100);
  const stepLabel = isContact
    ? "Your details"
    : `Step ${step} of ${totalQuestions + 1}`;

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
          {currentQuestion && (
            <div>
              {currentQuestion.render({ answers, setAnswer })}
              <ModalNav
                onBack={goBack}
                onNext={goNext}
                nextLabel={step === totalQuestions ? "Continue" : "Next"}
                nextDisabled={!nextEnabled}
                showBack={step > 1}
              />
            </div>
          )}

          {isContact && (
            <ContactCaptureStep
              onBack={goBack}
              onSaved={(leadId) => {
                try {
                  sessionStorage.setItem("cnm_lead_id", leadId);
                } catch {
                  /* storage unavailable — continue anyway */
                }
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
