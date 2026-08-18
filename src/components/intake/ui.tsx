import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared primitives for the /intake wizard. Presentation only. */

export function Fieldset({
  legend,
  hint,
  error,
  children,
  className,
}: {
  legend: string;
  hint?: string;
  error?: string | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-3 block text-[15px] font-semibold leading-snug text-[#103942]">
        {legend}
      </legend>
      {hint ? <p className="-mt-2 mb-3 text-[13px] text-[#103942]/60">{hint}</p> : null}
      <div className="flex flex-col gap-[10px]">{children}</div>
      {error ? (
        <p role="alert" className="mt-2 text-[12px] font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}


const cardBase =
  "w-full min-h-[44px] rounded-xl border bg-white px-4 py-[18px] text-left text-[15px] leading-snug transition-all duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D1C3] focus-visible:ring-offset-1 " +
  "hover:-translate-y-px hover:border-[#103942]/35";

export function ChoiceCard({
  label,
  selected,
  onSelect,
  multi,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        cardBase,
        "flex items-center gap-3 font-medium text-[#103942]",
        selected
          ? "border-[#42D1C3] bg-[#42D1C3]/12 shadow-[0_0_0_1px_#42D1C3_inset]"
          : "border-[#103942]/15",
      )}
    >
      {multi ? (
        <span
          aria-hidden
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border",
            selected ? "border-[#42D1C3] bg-[#42D1C3]" : "border-[#103942]/25 bg-white",
          )}
        >
          {selected ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
        </span>
      ) : null}
      <span>{label}</span>
    </button>
  );
}

export function BinaryCards({
  value,
  onChange,
  options = ["No", "Yes"],
  name,
}: {
  value: string | null;
  onChange: (v: string) => void;
  options?: [string, string] | string[];
  name?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-[10px]" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            cardBase,
            "text-center font-semibold text-[#103942]",
            value === opt
              ? "border-[#42D1C3] bg-[#42D1C3]/12 shadow-[0_0_0_1px_#42D1C3_inset]"
              : "border-[#103942]/15",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[13px] font-semibold text-[#103942]">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-1 block text-[12px] font-medium text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export const inputClass =
  "w-full min-h-[44px] rounded-xl border border-[#103942]/15 bg-white px-3.5 py-3 text-[15px] text-[#103942] " +
  "placeholder:text-[#103942]/35 transition-colors focus-visible:outline-none focus:border-[#42D1C3] " +
  "focus:ring-2 focus:ring-[#42D1C3]/40";

export const inputErrorClass =
  "border-red-500 bg-red-50/40 focus:border-red-500 focus:ring-red-500/30";

/** Input classes with an error state applied when `error` is truthy. */
export function inputCls(error?: string | null, extra?: string) {
  return cn(inputClass, error ? inputErrorClass : "", extra);
}


export function PrimaryButton({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#42D1C3] px-5 text-[16px] font-bold text-white",
        "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103942]",
        disabled ? "cursor-not-allowed opacity-40" : "hover:brightness-95",
      )}
    >
      {children}
    </button>
  );
}

export function ComplianceFooter() {
  return (
    <div className="mx-auto mt-8 max-w-[560px] space-y-3 px-5 pb-16 text-[11px] leading-relaxed text-[#103942]/80">
      <p>
        Compounded medications are not approved by the FDA and are not reviewed by the FDA for
        safety, effectiveness, or quality. ChubbyNoMore is not a medical practice or a pharmacy.
        Medications are dispensed by an independent licensed pharmacy and prescribed by independent
        licensed providers. Content on this site is for educational purposes only and is not a
        substitute for medical advice, diagnosis, or treatment. Individual results vary.
      </p>
      <p>
        Ozempic, Wegovy, and Rybelsus are registered trademarks of Novo Nordisk A/S. Mounjaro and
        Zepbound are registered trademarks of Eli Lilly and Company. ChubbyNoMore is not affiliated
        with, endorsed by, or sponsored by either company.
      </p>
    </div>
  );
}

export const US_STATE_LIST = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
  "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA",
  "RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];
