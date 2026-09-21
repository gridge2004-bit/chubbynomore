// Full product card for a single medication.
import { Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ON_REQUEST_COPY, PENDING_COPY, FLAT_DOSE_COPY, COMPOUNDED_FDA_QUALIFIER, formatUSD, MOBILE_SUMMARY } from "./content";
import type { Clinician, DetailedCard } from "./content";
import { PlanCompare } from "./PlanCompare";

export function DetailedProductCard({
  card,
  onInfo,
}: {
  card: DetailedCard;
  onInfo?: (card: DetailedCard, trigger: HTMLElement) => void;
}) {
  const isCompounded = card.tags.includes("COMPOUNDED");
  const tagClass = isCompounded
    ? "bg-[#D5F3EF] text-[#103942]"
    : "bg-[#F5F5F7] text-[#103942]";
  const summary =
    MOBILE_SUMMARY[card.id] ?? "Clinician-prescribed treatment for eligible patients.";

  return (
    <article className="h-full rounded-3xl bg-[#F5F5F7] p-[18px] sm:p-8">
      {/* Mobile-only layout (< 640px) */}
      <div className="flex flex-col sm:hidden">
        <div className="flex flex-wrap gap-2">
          {card.tags.map((t) => (
            <span
              key={t}
              className={`rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#103942] ${isCompounded ? "bg-[#D5F3EF]" : ""}`}
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="mt-2.5 text-[26px] font-bold leading-tight text-[#103942]">{card.name}</h3>

        <div className="mt-3 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
          <img
            src={card.img}
            alt={card.imgAlt}
            loading="lazy"
            className="block h-full w-auto max-w-full object-contain"
          />
        </div>

        <div className="mt-3">
          {card.priceMode === "fixed" && typeof card.fullSupplyPrice === "number" ? (
            <>
              <p className="text-[14px] text-[#103942]/80">Starting at</p>
              <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                <span className="text-[32px] font-bold leading-none tracking-tight text-[#103942]">
                  {formatUSD(card.fullSupplyPrice)}
                </span>
                <span className="text-[14px] text-[#103942]/80">/ {card.supplyLabel}</span>
              </p>
              {card.flatDosePricing && (
                <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#103942]">
                  {FLAT_DOSE_COPY}
                </span>
              )}
            </>
          ) : (
            <>
              <p className="text-[20px] font-bold leading-tight text-[#103942]">
                {PENDING_COPY}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-[#103942]/70">{ON_REQUEST_COPY}</p>
            </>
          )}
        </div>

        <PlanCompare card={card} />

        <p className="mt-2.5 text-[15px] leading-snug text-[#103942]/75">{summary}</p>

        <div className="mt-4 flex flex-col gap-2.5">

          <button
            type="button"
            onClick={() => window.location.assign("/intake")}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#103942] px-6 py-3.5 text-sm font-semibold text-white transition active:bg-[#42D1C3] active:text-[#103942]"
          >
            See if I qualify — free
          </button>
          <button
            type="button"
            onClick={(e) => onInfo?.(card, e.currentTarget)}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#103942]/25 bg-white px-6 py-3.5 text-sm font-semibold text-[#103942] transition active:bg-[#F5F5F7]"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
            Details
          </button>
        </div>

        {isCompounded && (
          <p className="mt-3 text-[12px] italic leading-relaxed text-[#103942]/65">
            Compounded medications are not FDA-approved.
          </p>

        )}
      </div>

      {/* Tablet + desktop layout (unchanged) */}
      <div className="hidden gap-6 sm:flex sm:flex-col lg:flex-row lg:items-center lg:gap-10">
        <img
          src={card.img}
          alt={card.imgAlt}
          loading="lazy"
          className="h-28 w-28 shrink-0 self-start rounded-xl object-cover sm:h-32 sm:w-32 lg:order-2 lg:h-40 lg:w-40 lg:self-center"
        />

        <div className="flex min-w-0 flex-1 flex-col lg:order-1">
          <div className="flex flex-wrap gap-2">
            {card.tags.map((t) => (
              <span
                key={t}
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${tagClass}`}
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="mt-4 text-[26px] font-bold leading-tight text-[#103942] sm:text-[30px]">
            {card.name}
          </h3>

          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#103942]/75 sm:text-base">
            {card.desc}
          </p>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              {card.priceMode === "fixed" && typeof card.fullSupplyPrice === "number" ? (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[15px] text-[#103942]/80">Starting at</span>
                    <span className="text-[32px] font-bold leading-none tracking-tight text-[#103942] sm:text-[38px]">
                      {formatUSD(card.fullSupplyPrice)}
                    </span>
                    <span className="text-[15px] text-[#103942]/80">/ {card.supplyLabel}</span>
                  </div>
                  {card.flatDosePricing && (
                    <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#103942]">
                      {FLAT_DOSE_COPY}
                    </span>
                  )}
                  <PlanCompare card={card} />
                </>
              ) : (
                <>
                  <div className="text-[24px] font-bold leading-tight text-[#103942] sm:text-[28px]">
                    {PENDING_COPY}
                  </div>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#103942]/70">
                    {ON_REQUEST_COPY}
                  </p>
                </>
              )}

              {isCompounded && (
                <p className="mt-3 max-w-md text-[12px] italic leading-relaxed text-[#103942]/65">
                  {COMPOUNDED_FDA_QUALIFIER}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <button
                type="button"
                onClick={() => window.location.assign("/intake")}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#103942] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942] lg:flex-none"
              >
                See if I qualify — free
              </button>
              <Link
                to="/medications/$slug"
                params={{ slug: card.id }}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942] lg:flex-none"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
