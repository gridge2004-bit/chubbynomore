import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL } from "@/components/LegalPage";

export const Route = createFileRoute("/notice-of-privacy-practices")({
  head: () => ({
    meta: [
      { title: "Notice of Privacy Practices | Chubby No More Inc." },
      { name: "description", content: "Notice of Privacy Practices describing how protected health information may be used and disclosed and how patients can access it." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Notice of Privacy Practices | Chubby No More Inc." },
      { property: "og:description", content: "Notice describing how protected health information may be used and disclosed and how patients can access it." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NoticeOfPrivacyPracticesPage,
});

function NoticeOfPrivacyPracticesPage() {
  return (
    <LegalPage
      title="Notice of Privacy Practices"
      intro={
        <P>
          <strong>
            This notice describes how medical information about you may be used and disclosed and
            how you can get access to this information. Please review it carefully.
          </strong>
        </P>
      }
    >
      <Section n={1} title="Entity covered by this notice">
        <P>
          The covered healthcare entity responsible for this notice is Chubby No More Inc. Chubby
          No More Inc. employs licensed clinicians who provide medical services directly to
          members, and Chubby No More Inc. is a HIPAA covered entity acting as a healthcare
          provider. The independent licensed pharmacies that dispense medication under our
          clinicians' prescriptions maintain their own privacy notices for the dispensing
          activities they perform.
        </P>
      </Section>

      <Section n={2} title="Your rights">
        <UL
          items={[
            "Get an electronic or paper copy of your medical record.",
            "Ask us to correct your medical record.",
            "Request confidential communications by a specific method or at a specific address.",
            "Ask us to limit what we use or share, though we are not required to agree in all cases.",
            "Get a list of those with whom we have shared your information.",
            "Get a copy of this privacy notice.",
            "Choose someone to act for you, such as a personal representative or healthcare agent.",
            "File a complaint if you believe your privacy rights have been violated.",
          ]}
        />
        <P>
          To exercise any of these rights, send a written request to our Privacy Officer, Greg
          Henson, at privacy@chubbynomore.com or at 20200 West Dixie Highway, Suite 902, Aventura,
          FL 33180. We will respond to your request within the timeframes required by law.
        </P>
      </Section>

      <Section n={3} title="Permitted uses and disclosures">
        <P>
          We may use and share your health information for treatment, payment, and healthcare
          operations, and for other purposes permitted or required by law, as described below.
        </P>
      </Section>

      <Section n={4} title="Treatment">
        <P>
          We may use your health information and share it with other professionals who are treating
          you, including for prescribing, dispensing coordination with the pharmacies we contract
          with, and follow-up care.
        </P>
      </Section>

      <Section n={5} title="Payment">
        <P>
          We may use and share your health information to bill and obtain payment for the services
          you receive, including from you or a payer where applicable.
        </P>
      </Section>

      <Section n={6} title="Healthcare operations">
        <P>
          We may use and share your health information to run our practice, improve care quality,
          conduct training and review, and contact you about your care.
        </P>
      </Section>

      <Section n={7} title="Public health and other required disclosures">
        <UL
          items={[
            "Public health and safety activities, including reporting adverse reactions to medications.",
            "Health oversight agencies for audits, investigations, and licensure activities.",
            "Compliance with law, including required reporting and responses to lawful process.",
            "Workers' compensation, law enforcement, and other government requests as permitted.",
            "Organ procurement, coroners, medical examiners, and funeral directors as permitted.",
            "Research, only where permitted by law and applicable approvals.",
          ]}
        />
      </Section>

      <Section n={8} title="Your choices">
        <P>
          For certain uses and disclosures, you can tell us your preference, including sharing with
          family or friends involved in your care, disaster relief notification, and inclusion in
          any directory. We never share psychotherapy notes, marketing information, or sell your
          information without your written authorization, except as permitted by law.
        </P>
      </Section>

      <Section n={9} title="Our responsibilities">
        <UL
          items={[
            "We are required by law to maintain the privacy and security of your protected health information.",
            "We will let you know promptly if a breach occurs that may have compromised your information.",
            "We must follow the duties and privacy practices described in this notice and give you a copy.",
            "We will not use or share your information other than as described here unless you tell us we can in writing, and you may change your mind at any time.",
          ]}
        />
      </Section>

      <Section n={10} title="Breach notification">
        <P>
          If a breach of unsecured protected health information occurs, we notify affected
          individuals, and where required, the U.S. Department of Health and Human Services and the
          media, as required by law. Our Privacy Officer, Greg Henson, directs our breach-response
          process.
        </P>
      </Section>

      <Section n={11} title="Complaints">
        <P>
          You may complain to us using the contact information below, or to the U.S. Department of
          Health and Human Services Office for Civil Rights. We will not retaliate against you for
          filing a complaint.
        </P>
      </Section>

      <Section n={12} title="Privacy official">
        <UL
          items={[
            <>Privacy official: Greg Henson, Privacy Officer</>,
            <>Provider address: 20200 West Dixie Highway, Suite 902, Aventura, FL 33180</>,
            <>Provider telephone: (908) 842-3447</>,
            <>Provider privacy email: privacy@chubbynomore.com</>,
          ]}
        />
      </Section>

      <Section n={13} title="Effective date">
        <P>
          Effective date of this notice: August 18, 2026.
        </P>
      </Section>

      <Section n={14} title="Changes to this notice">
        <P>
          We can change the terms of this notice, and the changes will apply to all information we
          have about you. The new notice will be available upon request and on our website.
        </P>
      </Section>

      <Section n={15} title="Acknowledgment of receipt">
        <P>
          You may be asked to acknowledge receipt of this notice. Acknowledgment does not waive any
          privacy right. This notice was reviewed and approved by the Chubby No More Medical
          Director as part of our clinical review process, with a next scheduled clinical review
          date of February 18, 2027.
        </P>
      </Section>
    </LegalPage>
  );
}
