import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Medication } from "@/lib/medications";
import { getMedication, medications } from "@/lib/medications";

export const Route = createFileRoute("/medications/$slug")({
  loader: ({ params }) => {
    const med = getMedication(params.slug);
    if (!med) throw notFound();
    return { med };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Medication not found | ChubbyNoMore" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { med } = loaderData;
    const title = `${med.name} — Dosage, Side Effects & Pricing | ChubbyNoMore`;
    const desc = `${med.name} for weight loss: ${med.drugClass}, ${med.frequency.toLowerCase()} ${med.form.toLowerCase()}. Candidate profile, dosing, side effects, monitoring and pricing from ${med.price}${med.period}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/medications/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/medications/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Drug",
            name: med.name,
            description: med.summary,
            drugClass: med.drugClass,
            dosageForm: med.form,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: med.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center text-[#1B2147]">
      <h1 className="font-serif text-4xl">Medication not found</h1>
      <p className="mt-4 text-[#1B2147]/70">We don't have a page for that medication.</p>
      <Link to="/" className="mt-6 inline-block text-[#3454C7] underline">← Back to home</Link>
    </div>
  ),
  component: MedicationDetail,
});

function MedicationDetail() {
  const { med } = Route.useLoaderData() as { med: Medication };

  return (
    <div className="min-h-screen bg-white text-[#1B2147]">
      <header className="border-b border-[#1B2147]/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-serif text-[22px] font-bold text-[#1B2147]">
            ChubbyNoMore
          </Link>
          <Link to="/" className="text-sm text-[#1B2147]/70 hover:text-[#1B2147]">
            ← All medications
          </Link>
        </div>
      </header>

      <section className="bg-[#EEF0EC] px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3454C7]">
              {med.category} · {med.drugClass}
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">{med.name}</h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#1B2147]/85">
              {med.summary}
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-sm">Starting at</span>
              <span className="text-4xl font-bold">{med.price}</span>
              <span className="text-sm">{med.period}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/#cta"
                className="rounded-full bg-[#1B2147] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0F1432]"
              >
                Check If I Qualify
              </a>
              <a
                href="#faqs"
                className="rounded-full border border-[#1B2147]/30 px-6 py-3 text-sm font-semibold hover:border-[#1B2147]"
              >
                Read the FAQs
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-3xl bg-white p-6">
            <img
              src={med.img}
              alt={med.imgAlt}
              className="max-h-[280px] w-auto object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-3 md:grid-cols-3">
          <Fact label="Form" value={med.form} />
          <Fact label="Frequency" value={med.frequency} />
          <Fact label="Drug class" value={med.drugClass} />
        </div>
      </section>

      <Section title="Who is a candidate for this medication?">
        <ul className="grid gap-3">
          {med.candidateProfile.map((c) => (
            <li key={c} className="flex gap-3 text-[15px] leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3454C7]" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Who this medication is not for" tone="warn">
        <ul className="grid gap-3">
          {med.notFor.map((c) => (
            <li key={c} className="flex gap-3 text-[15px] leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B84B4B]" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Dosage overview">
        <div className="overflow-hidden rounded-2xl border border-[#1B2147]/10">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-[#1B2147] text-white">
              <tr>
                <th className="px-4 py-3">Phase</th>
                <th className="px-4 py-3">Dose</th>
              </tr>
            </thead>
            <tbody>
              {med.dosage.map((d) => (
                <tr key={d.label} className="border-t border-[#1B2147]/10">
                  <td className="w-40 px-4 py-3 font-semibold">{d.label}</td>
                  <td className="px-4 py-3 text-[#1B2147]/85">{d.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Side effects to know about">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#3454C7]">Common</h3>
            <ul className="mt-3 space-y-2 text-[15px]">
              {med.sideEffects.common.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#B84B4B]">Serious (call your doctor)</h3>
            <ul className="mt-3 space-y-2 text-[15px]">
              {med.sideEffects.serious.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="How your care is monitored">
        <ul className="grid gap-3">
          {med.monitoring.map((m) => (
            <li key={m} className="flex gap-3 text-[15px]">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3454C7]" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Pricing">
        <p className="text-[15px]">
          <strong>{med.name}</strong> starts at <strong>{med.price}{med.period}</strong>. No insurance
          required. HSA/FSA eligible. Cancel anytime.
        </p>
      </Section>

      <Section id="faqs" title="Common questions">
        <div className="divide-y divide-[#E7E8EE] border-y border-[#E7E8EE]">
          {med.faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between font-serif text-lg">
                {f.q}
                <span aria-hidden className="text-xl group-open:hidden">+</span>
                <span aria-hidden className="hidden text-xl group-open:inline">−</span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5A6075]">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-[#1B2147] px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl">Ready to see if {med.name.split(/[®™]/)[0].trim()} is right for you?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Complete a 5-minute online intake. A US-licensed physician reviews your history and only
            prescribes if it's safe and appropriate for you.
          </p>
          <a
            href="/#cta"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#1B2147]"
          >
            Check If I Qualify — Free &amp; Fast
          </a>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-2xl md:text-3xl">Compare other medications</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {medications
              .filter((m) => m.slug !== med.slug)
              .map((m) => (
                <Link
                  key={m.slug}
                  to="/medications/$slug"
                  params={{ slug: m.slug }}
                  className="rounded-2xl border border-[#1B2147]/10 p-4 hover:border-[#1B2147]/40"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3454C7]">
                    {m.category}
                  </div>
                  <div className="mt-2 font-serif text-lg">{m.name}</div>
                  <div className="mt-1 text-sm text-[#1B2147]/70">
                    From {m.price}
                    {m.period}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({
  title,
  children,
  id,
  tone,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
  tone?: "warn";
}) {
  return (
    <section
      id={id}
      className={`px-6 py-12 ${tone === "warn" ? "bg-[#FBF3F0]" : "bg-white"}`}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-2xl leading-tight text-[#1B2147] md:text-3xl">{title}</h2>
        <div className="mt-6 text-[#1B2147]">{children}</div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F5F6F3] p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3454C7]">
        {label}
      </div>
      <div className="mt-2 text-[16px] font-medium text-[#1B2147]">{value}</div>
    </div>
  );
}
