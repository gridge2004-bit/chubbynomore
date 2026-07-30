/**
 * Owner bootstrap: no public admin sign-up exists. Access can only be requested
 * for an email that is already on the server-side allowlist, and the response is
 * always generic so the endpoint cannot be used to enumerate admin accounts.
 */
export async function requestAdminAccessInternal(email: string, redirectTo: string) {
  const clean = email.trim().toLowerCase();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: allow } = await supabaseAdmin
    .from("admin_allowlist")
    .select("email, role")
    .eq("email", clean)
    .maybeSingle();

  if (!allow) return { ok: true as const };

  const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existing = list?.users.find((u) => u.email?.toLowerCase() === clean);

  let userId = existing?.id ?? null;

  if (!userId) {
    const { data: invited, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(clean, {
      redirectTo,
    });
    if (error) return { ok: true as const };
    userId = invited.user?.id ?? null;
  } else {
    await supabaseAdmin.auth.resetPasswordForEmail(clean, { redirectTo });
  }

  if (userId) {
    await supabaseAdmin
      .from("admin_profiles")
      .upsert(
        { user_id: userId, role: allow.role, status: "active" },
        { onConflict: "user_id" },
      );
  }

  return { ok: true as const };
}

export async function touchLastLogin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("admin_profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("user_id", userId);
}
