import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import cnmLogoFullAsset from "@/assets/cnm-logo-full.png.asset.json";

/**
 * Shared chrome for all Chubby No More Inc. legal documents.
 * All documents are DRAFTS. Nothing on these pages is final until
 * legal, clinical, and pharmacy review is complete.
 */

export const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Use", to: "/terms-of-use" },
  { label: "Subscription Policy", to: "/subscription-policy" },
  { label: "Telehealth Consent", to: "/telehealth-consent" },
  { label: "Pharmacy Disclosure", to: "/pharmacy-disclosure" },
  { label: "Notice of Privacy Practices", to: "/notice-of-privacy-practices" },
  { label: "Safety Information", to: "/safety-information" },
] as const;

/** Unresolved fact. Never fill these in with guesses. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-[#42D1C3]/25 px-1.5 py-0.5 text-[0.95em] font-semibold text-[#103942]">
      [LEGAL REVIEW REQUIRED: INSERT {children}]
    </mark>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[16px] leading-relaxed text-[#103942]/85">{children}</p>;
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-[#103942]/85">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10 scroll-mt-24" id={`section-${n}`}>
      <h2 className="font-serif text-[24px] leading-tight tracking-tight text-[#103942] md:text-[28px]">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#103942]/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" aria-label="Chubby No More home">
            <img src={cnmLogoFullAsset.url} alt="Chubby No More" className="h-12 w-auto md:h-14" />
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-[#103942] underline underline-offset-4 hover:text-[#42D1C3]"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        {/* Internal status banner — remove only after approval. */}
        <div
          role="note"
          className="rounded-2xl border border-[#103942]/20 bg-[#F5F5F7] px-5 py-4 text-sm font-semibold text-[#103942]"
        >
          Draft — legal and clinical review required before publication.
        </div>

        <h1 className="mt-8 font-serif text-[34px] leading-[1.08] tracking-tight text-[#103942] md:text-[46px]">
          {title}
        </h1>
        {intro ? <div className="mt-5">{intro}</div> : null}

        {children}

        <nav aria-label="Legal documents" className="mt-16 border-t border-[#103942]/10 pt-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]/65">
            Legal
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-[15px] text-[#103942] underline underline-offset-4 hover:text-[#42D1C3]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[#103942]/65">
            © 2026 Chubby No More Inc. All rights reserved.
          </p>
        </nav>
      </main>
    </div>
  );
}
