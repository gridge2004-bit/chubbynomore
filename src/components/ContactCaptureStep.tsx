import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createLead, CONSENT_TEXT_VERSION } from "@/lib/leads.functions";

const MINT = "#42D1C3";

export const OPERATIONAL_CONSENT_TEXT =
  "I agree to receive communications related to my eligibility assessment, account, and requested care.";
export const MARKETING_CONSENT_TEXT =
  "I agree to receive promotional emails and text messages from Chubby No More. Consent is not a condition of purchasing or receiving care. Message and data rates may apply. Message frequency varies. Reply STOP to opt out.";

const STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

type Errors = Partial<Record<string, string>>;

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-[#103942]/20 bg-white px-4 py-3 text-base text-[#103942] outline-none transition focus:border-[#42D1C3] focus:ring-2 focus:ring-[#42D1C3]/40";

function Req() {
  return (
    <span aria-hidden="true" className="ml-0.5 text-[#103942]/60">
      *
    </span>
  );
}

/**
 * Contact capture step. Collects contact details + consents only.
 * PRIVACY: no quiz / health answers are read, sent, or stored here.
 */
export function ContactCaptureStep({
  onBack,
  onSaved,
}: {
  onBack: () => void;
  onSaved: (leadId: string) => void;
}) {
  const submitLead = useServerFn(createLead);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
  });
  const [operational, setOperational] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const set = (key: keyof typeof values, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.firstName.trim()) e.firstName = "Enter your first name.";
    if (!values.lastName.trim()) e.lastName = "Enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      e.email = "Enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 10)
      e.phone = "Enter a valid 10-digit mobile number.";
    if (!values.state) e.state = "Select your state of residence.";
    if (!operational)
      e.operational = "This permission is required to continue.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setFormError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();
      const res = await submitLead({
        data: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          state: values.state,
          operationalConsent: true as const,
          marketingConsent: marketing,
          consentTextVersion: CONSENT_TEXT_VERSION,
          funnelSource: "homepage_quiz",
          referringPage:
            typeof document !== "undefined"
              ? document.referrer || window.location.pathname
              : undefined,
          utm: {
            source: params.get("utm_source") ?? undefined,
            medium: params.get("utm_medium") ?? undefined,
            campaign: params.get("utm_campaign") ?? undefined,
            term: params.get("utm_term") ?? undefined,
            content: params.get("utm_content") ?? undefined,
          },
        },
      });
      if (!res?.leadId) throw new Error("No lead id returned");
      onSaved(res.leadId);
    } catch {
      // Keep every entered value in state so nothing is lost.
      setFormError(
        "We couldn't save your information. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <h2
        id="qualify-modal-title"
        className="font-serif text-2xl font-semibold leading-tight text-[#103942] sm:text-3xl"
      >
        Next, tell us where to send your assessment progress.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#103942]/70">
        Fields marked <span aria-hidden="true">*</span> are required. This is
        not a determination of eligibility — a licensed provider reviews your
        full health information before any treatment decision.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-first" className="text-sm font-semibold text-[#103942]">
            First name<Req />
          </label>
          <input
            id="lead-first"
            name="given-name"
            type="text"
            autoComplete="given-name"
            required
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "err-first" : undefined}
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className={inputClass}
          />
          {errors.firstName && (
            <p id="err-first" className="mt-1 text-xs font-medium text-[#103942]">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-last" className="text-sm font-semibold text-[#103942]">
            Last name<Req />
          </label>
          <input
            id="lead-last"
            name="family-name"
            type="text"
            autoComplete="family-name"
            required
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "err-last" : undefined}
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className={inputClass}
          />
          {errors.lastName && (
            <p id="err-last" className="mt-1 text-xs font-medium text-[#103942]">
              {errors.lastName}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lead-email" className="text-sm font-semibold text-[#103942]">
            Email address<Req />
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
          />
          {errors.email && (
            <p id="err-email" className="mt-1 text-xs font-medium text-[#103942]">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-phone" className="text-sm font-semibold text-[#103942]">
            Mobile phone number<Req />
          </label>
          <input
            id="lead-phone"
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputClass}
          />
          {errors.phone && (
            <p id="err-phone" className="mt-1 text-xs font-medium text-[#103942]">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-state" className="text-sm font-semibold text-[#103942]">
            State of residence<Req />
          </label>
          <select
            id="lead-state"
            name="address-level1"
            autoComplete="address-level1"
            required
            aria-required="true"
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? "err-state" : undefined}
            value={values.state}
            onChange={(e) => set("state", e.target.value)}
            className={inputClass}
          >
            <option value="">Select your state</option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p id="err-state" className="mt-1 text-xs font-medium text-[#103942]">
              {errors.state}
            </p>
          )}
        </div>
      </div>

      {/* Consents — stored separately, neither pre-checked */}
      <div className="mt-6 space-y-4">
        <label htmlFor="consent-operational" className="flex gap-3 text-sm leading-relaxed text-[#103942]">
          <input
            id="consent-operational"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.operational}
            aria-describedby={errors.operational ? "err-consent" : undefined}
            checked={operational}
            onChange={(e) => setOperational(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded border-[#103942]/30 accent-[#42D1C3]"
          />
          <span>
            {OPERATIONAL_CONSENT_TEXT}
            <Req />
          </span>
        </label>
        {errors.operational && (
          <p id="err-consent" className="text-xs font-medium text-[#103942]">
            {errors.operational}
          </p>
        )}

        <label htmlFor="consent-marketing" className="flex gap-3 text-xs leading-relaxed text-[#103942]/70">
          <input
            id="consent-marketing"
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded border-[#103942]/30 accent-[#42D1C3]"
          />
          <span>{MARKETING_CONSENT_TEXT} (optional)</span>
        </label>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[#103942]/70">
        By continuing you agree to our{" "}
        <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>,{" "}
        <a href="/terms" className="underline underline-offset-2">Terms of Use</a>, and{" "}
        <a href="/telehealth-consent" className="underline underline-offset-2">Telehealth Consent</a>.
      </p>

      {formError && (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-[#103942]/20 bg-[#F5F5F7] px-4 py-3 text-sm font-medium text-[#103942]"
        >
          {formError} Your answers have been kept — press Continue to retry.
        </div>
      )}

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full border border-[#103942]/20 px-6 py-3 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] disabled:opacity-60"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={{ backgroundColor: submitting ? undefined : MINT }}
          className="inline-flex items-center justify-center rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold text-[#103942] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Continue"}
        </button>
      </div>
    </form>
  );
}
