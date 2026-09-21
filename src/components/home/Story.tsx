// Switching care, why-choose and how-it-works sections.
import { Reveal } from "@/components/Reveal";
import { steps } from "./content";
import { PillButton } from "./Nav";

export function SwitchingCare() {
  return (
    <section id="switching" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-3xl border border-[#103942]/8 bg-[#F5F5F7] p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 md:p-12 lg:p-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
              ALREADY TAKING A GLP-1?
            </div>
            <h2 className="mt-4 font-serif text-[34px] leading-[1.05] tracking-tight text-[#103942] md:text-[44px] lg:text-[52px]">
              Switching your care can be simple.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[#103942]/85 md:text-[17px]">
              Already taking semaglutide or tirzepatide through another provider? Complete a brief online intake and share your current medication, dose, and treatment history. Our licensed provider will review whether continuing your treatment—and at what dose—is medically appropriate.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-start">
            <p className="text-[15px] leading-relaxed text-[#103942]/80 md:text-[16px]">
              If prescribed, medication is dispensed by a licensed U.S. pharmacy and delivered discreetly to your door where available.
            </p>
            <a
              href="/intake"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#103942] bg-white px-6 py-3.5 text-sm font-semibold text-[#103942] transition hover:bg-[#F5F5F7] hover:text-[#103942]"
            >
              Switch and keep my momentum →
            </a>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-[#103942]/60">
              Continuation of treatment and dosing are determined by the licensed provider based on your medical history and current treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  const benefits = [
    {
      title: "Appetite you're not fighting all day.",
      body: "GLP-1 treatment targets hunger signaling, so the 3pm vending machine run and the late-night grazing get easier to skip.",
    },
    {
      title: "Handled privately, start to finish.",
      body: "Intake, provider review, and refills happen online. Medication arrives in plain packaging with no branding on the box.",
    },
    {
      title: "Fits a real work week.",
      body: "Do the intake at 6am or 11pm, dose once a week, and message your provider between refills instead of taking time off for appointments.",
    },
    {
      title: "Consistency, not another crash diet.",
      body: "Our licensed provider titrates your dose, tracks how you're tolerating it, and adjusts — so you can keep training and keep going.",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            WHY MEN CHOOSE CHUBBYNOMORE
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            Straightforward care, without the usual friction.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#103942]/70 sm:text-lg">
            Chubby No More is designed for men who want direct answers, private care, transparent pricing, and a medically supervised plan that fits into real life.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 100}
              className="flex flex-col rounded-2xl bg-[#F5F5F7] p-7 md:p-8"
            >
              <h3 className="font-serif text-xl text-[#103942] md:text-2xl">
                {b.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#103942]/75">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-12 text-center md:mt-14">
          <PillButton href="/intake">See if I qualify — free</PillButton>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {

  return (
    <section id="how" className="bg-[#F5F5F7] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal as="h2" className="text-center font-serif text-4xl leading-tight text-[#103942] md:text-5xl">
          How it works in <em className="italic">3 steps.</em>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, idx) => (
            <Reveal key={s.n} delay={idx * 150} className="card-lift rounded-2xl p-2 -m-2">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white">
                <img src={s.img} alt={s.imgAlt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#103942]/70">Step {s.n}</div>
              <h3 className="mt-2 font-serif text-2xl text-[#103942]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#103942]/70">{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <PillButton href="/intake">See if I qualify — free</PillButton>
        </Reveal>
      </div>
    </section>
  );
}
