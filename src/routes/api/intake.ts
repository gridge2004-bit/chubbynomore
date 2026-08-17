import { createFileRoute } from "@tanstack/react-router";

/** Placeholder intake endpoint. Logs the payload; no storage or transmission yet. */
export const Route = createFileRoute("/api/intake")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let received = false;
        try {
          const body = await request.json();
          received = !!body;
          console.log("[api/intake] received intake submission", {
            keys: Object.keys(body ?? {}),
          });
        } catch {
          console.warn("[api/intake] invalid JSON body");
        }
        return Response.json({ ok: true, received });
      },
    },
  },
});
