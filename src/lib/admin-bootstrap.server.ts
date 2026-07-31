/** Server-only admin helpers. Admin accounts are provisioned manually; there is no
 * self-service email flow. */

export async function touchLastLogin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("admin_profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("user_id", userId);
}
