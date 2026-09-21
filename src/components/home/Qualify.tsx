// Eligibility inclusion and exclusion sections.
import { Reveal } from "@/components/Reveal";

export function WhoQualifies() {
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]">
            Eligibility
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#103942] md:text-[52px]">
            Who may qualify for prescription weight loss treatment?
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#103942]/85 md:text-[17px]">
          <p>
            Adults with a BMI of <strong>30 or higher</strong>, or a BMI of <strong>27 or higher</strong> with at least one weight-related condition, may be candidates for certain prescription weight-management medications. Meeting these general criteria does not guarantee eligibility.
          </p>
          <p>
            Eligibility depends on the specific medication, your medical history, current medications, treatment goals, and other clinical factors. Certain treatments may not be appropriate during pregnancy or breastfeeding, or for people with particular medical conditions or risk factors.
          </p>
          <p>
            Our licensed provider will review your complete health history and determine whether any available treatment option is medically appropriate for you. If you do not qualify, you will not be charged.
          </p>
        </Reveal>
        <Reveal delay={140} className="mt-8">
          <a
            href="/intake"
            className="inline-flex rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#42D1C3] hover:text-[#103942]"
          >
            See if I qualify — free
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function WhoNotFor() {
  const items = [
    "You or a family member have had medullary thyroid carcinoma, or you have Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).",
    "You have had a serious allergic reaction to semaglutide, tirzepatide, or any ingredient in a prescribed medication.",
    "You are pregnant, breastfeeding, planning a pregnancy, or become pregnant during treatment.",
    "You have a history of pancreatitis, gallbladder problems, severe gastroparesis, or another serious digestive condition.",
    "You have type 1 diabetes, a history of diabetic ketoacidosis, diabetic retinopathy, kidney problems, or take insulin or certain other diabetes medications.",
    "You have an upcoming surgery or procedure involving general anesthesia or deep sedation.",
    "Age eligibility varies by medication and program availability.",
  ];
  return (
    <section className="bg-[#F5F5F7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#103942]/70">
            Safety first
          </div>
          <h2 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-[#103942] md:text-[48px]">
            Important safety considerations
          </h2>
          <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-[#103942]/90 md:text-[17px]">
            Prescription GLP-1 and GIP/GLP-1 medications are not appropriate for everyone. Safety and eligibility depend on the specific medication, your medical history, current medications, and other clinical factors. Tell your licensed provider if any of the following apply to you:
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 md:mt-10">
          <ul className="divide-y divide-[#103942]/10">
            {items.map((item) => (
              <li key={item} className="flex gap-4 py-5 md:py-6">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#42D1C3]" />
                <span className="text-[15px] leading-relaxed text-[#103942] md:text-[16px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180} className="mt-10 border-t border-[#103942]/10 pt-6 md:mt-12 md:pt-8">
          <p className="max-w-4xl text-[15px] leading-relaxed text-[#103942]/80 md:text-[16px]">
            This is not a complete list of risks, warnings, or reasons a medication may be inappropriate. Complete the private online intake so our licensed provider can review your health history and determine whether an available treatment option may be medically appropriate. Do not start, stop, or change a prescription medication without guidance from a qualified healthcare professional.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
