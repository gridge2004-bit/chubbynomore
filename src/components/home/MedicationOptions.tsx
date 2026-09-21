// Medication catalogue section (#medications / #pricing).
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FEATURED_IDS, INSURANCE_DISCLAIMER, COMPOUNDED_FDA_QUALIFIER, PRESCRIPTION_QUALIFIER, SUPPLY_PERIOD_QUALIFIER, detailedCards } from "./content";
import type { DetailedCard } from "./content";
import { DetailedProductCard } from "./DetailedProductCard";
import { MedicationInfoPanel } from "./MedicationInfoPanel";

export function MedicationOptions() {
  const [expanded, setExpanded] = useState(false);
  const [infoCard, setInfoCard] = useState<DetailedCard | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openInfo = (card: DetailedCard, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setInfoCard(card);
  };
  const closeInfo = () => {
    setInfoCard(null);
    window.setTimeout(() => triggerRef.current?.focus?.(), 0);
  };

  const byId = Object.fromEntries(detailedCards.map((c) => [c.id, c]));
  const featured = FEATURED_IDS.map((id) => byId[id]).filter(Boolean) as DetailedCard[];
  const remaining = detailedCards.filter((c) => !FEATURED_IDS.includes(c.id));

  return (
    <section id="medications" className="bg-white px-4 pt-12 md:pt-16 pb-16 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col">
        <Reveal className="mb-6 text-center">
          <h2 className="font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            Plans start at $179.99 / 28-day supply.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#103942]/70 sm:text-lg">
            Your licensed provider will determine which available treatment option may be medically appropriate for you.
          </p>
        </Reveal>

        <div id="pricing" className="mt-2">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#103942]/60">
            Featured treatment options
          </p>
          <div className="grid grid-cols-1 gap-6 sm:gap-5">
            {featured.map((c, i) => (
              <Reveal key={c.id} delay={i * 80} className="h-full">
                <DetailedProductCard card={c} onInfo={openInfo} />
              </Reveal>
            ))}
            {expanded &&
              remaining.map((c, i) => (
                <Reveal key={c.id} delay={i * 60} className="h-full">
                  <DetailedProductCard card={c} onInfo={openInfo} />
                </Reveal>
              ))}
          </div>
        </div>


        <div className="mt-4 space-y-1.5 text-[11px] leading-relaxed text-[#103942]/70">
          <p>{COMPOUNDED_FDA_QUALIFIER}</p>
          <p>{PRESCRIPTION_QUALIFIER}</p>
          <p>{SUPPLY_PERIOD_QUALIFIER}</p>
          <p>
            <span aria-hidden="true">*</span>
            {INSURANCE_DISCLAIMER}
          </p>
        </div>

        {remaining.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-[#103942]/25 bg-white px-5 py-2.5 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942]"
              aria-expanded={expanded}
            >
              {expanded ? "Show fewer treatment options" : "Show more treatment options"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <button
            type="button"
            onClick={() => window.location.assign("/intake")}
            className="inline-flex items-center justify-center rounded-full bg-[#103942] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
          >
            See which treatment may be right for me
          </button>
          <p className="text-[12px] text-[#103942]/60">
            Educational information only. This list is not a product selector — our licensed provider decides what may be appropriate.
          </p>
        </div>
      </div>

      <MedicationInfoPanel card={infoCard} onClose={closeInfo} />
    </section>
  );
}
