/**
 * LaunchList forwarding (server-only).
 *
 * Sends marketing-safe contact fields to the LaunchList waitlist form
 * endpoint. Never send clinical / health questionnaire answers here.
 */

export type LaunchListContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  state?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
};

export async function sendToLaunchList(contact: LaunchListContact) {
  const formKey = process.env.LAUNCHLIST_FORM_KEY;
  if (!formKey) {
    console.warn("[launchlist] LAUNCHLIST_FORM_KEY not configured; skipping");
    return { forwarded: false as const, reason: "not_configured" as const };
  }

  const body = new URLSearchParams();
  body.set("email", contact.email);
  body.set("first_name", contact.firstName);
  body.set("last_name", contact.lastName);
  body.set("name", `${contact.firstName} ${contact.lastName}`.trim());
  if (contact.phone) body.set("phone", contact.phone);
  if (contact.state) body.set("state", contact.state);
  if (contact.utm?.source) body.set("utm_source", contact.utm.source);
  if (contact.utm?.medium) body.set("utm_medium", contact.utm.medium);
  if (contact.utm?.campaign) body.set("utm_campaign", contact.utm.campaign);
  if (contact.utm?.term) body.set("utm_term", contact.utm.term);
  if (contact.utm?.content) body.set("utm_content", contact.utm.content);

  try {
    const res = await fetch(`https://getlaunchlist.com/s/${formKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      console.error("[launchlist] rejected submission", res.status);
      return { forwarded: false as const, reason: "rejected" as const };
    }
    return { forwarded: true as const };
  } catch (err) {
    console.error(
      "[launchlist] request failed",
      err instanceof Error ? err.message : "unknown",
    );
    return { forwarded: false as const, reason: "network_error" as const };
  }
}
