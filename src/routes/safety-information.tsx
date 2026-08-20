import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL } from "@/components/LegalPage";

export const Route = createFileRoute("/safety-information")({
  head: () => ({
    meta: [
      { title: "Weight-Management Medication Safety Information | Chubby No More Inc." },
      { name: "description", content: "Safety information for the weight-management medications offered through Chubby No More Inc., including warnings, side effects, and when to seek emergency care." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Weight-Management Medication Safety Information | Chubby No More Inc." },
      { property: "og:description", content: "Safety information for weight-management medications offered through Chubby No More Inc." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SafetyInformationPage,
});

function SafetyInformationPage() {
  return (
    <LegalPage
      title="Weight-Management Medication Safety Information"
      intro={
        <P>
          This page covers only the medications and services Chubby No More Inc. actually offers. It
          is general information, not medical advice, and it does not replace the prescribing
          information, medication guide, or instructions from your provider and pharmacy.
        </P>
      }
    >
      <Section n={1} title="Emergency warning">
        <P>
          <strong>
            If you are having a medical emergency, call 911 or go to the nearest emergency
            department now.
          </strong>{" "}
          Do not use this website, messaging, or the intake form to report an emergency. For
          mental-health crisis support in the United States, call or text 988.
        </P>
      </Section>

      <Section n={2} title="Purpose and limits of this page">
        <P>
          This page summarizes safety topics for weight-management medications that may be
          prescribed following our licensed provider's review. It is not a complete list of warnings,
          interactions, or side effects, and it is not individualized to you.
        </P>
      </Section>

      <Section n={3} title="Telehealth limitations">
        <P>
          Remote care does not include a hands-on physical examination. Some conditions require
          in-person evaluation, laboratory testing, or specialist care before treatment is safe.
        </P>
      </Section>

      <Section n={4} title="Compounded-medication disclosure">
        <P>
          <strong>Compounded medications are not FDA-approved for safety, effectiveness, or quality.</strong>{" "}
          They are prepared by a compounding pharmacy for an individual patient based on a
          prescription. See the Pharmacy and Medication Disclosure for details about roles and
          fulfillment.
        </P>
      </Section>

      <Section n={5} title="State and product availability">
        <P>
          Which products are offered to you depends on your state of residence, the judgment of your
          treating provider, and pharmacy supply at the time of your order. Not every product
          described on this page is available in every state, and availability can change. Your
          provider and the checkout flow will confirm what is available to you before you are
          charged.
        </P>
      </Section>

      <Section n={6} title="Compounded semaglutide">
        <P>
          Compounded semaglutide is a personalized formulation of semaglutide, the same active
          ingredient found in the brand-name products Ozempic and Wegovy, prepared by a licensed
          compounding pharmacy under a prescription written for you individually. It is not
          FDA-approved as a finished product, and it has not independently gone through the FDA
          approval process for safety and effectiveness, even though semaglutide itself has an
          established safety and efficacy record from the approved products. The warnings,
          contraindications, adverse reactions, interactions, and pregnancy guidance described in
          Sections 9 through 14 for semaglutide-based products apply to compounded semaglutide.
          Because compounded medication can vary in strength, concentration, or formulation
          (including injectable solution and, where applicable, other dosage forms), always confirm
          your dose and administration technique with your provider or pharmacist before each
          injection, and never adjust your dose on your own.
        </P>
      </Section>

      <Section n={7} title="Compounded tirzepatide">
        <P>
          Compounded tirzepatide is a personalized formulation of tirzepatide, the same active
          ingredient found in the brand-name products Mounjaro and Zepbound, prepared by a licensed
          compounding pharmacy under a prescription written for you individually. As with compounded
          semaglutide, it is not an FDA-approved finished product. The warnings, contraindications,
          adverse reactions, interactions, and pregnancy guidance described in Sections 9 through 14
          for tirzepatide-based products apply to compounded tirzepatide. Confirm your dose and
          injection technique with your provider or pharmacist, and never adjust your dose on your
          own.
        </P>
      </Section>

      <Section n={8} title="Contraindications">
        <P>
          Semaglutide- and tirzepatide-based products are
          contraindicated in patients with a personal or family history of medullary thyroid
          carcinoma (MTC) and in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).
          They are also contraindicated in anyone with a prior serious hypersensitivity reaction to
          semaglutide, tirzepatide, or any component of the formulation. Tell your provider about
          your personal and family thyroid and endocrine history before starting treatment.
        </P>
      </Section>

      <Section n={9} title="Boxed warnings">
        <P>
          <strong>Boxed warning — Risk of thyroid C-cell tumors.</strong> In rodent studies,
          semaglutide and tirzepatide caused thyroid C-cell tumors, including medullary thyroid
          carcinoma, at clinically relevant exposures. It is not known whether these medications
          cause thyroid C-cell tumors, including medullary thyroid carcinoma, in humans. These
          medications are contraindicated in patients with a personal or family history of medullary
          thyroid carcinoma or in patients with Multiple Endocrine Neoplasia syndrome type 2. Counsel
          patients on the potential risk and symptoms of thyroid tumors, including a lump or swelling
          in the neck, hoarseness, trouble swallowing, or shortness of breath, and report any such
          symptoms to your provider promptly.
        </P>
      </Section>

      <Section n={10} title="Common adverse reactions">
        <P>
          The most common side effects reported with semaglutide- and tirzepatide-based products are
          gastrointestinal: nausea, vomiting, diarrhea, constipation, abdominal pain, indigestion, and
          decreased appetite. These effects are most common when starting treatment or increasing the
          dose, and they typically lessen over time. Injection-site reactions, fatigue, belching,
          heartburn, and hair loss have also been reported. Contact your provider if any side effect
          is severe, persistent, or interferes with eating, drinking, or daily activity.
        </P>
      </Section>

      <Section n={11} title="Serious adverse reactions">
        <P>
          Serious risks associated with semaglutide- and tirzepatide-based products include: acute
          pancreatitis (persistent, severe abdominal pain, sometimes radiating to the back, with or
          without vomiting — discontinue and seek care immediately if suspected); gallbladder disease,
          including gallstones and cholecystitis; hypoglycemia (low blood sugar), particularly when
          used together with insulin or a sulfonylurea; acute kidney injury, usually related to
          dehydration from vomiting, diarrhea, or reduced fluid intake; diabetic retinopathy
          complications in patients with type 2 diabetes and a history of retinopathy; hypersensitivity
          reactions, including anaphylaxis and angioedema; and increased heart rate. There is also a
          risk of pulmonary aspiration during procedures requiring general anesthesia or deep sedation
          because these medications delay gastric emptying; tell your surgeon, anesthesiologist, or
          endoscopist that you are taking a GLP-1 or dual GIP/GLP-1 medication before any such
          procedure.
        </P>
      </Section>

      <Section n={12} title="Drug interactions">
        <P>
          Semaglutide- and tirzepatide-based products slow gastric emptying and can affect the
          absorption of oral medications taken at the same time, including oral contraceptives and
          other narrow-therapeutic-index drugs; your provider may recommend timing adjustments or
          monitoring for affected medications. Combining these medications with insulin or a
          sulfonylurea increases the risk of hypoglycemia, and your provider may reduce the dose of
          insulin or the sulfonylurea when starting treatment. Tell your provider about every
          prescription medication, over-the-counter product, and supplement you take before starting
          treatment and whenever your regimen changes.
        </P>
      </Section>

      <Section n={13} title="Pregnancy and breastfeeding">
        <P>
          Semaglutide- and tirzepatide-based products are not recommended during pregnancy, because
          weight loss offers no benefit during pregnancy and may cause fetal harm, and because animal
          studies have shown adverse effects on the fetus at clinically relevant exposures. If you are
          planning a pregnancy, treatment should be discontinued at least 2 months before you plan to
          become pregnant, to allow the medication to clear your system, given its long half-life. Tell
          your provider immediately if you become pregnant while on treatment. It is not known whether
          semaglutide or tirzepatide passes into human breast milk; discuss the risks and benefits of
          continuing treatment while breastfeeding with your provider.
        </P>
      </Section>

      <Section n={14} title="Monitoring">
        <P>
          Your provider will ask you to check in periodically, typically before each dose adjustment
          and at least once per 28-day fill, to review your weight, symptoms, and any side effects.
          Your provider may order laboratory testing, such as thyroid, kidney function, or blood
          glucose monitoring, when clinically indicated based on your health history or the medication
          prescribed. Report new or worsening symptoms promptly rather than waiting for your next
          scheduled check-in.
        </P>
      </Section>

      <Section n={15} title="When to contact your provider">
        <UL
          items={[
            "Side effects that persist, worsen, or interfere with eating, drinking, or daily activity.",
            "Signs of dehydration, or vomiting and diarrhea that do not resolve.",
            "New or unusual symptoms after a dose change.",
            "Any pregnancy, planned pregnancy, or breastfeeding.",
            "A planned surgery or procedure involving anesthesia or sedation.",
            "Starting, stopping, or changing any other medication.",
          ]}
        />
      </Section>

      <Section n={16} title="When to call 911">
        <UL
          items={[
            "Trouble breathing, swelling of the face, lips, tongue, or throat, or another severe allergic reaction.",
            "Severe, persistent abdominal pain, especially with vomiting.",
            "Chest pain, fainting, confusion, or a severe change in vision.",
            "Any symptom you believe is life-threatening.",
          ]}
        />
      </Section>

      <Section n={17} title="FDA MedWatch reporting">
        <P>
          You and your provider may report suspected side effects to the FDA MedWatch program at
          1-800-FDA-1088 or at fda.gov/medwatch. Reporting to the FDA does not replace contacting
          your provider.
        </P>
      </Section>

      <Section n={18} title="Trademark attribution">
        <P>
          All brand names referenced are trademarks of their respective owners. Reference to a brand
          does not imply affiliation with, sponsorship by, or endorsement by the trademark owner.
        </P>
      </Section>

      <Section n={19} title="Effective date">
        <P>
          Effective date: August 18, 2026.
        </P>
      </Section>

      <Section n={20} title="Clinical-review date">
        <P>
          Last clinical review: August 18, 2026, by the Chubby No More Medical Director. Next
          scheduled review: February 18, 2027.
        </P>
      </Section>

      <Section n={21} title="Change log">
        <P>
          Version 1.0 — August 18, 2026 — Initial publication of this safety information page,
          approved by the Chubby No More Medical Director.
        </P>
      </Section>
    </LegalPage>
  );
}
