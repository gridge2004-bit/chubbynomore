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
  // MFA enrollment must be reachable before aal2 exists.
  component: () => <AdminShell requireMfa={false}>{() => <SecurityPage />}</AdminShell>,
});

type Factor = { id: string; status: string; friendly_name?: string | null };

function SecurityPage() {
  const signOut = useAdminSignOut();
  const fetchOverview = useServerFn(getSecurityOverview);
  const [email, setEmail] = useState<string | null>(null);
  const [factors, setFactors] = useState<Factor[]>([]);
  const [aal, setAal] = useState<string>("aal1");
  const [enroll, setEnroll] = useState<{ id: string; qr: string } | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { data: overview, refetch } = useQuery({
    queryKey: ["admin-security"],
    queryFn: () => fetchOverview(),
  });

  const refreshFactors = async () => {
    const { data } = await supabase.auth.mfa.listFactors();
    setFactors((data?.totp ?? []) as Factor[]);
    const { data: level } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    setAal(level?.currentLevel ?? "aal1");
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    void refreshFactors();
  }, []);

  const startEnroll = async () => {
    setError(null);
    setBusy(true);
    try {
      const { data, error: err } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: `Authenticator ${Date.now()}`,
      });
      if (err || !data) {
        setError("Could not start enrollment.");
        return;
      }
      setEnroll({ id: data.id, qr: data.totp.qr_code });
    } finally {
      setBusy(false);
    }
  };

  const verifyEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enroll) return;
    setBusy(true);
    setError(null);
    try {
      const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({
        factorId: enroll.id,
      });
      if (cErr || !challenge) {
        setError("Verification failed.");
        return;
      }
      const { error: vErr } = await supabase.auth.mfa.verify({
        factorId: enroll.id,
        challengeId: challenge.id,
        code: code.trim(),
      });
      if (vErr) {
        setError("Verification failed.");
        return;
      }
      // The secret is intentionally discarded after enrollment.
      setEnroll(null);
      setCode("");
      setNotice("Authenticator app verified.");
      await refreshFactors();
      await refetch();
    } finally {
      setBusy(false);
    }
  };

  const removeFactor = async (id: string) => {
    setError(null);
    const password = window.prompt("Re-enter your password to remove this factor");
    if (!password || !email) return;
    setBusy(true);
    try {
      const { error: reauth } = await supabase.auth.signInWithPassword({ email, password });
      if (reauth) {
        setError("Reauthentication failed.");
        return;
      }
      const { error: err } = await supabase.auth.mfa.unenroll({ factorId: id });
      if (err) {
        setError("Could not remove this factor.");
        return;
      }
      setNotice("Factor removed.");
      await refreshFactors();
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
          <p>
            Assurance level: <span className="font-medium">{aal}</span>{" "}
            {aal !== "aal2" && (
              <span className="text-destructive">
                — customer data stays hidden until two-factor verification is complete.
              </span>
            )}
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

      <section className={card}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Authenticator app (TOTP)
        </h2>
        {factors.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No authenticator enrolled.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {factors.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3">
                <span>
                  {f.friendly_name || "Authenticator"} — {f.status}
                </span>
                <button
                  onClick={() => void removeFactor(f.id)}
                  disabled={busy}
                  className="text-xs underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {enroll ? (
          <form onSubmit={verifyEnroll} className="mt-4 space-y-3">
            <img src={enroll.qr} alt="Authenticator enrollment QR code" className="h-44 w-44" />
            <input
              inputMode="numeric"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-48 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              disabled={busy}
            >
              Verify
            </button>
          </form>
        ) : (
          <button
            onClick={() => void startEnroll()}
            disabled={busy}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Enroll an authenticator app
          </button>
        )}

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        {notice && <p className="mt-3 text-sm text-muted-foreground">{notice}</p>}
      </section>

      <section className={card}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Password
        </h2>
        {aal !== "aal2" ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Complete two-factor verification to change your password.
          </p>
        ) : (
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
              your authenticator app again afterwards.
            </p>
          </form>
        )}
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
            Activity appears after two-factor verification is complete.
          </p>
        )}
      </section>
    </div>
  );
}
