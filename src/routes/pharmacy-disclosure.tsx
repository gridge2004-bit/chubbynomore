import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL } from "@/components/LegalPage";

export const Route = createFileRoute("/pharmacy-disclosure")({
  head: () => ({
    meta: [
      { title: "Pharmacy and Medication Disclosure | Chubby No More Inc." },
      { name: "description", content: "Roles of Chubby No More Inc., its licensed clinicians, and dispensing pharmacies, plus compounded and brand-name medication disclosures." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Pharmacy and Medication Disclosure | Chubby No More Inc." },
      { property: "og:description", content: "Roles of Chubby No More Inc., its licensed clinicians, and dispensing pharmacies, plus compounded medication disclosures." },
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
          This page explains who does what when a medication is prescribed and dispensed through
          Chubby No More, and what is and is not guaranteed.
        </P>
      }
    >
      <Section n={1} title="Chubby No More Inc.'s role">
        <P>
          Chubby No More Inc. is a healthcare provider that employs licensed clinicians who review
          your information and provide medical services directly to you. Chubby No More Inc. does
          not itself dispense medication and does not select which medication is prescribed; those
          decisions rest with your treating clinician.
        </P>
      </Section>

      <Section n={2} title="Licensed-clinician role">
        <P>
          A clinician licensed in your state, employed by Chubby No More Inc., reviews your
          information and exercises independent professional judgment about whether treatment is
          appropriate, what to prescribe, and at what dose.
        </P>
      </Section>

      <Section n={3} title="Dispensing-pharmacy role">
        <P>
          If a prescription is issued, it is filled by an independent licensed U.S. pharmacy that
          Chubby No More Inc. contracts with, including compounding pharmacies where applicable.
          Each dispensing pharmacy performs its own verification, dispensing, labeling, and
          counseling obligations under its own pharmacy license, separate from Chubby No More Inc.
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
          Your clinician decides whether to prescribe, what to prescribe, and at what dose. A
          request for a specific product does not obligate any clinician to issue it.
        </P>
      </Section>

      <Section n={6} title="Pharmacy selection">
        <P>
          The pharmacy that fills your prescription is selected from among our contracted
          independent licensed pharmacies based on licensure in your state, product availability,
          shipping capability, and clinical requirements.
        </P>
      </Section>

      <Section n={7} title="State and product availability">
        <P>
          Availability varies by state, product, and supply conditions. Not every medication is
          available in every state, and availability may change based on the licensure and supply
          of our contracted pharmacies.
        </P>
      </Section>

      <Section n={8} title="Brand-name medication">
        <P>
          Brand-name products are manufactured and labeled by their manufacturers and are dispensed
          only where a clinician determines they are appropriate and where they are available. All
          brand names and trademarks belong to their respective owners; use of a name does not imply
          affiliation, sponsorship, or endorsement.
        </P>
      </Section>

      <Section n={9} title="Compounded medication">
        <P>
          Compounded medications are prepared by a licensed compounding pharmacy for an individual
          patient based on a prescription from your clinician. They are not manufactured commercial
          products and are not reviewed by the FDA before dispensing. Our contracted compounding
          pharmacies are licensed and registered in accordance with applicable state and federal law
          governing compounding pharmacies.
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
          Dosing is determined by your clinician and may be started low, titrated, held, or changed
          based on your response, tolerability, and clinical factors.
        </P>
      </Section>

      <Section n={13} title="No guarantee of a specific pharmacy">
        <P>
          We cannot guarantee that your prescription will be filled by any particular pharmacy among
          our contracted network.
        </P>
      </Section>

      <Section n={14} title="Shipping and fulfillment">
        <P>
          Shipping is arranged by the dispensing pharmacy or its carrier. Medications requiring
          temperature-controlled handling are packaged with appropriate cold-chain materials by the
          dispensing pharmacy and shipped for prompt delivery. If a shipment is lost or arrives
          damaged, report it within 7 days so we can coordinate a replacement with the pharmacy.
        </P>
      </Section>

      <Section n={15} title="Medication guides and labeling">
        <P>
          Read the label, prescribing information, and any medication guide included with your
          shipment, and follow the storage and administration instructions exactly. If your shipment
          is missing required materials, contact the dispensing pharmacy or our support team at
          hello@chubbynomore.com.
        </P>
      </Section>

      <Section n={16} title="Pharmacy complaints and questions">
        <P>
          Questions about dispensing, labeling, packaging, or the medication itself should go to the
          dispensing pharmacy identified on your prescription label and shipment. You may also
          contact Chubby No More Inc. at hello@chubbynomore.com or (908) 842-3447, Monday–Friday,
          9:00 a.m. to 6:00 p.m. ET, and we will help coordinate with the pharmacy.
        </P>
      </Section>

      <Section n={17} title="Adverse-event reporting">
        <P>
          Report side effects to your clinician and to the dispensing pharmacy. You may also report
          to the FDA MedWatch program at 1-800-FDA-1088 or at fda.gov/medwatch. For emergencies,
          call 911.
        </P>
        <UL
          items={[
            <>To report an adverse event to Chubby No More Inc., email hello@chubbynomore.com or call (908) 842-3447; our clinical team logs and reviews every report.</>,
          ]}
        />
      </Section>

      <Section n={18} title="Effective date">
        <P>
          Effective date: August 18, 2026. Reviewed by the Chubby No More Medical Director, with a
          next scheduled clinical review date of February 18, 2027.
        </P>
      </Section>
    </LegalPage>
  );
}
