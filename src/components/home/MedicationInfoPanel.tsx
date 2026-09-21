// Slide-over panel with full medication detail.
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { CARD_META, PER_DOSE_INFO, INSURANCE_UNAVAILABLE_COMPOUNDED, INSURANCE_UNVERIFIED_BRAND, ON_REQUEST_COPY, PENDING_COPY, FLAT_DOSE_COPY, PRESCRIPTION_QUALIFIER, SUPPLY_PERIOD_QUALIFIER, formatUSD } from "./content";
import type { DetailedCard } from "./content";

export function MedicationInfoPanel({
  card,
  onClose,
}: {
  card: DetailedCard | null;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!card) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the panel for keyboard/screen-reader users
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [card, onClose]);



  if (!card) return null;
  const meta = CARD_META[card.id];
  const isCompounded = card.tags.includes("COMPOUNDED");
  const status = isCompounded
    ? "Compounded (not FDA-approved)"
    : "FDA-approved brand-name medication";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-end sm:items-stretch"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.name} information`}
    >
      <button
        type="button"
        aria-label="Close information panel"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div ref={panelRef} className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-full sm:max-h-none sm:w-[440px] sm:rounded-none">
        <div className="flex items-start justify-between gap-4 border-b border-[#103942]/10 px-6 py-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#103942]/60">
              Treatment information
            </p>
            <h3 className="mt-1 text-[22px] font-semibold text-[#103942]">{card.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {card.tags.map((t) => (
                <span
                  key={t}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#103942] ${isCompounded ? "bg-[#D5F3EF]" : "bg-[#F5F5F7]"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close information panel"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#103942]/20 text-[#103942] hover:bg-[#F5F5F7] hover:text-[#103942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103942]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 text-[#103942]">
          <div className="mb-5 flex items-center gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-[#F5F5F7]">
              <img src={card.img} alt={card.imgAlt} className="max-h-16 w-auto object-contain mix-blend-multiply" />
            </div>
            <div className="min-w-0 text-sm">
              <p><span className="text-[#103942]/60">Active ingredient: </span><span className="font-semibold">{meta?.activeIngredient ?? "—"}</span></p>
              <p className="mt-1"><span className="text-[#103942]/60">Format: </span><span className="font-semibold">{meta?.format ?? "—"}</span></p>
              <p className="mt-1"><span className="text-[#103942]/60">Status: </span><span className="font-semibold">{status}</span></p>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">Approved or intended use</p>
            <p className="mt-2 text-[14.5px] leading-relaxed">{card.desc}</p>
          </div>
          <div className="mt-5 rounded-2xl bg-[#F5F5F7] px-4 py-4">
            <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">Starting price</p>
            {typeof card.fullSupplyPrice === "number" && card.priceMode === "fixed" ? (
              <>
                <p className="mt-1 text-[22px] font-bold">
                  {formatUSD(card.fullSupplyPrice)}
                  <span className="ml-1 text-[13px] font-normal text-[#103942]/70">/ {card.supplyLabel}</span>
                </p>
                <p className="mt-1 text-[13px] text-[#103942]/80">
                  {formatUSD(Math.round((card.fullSupplyPrice / card.dosesPerSupply) * 100) / 100)} per {card.doseLabel}
                </p>
                {card.flatDosePricing && (
                  <p className="mt-1 text-[13px] text-[#103942]/80">{FLAT_DOSE_COPY}</p>
                )}
                {card.prepay && (
                  <p className="mt-2 text-[13px] text-[#103942]/80">
                    Or {formatUSD(card.prepay.total)} prepaid for 3 consecutive 28-day supplies (84 days) — equivalent to {formatUSD(card.prepay.perSupply)} per 28-day supply. Save {formatUSD(card.prepay.savings)} compared with purchasing three individual fills.
                  </p>
                )}
                <p className="mt-2 text-[11px] leading-relaxed text-[#103942]/60">{PER_DOSE_INFO}</p>
              </>
            ) : (
              <>
                <p className="mt-1 text-[20px] font-bold">
                  {PENDING_COPY}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-[#103942]/60">{ON_REQUEST_COPY}</p>
              </>
            )}
            <p className="mt-2 text-[11px] leading-relaxed text-[#103942]/60">{PRESCRIPTION_QUALIFIER}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#103942]/60">{SUPPLY_PERIOD_QUALIFIER}</p>
          </div>
          {(() => {
            const ins = card.insurance;
            if (isCompounded) {
              return (
                <div className="mt-4 rounded-2xl border border-[#103942]/15 px-4 py-4">
                  <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">
                    Insurance & savings
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#103942]/80">
                    {INSURANCE_UNAVAILABLE_COMPOUNDED}
                  </p>
                </div>
              );
            }
            if (ins?.insurancePricingEnabled && ins.savingsProgramType !== "coverage-check" && ins.insuranceHeadline && ins.insuranceSupplyLabel && ins.termsUrl && ins.offerExpiration && ins.lastVerifiedDate) {
              return (
                <div className="mt-4 rounded-2xl border border-[#103942]/15 px-4 py-4">
                  <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">
                    Eligible insurance & savings
                  </p>
                  <p className="mt-1 text-[18px] font-bold text-[#103942]">
                    As low as {ins.insuranceHeadline}
                    <span className="ml-1 text-[13px] font-normal text-[#103942]/70">
                      {ins.insuranceSupplyLabel}
                    </span>
                  </p>
                  {ins.insuranceExplanation && (
                    <p className="mt-2 text-[13px] leading-relaxed text-[#103942]/80">
                      {ins.insuranceExplanation}
                    </p>
                  )}
                  <div className="mt-2 space-y-0.5 text-[11px] text-[#103942]/60">
                    <p>Offer valid through {ins.offerExpiration}.</p>
                    <p>Last verified {ins.lastVerifiedDate}.</p>
                  </div>
                  <a
                    href={ins.termsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-[12px] font-semibold text-[#103942] underline"
                  >
                    Official savings-program terms
                  </a>
                </div>
              );
            }
            return (
              <div className="mt-4 rounded-2xl border border-[#103942]/15 px-4 py-4">
                <p className="text-[12px] uppercase tracking-wide text-[#103942]/60">
                  Eligible insurance & savings
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#103942]/80">
                  {INSURANCE_UNVERIFIED_BRAND}
                </p>
              </div>
            );
          })()}
          {isCompounded && (
            <p className="mt-4 text-[12px] italic leading-relaxed text-[#103942]/70">
              Compounded medications are not FDA-approved for safety, effectiveness, or quality. Availability varies.
            </p>
          )}
          <p className="mt-3 text-[12px] leading-relaxed text-[#103942]/70">
            Individual results vary. Weight loss is not guaranteed. Our licensed provider determines whether any treatment is medically appropriate.
          </p>
        </div>
        <div className="border-t border-[#103942]/10 px-6 py-4">
          <Link
            to="/medications/$slug"
            params={{ slug: card.id }}
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full border border-[#103942]/25 px-5 py-3 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942]"
          >
            View full medication details
          </Link>
        </div>
      </div>
    </div>
  );
}
