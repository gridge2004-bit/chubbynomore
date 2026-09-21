// Testimonials section (gated by testimonialsEnabled).
import { Reveal } from "@/components/Reveal";
import { testimonials } from "./content";

export function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[#42D1C3]" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F5F5F7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            REAL EXPERIENCES
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            What men are saying.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 80}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_1px_0_0_rgba(16,57,66,0.06),0_18px_40px_-30px_rgba(16,57,66,0.35)] md:p-7"
            >
              <Stars />
              <p className="mt-4 text-[15px] leading-relaxed text-[#103942]/80">"{t.quote}"</p>
              <div className="mt-5 border-t border-[#103942]/10 pt-4 text-[13px] font-semibold text-[#103942]">
                {t.name}, {t.age}
                <span className="block font-normal text-[#103942]/60">{t.location}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[12px] leading-relaxed text-[#103942]/60">
          Individual results vary. Testimonials reflect individual experiences and are not guarantees of results.
        </p>
      </div>
    </section>
  );
}
