// Above-the-fold hero.
import type { Clinician } from "./content";

export function Hero() {
  return (
    <section className="w-full bg-white px-6 pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
          GLP-1 CARE FOR MEN
        </div>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tight text-[#103942]">
          Lose the weight your willpower couldn't. Clinician-guided GLP-1 for men.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#103942] sm:text-lg">
          60-second intake. Licensed provider review. If prescribed, medication from a U.S. pharmacy ships to your door. Compounded plans from $179.99/28 days. Not everyone qualifies.
        </p>
        <div>
          <a
            href="/intake"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
          >
            Check if I qualify — 60 seconds, free
          </a>
        </div>
        <p className="mt-3 max-w-xl text-sm text-[#103942]/70">
          Takes about 60 seconds. No charge if you don't qualify. Prescription only — not everyone qualifies. Compounded medications are not FDA-approved.
        </p>
        <div>
          <a href="#switching" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#103942] underline underline-offset-4 transition hover:text-[#42D1C3]">
            On a GLP-1 already? Transfer your care →
          </a>
        </div>

      </div>
    </section>
  );
}
