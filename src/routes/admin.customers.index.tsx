import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/components/admin/AdminShell";
import { listCustomers } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/customers/")({
  head: () => ({
    meta: [{ title: "Customer records" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => <AdminShell>{(s) => <CustomerList clinical={s.capabilities.clinical} />}</AdminShell>,
});

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

const OUTCOMES = [
  "possible_fit",
  "provider_review",
  "alternative_path",
  "safety_path",
  "adults_only",
];

function CustomerList({ clinical }: { clinical: boolean }) {
  // Filters live in component state only — never in the URL.
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [outcome, setOutcome] = useState("");
  const [funnelStatus, setFunnelStatus] = useState("");
  const [marketingConsent, setMarketingConsent] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  const fetchList = useServerFn(listCustomers);

  const filters = useMemo(
    () => ({
      search: search || undefined,
      state: state || undefined,
      outcome: outcome || undefined,
      funnelStatus: funnelStatus || undefined,
      marketingConsent: (marketingConsent || undefined) as "yes" | "no" | undefined,
      from: from ? new Date(from).toISOString() : undefined,
      to: to ? new Date(`${to}T23:59:59`).toISOString() : undefined,
      sort,
      page,
    }),
    [search, state, outcome, funnelStatus, marketingConsent, from, to, sort, page],
  );

  const { data, isFetching, isError } = useQuery({
    queryKey: ["admin-customers", filters],
    queryFn: () => fetchList({ data: filters }),
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const input =
    "rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Customer records</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact details are masked in this view. Health answers are never shown here.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <input
          className={input}
          placeholder="Search name, email or phone"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select className={input} value={state} onChange={(e) => { setPage(1); setState(e.target.value); }}>
          <option value="">All states</option>
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className={input}
          value={outcome}
          disabled={!clinical}
          onChange={(e) => { setPage(1); setOutcome(e.target.value); }}
        >
          <option value="">{clinical ? "All outcomes" : "Outcome (restricted)"}</option>
          {OUTCOMES.map((o) => (
            <option key={o} value={o}>{o.replace(/_/g, " ")}</option>
          ))}
        </select>
        <select className={input} value={funnelStatus} onChange={(e) => { setPage(1); setFunnelStatus(e.target.value); }}>
          <option value="">All statuses</option>
          <option value="contact_captured">contact captured</option>
          <option value="screening_completed">screening completed</option>
          <option value="clinical_started">clinical started</option>
          <option value="clinical_submitted">clinical submitted</option>
        </select>
        <select className={input} value={marketingConsent} onChange={(e) => { setPage(1); setMarketingConsent(e.target.value); }}>
          <option value="">Marketing consent: any</option>
          <option value="yes">Consented</option>
          <option value="no">Not consented</option>
        </select>
        <input type="date" className={input} value={from} onChange={(e) => { setPage(1); setFrom(e.target.value); }} />
        <input type="date" className={input} value={to} onChange={(e) => { setPage(1); setTo(e.target.value); }} />
        <select className={input} value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest")}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Submitted</th>
              <th className="px-3 py-2">First</th>
              <th className="px-3 py-2">Last</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">State</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Outcome</th>
              <th className="px-3 py-2">Marketing</th>
              <th className="px-3 py-2">LaunchList</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {isError && (
              <tr><td colSpan={11} className="px-3 py-6 text-center text-muted-foreground">Unable to load records.</td></tr>
            )}
            {data?.items.map((r) => (
              <tr key={r.id} className="border-b border-border/60 last:border-0">
                <td className="px-3 py-2">{new Date(r.submittedAt).toLocaleDateString()}</td>
                <td className="px-3 py-2">{r.firstName}</td>
                <td className="px-3 py-2">{r.lastName}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.emailMasked}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.phoneMasked}</td>
                <td className="px-3 py-2">{r.state}</td>
                <td className="px-3 py-2">{r.funnelStatus}</td>
                <td className="px-3 py-2">{r.screeningOutcome ?? "—"}</td>
                <td className="px-3 py-2">{r.marketingConsent ? "Yes" : "No"}</td>
                <td className="px-3 py-2">{r.launchlistSync}</td>
                <td className="px-3 py-2">
                  <Link
                    to="/admin/customers/$leadId"
                    params={{ leadId: r.id }}
                    className="text-primary underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
            {!isError && data?.items.length === 0 && (
              <tr><td colSpan={11} className="px-3 py-6 text-center text-muted-foreground">No records match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {isFetching ? "Loading…" : `Page ${data?.page ?? 1} of ${totalPages} · ${data?.total ?? 0} records · ${data?.pageSize ?? 25} per page`}
        </span>
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-border px-3 py-1 disabled:opacity-50"
            disabled={(data?.page ?? 1) <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <button
            className="rounded-lg border border-border px-3 py-1 disabled:opacity-50"
            disabled={(data?.page ?? 1) >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Exports are disabled pending privacy and security approval.
      </p>
    </div>
  );
}
