// Clinician roster section.
import { Reveal } from "@/components/Reveal";
import { clinicians } from "./content";

export function MedicalTeam() {
  return (
    <section id="medical-team" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            MEET OUR MEDICAL TEAM
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#103942] sm:text-4xl md:text-5xl">
            Care led by licensed physicians.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#103942]/70 sm:text-lg">
            Every treatment plan is reviewed by a U.S.-licensed provider experienced in men's metabolic health.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clinicians.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 100}
              className="flex flex-col rounded-2xl bg-[#F5F5F7] p-6 md:p-7"
            >
              <div className="h-24 w-24 overflow-hidden rounded-full bg-white">
                <img
                  src={c.img}
                  alt={`Portrait of ${c.name}`}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-[#103942]">{c.name}</h3>
              <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#103942]/70">
                {c.credentials}
              </p>
              <p className="mt-1 text-[13px] text-[#103942]/60">{c.states}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#103942]/75">{c.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
