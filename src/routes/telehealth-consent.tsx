import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL, Todo } from "@/components/LegalPage";

/** Bump when consent wording changes; stored with each acknowledgment. */
export const TELEHEALTH_CONSENT_VERSION = "draft-2026-07-28";

export const Route = createFileRoute("/telehealth-consent")({
  head: () => ({
    meta: [
      { title: "Consent to Telehealth Services | Chubby No More Inc." },
      { name: "description", content: "Informed consent for telehealth care coordinated through Chubby No More Inc., including benefits, risks, limitations, and your right to withdraw." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Consent to Telehealth Services | Chubby No More Inc." },
      { property: "og:description", content: "Informed consent for telehealth care: benefits, risks, limitations, and your right to withdraw." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TelehealthConsentPage,
});

function TelehealthConsentPage() {
  return (
    <LegalPage
      title="Consent to Telehealth Services"
      intro={
        <P>
          This is an informed-consent document. It describes how remote care works, what it can and
          cannot do, and the choices available to you. You will be asked to acknowledge it before
          submitting your clinical intake.
        </P>
      }
    >
      <Section n={1} title="What telehealth means">
        <P>
          Telehealth is the delivery of healthcare using communications technology instead of an
          in-person visit. It may include reviewing written health information, secure messaging,
          telephone, or video.
        </P>
      </Section>

      <Section n={2} title="Synchronous and asynchronous care">
        <P>
          Synchronous care happens in real time, such as a live video or telephone visit.
          Asynchronous care means you submit information and a licensed provider reviews it later.
          Which modalities are used for your care depends on your state and clinical situation, and
          the modalities offered are <Todo>MODALITIES OFFERED BY THE PROVIDER GROUP, BY STATE</Todo>.
        </P>
      </Section>

      <Section n={3} title="Potential benefits">
        <UL
          items={[
            "Access to a licensed provider without travel to a clinic.",
            "More flexible scheduling and faster initial review.",
            "Greater privacy and convenience for follow-up.",
            "Continuity of monitoring through structured check-ins.",
          ]}
        />
      </Section>

      <Section n={4} title="Potential risks and limitations">
        <UL
          items={[
            "Information you provide may be incomplete or inaccurate, which can affect clinical judgment.",
            "A condition may be missed that an in-person examination or testing would identify.",
            "Delays in review or response can occur.",
            "Treatment may be less appropriate for you than in-person care in some situations.",
          ]}
        />
      </Section>

      <Section n={5} title="No complete physical examination">
        <P>
          Your provider cannot perform a hands-on physical examination remotely. Some findings, such
          as certain abdominal, cardiac, or neurologic signs, can only be assessed in person.
        </P>
      </Section>

      <Section n={6} title="Technology failure">
        <P>
          Connectivity problems, device failures, or software issues may interrupt or delay care. If
          a session fails, follow-up will occur through{" "}
          <Todo>TECHNOLOGY-FAILURE FALLBACK PROCESS</Todo>.
        </P>
      </Section>

      <Section n={7} title="Privacy and security limitations">
        <P>
          Reasonable safeguards are used, but no electronic communication is completely secure.
          Risks include interception, misdirected messages, and unauthorized access to your device.
          Use a private device and network when possible.
        </P>
      </Section>

      <Section n={8} title="Alternative care options">
        <P>
          You may choose in-person care with a local clinician instead of telehealth at any time.
          Choosing not to use telehealth does not affect your right to seek care elsewhere.
        </P>
      </Section>

      <Section n={9} title="Your right to ask questions">
        <P>
          You may ask questions about your evaluation, medication options, risks, alternatives, and
          costs at any point, and you may request that a question be answered before you proceed.
        </P>
      </Section>

      <Section n={10} title="Your right to withdraw consent">
        <P>
          You may withdraw this consent at any time without affecting care you have already
          received. Withdrawal may end your ability to receive further telehealth services. To
          withdraw, contact <Todo>WITHDRAWAL CONTACT METHOD</Todo>.
        </P>
      </Section>

      <Section n={11} title="Emergency limitations">
        <P>
          Telehealth is not for emergencies. If you have severe or sudden symptoms, call 911 or go
          to the nearest emergency department. For mental-health crisis support in the United
          States, call or text 988.
        </P>
      </Section>

      <Section n={12} title="You must disclose your physical location">
        <P>
          You must tell your provider the state where you are physically located at the time of
          care. Licensure rules depend on your location, and care may not be lawful if your location
          is misreported.
        </P>
      </Section>

      <Section n={13} title="Provider licensure and state availability">
        <P>
          Care is provided only by clinicians licensed in your state. The provider entity responsible
          for your care is <Todo>PROVIDER GROUP LEGAL NAME</Todo>, and the states where services are
          available are <Todo>LIST OF STATES WHERE SERVICES ARE AVAILABLE</Todo>.
        </P>
      </Section>

      <Section n={14} title="Electronic communications">
        <P>
          You consent to receive care-related communications electronically, including messages
          about your evaluation, prescriptions, and follow-up, where permitted by law.
        </P>
      </Section>

      <Section n={15} title="Prescriptions are not guaranteed">
        <P>
          Consenting to telehealth does not entitle you to any medication. Your provider may decline
          to prescribe, may prescribe something different from what you expected, or may recommend
          non-medication approaches.
        </P>
      </Section>

      <Section n={16} title="In-person referral when appropriate">
        <P>
          If your provider determines that in-person evaluation, laboratory testing, or specialist
          care is needed, they may refer you and may decline to continue remote treatment until that
          care occurs.
        </P>
      </Section>

      <Section n={17} title="Documentation in the medical record">
        <P>
          Your consent, intake responses, and clinical communications are documented in your medical
          record, which is maintained by <Todo>ENTITY THAT MAINTAINS THE MEDICAL RECORD</Todo>.
        </P>
      </Section>

      <Section n={18} title="State-specific consent supplements">
        <P>
          Some states require additional consent disclosures or a specific consent format. Required
          state supplements are <Todo>STATE-SPECIFIC TELEHEALTH CONSENT SUPPLEMENTS</Todo>.
        </P>
      </Section>

      <Section n={19} title="Electronic signature">
        <P>
          By typing your full legal name and submitting your intake, you sign this consent
          electronically and agree that your electronic signature has the same effect as a
          handwritten signature. Each acknowledgment records: intake or patient ID, full name, state,
          consent version, timestamp, electronic signature, and withdrawal status.
        </P>
      </Section>

      <Section n={20} title="Effective date and consent version">
        <P>
          Consent version: <code className="rounded bg-[#F5F5F7] px-1.5 py-0.5">{TELEHEALTH_CONSENT_VERSION}</code>.
          Effective date: <Todo>EFFECTIVE DATE</Todo>. Approving clinical reviewer:{" "}
          <Todo>APPROVING CLINICAL REVIEWER AND DATE</Todo>.
        </P>
      </Section>
    </LegalPage>
  );
}
