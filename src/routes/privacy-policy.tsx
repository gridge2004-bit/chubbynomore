import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Chubby No More Inc." },
      { name: "description", content: "How Chubby No More Inc. collects, uses, shares, and protects information across its website, eligibility quiz, and online weight-management services." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Privacy Policy | Chubby No More Inc." },
      { property: "og:description", content: "How Chubby No More Inc. collects, uses, shares, and protects information across its website and online weight-management services." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Chubby No More Inc. Online Privacy Policy"
      intro={
        <P>
          This policy explains how Chubby No More Inc. ("Chubby No More," "we," "us") handles
          information in connection with our website, eligibility quiz, intake forms, accounts,
          and related online weight-management services.
        </P>
      }
    >
      <Section n={1} title="Scope of this policy">
        <P>
          This policy applies to information we handle as a healthcare provider operating
          chubbynomore.com and its related online tools, through the licensed clinicians we employ.
          It does not, by itself, describe the privacy practices of any independent pharmacy or
          laboratory that may support your care. Those parties maintain their own notices.
        </P>
        <P>
          Chubby No More Inc. employs licensed clinicians who provide medical services directly to
          members, and we are a covered entity under the Health Insurance Portability and
          Accountability Act (HIPAA). Our Notice of Privacy Practices describes in detail how we
          use and disclose protected health information; this policy addresses the broader set of
          information we handle through our website and online services.
        </P>
      </Section>

      <Section n={2} title="Eligibility and users under 18">
        <P>
          Our services are intended for adults. You must be at least 18 years old to use the
          website and to receive clinical services from Chubby No More Inc. We do not knowingly
          collect information from individuals below that age. If we learn we have, we delete it
          in accordance with our retention practices described in Section 17.
        </P>
      </Section>

      <Section n={3} title="Information you provide to us">
        <UL
          items={[
            "Identifiers such as your name, email address, mobile number, and state of residence.",
            "Eligibility quiz responses you submit on the website.",
            "Intake responses, including health history you enter for provider review.",
            "Shipping and contact details needed to coordinate fulfillment.",
            "Messages, support requests, and any documents or images you choose to send.",
            "Consent selections, including whether you opted into promotional messages.",
          ]}
        />
      </Section>

      <Section n={4} title="Information we receive from our clinicians, pharmacies, and partners">
        <P>
          We may receive information about the status of your care or order from the parties
          involved in delivering it. This includes clinical notes and treatment status from the
          licensed clinicians we employ, and order, dispensing, and shipment status from the
          independent licensed U.S. pharmacies, including compounding pharmacies, that we contract
          with to dispense medication.
        </P>
      </Section>

      <Section n={5} title="Information collected automatically">
        <P>
          When you use the website, our systems and service providers may record technical details
          such as device type, browser, operating system, referring page, pages viewed, approximate
          region derived from IP address, and timestamps. We do not collect precise geolocation
          through the website.
        </P>
      </Section>

      <Section n={6} title="Contact and account information">
        <P>
          Contact details you submit are used to reach you about your assessment, order, and
          account, and to authenticate you when you sign in to your account.
        </P>
      </Section>

      <Section n={7} title="Payment information">
        <P>
          Payments are processed by our third-party payment processor. Card numbers are handled by
          that processor under its own terms. The payment data we retain is limited to billing
          status, transaction history, and the last four digits of your payment method, as needed
          to manage your subscription and support your requests.
        </P>
      </Section>

      <Section n={8} title="Quiz and intake information">
        <P>
          The short eligibility quiz and the longer clinical intake are handled separately. Quiz
          answers support routing and are not used to make a clinical determination. Intake answers
          are collected for review by our licensed clinicians. We do not place quiz or intake answers
          into page URLs, and we do not send them to advertising or analytics tools.
        </P>
      </Section>

      <Section n={9} title="Health-related and sensitive information">
        <P>
          Health history, medication history, measurements, and similar entries are treated as
          sensitive protected health information. Access is limited to our clinicians, support
          staff, and vendors with a defined operational need, consistent with our HIPAA obligations
          and Notice of Privacy Practices.
        </P>
      </Section>

      <Section n={10} title="Cookies, analytics, and similar technologies">
        <P>
          We use cookies and similar technologies that are necessary for the website to function,
          as well as analytics technologies that help us understand website performance and improve
          our services. We do not use advertising pixels that share your health information with
          third parties for advertising purposes.
        </P>
      </Section>

      <Section n={11} title="Why we collect and process information">
        <UL
          items={[
            "To operate the website, quiz, intake, and account features.",
            "To route your submission to our licensed clinicians for review.",
            "To coordinate fulfillment, shipping, and support with the pharmacies involved in your care.",
            "To process payments and manage subscriptions.",
            "To detect fraud, abuse, and security incidents.",
            "To meet legal, regulatory, and recordkeeping obligations.",
            "To improve service quality and measure website performance.",
            "To send promotional messages where you have separately opted in.",
          ]}
        />
      </Section>

      <Section n={12} title="Operational communications">
        <P>
          Operational messages relate to your assessment, order, account, shipment, or care. These
          messages are part of the service and are not promotional. You may not be able to opt out
          of essential operational messages while an order or clinical review is active.
        </P>
      </Section>

      <Section n={13} title="Marketing communications and consent">
        <P>
          Promotional email and text messages are sent only where you separately opted in.
          Promotional consent is never a condition of purchasing or receiving care. You may opt out
          at any time by using the unsubscribe link, replying STOP to a text message, or contacting
          us at hello@chubbynomore.com. Message and data rates may apply; message frequency
          varies.
        </P>
      </Section>

      <Section n={14} title="Clinicians, pharmacies, laboratories, and service vendors">
        <P>
          We share information with the parties needed to deliver the service you requested,
          including our licensed clinicians and the independent licensed pharmacies that dispense
          your medication, and with vendors that support our operations under contract, such as
          hosting, customer relationship management, communications delivery, and payment
          processing.
        </P>
        <P>
          We do not sell your personal information, and we do not share it for cross-context
          behavioral advertising.
        </P>
      </Section>

      <Section n={15} title="Disclosures required by law">
        <P>
          We may disclose information when we reasonably believe disclosure is required by law,
          subpoena, court order, or lawful government request, or where disclosure is necessary to
          protect rights, safety, or the integrity of our services.
        </P>
      </Section>

      <Section n={16} title="Corporate transactions">
        <P>
          If Chubby No More Inc. is involved in a merger, acquisition, financing, reorganization,
          or sale of assets, information may be transferred as part of that transaction, subject to
          applicable law, including HIPAA's requirements for the transfer of protected health
          information.
        </P>
      </Section>

      <Section n={17} title="Data retention">
        <P>
          We retain information for as long as needed for the purposes described here and to meet
          legal obligations. Medical records are retained in accordance with the record-retention
          requirements of the states in which our clinicians are licensed, which generally require
          retention for a period of years following the last date of service.
        </P>
      </Section>

      <Section n={18} title="Data security">
        <P>
          We use administrative, technical, and physical safeguards intended to protect information,
          including encrypted transport, access controls, and role-based restrictions consistent
          with HIPAA's Security Rule. No method of transmission or storage is completely secure, and
          we cannot guarantee absolute security.
        </P>
      </Section>

      <Section n={19} title="Third-party websites">
        <P>
          Our website may link to sites we do not control. Their privacy practices are their own.
          We encourage you to read the notices of any site you visit.
        </P>
      </Section>

      <Section n={20} title="International processing">
        <P>
          We store and process information within the United States. We do not transfer your
          information outside the United States for processing or storage.
        </P>
      </Section>

      <Section n={21} title="State consumer privacy rights">
        <P>
          Residents of certain states may have rights to access, correct, delete, obtain a copy of,
          or limit certain uses of their personal information, and to appeal a denial of a rights
          request. To the extent protected health information you provide to us is governed by
          HIPAA, your rights with respect to that information are described in our Notice of
          Privacy Practices rather than in this policy. You may submit any other privacy request by
          emailing privacy@chubbynomore.com.
        </P>
      </Section>

      <Section n={22} title="California rights">
        <P>
          California residents may have additional rights regarding categories of personal
          information collected and disclosed, along with the right to limit use of sensitive
          personal information and the right to be free from discrimination for exercising those
          rights. Protected health information we maintain as a HIPAA covered entity is exempt from
          the California Consumer Privacy Act and is instead governed by HIPAA and our Notice of
          Privacy Practices.
        </P>
      </Section>

      <Section n={23} title="Other applicable state rights">
        <P>
          Some states have enacted consumer health data statutes that apply to health-related
          information collected outside the HIPAA framework, such as information you submit through
          our eligibility quiz before becoming a patient. Where those laws apply, we honor requests
          to access or delete that information consistent with this policy and applicable law.
        </P>
      </Section>

      <Section n={24} title="Changes to this policy">
        <P>
          We may update this policy. When we do, we will revise the effective date below and, where
          required, provide additional notice. Continued use of the website after an update means
          you accept the revised policy.
        </P>
      </Section>

      <Section n={25} title="How to contact Chubby No More Inc.">
        <UL
          items={[
            <>Legal business address: 20200 West Dixie Highway, Suite 902, Aventura, FL 33180</>,
            <>Privacy email: privacy@chubbynomore.com</>,
            <>Support email: hello@chubbynomore.com</>,
            <>Telephone: (908) 842-3447</>,
            <>Privacy requests may be submitted by emailing privacy@chubbynomore.com. Our Privacy Officer, Greg Henson, oversees privacy requests.</>,
          ]}
        />
      </Section>

      <Section n={26} title="Effective date">
        <P>
          Effective date: August 18, 2026. Version: 1.0.
        </P>
      </Section>
    </LegalPage>
  );
}
