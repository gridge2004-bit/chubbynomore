import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL, Todo } from "@/components/LegalPage";

export const Route = createFileRoute("/subscription-policy")({
  head: () => ({
    meta: [
      { title: "Return, Refund & Subscription Policy | Chubby No More Inc." },
      { name: "description", content: "How returns, refunds, 28-day fills, three-fill prepaid plans, renewals, and cancellations work at Chubby No More Inc." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Return, Refund & Subscription Policy | Chubby No More Inc." },
      { property: "og:description", content: "Returns, refunds, 28-day fills, three-fill prepaid plans, renewals, and cancellations at Chubby No More Inc." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SubscriptionPolicyPage,
});

function SubscriptionPolicyPage() {
  return (
    <LegalPage
      title="Chubby No More Inc. Return, Refund & Subscription Policy"
      intro={
        <P>
          This policy explains how orders, fills, prepaid plans, renewals, cancellations, and
          refunds are handled. Amounts, deadlines, and eligibility rules that have not yet been
          finalized appear as bracketed placeholders.
        </P>
      }
    >
      <Section n={1} title="Scope">
        <P>
          This policy applies to purchases made through Chubby No More Inc., including clinical
          review, medication fills coordinated with a dispensing pharmacy, prepaid plans, and any
          shipping or support charges disclosed at checkout. Each charge type may be treated
          differently; they are not assumed to be identical.
        </P>
      </Section>

      <Section n={2} title="Prescription medication returns">
        <P>
          Once a prescription medication has been dispensed and shipped, it generally cannot be
          returned to inventory or resold. The exact return rule, including any state-specific
          exceptions, is <Todo>RETURN RULE FOR DISPENSED PRESCRIPTION MEDICATION, VERIFIED WITH THE DISPENSING PHARMACY AND COUNSEL</Todo>.
          This draft does not assert that all refunds are prohibited by law.
        </P>
      </Section>

      <Section n={3} title="When an order becomes non-refundable">
        <P>
          The point at which an order can no longer be modified or refunded is{" "}
          <Todo>NON-REFUNDABLE TRIGGER POINT (FOR EXAMPLE, PHARMACY ACCEPTANCE, LABEL CREATION, OR SHIPMENT)</Todo>.
        </P>
      </Section>

      <Section n={4} title="Provider-review fees">
        <P>
          If a separate clinical-review fee is charged, its amount and refundability are{" "}
          <Todo>CLINICAL-REVIEW FEE AMOUNT AND REFUND RULE</Todo>. Whether a review fee applies when
          a provider declines to prescribe is <Todo>REVIEW-FEE TREATMENT ON PRESCRIPTION DENIAL</Todo>.
        </P>
      </Section>

      <Section n={5} title="Pharmacy fulfillment">
        <P>
          Fulfillment is performed by a licensed dispensing pharmacy, not by Chubby No More Inc.
          Fulfillment timelines and pharmacy-side rules are{" "}
          <Todo>PHARMACY FULFILLMENT TIMELINES AND POLICIES</Todo>.
        </P>
      </Section>

      <Section n={6} title="Individual 28-day fills">
        <P>
          A single fill covers one 28-day supply, as prescribed. Pricing is presented per 28-day
          supply. Fill-by-fill purchases do not automatically create a longer commitment.
        </P>
      </Section>

      <Section n={7} title="Three-fill prepaid plans">
        <P>
          A three-fill prepaid plan covers three consecutive 28-day supply periods, totaling 84
          days. Prepaid plan refund eligibility, including partial-use handling after the first or
          second fill ships, is <Todo>PREPAID-PLAN REFUND AND PRORATION RULES</Todo>.
        </P>
      </Section>

      <Section n={8} title="Recurring billing">
        <P>
          Where a plan bills on a recurring basis, you authorize recurring charges to your payment
          method until you cancel. Billing cadence and the date charges post are{" "}
          <Todo>BILLING CADENCE AND CHARGE DATE</Todo>.
        </P>
      </Section>

      <Section n={9} title="Automatic renewal">
        <P>
          Plans that renew automatically will continue until cancelled in accordance with this
          policy and applicable automatic-renewal law. Renewal terms are{" "}
          <Todo>AUTOMATIC-RENEWAL TERMS AND STATE AUTORENEWAL-LAW COMPLIANCE REQUIREMENTS</Todo>.
        </P>
      </Section>

      <Section n={10} title="Renewal notices">
        <P>
          Advance renewal notice is sent <Todo>RENEWAL NOTICE PERIOD AND DELIVERY METHOD</Todo>.
        </P>
      </Section>

      <Section n={11} title="Cancellation deadlines">
        <P>
          To avoid the next charge or fill, cancellation must be received{" "}
          <Todo>CANCELLATION DEADLINE RELATIVE TO THE RENEWAL OR FILL DATE</Todo>. Cancellations may
          be submitted through <Todo>CANCELLATION METHOD, INCLUDING ANY SELF-SERVICE OPTION</Todo>.
        </P>
      </Section>

      <Section n={12} title="Changes to a treatment plan">
        <P>
          If your provider changes your medication or dose, your plan may be adjusted. How pricing
          differences are handled mid-plan is <Todo>PLAN-CHANGE PRICING AND CREDIT RULES</Todo>.
        </P>
      </Section>

      <Section n={13} title="Prescription denial">
        <P>
          If a licensed provider determines treatment is not appropriate, charges associated with
          medication are handled as <Todo>REFUND TREATMENT WHEN A PRESCRIPTION IS DENIED, BY CHARGE TYPE</Todo>.
        </P>
      </Section>

      <Section n={14} title="Inability to fulfill an order">
        <P>
          If an order cannot be fulfilled due to supply, state availability, or another operational
          limitation, we will notify you and handle the charge as{" "}
          <Todo>REFUND TREATMENT FOR UNFULFILLABLE ORDERS</Todo>.
        </P>
      </Section>

      <Section n={15} title="Damaged, incorrect, delayed, or missing shipments">
        <P>
          Report a shipment problem within <Todo>DAMAGED-SHIPMENT REPORTING WINDOW</Todo>. Available
          remedies, including replacement, are{" "}
          <Todo>REPLACEMENT POLICY AND REMEDIES BY ISSUE TYPE</Todo>.
        </P>
      </Section>

      <Section n={16} title="Address errors">
        <P>
          You are responsible for the accuracy of the shipping address you provide. Handling of
          shipments lost or returned because of an incorrect address is{" "}
          <Todo>ADDRESS-ERROR POLICY, INCLUDING WHETHER RESHIPMENT IS AVAILABLE AND AT WHAT COST</Todo>.
        </P>
      </Section>

      <Section n={17} title="Temperature-sensitive shipments">
        <P>
          Some medications require specific storage and may be temperature sensitive. Follow the
          storage instructions on the label and in the medication guide. Handling of shipments that
          may have experienced a temperature excursion is{" "}
          <Todo>TEMPERATURE-EXCURSION POLICY CONFIRMED WITH THE DISPENSING PHARMACY</Todo>.
        </P>
      </Section>

      <Section n={18} title="Chargebacks">
        <P>
          If you believe a charge is incorrect, contact us first so we can review it. Our chargeback
          handling process is <Todo>CHARGEBACK PROCEDURE</Todo>.
        </P>
      </Section>

      <Section n={19} title="Refund processing time">
        <P>
          Approved refunds are issued to the original payment method within{" "}
          <Todo>REFUND PROCESSING TIME</Todo>. Bank posting times may add additional days.
        </P>
      </Section>

      <Section n={20} title="Contact information">
        <UL
          items={[
            <>Support contact: <Todo>SUPPORT EMAIL AND TELEPHONE NUMBER</Todo></>,
            <>Support hours: <Todo>SUPPORT HOURS</Todo></>,
            <>Mailing address: <Todo>LEGAL BUSINESS ADDRESS</Todo></>,
          ]}
        />
      </Section>

      <Section n={21} title="Effective date">
        <P>
          Effective date: <Todo>EFFECTIVE DATE</Todo>. Version:{" "}
          <Todo>SUBSCRIPTION POLICY VERSION NUMBER</Todo>.
        </P>
      </Section>
    </LegalPage>
  );
}
