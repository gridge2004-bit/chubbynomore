// Monthly vs prepaid plan comparison table.
import { useState } from "react";
import { formatUSD } from "./content";
import type { DetailedCard } from "./content";

export function PlanCompare({ card }: { card: DetailedCard }) {
  const [plan, setPlan] = useState<"single" | "prepay">("single");
  if (!card.prepay || typeof card.fullSupplyPrice !== "number") return null;
  const p = card.prepay;
  const base =
    "rounded-2xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103942]";
  const on = "border-[#103942] bg-white";
  const off = "border-[#103942]/20 bg-white/60 hover:border-[#103942]/40";
  return (
    <div className="mt-4">
      <div
        role="radiogroup"
        aria-label={`${card.name} supply options`}
        className="grid gap-2 sm:grid-cols-2"
      >
        <button
          type="button"
          role="radio"
          aria-checked={plan === "single"}
          onClick={() => setPlan("single")}
          className={`${base} ${plan === "single" ? on : off}`}
        >
          <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
            Individual fill
          </span>
          <span className="mt-1 block text-[20px] font-bold leading-none text-[#103942]">
            {formatUSD(card.fullSupplyPrice)}
          </span>
          <span className="mt-1 block text-[12px] text-[#103942]/70">/ 28-day supply</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={plan === "prepay"}
          onClick={() => setPlan("prepay")}
          className={`${base} ${plan === "prepay" ? on : off}`}
        >
          <span className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
              3-fill prepay
            </span>
            <span className="rounded-full bg-[#D5F3EF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#103942]">
              Best value
            </span>
          </span>
          <span className="mt-1 block text-[20px] font-bold leading-none text-[#103942]">
            {formatUSD(p.total)}
          </span>
          <span className="mt-1 block text-[12px] text-[#103942]/70">
            prepaid for 3 consecutive 28-day supplies (84 days)
          </span>
          <span className="mt-1 block text-[12px] text-[#103942]/70">
            Equivalent to {formatUSD(p.perSupply)} per 28-day supply.
          </span>
          <span className="mt-0.5 block text-[12px] font-semibold text-[#103942]">
            Save {formatUSD(p.savings)} compared with purchasing three individual fills.
          </span>
        </button>
      </div>
    </div>
  );
}
