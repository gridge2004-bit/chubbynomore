import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell, useAdminSignOut } from "@/components/admin/AdminShell";
import { getSecurityOverview } from "@/lib/admin.functions";
import { ROLE_LABEL, type AdminRole } from "@/lib/admin-permissions";

export const Route = createFileRoute("/admin/security")({
  head: () => ({
    meta: [{ title: "Admin security" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => <AdminShell>{() => <SecurityPage />}</AdminShell>,
});

function SecurityPage() {
  const signOut = useAdminSignOut();
  const fetchOverview = useServerFn(getSecurityOverview);
  const [email, setEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { data: overview } = useQuery({
    queryKey: ["admin-security"],
    queryFn: () => fetchOverview(),
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  /** Voluntary, self-service password change. Scoped to the signed-in owner only. */
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const { error: reauth } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });
      if (reauth) {
        setError("Current password is incorrect.");
        return;
      }
      const { error: err } = await supabase.auth.updateUser({ password: newPassword });
      if (err) {
        setError("Could not update the password. Choose a longer, unique password.");
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setNotice("Password updated.");
    } finally {
      setBusy(false);
    }
  };


  const card = "rounded-2xl border border-border bg-card p-5";

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Security</h1>

      <section className={card}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Account
        </h2>
        <div className="mt-3 space-y-1 text-sm">
          <p>Email: <span className="font-medium">{email ?? "—"}</span></p>
          <p>
            Role:{" "}
            <span className="font-medium">
              {overview ? ROLE_LABEL[overview.role as AdminRole] : "—"}
            </span>
          </p>
          <p>Last sign-in: {overview?.lastLoginAt ? new Date(overview.lastLoginAt).toLocaleString() : "—"}</p>
          <p className="text-xs text-muted-foreground">
            Active session: {overview?.sessionId ? `${overview.sessionId.slice(0, 8)}…` : "—"}
          </p>
        </div>
        <button
          onClick={() => void signOut()}
          className="mt-4 rounded-lg border border-border px-3 py-2 text-sm"
        >
          Sign out
        </button>
      </section>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {notice && <p className="text-sm text-muted-foreground">{notice}</p>}

      <section className={card}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Password
        </h2>
        <form onSubmit={changePassword} className="mt-3 max-w-sm space-y-3">
            <label className="block text-sm">
              Current password
              <input
                type="password"
                required
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm">
              New password
              <input
                type="password"
                required
                minLength={12}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <button
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
              disabled={busy}
            >
              Change my password
            </button>
            <p className="text-xs text-muted-foreground">
              Changing your password affects only your own account. You will be asked to verify
              own account.
            </p>
        </form>
      </section>

      <section className={card}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Recent activity
        </h2>
        {overview?.recent?.length ? (
          <ul className="mt-3 space-y-1 text-sm">
            {overview.recent.map((r, i) => (
              <li key={i} className="flex justify-between gap-4 border-b border-border/40 py-1 last:border-0">
                <span>{r.event_type}</span>
                <span className="text-muted-foreground">
                  {new Date(r.created_at).toLocaleString()} · {r.success ? "ok" : "failed"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            No recent activity recorded.
          </p>
        )}
      </section>
    </div>
  );
}
