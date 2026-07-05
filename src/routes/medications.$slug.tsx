import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { medications, type Medication } from "@/data/medications";

const SITE = "https://chubbynomore.com";

export const Route = createFileRoute("/medications/$slug")({
  loader: ({ params }) => {
    const med = medications[params.slug];
    if (!med) throw notFound();
    return { med };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Medication not found | ChubbyNoMore" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const med = loaderData.med;
    const url = `${SITE}/medications/${params.slug}`;
    const drugSchema = {
      "@context": "https://schema.org",
      "@type": "Drug",
      name: med.name,
      activeIngredient: med.activeIngredient,
      drugClass: med.drugClass,
      administrationRoute: med.form.toLowerCase().includes("oral") ? "oral" : "subcutaneous injection",
      prescriptionStatus: "PrescriptionOnly",
      manufacturer: med.category === "Brand-name" ? undefined : { "@type": "Organization", name: "Licensed US compounding pharmacy" },
      url,
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: med.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    return {
      meta: [
        { title: med.seoTitle },
        { name: "description", content: med.seoDescription },
        { property: "og:title", content: med.seoTitle },
        { property: "og:description", content: med.seoDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: med.seoTitle },
        { name: "twitter:description", content: med.seoDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(drugSchema) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      ],
    };
  },
  notFoundComponent: MedicationNotFound,
  component: MedicationDetail,
});

function MedicationNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center text-[#1B2147]">
      <h1 className="font-serif text-4xl">Medication not found</h1>
      <p className="mt-4 text-[#5A6075]">The medication you're looking for isn't in our catalog.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-[#1B2147] px-6 py-3 text-sm font-semibold text-white">Back home</Link>
    </div>
  );
}

function MedicationDetail() {
  const { med } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-white text-[#1B2147]">
      <header className="border-b border-[#E7E8EE] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-serif text-[22px] font-bold">ChubbyNoMore</Link>
          <a href="#cta" className="inline-flex items-center justify-center rounded-full bg-[#1B2147] px-5 py-2.5 text-xs font-semibold text-white sm:text-sm">
            Check If I Qualify — Free &amp; Fast
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <nav aria-label="Breadcrumb" className="text-xs text-[#5A6075]">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Medications</span>
          <span className="mx-2">/</span>
          <span className="text-[#1B2147]">{med.name}</span>
        </nav>

        <Hero med={med} />

        <Section title="Summary">
          <p className="text-[16px] leading-relaxed text-[#1B2147]/85">{med.summary}</p>
          <dl className="mt-6 grid gap-4 rounded-2xl bg-[#F7F7F5] p-6 sm:grid-cols-2">
            <Fact label="Active ingredient" value={med.activeIngredient} />
            <Fact label="Drug class" value={med.drugClass} />
            <Fact label="Form" value={med.form} />
            <Fact label="FDA-approved" value={med.fdaApproved ? "Yes" : "No — compounded"} />
            {med.brandEquivalents && <Fact label="Brand equivalents" value={med.brandEquivalents.join(", ")} />}
            <Fact label="Price" value={`${med.price} ${med.priceUnit}`} />
          </dl>
        </Section>

        <Section title="Who this is for">
          <BulletList items={med.candidateProfile} />
        </Section>

        <Section title="Who this is not for">
          <BulletList items={med.notForList} />
        </Section>

        <Section title="Dosage & titration">
          <div className="overflow-x-auto rounded-2xl border border-[#E7E8EE]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F7F7F5] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1B2147]">
                <tr>
                  <th className="px-4 py-3">Timing</th>
                  <th className="px-4 py-3">Dose</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E8EE] text-[#1B2147]">
                {med.dosage.map((row) => (
                  <tr key={row.week}>
                    <td className="px-4 py-3 font-medium">{row.week}</td>
                    <td className="px-4 py-3">{row.dose}</td>
                    <td className="px-4 py-3 text-[#5A6075]">{row.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#5A6075]">Actual dosing is set by your ChubbyNoMore physician based on your medical history and response.</p>
        </Section>

        <Section title="Side effects">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl">Common</h3>
              <BulletList items={med.commonSideEffects} />
            </div>
            <div>
              <h3 className="font-serif text-xl">Serious (seek care)</h3>
              <BulletList items={med.seriousSideEffects} />
            </div>
          </div>
        </Section>

        <Section title="Monitoring plan">
          <BulletList items={med.monitoringPlan} />
        </Section>

        <Section title="Pricing">
          <div className="rounded-2xl bg-[#F7F7F5] p-6">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-[15px]">Starting at</span>
              <span className="font-serif text-4xl font-bold">{med.price}</span>
              <span className="text-[15px]">{med.priceUnit}</span>
            </div>
            <BulletList items={med.pricingNotes} />
            <a href="#cta" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1B2147] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0F1432]">
              Check if I qualify — Free
            </a>
          </div>
        </Section>

        <Section title="Frequently asked questions">
          <div className="divide-y divide-[#E7E8EE] border-y border-[#E7E8EE]">
            {med.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-serif text-lg text-[#1B2147]">
                  {f.q}
                  <span className="text-xl text-[#5A6075] group-open:hidden">+</span>
                  <span className="hidden text-xl text-[#5A6075] group-open:inline">−</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5A6075] md:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <p className="mt-16 text-xs leading-relaxed text-[#5A6075]">
          Educational information only, not medical advice. Prescription products are dispensed only if clinically appropriate after a US-licensed physician review. Compounded medications are not FDA-approved for safety, efficacy, or quality.
        </p>
      </main>

      <footer className="border-t border-[#E7E8EE] bg-[#1B2147] py-8 text-center text-xs text-white/70">
        © {new Date().getFullYear()} ChubbyNoMore. All rights reserved.
      </footer>
    </div>
  );
}

function Hero({ med }: { med: Medication }) {
  return (
    <div className="mt-6 grid gap-8 rounded-3xl bg-[#EEF0EC] p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
      <div>
        <div className="flex flex-wrap gap-2">
          <Tag>{med.category === "Compounded" ? "COMPOUNDED" : "BRAND-NAME"}</Tag>
          {med.fdaApproved && <Tag>FDA-APPROVED</Tag>}
          <Tag>{med.drugClass.includes("GIP") ? "GLP-1 + GIP" : "GLP-1"}</Tag>
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-[#1B2147] md:text-5xl">{med.name}</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#1B2147]/85">{med.summary}</p>
        <div className="mt-6 flex flex-wrap items-baseline gap-2">
          <span>Starting at</span>
          <span className="font-serif text-3xl font-bold">{med.price}</span>
          <span>{med.priceUnit}</span>
        </div>
        <a href="#cta" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1B2147] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0F1432]">
          Check if I qualify — Free
        </a>
      </div>
      <div className="flex items-center justify-center">
        <img src={med.image} alt={med.imageAlt} className="max-h-[240px] w-auto object-contain mix-blend-multiply" />
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md bg-[#D8DCEF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#1B2147]">{children}</span>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl text-[#1B2147] md:text-3xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2 text-[15px] leading-relaxed text-[#1B2147]/85">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B2147]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5A6075]">{label}</dt>
      <dd className="mt-1 text-[15px] font-medium text-[#1B2147]">{value}</dd>
    </div>
  );
}
