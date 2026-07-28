import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL, Todo } from "@/components/LegalPage";

export const Route = createFileRoute("/pharmacy-disclosure")({
  head: () => ({
    meta: [
      { title: "Pharmacy and Medication Disclosure | Chubby No More Inc." },
      { name: "description", content: "Roles of Chubby No More Inc., licensed providers, and dispensing pharmacies, plus compounded and brand-name medication disclosures." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Pharmacy and Medication Disclosure | Chubby No More Inc." },
      { property: "og:description", content: "Roles of Chubby No More Inc., licensed providers, and dispensing pharmacies, plus compounded medication disclosures." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PharmacyDisclosurePage,
});

function PharmacyDisclosurePage() {
  return (
    <LegalPage
      title="Pharmacy and Medication Disclosure"
      intro={
        <P>
          This page explains who does what when a medication is prescribed and dispensed, and what
          is and is not guaranteed. Pharmacy partners are not named until the relationship has been
          confirmed.
        </P>
      }
    >
      <Section n={1} title="Chubby No More Inc.'s role">
        <P>
          Chubby No More Inc. operates the website and the administrative tools that connect you
          with care. Its precise legal role, including whether it performs any clinical or
          dispensing function, is <Todo>CHUBBY NO MORE INC.'S LEGAL ROLE IN THE CARE MODEL</Todo>.
          Chubby No More Inc. does not select which medication is prescribed.
        </P>
      </Section>

      <Section n={2} title="Licensed-provider role">
        <P>
          A clinician licensed in your state reviews your information and exercises independent
          professional judgment about whether treatment is appropriate. The provider entity is{" "}
          <Todo>PROVIDER GROUP LEGAL NAME</Todo>.
        </P>
      </Section>

      <Section n={3} title="Dispensing-pharmacy role">
        <P>
          If a prescription is issued, it is filled by a licensed pharmacy that performs its own
          verification, dispensing, labeling, and counseling obligations. The pharmacy is{" "}
          <Todo>DISPENSING PHARMACY NAME, LICENSE STATE(S), AND RELATIONSHIP TO CHUBBY NO MORE INC.</Todo>.
        </P>
      </Section>

      <Section n={4} title="Prescription requirement">
        <P>
          The medications discussed on this site require a valid prescription. They cannot be
          purchased without provider authorization and are intended only for the person named on the
          label.
        </P>
      </Section>

      <Section n={5} title="Provider discretion">
        <P>
          Your provider decides whether to prescribe, what to prescribe, and at what dose. A request
          for a specific product does not obligate any provider to issue it.
        </P>
      </Section>

      <Section n={6} title="Pharmacy selection">
        <P>
          The pharmacy that fills your prescription may be chosen based on licensure, availability,
          shipping capability, and clinical requirements. The selection process and any financial
          arrangements are <Todo>PHARMACY SELECTION CRITERIA AND ANY FINANCIAL ARRANGEMENTS, REVIEWED FOR COMPLIANCE</Todo>.
        </P>
      </Section>

      <Section n={7} title="State and product availability">
        <P>
          Availability varies by state, product, and supply conditions. Current availability is{" "}
          <Todo>STATE-BY-STATE AND PRODUCT-BY-PRODUCT AVAILABILITY LIST</Todo>.
        </P>
      </Section>

      <Section n={8} title="Brand-name medication">
        <P>
          Brand-name products are manufactured and labeled by their manufacturers and are dispensed
          only where a provider determines they are appropriate and where they are available. All
          brand names and trademarks belong to their respective owners; use of a name does not imply
          affiliation, sponsorship, or endorsement.
        </P>
      </Section>

      <Section n={9} title="Compounded medication">
        <P>
          Compounded medications are prepared by a compounding pharmacy for an individual patient
          based on a prescription. They are not manufactured commercial products and are not
          reviewed by the FDA before dispensing. The pharmacy's compounding category and applicable
          registration are <Todo>COMPOUNDING PHARMACY CATEGORY (503A OR 503B) AND REGISTRATION DETAILS</Todo>.
        </P>
      </Section>

      <Section n={10} title="FDA-approval distinction">
        <P>
          <strong>Compounded medications are not FDA-approved for safety, effectiveness, or quality.</strong>{" "}
          This differs from brand-name products, which have undergone FDA review for their approved
          indications.
        </P>
      </Section>

      <Section n={11} title="No guarantee of a specific drug">
        <P>
          We cannot guarantee that any particular medication will be prescribed or available to you.
        </P>
      </Section>

      <Section n={12} title="No guarantee of a specific dose">
        <P>
          Dosing is determined by your provider and may be started low, titrated, held, or changed
          based on your response, tolerability, and clinical factors.
        </P>
      </Section>

      <Section n={13} title="No guarantee of a specific pharmacy">
        <P>
          We cannot guarantee that your prescription will be filled by any particular pharmacy.
        </P>
      </Section>

      <Section n={14} title="Shipping and fulfillment">
        <P>
          Shipping is arranged by the dispensing pharmacy or its carrier. Timelines, packaging, and
          any cold-chain handling are <Todo>SHIPPING AND COLD-CHAIN HANDLING DETAILS FROM THE DISPENSING PHARMACY</Todo>.
        </P>
      </Section>

      <Section n={15} title="Medication guides and labeling">
        <P>
          Read the label, prescribing information, and any medication guide included with your
          shipment, and follow the storage and administration instructions exactly. If your shipment
          is missing required materials, contact the pharmacy.
        </P>
      </Section>

      <Section n={16} title="Pharmacy complaints and questions">
        <P>
          Questions about dispensing, labeling, packaging, or the medication itself should go to the
          dispensing pharmacy. Contact details are{" "}
          <Todo>PHARMACY CONTACT DETAILS FOR PATIENT QUESTIONS AND COMPLAINTS</Todo>.
        </P>
      </Section>

      <Section n={17} title="Adverse-event reporting">
        <P>
          Report side effects to your provider and to the dispensing pharmacy. You may also report
          to the FDA MedWatch program at 1-800-FDA-1088 or at fda.gov/medwatch. For emergencies,
          call 911.
        </P>
        <UL
          items={[
            <>Internal adverse-event intake process: <Todo>INTERNAL ADVERSE-EVENT REPORTING WORKFLOW AND OWNER</Todo></>,
          ]}
        />
      </Section>

      <Section n={18} title="Effective date">
        <P>
          Effective date: <Todo>EFFECTIVE DATE</Todo>. Reviewed by:{" "}
          <Todo>PHARMACY AND CLINICAL REVIEWERS AND DATES</Todo>.
        </P>
      </Section>
    </LegalPage>
  );
}
