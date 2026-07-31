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
 * Client-side gate. This is a convenience layer only — the database (RLS) and
 * every server function independently enforce role + MFA (aal2).
 */
export function AdminShell({
  children,
}: {
  children: (session: AdminSessionInfo) => React.ReactNode;
}) {
  const navigate = useNavigate();
  const signOut = useAdminSignOut();
  const fetchSession = useServerFn(getAdminSession);
  const queryClient = useQueryClient();

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

  // Never serve authorization data from a previous session or assurance level.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        queryClient.clear();
        navigate({ to: "/admin/login", replace: true });
        return;
      }
      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "MFA_CHALLENGE_VERIFIED" ||
        event === "USER_UPDATED"
      ) {
        void queryClient.invalidateQueries({ queryKey: ["admin-session"] });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, queryClient]);


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
  // Pre-launch: MFA is disabled server-side, so "mfa_required" is only possible
  // when the flag is switched back on.
  if (data.status !== "ok" && !(data.status === "mfa_required" && !data.mfaRequired)) {
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
      {!data.mfaRequired && (
        <div className="border-b border-border bg-muted/60 px-4 py-2 text-center text-xs text-foreground">
          Pre-launch mode: two-factor authentication is currently disabled.
        </div>
      )}
      <main className="mx-auto max-w-6xl px-4 py-8">{children(session)}</main>
    </div>
  );
}
