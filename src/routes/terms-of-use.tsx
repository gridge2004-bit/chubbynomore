import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL } from "@/components/LegalPage";

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
          services. Read them carefully before using the website, quiz, intake, or checkout.
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
          You must be a resident of a state where the services are available and at least 18 years
          old. Clinical eligibility is separate and is determined by our licensed provider.
        </P>
      </Section>

      <Section n={3} title="Description of the website and services">
        <P>
          Chubby No More Inc. is a Delaware corporation that employs licensed clinicians and
          provides medical services directly through them. The website provides educational
          content, an eligibility questionnaire, an intake form, account tools, and coordination
          of your care, including connecting you with the independent, licensed U.S. pharmacies,
          including compounding pharmacies, that we contract with to dispense medication.
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
          No prescription is promised. Our licensed provider may decline to prescribe, may prescribe a
          different medication or dose than you expected, or may recommend an alternative approach.
          If a provider declines to prescribe, you are charged $0 and any payment pre-authorization
          is released.
        </P>
      </Section>

      <Section n={8} title="Licensed-provider discretion">
        <P>
          Clinical decisions rest solely with the treating licensed provider, based on their
          independent professional judgment and applicable standards of care. Chubby No More Inc.
          does not direct, override, or influence those decisions.
        </P>
      </Section>

      <Section n={9} title="Our clinicians">
        <P>
          Chubby No More Inc. directly employs the licensed clinicians who evaluate you and, where
          clinically appropriate, prescribe treatment. We are not a purely administrative company;
          your medical care is delivered by our own clinical staff, subject to their independent
          professional judgment.
        </P>
      </Section>

      <Section n={10} title="Relationship between Chubby No More Inc. and pharmacies">
        <P>
          Medications are dispensed by independent, licensed U.S. pharmacies, including compounding
          pharmacies, that Chubby No More Inc. contracts with to fill and ship prescriptions. These
          pharmacies are separate legal entities that operate under their own pharmacy licenses and
          are responsible for accurately filling and safely dispensing your prescription.
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
          Subscription plans bill every 28 days on your plan anniversary until cancelled. We send a
          renewal reminder by email at least 7 days before each renewal charge. Billing cadence,
          prepaid plan terms, and renewal mechanics are described in the Return, Refund &
          Subscription Policy.
        </P>
      </Section>

      <Section n={20} title="Cancellations and refunds">
        <P>
          You may cancel your subscription at least 3 business days before your renewal date to
          avoid the next charge. Because prescription medication cannot be returned or resold once
          dispensed, charges become non-refundable once the pharmacy accepts the order and creates a
          shipping label. Eligible refunds are processed within 5 to 10 business days. Full
          cancellation deadlines and refund eligibility are governed by the Return, Refund &
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
          To the fullest extent permitted by law, Chubby No More Inc. and its officers, employees,
          and contracted pharmacies will not be liable for indirect, incidental, consequential, or
          punitive damages arising from your use of the website or services. Nothing in this section
          limits liability for the professional negligence of a treating licensed clinician, which is
          governed by applicable medical malpractice law rather than by this limitation.
        </P>
      </Section>

      <Section n={28} title="Indemnification">
        <P>
          You agree to indemnify and hold harmless Chubby No More Inc. and its officers and
          employees from claims, losses, and expenses, including reasonable attorneys' fees, arising
          from your breach of these terms, your misuse of the services, or information you submit
          that is false or misleading.
        </P>
      </Section>

      <Section n={29} title="Dispute resolution">
        <P>
          Before filing a claim, you agree to contact us at legal@chubbynomore.com so we can attempt
          to resolve the dispute informally. Claims not resolved informally may be brought in the
          state or federal courts located in Delaware, as described in the Governing Law section
          below. There is no mandatory arbitration requirement and no class-action waiver under
          these terms.
        </P>
      </Section>

      <Section n={30} title="Governing law">
        <P>
          These terms are governed by the laws of the State of Delaware, without regard to its
          conflict-of-laws principles. Venue for any dispute lies in the state or federal courts
          located in Delaware.
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
            <>Company address: Chubby No More Inc., 20200 West Dixie Highway, Suite 902, Aventura, FL 33180</>,
            <>Legal contact: Greg Henson, legal@chubbynomore.com</>,
            <>Support email: hello@chubbynomore.com</>,
            <>Telephone: (908) 842-3447</>,
          ]}
        />
      </Section>

      <Section n={34} title="Effective date">
        <P>
          Effective date: August 18, 2026. Version: 1.0.
        </P>
      </Section>
    </LegalPage>
  );
}
