// Compact medication row used in comparison lists.
import { CARD_META, PENDING_COPY, formatUSD } from "./content";
import type { DetailedCard } from "./content";

export function MedicationRow({
  card,
  onInfo,
}: {
  card: DetailedCard;
  onInfo: (card: DetailedCard, trigger: HTMLElement) => void;
}) {
  const meta = CARD_META[card.id];
  const isCompounded = card.tags.includes("COMPOUNDED");
  const badgeClass = isCompounded
    ? "bg-[#D5F3EF] text-[#103942]"
    : "bg-[#F5F5F7] text-[#103942]";
  const isWeekly = card.doseLabel.toLowerCase().includes("week");
  const hasPrice = card.priceMode !== "onRequest" && card.priceMode !== "pending" && typeof card.fullSupplyPrice === "number";
  const perDose = Math.round(((card.fullSupplyPrice ?? 0) / card.dosesPerSupply) * 100) / 100;

  const ins = card.insurance;
  const insuranceVerified =
    !!ins &&
    ins.insurancePricingEnabled === true &&
    !!ins.insuranceHeadline &&
    !!ins.insuranceSupplyLabel &&
    !!ins.termsUrl &&
    !!ins.offerExpiration &&
    !!ins.lastVerifiedDate;

  

  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:gap-5 sm:py-6">
      <div className="flex items-start gap-3 sm:contents">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F7] sm:h-20 sm:w-20">
          <img
            src={card.img}
            alt={card.imgAlt}
            className="max-h-12 w-auto object-contain mix-blend-multiply sm:max-h-16"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1 sm:flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-[15px] font-semibold leading-tight text-[#103942] sm:text-[18px]">
              {card.name}
            </h3>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.1em] sm:px-2 sm:text-[10px] ${badgeClass}`}
            >
              {isCompounded ? "COMPOUNDED" : "BRAND-NAME"}
            </span>
          </div>
          <p className="mt-1 text-[12px] text-[#103942]/70 sm:text-[14px]">
            {meta?.format ?? "Prescription treatment"}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => onInfo(card, e.currentTarget)}
          aria-label={`More information about ${card.name}`}
          aria-haspopup="dialog"
          className="ml-auto grid h-9 w-9 shrink-0 place-items-center self-start rounded-full border border-[#103942]/25 text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103942] sm:order-last sm:ml-1"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="10" x2="12" y2="16" />
            <circle cx="12" cy="7.5" r="0.6" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:w-[280px] sm:shrink-0 sm:text-right">
        {isCompounded ? (
          <>
            {/* Cash pay — highlighted for compounded */}
            <div className="rounded-xl bg-[#F5F5F7] px-3 py-2 sm:px-3 sm:py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
                Cash pay
              </p>
              <p className="mt-1 text-[16px] font-bold leading-tight text-[#103942]">
                {formatUSD(card.fullSupplyPrice ?? 0)}
                <span className="ml-1 text-[12px] font-normal text-[#103942]/70">
                  / {card.supplyLabel}
                </span>
              </p>
            </div>
            <p className="px-1 text-[12px] leading-snug text-[#103942]/70">
              Insurance &amp; savings not currently available.
            </p>
          </>
        ) : (
          <>
            {/* Insurance & savings — highlighted for brand-name */}
            <div className="rounded-xl bg-[#F5F5F7] px-3 py-2 sm:px-3 sm:py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
                Eligible insurance &amp; savings
              </p>
              {insuranceVerified && ins ? (
                <p className="mt-1 text-[16px] font-bold leading-tight text-[#103942]">
                  As low as {ins.insuranceHeadline}
                  <span className="ml-1 text-[12px] font-normal text-[#103942]/70">
                    {ins.insuranceSupplyLabel}
                    <span aria-hidden="true">*</span>
                  </span>
                </p>
              ) : (
                <p className="mt-1 text-[16px] font-bold leading-tight text-[#103942]">
                  As low as {card.insuranceSavingsPrice ?? "$XX.XX"}
                  <span className="ml-1 text-[12px] font-normal text-[#103942]/70">
                    per {card.insuranceSavingsSupplyLabel ?? card.supplyLabel}
                    <span aria-hidden="true">*</span>
                  </span>
                </p>
              )}
            </div>
            {/* Cash pay — smaller, underneath */}
            <div className="px-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
                Cash pay
              </p>
              {hasPrice ? (
                <>
                  <p className="mt-0.5 text-[13px] leading-tight text-[#103942]/80">
                    From {formatUSD(card.fullSupplyPrice ?? 0)}
                    <span className="ml-1 text-[11px] text-[#103942]/60">
                      / {card.supplyLabel}
                    </span>
                  </p>
                  {isWeekly && (
                    <p className="mt-0.5 text-[11px] text-[#103942]/55">
                      {formatUSD(perDose)} per {card.doseLabel}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-0.5 text-[13px] leading-tight text-[#103942]/80">
                  {PENDING_COPY}
                </p>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
