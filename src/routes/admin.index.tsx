import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { ROLE_LABEL } from "@/lib/admin-permissions";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin overview" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => (
    <AdminShell>
      {(session) => (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as {ROLE_LABEL[session.role]}. Access is limited to the fields
              your role is authorized to view.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/admin/customers"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary"
            >
              <h2 className="font-semibold">Customer records</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Paginated list of leads and questionnaire submissions.
              </p>
            </Link>
            <Link
              to="/admin/security"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary"
            >
              <h2 className="font-semibold">Security</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Two-factor enrollment, recent activity and sign-out.
              </p>
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Exports are disabled</p>
            <p className="mt-1">
              Exports are disabled pending privacy and security approval. Deletion
              workflows are not available in this version.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Production access to real health information remains disabled pending legal,
            privacy and hosting review. No HIPAA compliance is claimed.
          </p>
        </div>
      )}
    </AdminShell>
  ),
});
