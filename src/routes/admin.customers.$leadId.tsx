import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCustomer, revealCustomerContact } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/customers/$leadId")({
  head: () => ({
    // Never place customer information in the title or URL.
    meta: [{ title: "Customer record" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: CustomerDetailRoute,
});

function CustomerDetailRoute() {
  const { leadId } = Route.useParams();
  return <AdminShell>{() => <CustomerDetail leadId={leadId} />}</AdminShell>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/40 py-1 text-sm last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value ?? "—"}</dd>
    </div>
  );
}

const fmt = (v?: string | null) => (v ? new Date(v).toLocaleString() : "—");

function CustomerDetail({ leadId }: { leadId: string }) {
  const fetchCustomer = useServerFn(getCustomer);
  const reveal = useServerFn(revealCustomerContact);
  const [revealed, setRevealed] = useState<{ email: string; phone: string } | null>(null);
  const [revealError, setRevealError] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-customer", leadId],
    queryFn: () => fetchCustomer({ data: { leadId } }),
    retry: false,
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (isError || !data)
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-lg font-semibold">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This record is not available to you.
        </p>
      </div>
    );

  const onReveal = async () => {
    setRevealError(null);
    try {
      setRevealed(await reveal({ data: { leadId } }));
    } catch {
      setRevealError("Unable to reveal these fields.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customer record</h1>
        <Link to="/admin/customers" className="text-sm text-primary underline">
          Back to list
        </Link>
      </div>

      {data.contact && (
        <Section title="Contact">
          <Row label="First name" value={data.contact.firstName} />
          <Row label="Last name" value={data.contact.lastName} />
          <Row label="Email" value={revealed?.email ?? data.contact.emailMasked} />
          <Row label="Phone" value={revealed?.phone ?? data.contact.phoneMasked} />
          <Row label="State" value={data.contact.state} />
          <Row label="Submitted" value={fmt(data.contact.submittedAt)} />
          <Row label="Last activity" value={fmt(data.contact.lastActivityAt)} />
          <Row label="Funnel completed" value={fmt(data.contact.completedAt)} />
          <div className="sm:col-span-2 pt-3">
            {revealed ? (
              <p className="text-xs text-muted-foreground">
                Full contact details revealed. This action was recorded in the audit log.
              </p>
            ) : (
              <button
                onClick={() => void onReveal()}
                className="rounded-lg border border-border px-3 py-2 text-sm"
              >
                Reveal information
              </button>
            )}
            {revealError && <p className="mt-2 text-sm text-destructive">{revealError}</p>}
          </div>
        </Section>
      )}

      {data.consent && (
        <Section title="Consent">
          <Row label="Operational consent" value={data.consent.operationalConsent ? "Yes" : "No"} />
          <Row label="Operational consent at" value={fmt(data.consent.operationalConsentAt)} />
          <Row label="Marketing consent" value={data.consent.marketingConsent ? "Yes" : "No"} />
          <Row label="Marketing consent at" value={fmt(data.consent.marketingConsentAt)} />
          <Row label="Consent version" value={data.consent.consentTextVersion} />
          <Row label="LaunchList sync" value={data.launchlistSync} />
        </Section>
      )}

      {data.attribution && (
        <Section title="Attribution">
          <Row label="Source" value={data.attribution.source} />
          <Row label="Referring page" value={data.attribution.referringPage} />
          <Row label="utm_source" value={data.attribution.utmSource} />
          <Row label="utm_medium" value={data.attribution.utmMedium} />
          <Row label="utm_campaign" value={data.attribution.utmCampaign} />
          <Row label="utm_term" value={data.attribution.utmTerm} />
          <Row label="utm_content" value={data.attribution.utmContent} />
        </Section>
      )}

      {data.screening ? (
        <Section title="Screening (self-reported)">
          <Row label="Questionnaire version" value={data.screening.questionnaireVersion} />
          <Row label="Adult confirmation" value={data.screening.isAdult} />
          <Row
            label="Height"
            value={
              data.screening.heightFeet != null
                ? `${data.screening.heightFeet}' ${data.screening.heightInches ?? 0}"`
                : "—"
            }
          />
          <Row label="Weight" value={data.screening.weightPounds ? `${data.screening.weightPounds} lb` : "—"} />
          <Row label="BMI (server-calculated)" value={data.screening.bmi} />
          <Row label="BMI category" value={data.screening.bmiCategory} />
          <Row label="Previous GLP-1 use" value={data.screening.priorGlp1Use} />
          <Row
            label="Health conditions"
            value={
              data.screening.healthConditions?.length
                ? data.screening.healthConditions.join(", ")
                : "None reported"
            }
          />
          <Row label="Weight-related condition" value={data.screening.weightRelatedConditionResponse} />
          <Row label="Screening outcome" value={data.screening.screeningOutcome} />
          <Row label="Storage consent" value={data.screening.consentToStore ? "Yes" : "No"} />
          <Row label="Screening completed" value={fmt(data.screening.completedAt)} />
          <p className="sm:col-span-2 mt-2 text-xs text-muted-foreground">
            Screening results are automated, self-reported routing signals only. They are
            not an eligibility, approval, or prescribing decision.
          </p>
        </Section>
      ) : null}

      {data.clinical ? (
        <Section title="Clinical intake (provider workflow)">
          <Row label="Intake status" value={data.clinical.status} />
          <Row label="Current step" value={data.clinical.current_step} />
          <Row label="Last completed step" value={data.clinical.last_completed_step} />
          <Row label="Provider review status" value={data.clinical.provider_review_status} />
          <Row label="Started" value={fmt(data.clinical.created_at)} />
          <Row label="Submitted" value={fmt(data.clinical.submitted_at)} />
          <p className="sm:col-span-2 mt-2 text-xs text-muted-foreground">
            Provider decisions are recorded separately by a licensed provider. No status
            here indicates qualification, approval, eligibility, or a prescription.
          </p>
        </Section>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Exports are disabled pending privacy and security approval.
      </p>
    </div>
  );
}
