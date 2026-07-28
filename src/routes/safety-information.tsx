import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL, Todo } from "@/components/LegalPage";

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

function PendingClinical() {
  return (
    <div className="mt-4 rounded-2xl border border-[#103942]/20 bg-[#F5F5F7] px-5 py-4 text-sm font-semibold text-[#103942]">
      Pending clinical review — no product-specific safety text is published here until it has been
      drafted from current manufacturer prescribing information and FDA materials and approved by
      the clinical provider and pharmacy.
    </div>
  );
}

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
          prescribed following a licensed provider's review. It is not a complete list of warnings,
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
          Which products are offered depends on your state, provider judgment, and supply. Current
          availability is <Todo>STATE-BY-STATE AND PRODUCT-BY-PRODUCT AVAILABILITY LIST</Todo>.
        </P>
      </Section>

      <Section n={6} title="Compounded semaglutide">
        <P>
          Product-specific safety content for compounded semaglutide is{" "}
          <Todo>COMPOUNDED SEMAGLUTIDE SAFETY CONTENT SOURCED FROM CURRENT PRESCRIBING INFORMATION AND APPROVED BY THE CLINICAL PROVIDER AND COMPOUNDING PHARMACY</Todo>.
        </P>
        <PendingClinical />
      </Section>

      <Section n={7} title="Compounded tirzepatide">
        <P>
          Product-specific safety content for compounded tirzepatide is{" "}
          <Todo>COMPOUNDED TIRZEPATIDE SAFETY CONTENT SOURCED FROM CURRENT PRESCRIBING INFORMATION AND APPROVED BY THE CLINICAL PROVIDER AND COMPOUNDING PHARMACY</Todo>.
        </P>
        <PendingClinical />
      </Section>

      <Section n={8} title="Brand-name GLP-1 products offered">
        <P>
          The brand-name products actually offered, and their approved indications as stated in each
          manufacturer's labeling, are{" "}
          <Todo>CONFIRMED LIST OF BRAND-NAME PRODUCTS OFFERED, WITH LABEL-BASED INDICATIONS AND SAFETY CONTENT APPROVED BY THE CLINICAL PROVIDER</Todo>.
          Some brand-name GLP-1 products are approved for type 2 diabetes rather than weight
          management; those distinctions must be stated per product.
        </P>
        <PendingClinical />
      </Section>

      <Section n={9} title="Contraindications">
        <P>
          Contraindications differ by product. The consolidated, product-specific contraindication
          list is <Todo>CONTRAINDICATIONS BY PRODUCT, FROM CURRENT PRESCRIBING INFORMATION</Todo>.
        </P>
        <PendingClinical />
      </Section>

      <Section n={10} title="Boxed warnings">
        <P>
          Certain GLP-1 medications carry a boxed warning in their FDA labeling. The exact boxed
          warning text applicable to each product offered is{" "}
          <Todo>BOXED WARNING TEXT BY PRODUCT, QUOTED FROM CURRENT FDA LABELING</Todo>.
        </P>
        <PendingClinical />
      </Section>

      <Section n={11} title="Common adverse reactions">
        <P>
          Common side effect profiles by product are{" "}
          <Todo>COMMON ADVERSE REACTIONS BY PRODUCT, FROM CURRENT PRESCRIBING INFORMATION</Todo>.
        </P>
        <PendingClinical />
      </Section>

      <Section n={12} title="Serious adverse reactions">
        <P>
          Serious risks and warnings by product are{" "}
          <Todo>SERIOUS ADVERSE REACTIONS AND WARNINGS BY PRODUCT, FROM CURRENT PRESCRIBING INFORMATION</Todo>.
        </P>
        <PendingClinical />
      </Section>

      <Section n={13} title="Drug interactions">
        <P>
          Interaction information, including interactions with insulin, sulfonylureas, and oral
          medications affected by delayed gastric emptying, is{" "}
          <Todo>DRUG-INTERACTION CONTENT BY PRODUCT, FROM CURRENT PRESCRIBING INFORMATION</Todo>.
          Tell your provider about every prescription medication, over-the-counter product, and
          supplement you take.
        </P>
        <PendingClinical />
      </Section>

      <Section n={14} title="Pregnancy and breastfeeding">
        <P>
          Tell your provider if you are pregnant, may be pregnant, are planning pregnancy, or are
          breastfeeding. Product-specific pregnancy and lactation guidance, including any
          recommended discontinuation interval before a planned pregnancy, is{" "}
          <Todo>PREGNANCY AND LACTATION GUIDANCE BY PRODUCT, FROM CURRENT PRESCRIBING INFORMATION</Todo>.
        </P>
        <PendingClinical />
      </Section>

      <Section n={15} title="Monitoring">
        <P>
          Your provider may ask for check-ins, weight and symptom reporting, or laboratory testing
          during treatment. The monitoring protocol actually used is{" "}
          <Todo>MONITORING PROTOCOL APPROVED BY THE CLINICAL PROVIDER</Todo>.
        </P>
      </Section>

      <Section n={16} title="When to contact your provider">
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

      <Section n={17} title="When to call 911">
        <UL
          items={[
            "Trouble breathing, swelling of the face, lips, tongue, or throat, or another severe allergic reaction.",
            "Severe, persistent abdominal pain, especially with vomiting.",
            "Chest pain, fainting, confusion, or a severe change in vision.",
            "Any symptom you believe is life-threatening.",
          ]}
        />
      </Section>

      <Section n={18} title="FDA MedWatch reporting">
        <P>
          You and your provider may report suspected side effects to the FDA MedWatch program at
          1-800-FDA-1088 or at fda.gov/medwatch. Reporting to the FDA does not replace contacting
          your provider.
        </P>
      </Section>

      <Section n={19} title="Trademark attribution">
        <P>
          All brand names referenced are trademarks of their respective owners. Reference to a brand
          does not imply affiliation with, sponsorship by, or endorsement by the trademark owner.
        </P>
      </Section>

      <Section n={20} title="Effective date">
        <P>
          Effective date: <Todo>EFFECTIVE DATE</Todo>.
        </P>
      </Section>

      <Section n={21} title="Clinical-review date">
        <P>
          Last clinical review: <Todo>CLINICAL REVIEW DATE AND REVIEWING CLINICIAN</Todo>. Next
          scheduled review: <Todo>NEXT SCHEDULED CLINICAL REVIEW DATE</Todo>.
        </P>
      </Section>

      <Section n={22} title="Change log">
        <P>
          Version history for this page is{" "}
          <Todo>CHANGE LOG ENTRIES: DATE, SUMMARY OF CHANGE, AND APPROVING REVIEWER</Todo>.
        </P>
      </Section>
    </LegalPage>
  );
}
