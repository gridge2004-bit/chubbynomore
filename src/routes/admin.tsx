import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin portal" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Restricted internal area." },
    ],
  }),
  component: () => <Outlet />,
});
