import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/intake/clinical")({
  component: ClinicalIntakeStart,
  head: () => ({
    meta: [
      { title: "Continue Your Health Assessment | Chubby No More" },
      {
        name: "description",
        content:
          "Your progress has been saved. Continue your Chubby No More health assessment reviewed by a licensed provider.",
      },
      { property: "og:title", content: "Continue Your Health Assessment | Chubby No More" },
      {
        property: "og:description",
        content:
          "Your progress has been saved. Continue your Chubby No More health assessment reviewed by a licensed provider.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ClinicalIntakeStart() {
  const [hasLead, setHasLead] = useState(false);

  useEffect(() => {
    // Lead ID is passed via sessionStorage, never the URL.
    setHasLead(!!sessionStorage.getItem("cnm_lead_id"));
  }, []);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-20">
      <h1 className="font-serif text-3xl leading-tight text-[#103942] sm:text-4xl">
        Your progress has been saved. Continue your health assessment.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#103942]/70 sm:text-base">
        {hasLead
          ? "Pick up where you left off. A licensed provider reviews your complete health information before any treatment decision."
          : "A licensed provider reviews your complete health information before any treatment decision."}
      </p>
      <div className="mt-8">
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#103942] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
        >
          Return home
        </a>
      </div>
    </main>
  );
}
