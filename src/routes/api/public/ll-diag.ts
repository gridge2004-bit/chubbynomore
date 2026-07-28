import { createFileRoute } from "@tanstack/react-router";

// TEMPORARY diagnostic — reports only status codes, never the key value.
export const Route = createFileRoute("/api/public/ll-diag")({
  server: {
    handlers: {
      GET: async () => {
        const key = process.env.LAUNCHLIST_FORM_KEY?.trim();
        if (!key) return Response.json({ configured: false });
        const shape = {
          configured: true,
          length: key.length,
          looksLikeUrl: /https?:\/\//.test(key),
          hasSlash: key.includes("/"),
        };
        const embed = await fetch(`https://getlaunchlist.com/w/e/${key}`);
        const embedText = await embed.text();
        const post = await fetch(`https://getlaunchlist.com/s/${key}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            email: "diag-probe@example.com",
            name: "Diag Probe",
          }),
        });
        return Response.json({
          ...shape,
          embedStatus: embed.status,
          embedLooksValid: /launchlist|waitlist|email/i.test(embedText),
          embedSize: embedText.length,
          postStatus: post.status,
        });
      },
    },
  },
});
