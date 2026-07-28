import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  BACKEND_REQUIREMENTS,
  INTAKE_SECTIONS,
  type IntakeField,
  type IntakeSection,
} from "@/lib/intake-schema";

export const Route = createFileRoute("/intake/clinical")({
  component: ClinicalIntake,
  head: () => ({
    meta: [
      { title: "Health Assessment | Chubby No More" },
      {
        name: "description",
        content:
          "Complete your Chubby No More health assessment. A licensed provider reviews your information before any treatment decision.",
      },
      { property: "og:title", content: "Health Assessment | Chubby No More" },
      {
        property: "og:description",
        content:
          "Complete your Chubby No More health assessment. A licensed provider reviews your information before any treatment decision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

/**
 * A secure clinical backend is NOT connected. Until it is:
 *  - answers live in React state only (no localStorage/sessionStorage, no network)
 *  - final submission is disabled
 *  - a development-only warning is shown (hidden from production users)
 */
const CLINICAL_BACKEND_CONNECTED = false;
const IS_DEV = import.meta.env.DEV;

type AnswerValue = string | boolean;
type Answers = Record<string, AnswerValue>;

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-[#103942] placeholder:text-[#103942]/40 focus:outline-none focus:ring-2 focus:ring-[#42D1C3]";

function fieldError(field: IntakeField, value: AnswerValue | undefined): string | null {
  if (field.type === "checkbox") {
    return field.required && value !== true ? "This acknowledgment is required to continue." : null;
  }
  const raw = typeof value === "string" ? value.trim() : "";
  if (field.required && !raw) return `${field.label.replace(/\s*\[.*\]$/, "")} is required.`;
  if (!raw) return null;

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw)) {
    return "Enter a valid email address.";
  }
  if (field.type === "tel" && raw.replace(/\D/g, "").length < 10) {
    return "Enter a valid 10-digit phone number.";
  }
  if (field.type === "number") {
    const n = Number(raw);
    if (Number.isNaN(n)) return "Enter a number.";
    if (field.min !== undefined && n < field.min) return `Must be at least ${field.min}.`;
    if (field.max !== undefined && n > field.max) return `Must be ${field.max} or less.`;
  }
  if (field.id === "date_of_birth") {
    const dob = new Date(raw);
    if (Number.isNaN(dob.getTime())) return "Enter a valid date.";
    const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 3600 * 1000);
    if (age < 18) return "You must be 18 or older to continue.";
    if (age > 120) return "Enter a valid date of birth.";
  }
  if (field.id === "ship_zip" && !/^\d{5}(-\d{4})?$/.test(raw)) {
    return "Enter a valid ZIP code.";
  }
  return null;
}

function ClinicalIntake() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmationPreview, setShowConfirmationPreview] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const sections = INTAKE_SECTIONS;
  const section = sections[stepIndex];
  const progress = Math.round(((stepIndex + 1) / sections.length) * 100);

  const setValue = (id: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const focusHeading = () => {
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const goTo = (index: number) => {
    setStepIndex(Math.min(Math.max(index, 0), sections.length - 1));
    focusHeading();
  };

  const validateSection = (s: IntakeSection) => {
    const next: Record<string, string> = {};
    for (const f of s.fields) {
      const err = fieldError(f, answers[f.id]);
      if (err) next[f.id] = err;
    }
    // Signature must match the legal name entered in step 1.
    if (s.id === "signature") {
      const typed = String(answers.signature_name ?? "").trim().toLowerCase();
      const legal = `${String(answers.legal_first_name ?? "").trim()} ${String(
        answers.legal_last_name ?? "",
      ).trim()}`
        .trim()
        .toLowerCase();
      if (typed && legal && typed !== legal) {
        next.signature_name = "Signature must match the legal name you entered.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onContinue = () => {
    if (!validateSection(section)) {
      const firstId = section.fields.find((f) => errors[f.id] || fieldError(f, answers[f.id]))?.id;
      if (firstId) document.getElementById(firstId)?.focus();
      return;
    }
    goTo(stepIndex + 1);
  };

  const answeredSections = useMemo(
    () =>
      sections
        .filter((s) => s.fields.length > 0)
        .map((s) => ({
          section: s,
          entries: s.fields
            .map((f) => ({ field: f, value: answers[f.id] }))
            .filter((e) => e.value !== undefined && e.value !== "" && e.value !== false),
        })),
    [sections, answers],
  );

  if (showConfirmationPreview) {
    return (
      <main className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-6 sm:py-24">
        {IS_DEV && <DevWarning preview />}
        <h1 className="font-serif text-3xl leading-tight text-[#103942] sm:text-4xl">
          Your information has been submitted for review by a licensed provider.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#103942]/70">
          A licensed provider will review your health information and determine whether any
          available treatment option may be medically appropriate.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
        >
          Return home
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 sm:py-16">
      {IS_DEV && !CLINICAL_BACKEND_CONNECTED && <DevWarning />}

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between text-sm font-semibold text-[#103942]/70">
          <span>
            Step {stepIndex + 1} of {sections.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Health assessment progress"
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#F5F5F7]"
        >
          <div
            className="h-full rounded-full bg-[#42D1C3] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-serif text-2xl leading-tight text-[#103942] outline-none sm:text-3xl"
      >
        {section.title}
      </h1>
      {section.intro && (
        <p className="mt-3 text-sm leading-relaxed text-[#103942]/70 sm:text-base">
          {section.intro}
        </p>
      )}

      <div className="mt-8">
        {section.awaitingClinicalApproval ? (
          <PendingClinicalSection section={section} />
        ) : section.isReview ? (
          <ReviewStep
            groups={answeredSections}
            onEdit={(id) => goTo(sections.findIndex((s) => s.id === id))}
          />
        ) : (
          <div className="space-y-5">
            {section.fields.map((f) => (
              <Field
                key={f.id}
                field={f}
                value={answers[f.id]}
                error={errors[f.id]}
                onChange={(v) => setValue(f.id, v)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
        {section.isReview ? (
          <button
            type="button"
            disabled={!CLINICAL_BACKEND_CONNECTED}
            onClick={() => setShowConfirmationPreview(true)}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942] disabled:cursor-not-allowed disabled:bg-[#103942]/25 disabled:hover:text-white sm:w-auto"
          >
            Submit for provider review
          </button>
        ) : (
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942] sm:w-auto"
          >
            Continue
          </button>
        )}

        <button
          type="button"
          onClick={() => goTo(stepIndex - 1)}
          disabled={stepIndex === 0}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#103942]/15 px-7 py-3.5 text-sm font-semibold text-[#103942] transition hover:border-[#103942] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          Back
        </button>
      </div>

      {section.isReview && !CLINICAL_BACKEND_CONNECTED && (
        <p className="mt-4 text-sm leading-relaxed text-[#103942]/70">
          Submission is turned off until the secure clinical system is connected. Nothing you enter
          here is sent or stored.
        </p>
      )}

      {/* Save and return */}
      <div className="mt-10 rounded-2xl bg-[#F5F5F7] p-5">
        <p className="text-sm font-semibold text-[#103942]">Save and return later</p>
        <p className="mt-1 text-sm leading-relaxed text-[#103942]/70">
          Saving your progress requires the secure clinical system and a signed-in session. It is
          not available yet, so your answers stay in this browser tab only and are cleared when you
          leave.
        </p>
        <button
          type="button"
          disabled
          className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full border border-[#103942]/15 px-5 py-2.5 text-sm font-semibold text-[#103942] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save and finish later
        </button>
      </div>
    </main>
  );
}

function DevWarning({ preview }: { preview?: boolean }) {
  return (
    <div
      role="note"
      className="mb-8 rounded-2xl border-2 border-dashed border-[#103942]/30 bg-[#F5F5F7] p-5"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-[#103942]">
        Development only — not visible in production
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#103942]/80">
        {preview
          ? "This is a preview of the confirmation screen. Nothing was submitted, sent, or stored."
          : "No secure clinical backend is connected. Answers exist in memory only — they are not sent, emailed, or written to browser storage, and final submission is disabled."}
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#103942]/80">
        {BACKEND_REQUIREMENTS.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

function PendingClinicalSection({ section }: { section: IntakeSection }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#103942]/25 bg-[#F5F5F7] p-6">
      <p className="text-sm font-bold uppercase tracking-wide text-[#103942]">
        Awaiting licensed-provider approval
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#103942]/80">
        The questions for this section have not been written yet. No medical questions, screening
        rules, or eligibility logic have been created for it, and nothing is collected here.
      </p>
      {section.requiredFromProvider && (
        <>
          <p className="mt-4 text-sm font-semibold text-[#103942]">
            Required from the licensed provider:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#103942]/80">
            {section.requiredFromProvider.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: IntakeField;
  value: AnswerValue | undefined;
  error?: string;
  onChange: (v: AnswerValue) => void;
}) {
  const describedBy = [error ? `${field.id}-error` : null, field.help ? `${field.id}-help` : null]
    .filter(Boolean)
    .join(" ");
  const borderClass = error ? "border-[#103942] ring-2 ring-[#103942]/20" : "border-[#103942]/15";

  if (field.type === "checkbox") {
    return (
      <div>
        <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed text-[#103942]">
          <input
            id={field.id}
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#103942]/30 accent-[#42D1C3]"
          />
          <span>
            {field.label}
            {field.pendingLegalReview && (
              <span className="ml-1 font-semibold text-[#103942]/60">(pending review)</span>
            )}
          </span>
        </label>
        {error && <FieldError id={`${field.id}-error`}>{error}</FieldError>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.id} className="block text-sm font-semibold text-[#103942]">
        {field.label}
        {field.required && <span aria-hidden="true"> *</span>}
      </label>
      {field.help && (
        <p id={`${field.id}-help`} className="mt-1 text-sm text-[#103942]/60">
          {field.help}
        </p>
      )}
      <div className="mt-2">
        {field.type === "select" ? (
          <select
            id={field.id}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className={`${inputBase} ${borderClass}`}
          >
            <option value="">Select…</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea
            id={field.id}
            rows={3}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className={`${inputBase} ${borderClass}`}
          />
        ) : (
          <input
            id={field.id}
            type={field.type === "number" ? "text" : field.type}
            inputMode={field.inputMode ?? (field.type === "number" ? "numeric" : undefined)}
            autoComplete={field.autoComplete}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className={`${inputBase} ${borderClass}`}
          />
        )}
      </div>
      {error && <FieldError id={`${field.id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-semibold text-[#103942]">
      <span aria-hidden="true">⚠ </span>
      {children}
    </p>
  );
}

function ReviewStep({
  groups,
  onEdit,
}: {
  groups: { section: IntakeSection; entries: { field: IntakeField; value: AnswerValue }[] }[];
  onEdit: (sectionId: string) => void;
}) {
  const filled = groups.filter((g) => g.entries.length > 0);
  return (
    <div className="space-y-5">
      {filled.length === 0 && (
        <p className="text-sm text-[#103942]/70">No answers entered yet.</p>
      )}
      {filled.map(({ section, entries }) => (
        <div key={section.id} className="rounded-2xl border border-[#103942]/12 bg-white p-5">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-base font-semibold text-[#103942]">{section.title}</h2>
            <button
              type="button"
              onClick={() => onEdit(section.id)}
              className="text-sm font-semibold text-[#103942] underline hover:no-underline"
            >
              Edit
              <span className="sr-only"> {section.title}</span>
            </button>
          </div>
          <dl className="mt-3 space-y-2">
            {entries.map(({ field, value }) => (
              <div key={field.id} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="text-sm text-[#103942]/60 sm:w-1/2">
                  {field.label.replace(/\s*\[.*\]$/, "")}
                </dt>
                <dd className="text-sm font-semibold text-[#103942] sm:w-1/2">
                  {value === true ? "Acknowledged" : String(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      <p className="text-sm leading-relaxed text-[#103942]/70">
        A licensed provider reviews your information before any treatment decision. No treatment or
        medication is recommended or confirmed at this stage.
      </p>
    </div>
  );
}
