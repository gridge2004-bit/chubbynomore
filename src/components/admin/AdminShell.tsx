import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getAdminSession } from "@/lib/admin.functions";
import {
  ADMIN_IDLE_TIMEOUT_MS,
  ROLE_LABEL,
  type AdminCapabilities,
  type AdminRole,
} from "@/lib/admin-permissions";

export type AdminSessionInfo = {
  role: AdminRole;
  capabilities: AdminCapabilities;
};

export function useAdminSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  };
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        {children}
      </div>
    </div>
  );
}

/**
 * Shown when the admin profile is valid but the session is still aal1.
 * - No verified factor  -> enrollment (/admin/security)
 * - Verified factor     -> inline TOTP challenge, then session refresh
 * Never renders "Access denied".
 */
function MfaGate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [factorId, setFactorId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.mfa.listFactors().then(({ data }) => {
      if (!active) return;
      const verified = data?.totp?.find((f) => f.status === "verified");
      if (!verified) {
        navigate({ to: "/admin/security", replace: true });
        return;
      }
      setFactorId(verified.id);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId) return;
    setBusy(true);
    setError(null);
    try {
      const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({ factorId });
      if (cErr || !challenge) {
        setError("Verification failed. Try again.");
        return;
      }
      const { error: vErr } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: code.trim(),
      });
      if (vErr) {
        setError("That code was not accepted. Try the next one.");
        return;
      }
      // Replace the session so the new aal2 access token is in use before
      // any authorization data is re-read.
      await supabase.auth.refreshSession();
      const { data: level } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (level?.currentLevel !== "aal2") {
        setError("Verification did not complete. Try again.");
        return;
      }
      queryClient.clear();
      await queryClient.invalidateQueries();
    } finally {
      setBusy(false);
    }
  };

  if (!ready) {
    return <Centered><p className="text-sm text-muted-foreground">Checking access…</p></Centered>;
  }

  return (
    <Centered>
      <h1 className="text-lg font-semibold">Two-factor verification</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter the six-digit code from your authenticator app to continue.
      </p>
      <form onSubmit={onVerify} className="mt-6 space-y-3">
        <input
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-center text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          disabled={busy}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          Verify
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <Link to="/admin/security" className="mt-4 inline-block text-xs underline">
        Manage authenticator
      </Link>
    </Centered>
  );
}


/**
 * Client-side gate. This is a convenience layer only — the database (RLS) and
 * every server function independently enforce role + MFA (aal2).
 */
export function AdminShell({
  children,
  requireMfa = true,
}: {
  children: (session: AdminSessionInfo) => React.ReactNode;
  requireMfa?: boolean;
}) {
  const navigate = useNavigate();
  const signOut = useAdminSignOut();
  const fetchSession = useServerFn(getAdminSession);
  const [authChecked, setAuthChecked] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const idleRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      if (!data.user) {
        navigate({ to: "/admin/login", replace: true });
        return;
      }
      setHasUser(true);
      setAuthChecked(true);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  // Inactivity expiry: signs out after 15 minutes with no interaction.
  useEffect(() => {
    if (!hasUser) return;
    const reset = () => {
      if (idleRef.current) window.clearTimeout(idleRef.current);
      idleRef.current = window.setTimeout(() => {
        void signOut();
      }, ADMIN_IDLE_TIMEOUT_MS);
    };
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (idleRef.current) window.clearTimeout(idleRef.current);
    };
  }, [hasUser, signOut]);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-session"],
    queryFn: () => fetchSession(),
    enabled: hasUser,
    staleTime: 30_000,
  });

  if (!authChecked || isLoading || !data) {
    return <Centered><p className="text-sm text-muted-foreground">Checking access…</p></Centered>;
  }

  // State C/D: the admin profile is valid, only the assurance level is missing.
  // This is never "access denied".
  if (data.status === "mfa_required" && requireMfa) {
    return <MfaGate />;
  }

  if (data.status !== "ok" && !(requireMfa === false && data.status === "mfa_required")) {
    return (
      <Centered>
        <h1 className="text-lg font-semibold">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This account does not have an active admin profile.
        </p>
        <button
          onClick={() => void signOut()}
          className="mt-6 rounded-lg border border-border px-4 py-2 text-sm"
        >
          Sign out
        </button>
      </Centered>
    );
  }


  const session: AdminSessionInfo = {
    role: (data.role ?? "read_only") as AdminRole,
    capabilities: data.capabilities as AdminCapabilities,
  };

  const nav = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/customers", label: "Customers" },
    { to: "/admin/security", label: "Security" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
          <span className="text-sm font-semibold">Admin portal</span>
          <nav className="flex gap-3 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={
                  pathname === n.to
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border px-2 py-1">
              {ROLE_LABEL[session.role]}
            </span>
            <button onClick={() => void signOut()} className="underline">
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children(session)}</main>
    </div>
  );
}
