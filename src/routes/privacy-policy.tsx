import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL, Todo } from "@/components/LegalPage";

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
          and related online services. It is written for the services we actually operate. Where a
          fact has not yet been confirmed by counsel or by an operational owner, it appears as a
          bracketed placeholder rather than an assumption.
        </P>
      }
    >
      <Section n={1} title="Scope of this policy">
        <P>
          This policy applies to information we handle as a technology and administrative services
          company operating chubbynomore.com and its related online tools. It does not, by itself,
          describe the privacy practices of any independent licensed provider, provider group,
          pharmacy, or laboratory that may care for you. Those parties maintain their own notices.
        </P>
        <P>
          Whether any portion of the information we handle is subject to the Health Insurance
          Portability and Accountability Act (HIPAA), and in what role Chubby No More Inc. acts
          with respect to that information, is <Todo>CHUBBY NO MORE INC.'S HIPAA STATUS AND, IF APPLICABLE, ITS BUSINESS-ASSOCIATE RELATIONSHIPS</Todo>.
          We make no HIPAA representation in this draft.
        </P>
      </Section>

      <Section n={2} title="Eligibility and users under 18">
        <P>
          Our services are intended for adults. Minimum age for use of the website and for clinical
          services is <Todo>MINIMUM AGE FOR WEBSITE USE AND FOR CLINICAL SERVICES, BY STATE IF IT VARIES</Todo>.
          We do not knowingly collect information from individuals below that age. If we learn we
          have, we delete it in accordance with our retention practices described in Section 17.
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

      <Section n={4} title="Information we receive from providers, pharmacies, and partners">
        <P>
          We may receive information about the status of your care or order from the parties
          involved in delivering it. The specific parties, and the categories of information each
          one sends to us, are <Todo>PROVIDER GROUP NAME AND DATA FLOWS</Todo>,{" "}
          <Todo>PHARMACY PARTNER NAMES AND DATA FLOWS</Todo>, and{" "}
          <Todo>LABORATORY PARTNER NAMES AND DATA FLOWS, IF ANY</Todo>.
        </P>
      </Section>

      <Section n={5} title="Information collected automatically">
        <P>
          When you use the website, our systems and service providers may record technical details
          such as device type, browser, operating system, referring page, pages viewed, approximate
          region derived from IP address, and timestamps. Whether precise geolocation is collected
          is <Todo>WHETHER PRECISE GEOLOCATION IS COLLECTED, AND IF SO BY WHICH TOOL AND FOR WHAT PURPOSE</Todo>.
        </P>
      </Section>

      <Section n={6} title="Contact and account information">
        <P>
          Contact details you submit are used to reach you about your assessment, order, and
          account, and to authenticate you if account features are enabled. Account credentials, if
          offered, are handled by <Todo>AUTHENTICATION PROVIDER</Todo>.
        </P>
      </Section>

      <Section n={7} title="Payment information">
        <P>
          Payments, if and when charged, are processed by <Todo>PAYMENT PROCESSOR</Todo>. Card
          numbers are handled by that processor under its own terms. The payment data we can view
          or store is limited to <Todo>PAYMENT DATA FIELDS RETAINED BY CHUBBY NO MORE INC.</Todo>.
        </P>
      </Section>

      <Section n={8} title="Quiz and intake information">
        <P>
          The short eligibility quiz and the longer clinical intake are handled separately. Quiz
          answers support routing and are not used to make a clinical determination. Intake answers
          are collected for review by a licensed provider. We do not place quiz or intake answers
          into page URLs, and we do not send them to advertising or analytics tools.
        </P>
      </Section>

      <Section n={9} title="Health-related and sensitive information">
        <P>
          Health history, medication history, measurements, and similar entries are treated as
          sensitive. Access is limited to personnel and vendors with a defined operational need.
          The categories of sensitive information we process, and the legal characterization of
          each category, are <Todo>SENSITIVE-DATA CATEGORY MAP AND LEGAL CHARACTERIZATION</Todo>.
        </P>
      </Section>

      <Section n={10} title="Cookies, analytics, pixels, and similar technologies">
        <P>
          We use cookies and similar technologies that are necessary for the website to function.
          Any additional measurement or advertising technologies in use are{" "}
          <Todo>ANALYTICS VENDORS IN USE</Todo> and <Todo>ADVERTISING VENDORS AND PIXELS IN USE, OR CONFIRMATION THAT NONE ARE USED</Todo>.
          We do not state in this draft whether advertising pixels are or are not deployed; that
          statement must match the deployed configuration before publication.
        </P>
      </Section>

      <Section n={11} title="Why we collect and process information">
        <UL
          items={[
            "To operate the website, quiz, intake, and account features.",
            "To route your submission to a licensed provider for review.",
            "To coordinate fulfillment, shipping, and support with the parties involved in your care.",
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

      <Section n={14} title="Providers, pharmacies, laboratories, and service vendors">
        <P>
          We share information with the parties needed to deliver the service you requested, and
          with vendors that support our operations under contract. Categories include hosting,
          customer relationship management, communications delivery, payment processing, and
          fulfillment coordination. Named vendors are <Todo>HOSTING PROVIDER</Todo>,{" "}
          <Todo>CRM</Todo>, <Todo>COMMUNICATIONS VENDORS</Todo>,{" "}
          <Todo>PAYMENT PROCESSOR</Todo>, <Todo>PROVIDER GROUP</Todo>, and{" "}
          <Todo>PHARMACY PARTNERS</Todo>.
        </P>
        <P>
          Whether any disclosure constitutes a "sale" or "sharing" for targeted advertising under
          applicable state law is <Todo>SALE / SHARING DETERMINATION BASED ON DEPLOYED AD TECHNOLOGY</Todo>.
          This draft makes no blanket claim that information is never sold or shared.
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
          applicable law and to any additional restrictions in{" "}
          <Todo>ANY CONTRACTUAL RESTRICTIONS ON TRANSFER OF HEALTH-RELATED DATA</Todo>.
        </P>
      </Section>

      <Section n={17} title="Data retention">
        <P>
          We retain information for as long as needed for the purposes described here and to meet
          legal obligations. Specific retention periods by data category are{" "}
          <Todo>RETENTION PERIODS BY CATEGORY, INCLUDING MEDICAL-RECORD RETENTION SET BY THE PROVIDER GROUP AND APPLICABLE STATE LAW</Todo>.
        </P>
      </Section>

      <Section n={18} title="Data security">
        <P>
          We use administrative, technical, and physical safeguards intended to protect information,
          including encrypted transport, access controls, and role-based restrictions. No method of
          transmission or storage is completely secure, and we cannot guarantee absolute security.
          Our security program details are <Todo>SECURITY PROGRAM SUMMARY APPROVED BY COUNSEL</Todo>.
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
          Whether information is processed or stored outside the United States depends on our vendor
          configuration and is <Todo>WHETHER ANY PROCESSING OCCURS OUTSIDE THE UNITED STATES, AND IF SO WHERE AND UNDER WHAT SAFEGUARDS</Todo>.
        </P>
      </Section>

      <Section n={21} title="State consumer privacy rights">
        <P>
          Residents of certain states may have rights to access, correct, delete, obtain a copy of,
          or limit certain uses of their personal information, and to appeal a denial. Which state
          privacy laws apply to Chubby No More Inc., based on its thresholds and activities, is{" "}
          <Todo>LIST OF STATE PRIVACY LAWS THAT APPLY</Todo>. Requests may be submitted through{" "}
          <Todo>PRIVACY-REQUEST SUBMISSION METHOD</Todo>.
        </P>
      </Section>

      <Section n={22} title="California rights">
        <P>
          If California law applies to our processing, California residents may have additional
          rights regarding categories of personal information collected, disclosed, sold, or shared,
          along with the right to limit use of sensitive personal information and the right to be
          free from discrimination for exercising those rights. Applicability and the required
          category-by-category disclosures are <Todo>CALIFORNIA APPLICABILITY DETERMINATION AND CCPA/CPRA CATEGORY TABLE</Todo>.
        </P>
      </Section>

      <Section n={23} title="Other applicable state rights">
        <P>
          Additional rights, including any state health-data statutes and any consumer health data
          consent requirements, are <Todo>OTHER STATE-SPECIFIC RIGHTS AND CONSENT REQUIREMENTS THAT APPLY, INCLUDING ANY CONSUMER HEALTH DATA STATUTES</Todo>.
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
            <>Legal business address: <Todo>LEGAL BUSINESS ADDRESS</Todo></>,
            <>Privacy email: <Todo>PRIVACY EMAIL</Todo></>,
            <>Support email: hello@chubbynomore.com</>,
            <>Telephone: <Todo>TELEPHONE NUMBER</Todo></>,
            <>Privacy-request submission method: <Todo>PRIVACY-REQUEST SUBMISSION METHOD</Todo></>,
          ]}
        />
      </Section>

      <Section n={26} title="Effective date">
        <P>
          Effective date: <Todo>EFFECTIVE DATE</Todo>. Version:{" "}
          <Todo>POLICY VERSION NUMBER</Todo>.
        </P>
      </Section>
    </LegalPage>
  );
}
