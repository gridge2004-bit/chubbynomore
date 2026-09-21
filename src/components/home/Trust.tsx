// Trust marquee, weight-loss scale and trusted-care sections.
import { useState } from "react";
import { marqueeItems, providerConfig, showTrustedCareSection, testimonialsEnabled, testimonialConfig, statisticsConfig } from "./content";
import type { Testimonial } from "./content";

export function TrustMarquee() {
  const items = (
    <>
      {marqueeItems.map((t) => (
        <li key={t} className="flex shrink-0 items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em] sm:text-sm">{t}</span>
        </li>
      ))}
    </>
  );

  return (
    <section className="overflow-hidden bg-[#103942] py-5 text-white">
      <ul className="marquee-track" aria-label="Trust bar">
        {items}
        {items}
      </ul>
    </section>
  );
}

export function WeightLossScale() {
  const [weight, setWeight] = useState(270);
  const [trial, setTrial] = useState<"sema" | "tirz">("sema");

  const trialPct = trial === "sema" ? 0.15 : 0.21; // midpoint of 20–22%
  const trialLabel = trial === "sema" ? "approximately 15%" : "approximately 20–22%";
  const endingLabel = trial === "sema" ? "Weight at ~15% lower" : "Weight at ~20–22% lower";
  const potentialLoss = Math.round(weight * trialPct);
  const illustrativeWeight = Math.round(weight - potentialLoss);

  const tabBase =
    "flex-1 rounded-full px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition sm:px-4 sm:py-2.5 sm:text-[12px] sm:tracking-[0.14em]";
  const tabOn = "bg-white text-[#103942]";
  const tabOff = "bg-transparent text-white/75 hover:text-white";

  return (
    <section className="bg-[#F5F5F7] px-4 pb-14 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[#103942] p-5 text-white shadow-sm sm:p-8 md:p-14">
        <h2 className="font-serif text-[24px] leading-[1.12] tracking-tight sm:text-[36px] md:text-[52px]">
          What could {potentialLoss} fewer pounds change for you?
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-white/80 sm:mt-5 sm:text-[15px] md:text-base">
          More confidence in your clothes. More energy for the people and moments that matter.
        </p>

        <div className="mt-4 sm:mt-8" role="tablist" aria-label="Trial average">
          <div className="mx-auto flex max-w-md gap-1 rounded-full border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              role="tab"
              aria-selected={trial === "sema"}
              onClick={() => setTrial("sema")}
              className={`${tabBase} ${trial === "sema" ? tabOn : tabOff}`}
            >
              Semaglutide ~15%
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={trial === "tirz"}
              onClick={() => setTrial("tirz")}
              className={`${tabBase} ${trial === "tirz" ? tabOn : tabOff}`}
            >
              Tirzepatide ~20–22%
            </button>
          </div>
        </div>

        <div className="mt-5 text-center sm:mt-10">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-[11px]">
            Your current weight (lbs):
          </div>
          <div className="mt-1.5 font-serif text-[44px] leading-none sm:mt-3 sm:text-[72px] md:text-[96px]">
            {weight}
          </div>
        </div>

        <div className="mt-4 sm:mt-8">
          <input
            type="range"
            min={120}
            max={400}
            step={1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            aria-label="Current weight in pounds"
            className="scale-slider w-full"
          />
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-12 sm:flex sm:flex-col sm:justify-center sm:gap-8 md:flex-row md:gap-10">
          <div className="text-center md:min-w-[140px]">
            <div className="text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-white/85 sm:text-[11px] sm:tracking-[0.18em]">
              Your starting point
            </div>
            <div className="mt-1 font-serif text-[30px] leading-none sm:mt-2 sm:text-[48px] md:text-[64px]">
              {weight} <span className="text-[15px] sm:text-[24px] md:text-[28px]">lbs</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 sm:gap-3">
            <svg
              className="hidden h-6 w-14 text-white/60 sm:block md:h-8 md:w-20"
              viewBox="0 0 80 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 14h68M64 6l12 8-12 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-center font-button text-[12px] font-extrabold text-[#103942] shadow-md sm:px-5 sm:py-2.5 sm:text-[15px]">
              −{potentialLoss} lbs
            </div>
          </div>

          <div className="text-center md:min-w-[140px]">
            <div className="text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-white/85 sm:text-[11px] sm:tracking-[0.18em]">
              {endingLabel}
            </div>
            <div className="mt-1 font-serif text-[30px] leading-none sm:mt-2 sm:text-[48px] md:text-[64px]">
              {illustrativeWeight} <span className="text-[15px] sm:text-[24px] md:text-[28px]">lbs</span>
            </div>
          </div>
        </div>

        <p className="mt-5 hidden text-center text-[15px] text-white/90 sm:block md:text-base">
          Imagine what carrying {potentialLoss} fewer pounds could mean for your confidence, energy, and everyday movement.
        </p>

        <div className="mt-5 text-center sm:mt-8">
          <a
            href="/intake"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#42D1C3] px-6 py-3 text-[15px] font-semibold text-[#103942] shadow-sm transition hover:bg-white hover:text-[#103942] sm:w-auto sm:px-8 sm:py-4 sm:text-base md:px-14"
          >
            See what's realistic for me — free
          </a>
          <p className="mt-2 text-[12px] text-white/70 sm:mt-3 sm:text-[13px]">
            Free eligibility check. Takes about 60 seconds.
          </p>
        </div>

        <p className="mx-auto mt-5 max-w-xl text-center text-[11px] leading-relaxed text-white/70 sm:mt-12 sm:text-[13px]">
          This is an educational illustration of clinical-trial averages ({trialLabel}), not a prediction or promise of personal results. Individual results vary. Weight loss is not guaranteed. These results do not establish the safety, effectiveness, or quality of compounded medications.
        </p>

      </div>
    </section>
  );
}

export function TrustedCare() {
  if (!showTrustedCareSection) return null;

  const visibleStats = statisticsConfig.filter((s) => s.value && s.value.trim().length > 0);
  const showDisclaimer = testimonialsEnabled || visibleStats.length > 0;

  return (
    <section
      aria-labelledby="trusted-care-heading"
      className="w-full bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#103942]/60">
            Trusted care
          </div>
          <h2
            id="trusted-care-heading"
            className="mt-4 font-serif text-4xl leading-[1.1] text-[#103942] md:text-5xl"
          >
            Trusted care, built around real medical review
          </h2>
        </div>

        {/* Provider area */}
        <div className="mt-14 rounded-2xl border border-[#103942]/10 bg-[#F5F5F7] p-8 md:p-12">
          <h3 className="font-serif text-2xl text-[#103942] md:text-3xl">
            Care reviewed by licensed medical professionals
          </h3>

          {providerConfig.verified ? (
            <div className="mt-8 grid gap-8 md:grid-cols-[180px_1fr] md:items-start">
              <div className="h-40 w-40 overflow-hidden rounded-full bg-white ring-1 ring-[#103942]/10 md:h-44 md:w-44">
                {providerConfig.headshot ? (
                  <img
                    src={providerConfig.headshot}
                    alt={providerConfig.name ? `Portrait of ${providerConfig.name}` : "Provider portrait"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div>
                {providerConfig.name && (
                  <div className="font-serif text-xl text-[#103942]">{providerConfig.name}</div>
                )}
                {providerConfig.title && (
                  <div className="mt-1 text-sm text-[#103942]/70">{providerConfig.title}</div>
                )}
                {providerConfig.credential && (
                  <div className="mt-1 text-sm text-[#103942]/70">{providerConfig.credential}</div>
                )}
                {providerConfig.license && (
                  <div className="mt-1 text-sm text-[#103942]/70">{providerConfig.license}</div>
                )}
                {providerConfig.bio && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#103942]/80">
                    {providerConfig.bio}
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Testimonial area — only rendered when enabled */}
        {testimonialsEnabled && testimonialConfig.length > 0 && (
          <div className="mt-12">
            <h3 className="font-serif text-2xl text-[#103942] md:text-3xl">
              What patients are saying
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonialConfig.slice(0, 3).map((t, i) => (
                <figure
                  key={i}
                  className="flex h-full flex-col rounded-2xl border border-[#103942]/10 bg-white p-6 shadow-sm"
                >
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={`Portrait of ${t.firstName} ${t.lastInitial}.`}
                      className="mb-4 h-14 w-14 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <blockquote className="text-sm leading-relaxed text-[#103942]/85">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-[#103942]">
                    {t.firstName} {t.lastInitial}.
                  </figcaption>
                  <div className="mt-2 space-y-1 text-xs text-[#103942]/60">
                    {t.compensated && <div>Compensated for their time.</div>}
                    {t.disclaimer && <div>{t.disclaimer}</div>}
                  </div>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Statistics area — each stat hidden if value not supplied */}
        {visibleStats.length > 0 && (
          <div className="mt-12 grid gap-6 rounded-2xl bg-[#103942] p-8 text-white sm:grid-cols-2 md:grid-cols-3 md:p-10">
            {visibleStats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl md:text-4xl">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {showDisclaimer && (
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#103942]/60">
            Individual experiences and results vary. Testimonials do not guarantee that other patients will achieve the same outcome.
          </p>
        )}
      </div>
    </section>
  );
}
