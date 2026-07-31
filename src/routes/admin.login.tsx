import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { recordAdminEvent } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin sign in" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

const GENERIC_ERROR = "Sign-in failed. Check your details and try again.";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;

function AdminLogin() {
  const navigate = useNavigate();
  const record = useServerFn(recordAdminEvent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const lockedOut = () => {
    const raw = window.localStorage.getItem("admin_login_attempts");
    if (!raw) return false;
    try {
      const s = JSON.parse(raw) as { n: number; t: number };
      if (Date.now() - s.t > LOCKOUT_MS) return false;
      return s.n >= MAX_ATTEMPTS;
    } catch {
      return false;
    }
  };

  const bumpAttempts = () => {
    const raw = window.localStorage.getItem("admin_login_attempts");
    let s = { n: 0, t: Date.now() };
    try {
      if (raw) s = JSON.parse(raw) as { n: number; t: number };
    } catch {
      /* ignore */
    }
    if (Date.now() - s.t > LOCKOUT_MS) s = { n: 0, t: Date.now() };
    s.n += 1;
    window.localStorage.setItem("admin_login_attempts", JSON.stringify(s));
  };

  // Pre-launch: two-factor is disabled server-side, so a valid password login
  // for an active admin profile goes straight to the portal.
  const afterSignedIn = async () => {
    await record({ data: { event: "login_success" } }).catch(() => undefined);
    navigate({ to: "/admin", replace: true });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (lockedOut()) {
      setError("Too many attempts. Try again later.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) {
        bumpAttempts();
        setError(GENERIC_ERROR);
        return;
      }
      window.localStorage.removeItem("admin_login_attempts");
      await afterSignedIn();
    } finally {
      setBusy(false);
    }
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaFactorId) return;
    setBusy(true);
    setError(null);
    try {
      const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({
        factorId: mfaFactorId,
      });
      if (cErr || !challenge) {
        setError(GENERIC_ERROR);
        return;
      }
      const { error: vErr } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challenge.id,
        code: code.trim(),
      });
      if (vErr) {
        setError("Verification failed.");
        return;
      }
      await record({ data: { event: "login_success" } }).catch(() => undefined);
      navigate({ to: "/admin", replace: true });
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
  const btn =
    "w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <h1 className="text-lg font-semibold">Admin sign in</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Authorized personnel only. Accounts are provisioned manually.
        </p>

        {mfaFactorId ? (
          <form onSubmit={onVerify} className="mt-6 space-y-3">
            <label className="block text-sm">
              Authenticator code
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`mt-1 ${field}`}
              />
            </label>
            <button className={btn} disabled={busy}>
              Verify
            </button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <label className="block text-sm">
              Email
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 ${field}`}
              />
            </label>
            <label className="block text-sm">
              Password
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 ${field}`}
              />
            </label>
            <button className={btn} disabled={busy}>
              Sign in
            </button>
            <p className="pt-1 text-xs text-muted-foreground">
              Password recovery is currently handled by the system administrator.
            </p>
          </form>
        )}

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
