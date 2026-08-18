import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, Section, P, UL } from "@/components/LegalPage";

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
          refunds are handled at Chubby No More Inc.
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
          Prescription medication cannot be returned or resold once it has been dispensed by the
          pharmacy. This is a safety requirement, not merely a business preference: once medication
          has left licensed pharmacy custody, its storage conditions can no longer be verified, so it
          cannot be placed back into inventory or dispensed to another patient. This rule applies
          regardless of whether the package has been opened.
        </P>
      </Section>

      <Section n={3} title="When an order becomes non-refundable">
        <P>
          An order becomes non-refundable once the dispensing pharmacy accepts the order and creates
          a shipping label. Up to that point, you may cancel or modify the order for a full refund of
          any amount charged. After that point, the medication has entered the fulfillment process
          and the charge is final, except as described in the sections on damaged shipments and
          undeliverable orders below.
        </P>
      </Section>

      <Section n={4} title="Provider-review fees">
        <P>
          Chubby No More Inc. does not charge a separate clinical-review fee. If our licensed
          provider reviews your intake and determines that treatment is not appropriate, you are
          charged $0 for that review, and any payment pre-authorization associated with it is
          released back to your payment method.
        </P>
      </Section>

      <Section n={5} title="Pharmacy fulfillment">
        <P>
          Fulfillment is performed by independent, licensed U.S. pharmacies, including compounding
          pharmacies, that Chubby No More Inc. contracts with — not by Chubby No More Inc. directly.
          Once a pharmacy accepts an order, it controls packaging, labeling, and shipment timing in
          accordance with its own licensure and standard operating procedures. Estimated delivery
          windows are provided at checkout and in your account, but Chubby No More Inc. does not
          guarantee a specific delivery date.
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
          days, billed as a single upfront charge. Once the first fill in a prepaid plan has been
          accepted and labeled by the pharmacy, that fill is non-refundable under Section 3 above.
          The remaining, not-yet-dispensed fills in the plan may be cancelled for a refund of their
          prorated, unshipped portion, provided cancellation is requested before the pharmacy accepts
          the next fill in the sequence.
        </P>
      </Section>

      <Section n={8} title="Recurring billing">
        <P>
          Where a plan bills on a recurring basis, you authorize Chubby No More Inc. to charge your
          payment method every 28 days on your plan anniversary date until you cancel in accordance
          with this policy.
        </P>
      </Section>

      <Section n={9} title="Automatic renewal">
        <P>
          Plans that renew automatically will continue to bill and ship on each 28-day anniversary
          until you cancel. We provide advance notice of each upcoming renewal and an accessible way
          to cancel, consistent with applicable state automatic-renewal laws.
        </P>
      </Section>

      <Section n={10} title="Renewal notices">
        <P>
          We send an advance renewal notice by email at least 7 days before each renewal charge,
          identifying the upcoming charge amount and date and explaining how to cancel or make
          changes before it posts.
        </P>
      </Section>

      <Section n={11} title="Cancellation deadlines">
        <P>
          To avoid the next charge or fill, cancellation must be received at least 3 business days
          before your renewal date. Cancellations may be submitted through your account settings or
          by contacting hello@chubbynomore.com or (908) 842-3447.
        </P>
      </Section>

      <Section n={12} title="Changes to a treatment plan">
        <P>
          If your provider changes your medication or dose, your plan will be adjusted to reflect the
          new prescription. If the adjustment changes the price of your plan, the new price applies
          to fills that have not yet been accepted by the pharmacy; any fill already accepted and
          labeled at the prior price is fulfilled and billed as originally scheduled.
        </P>
      </Section>

      <Section n={13} title="Prescription denial">
        <P>
          If our licensed provider determines that treatment is not appropriate for you, you are not
          charged for medication, and you are not charged a clinical-review fee. Any
          pre-authorization on your payment method is released. If a prepaid plan charge had already
          settled before the denial, the full amount is refunded.
        </P>
      </Section>

      <Section n={14} title="Inability to fulfill an order">
        <P>
          If an order cannot be fulfilled because of a supply shortage, state licensing or shipping
          restrictions, or another operational limitation, we will notify you promptly. Any amount
          charged for the unfulfilled portion of the order is refunded to your original payment
          method; you are never charged for medication that is not shipped.
        </P>
      </Section>

      <Section n={15} title="Damaged, incorrect, delayed, or missing shipments">
        <P>
          Report a damaged, incorrect, delayed, or missing shipment within 7 days of the delivery
          date (or of the expected delivery date, if the shipment never arrives). Once verified, we
          will coordinate with the dispensing pharmacy to arrange a replacement shipment at no
          additional cost, or a refund of the affected fill, whichever is appropriate to the issue.
        </P>
      </Section>

      <Section n={16} title="Address errors">
        <P>
          You are responsible for the accuracy of the shipping address you provide. If a shipment is
          lost or returned to the pharmacy because the address you provided was incomplete or
          incorrect, reshipment can be arranged once you confirm the correct address, but the cost of
          reshipment is your responsibility and is not covered by this policy.
        </P>
      </Section>

      <Section n={17} title="Temperature-sensitive shipments">
        <P>
          Some medications require refrigeration or protection from heat and may be temperature
          sensitive in transit. Follow the storage instructions on the label and in the medication
          guide as soon as a shipment arrives. If you believe a shipment experienced a temperature
          excursion that may have affected the medication, contact us within 7 days of delivery; we
          will review the issue with the dispensing pharmacy and arrange a replacement if the
          medication cannot be confirmed safe to use.
        </P>
      </Section>

      <Section n={18} title="Chargebacks">
        <P>
          If you believe a charge is incorrect, contact us first at hello@chubbynomore.com so we can
          review and resolve it directly. Filing a chargeback before contacting us may delay
          resolution, since the dispensing pharmacy and our billing processor will need to
          investigate the charge as part of the card network's chargeback process.
        </P>
      </Section>

      <Section n={19} title="Refund processing time">
        <P>
          Approved refunds are issued to the original payment method within 5–10 business days.
          Your bank or card issuer may take additional time to post the refund to your statement.
        </P>
      </Section>

      <Section n={20} title="Contact information">
        <UL
          items={[
            <>Support contact: hello@chubbynomore.com, telephone (908) 842-3447</>,
            <>Support hours: Monday–Friday, 9:00 a.m. to 6:00 p.m. ET</>,
            <>Mailing address: Chubby No More Inc., 20200 West Dixie Highway, Suite 902, Aventura, FL 33180</>,
          ]}
        />
      </Section>

      <Section n={21} title="Effective date">
        <P>
          Effective date: August 18, 2026. Version: 1.0.
        </P>
      </Section>
    </LegalPage>
  );
}
