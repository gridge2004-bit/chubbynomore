/**
 * Owner bootstrap: no public admin sign-up exists. Access can only be requested
 * for an email that is already on the server-side allowlist, and the response is
 * always generic so the endpoint cannot be used to enumerate admin accounts.
 *
 * Internally we distinguish outcomes so delivery problems are diagnosable from
 * the audit trail without leaking anything to the browser.
 */
export type AdminAccessCode =
  | "admin_not_authorized"
  | "invite_sent"
  | "recovery_sent"
  | "magiclink_sent"
  | "email_rate_limited"
  | "smtp_delivery_failed"
  | "auth_user_disabled"
  | "redirect_invalid";

function classify(error: { message?: string; status?: number } | null): AdminAccessCode | null {
  if (!error) return null;
  const msg = (error.message ?? "").toLowerCase();
  if (error.status === 429 || msg.includes("rate limit")) return "email_rate_limited";
  if (msg.includes("redirect")) return "redirect_invalid";
  if (msg.includes("banned") || msg.includes("disabled")) return "auth_user_disabled";
  return "smtp_delivery_failed";
}

export async function requestAdminAccessInternal(
  email: string,
  redirectTo: string,
): Promise<{ ok: true; code: AdminAccessCode }> {
  const clean = email.trim().toLowerCase();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const finish = async (code: AdminAccessCode, userId: string | null) => {
    // Non-sensitive internal breadcrumb: no email address, no tokens.
    try {
      await supabaseAdmin.from("audit_logs").insert({
        admin_user_id: userId,
        event_type: "access_denied",
        route: `/admin/login#${code}`,
        success: code === "invite_sent" || code === "recovery_sent" || code === "magiclink_sent",
      });
    } catch {
      /* auditing must never affect the response */
    }
    return { ok: true as const, code };
  };

  const { data: allow } = await supabaseAdmin
    .from("admin_allowlist")
    .select("email, role")
    .eq("email", clean)
    .maybeSingle();

  if (!allow) return finish("admin_not_authorized", null);

  const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existing = list?.users.find((u) => u.email?.toLowerCase() === clean);

  let userId = existing?.id ?? null;
  let code: AdminAccessCode = "recovery_sent";

  if (!userId) {
    const { data: invited, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(clean, {
      redirectTo,
    });
    if (error) return finish(classify(error) ?? "smtp_delivery_failed", null);
    userId = invited.user?.id ?? null;
    code = "invite_sent";
  } else if (!existing?.email_confirmed_at) {
    // An invited-but-never-confirmed account cannot receive a password-reset
    // email, so send a sign-in link instead (it also confirms the address).
    const { error } = await supabaseAdmin.auth.signInWithOtp({
      email: clean,
      options: { shouldCreateUser: false, emailRedirectTo: redirectTo },
    });
    if (error) {
      await ensureProfile(userId, allow.role);
      return finish(classify(error) ?? "smtp_delivery_failed", userId);
    }
    code = "magiclink_sent";
  } else {
    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(clean, { redirectTo });
    if (error) {
      await ensureProfile(userId, allow.role);
      return finish(classify(error) ?? "smtp_delivery_failed", userId);
    }
    code = "recovery_sent";
  }

  if (userId) await ensureProfile(userId, allow.role);

  return finish(code, userId);
}

async function ensureProfile(userId: string, role: "owner" | "admin" | "support" | "clinical_reviewer" | "read_only") {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("admin_profiles")
    .upsert({ user_id: userId, role, status: "active" }, { onConflict: "user_id" });
}

export async function touchLastLogin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("admin_profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("user_id", userId);
}
