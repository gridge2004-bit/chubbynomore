import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL, Todo } from "@/components/LegalPage";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Chubby No More Inc." },
      { name: "description", content: "The terms that govern use of the Chubby No More Inc. website, eligibility quiz, intake, accounts, orders, and subscriptions." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Terms of Use | Chubby No More Inc." },
      { property: "og:description", content: "The terms that govern use of the Chubby No More Inc. website, intake, accounts, orders, and subscriptions." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsOfUsePage,
});

function TermsOfUsePage() {
  return (
    <LegalPage
      title="Chubby No More Inc. Terms of Use"
      intro={
        <P>
          These terms govern your use of the Chubby No More Inc. website and related online
          services. Read them carefully. Facts that have not yet been confirmed appear as bracketed
          placeholders and must be resolved by counsel before publication.
        </P>
      }
    >
      <Section n={1} title="Agreement to these terms">
        <P>
          By using the website, submitting the eligibility quiz, completing an intake, creating an
          account, or placing an order, you agree to these terms. If you do not agree, do not use
          the services.
        </P>
      </Section>

      <Section n={2} title="Eligibility and minimum age">
        <P>
          You must be a resident of a state where the services are available and at least{" "}
          <Todo>MINIMUM AGE</Todo> years old. Clinical eligibility is separate and is determined by
          a licensed provider.
        </P>
      </Section>

      <Section n={3} title="Description of the website and services">
        <P>
          The website provides educational content, an eligibility questionnaire, an intake form,
          account tools, and administrative coordination for online weight-management care. Whether
          Chubby No More Inc. itself is or is not a healthcare provider, and the precise services it
          performs, is <Todo>WHETHER CHUBBY NO MORE INC. IS A MEDICAL PROVIDER OR A NON-CLINICAL ADMINISTRATIVE COMPANY</Todo>.
        </P>
      </Section>

      <Section n={4} title="No emergency services">
        <P>
          The services are not designed for emergencies, urgent symptoms, or crisis situations. Do
          not use the website, messaging, or intake to report an emergency.
        </P>
      </Section>

      <Section n={5} title="Emergency instructions">
        <P>
          If you believe you are experiencing a medical emergency, call 911 or go to the nearest
          emergency department immediately. If you are in crisis or thinking about harming yourself,
          call or text 988 in the United States.
        </P>
      </Section>

      <Section n={6} title="No guarantee of treatment">
        <P>
          Submitting information does not create a treatment relationship and does not guarantee
          that any treatment will be offered to you.
        </P>
      </Section>

      <Section n={7} title="No guarantee of prescription">
        <P>
          No prescription is promised. A licensed provider may decline to prescribe, may prescribe a
          different medication or dose than you expected, or may recommend an alternative approach.
        </P>
      </Section>

      <Section n={8} title="Licensed-provider discretion">
        <P>
          Clinical decisions rest solely with the treating licensed provider, based on their
          independent professional judgment and applicable standards of care. Chubby No More Inc.
          does not direct, override, or influence those decisions.
        </P>
      </Section>

      <Section n={9} title="Relationship between Chubby No More Inc. and healthcare providers">
        <P>
          The contractual and corporate relationship between Chubby No More Inc. and any provider or
          provider group is <Todo>PROVIDER-GROUP RELATIONSHIP, INCLUDING ENTITY NAME, CONTRACT TYPE, AND ANY MANAGEMENT-SERVICES STRUCTURE</Todo>.
        </P>
      </Section>

      <Section n={10} title="Relationship between Chubby No More Inc. and pharmacies">
        <P>
          The relationship with any dispensing pharmacy is{" "}
          <Todo>PHARMACY RELATIONSHIP, INCLUDING WHETHER PHARMACIES ARE INDEPENDENT THIRD PARTIES AND HOW THEY ARE SELECTED</Todo>.
          Pharmacies are not named on this page until confirmed.
        </P>
      </Section>

      <Section n={11} title="Telehealth limitations">
        <P>
          Care delivered remotely has limits. A provider cannot perform a hands-on physical
          examination, and some conditions cannot be evaluated safely without in-person care.
          Additional detail appears in our Consent to Telehealth Services.
        </P>
      </Section>

      <Section n={12} title="Informational website content">
        <P>
          Educational content on the website is general information, not medical advice, and is not
          a substitute for consultation with a qualified professional about your specific situation.
        </P>
      </Section>

      <Section n={13} title="Your responsibility for accurate information">
        <P>
          You are responsible for providing complete, accurate, and current information, including
          your health history, medications, allergies, physical location, and shipping details.
          Inaccurate information can lead to unsafe care and can prevent fulfillment.
        </P>
      </Section>

      <Section n={14} title="Account security">
        <P>
          Keep your credentials confidential and notify us promptly at hello@chubbynomore.com if
          you suspect unauthorized access. You are responsible for activity conducted through your
          account, except to the extent applicable law provides otherwise.
        </P>
      </Section>

      <Section n={15} title="Electronic communications">
        <P>
          You consent to receive communications and required notices electronically, including by
          email, text message, and in-product notification, where permitted by law.
        </P>
      </Section>

      <Section n={16} title="SMS and email communications">
        <P>
          Operational messages relate to your assessment, account, order, and care. Message and data
          rates may apply and frequency varies. Reply STOP to stop promotional texts and HELP for
          help.
        </P>
      </Section>

      <Section n={17} title="Marketing consent and opt-out">
        <P>
          Promotional messages require separate opt-in and are never a condition of purchase or
          care. You may withdraw promotional consent at any time without affecting operational
          messages required to deliver your service.
        </P>
      </Section>

      <Section n={18} title="Orders and payments">
        <P>
          By placing an order you authorize the charges disclosed at checkout, including any
          applicable taxes and fees. Amounts, fee types, and when each is charged are described in
          our Return, Refund & Subscription Policy.
        </P>
      </Section>

      <Section n={19} title="Recurring subscriptions">
        <P>
          Some plans bill on a recurring basis until cancelled. Billing cadence, prepaid plan terms,
          and renewal mechanics are described in the Return, Refund & Subscription Policy.
        </P>
      </Section>

      <Section n={20} title="Cancellations and refunds">
        <P>
          Cancellation deadlines and refund eligibility are governed by the Return, Refund &
          Subscription Policy, which is incorporated into these terms by reference.
        </P>
      </Section>

      <Section n={21} title="Prescription-product restrictions">
        <P>
          Prescription medications are dispensed only under a valid prescription, are intended only
          for the person named on the label, and may not be resold, shared, transferred, or
          exported. Do not use medication prescribed for someone else.
        </P>
      </Section>

      <Section n={22} title="Intellectual property">
        <P>
          The website, its content, design, and marks are owned by Chubby No More Inc. or its
          licensors and are protected by intellectual property laws. You receive a limited,
          revocable, non-exclusive license to use the site for personal, non-commercial purposes.
        </P>
      </Section>

      <Section n={23} title="Acceptable use">
        <P>
          Use the services lawfully, provide truthful information, and respect other users, our
          personnel, and the licensed providers who review your information.
        </P>
      </Section>

      <Section n={24} title="Prohibited conduct">
        <UL
          items={[
            "Impersonating another person or submitting information on someone's behalf without authority.",
            "Attempting to obtain a prescription through false or incomplete statements.",
            "Scraping, reverse engineering, probing, or interfering with the services or their security.",
            "Uploading malicious code or attempting unauthorized access to any account or system.",
            "Reselling, redistributing, or commercially exploiting the services or any medication.",
          ]}
        />
      </Section>

      <Section n={25} title="Third-party services">
        <P>
          The services rely on third parties for functions such as hosting, payments, messaging, and
          fulfillment. Their terms may also apply to you. We are not responsible for third-party
          acts or omissions outside our reasonable control.
        </P>
      </Section>

      <Section n={26} title="Disclaimers">
        <P>
          Except where prohibited by law, the website and non-clinical services are provided "as is"
          and "as available" without warranties of any kind. Nothing in this section limits the
          professional obligations of a treating licensed provider.
        </P>
      </Section>

      <Section n={27} title="Limitation of liability">
        <P>
          The limitation of liability applicable to these terms is{" "}
          <Todo>LIMITATION-OF-LIABILITY LANGUAGE AND ANY DAMAGES CAP, DRAFTED AND APPROVED BY COUNSEL</Todo>.
          No limitation is asserted in this draft.
        </P>
      </Section>

      <Section n={28} title="Indemnification">
        <P>
          Any indemnification obligation is <Todo>INDEMNIFICATION TERMS DRAFTED AND APPROVED BY COUNSEL</Todo>.
        </P>
      </Section>

      <Section n={29} title="Dispute resolution">
        <P>
          Dispute-resolution terms are <Todo>DISPUTE-RESOLUTION PROCESS</Todo>. Arbitration terms
          are <Todo>ARBITRATION TERMS, IF ANY</Todo>, and any class-action waiver is{" "}
          <Todo>CLASS-ACTION WAIVER LANGUAGE, IF ANY</Todo>. Arbitration and a class-action waiver
          are <strong>not</strong> in effect in this draft and must not be activated without written
          legal approval.
        </P>
      </Section>

      <Section n={30} title="Governing law">
        <P>
          Governing law is <Todo>GOVERNING LAW</Todo>. Venue is <Todo>VENUE</Todo>.
        </P>
      </Section>

      <Section n={31} title="Severability">
        <P>
          If any provision is found unenforceable, the remaining provisions stay in effect and the
          unenforceable provision is modified to the minimum extent necessary.
        </P>
      </Section>

      <Section n={32} title="Changes to these terms">
        <P>
          We may update these terms. Material changes will be identified by an updated effective
          date and, where required, additional notice. Continued use after an update means you
          accept the revised terms.
        </P>
      </Section>

      <Section n={33} title="Contact information">
        <UL
          items={[
            <>Company address: <Todo>LEGAL BUSINESS ADDRESS</Todo></>,
            <>Legal contact: <Todo>LEGAL CONTACT NAME AND EMAIL</Todo></>,
            <>Support email: hello@chubbynomore.com</>,
            <>Telephone: <Todo>TELEPHONE NUMBER</Todo></>,
          ]}
        />
      </Section>

      <Section n={34} title="Effective date">
        <P>
          Effective date: <Todo>EFFECTIVE DATE</Todo>. Version: <Todo>TERMS VERSION NUMBER</Todo>.
        </P>
      </Section>
    </LegalPage>
  );
}
