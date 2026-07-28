/**
 * LaunchList forwarding (server-only).
 *
 * Sends marketing-safe contact fields to the LaunchList waitlist endpoint.
 * NEVER send clinical / health questionnaire answers, weight, BMI,
 * conditions, medication history, or provider decisions here.
 */

export type LaunchListContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  marketingConsentAt: string;
  consentTextVersion: string;
  source: string;
};

export type LaunchListResult =
  | { forwarded: true }
  | { forwarded: false; errorCode: string };

export async function sendToLaunchList(
  contact: LaunchListContact,
): Promise<LaunchListResult> {
  const formKey = process.env.LAUNCHLIST_FORM_KEY?.trim();
  if (!formKey) {
    console.warn("[launchlist] LAUNCHLIST_FORM_KEY not configured; skipping");
    return { forwarded: false, errorCode: "not_configured" };
  }

  const body = new URLSearchParams();
  body.set("email", contact.email);
  body.set("first_name", contact.firstName);
  body.set("last_name", contact.lastName);
  body.set("name", `${contact.firstName} ${contact.lastName}`.trim());
  if (contact.phone) body.set("phone", contact.phone);
  body.set("source", contact.source);
  body.set("marketing_consent_at", contact.marketingConsentAt);
  body.set("consent_text_version", contact.consentTextVersion);

  try {
    const res = await fetch(`https://getlaunchlist.com/s/${formKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      console.error("[launchlist] rejected submission", res.status);
      return { forwarded: false, errorCode: `http_${res.status}` };
    }
    return { forwarded: true };
  } catch (err) {
    console.error(
      "[launchlist] request failed",
      err instanceof Error ? err.message : "unknown",
    );
    return { forwarded: false, errorCode: "network_error" };
  }
}
