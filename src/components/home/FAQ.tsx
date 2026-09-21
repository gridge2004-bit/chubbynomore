// Frequently asked questions accordion.
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { faqs } from "./content";

export function FAQ() {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <section id="faq" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="font-serif text-4xl leading-[1.1] text-[#103942] md:text-5xl">
            Frequently asked <em className="italic">questions.</em>
          </h2>
        </Reveal>
        <div>
          <div className="divide-y divide-[#103942]/12 border-y border-[#103942]/12">
            {faqs.map((f, i) => {
              const isOpen = openSet.has(i);
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#103942] focus-visible:ring-offset-2"
                  >
                    <span className="font-serif text-lg text-[#103942] md:text-xl">{f.q}</span>
                    <ChevronDown
                      aria-hidden
                      className={`h-5 w-5 shrink-0 text-[#103942] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!isOpen}
                    className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0">
                      <p className="max-w-2xl text-sm leading-relaxed text-[#103942]/70 md:text-base">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[#103942]/70 md:text-sm">
            Prescription treatment requires an online medical evaluation. Not everyone qualifies. Individual results vary.
          </p>
        </div>
      </div>
    </section>
  );
}
