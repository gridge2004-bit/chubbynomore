import { createFileRoute } from "@tanstack/react-router";
import { IntakeWizard } from "@/components/intake/IntakeWizard";

export const Route = createFileRoute("/intake")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { category?: string; product?: string } => ({
    ...(typeof search.category === "string" ? { category: search.category } : {}),
    ...(typeof search.product === "string" ? { product: search.product } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Health Intake Form | Chubby No More" },
      {
        name: "description",
        content:
          "Complete your 60-second health intake. Our licensed provider reviews your information before any treatment decision. $0 today.",
      },
      { property: "og:title", content: "Health Intake Form | Chubby No More" },
      {
        property: "og:description",
        content:
          "Complete your 60-second health intake — reviewed by our licensed provider within 24 hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: IntakePage,
});

function IntakePage() {
  const { product } = Route.useSearch();
  return <IntakeWizard product={product} />;
}
