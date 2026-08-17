import { createFileRoute, Link } from "@tanstack/react-router";
import cnmHeaderLogoAsset from "@/assets/cnm-header-logo.png.asset.json";
import { ComplianceFooter } from "@/components/intake/ui";

export const Route = createFileRoute("/intake/not-eligible")({
  head: () => ({
    meta: [
      { title: "Intake Review | Chubby No More" },
      {
        name: "description",
        content:
          "Based on your answers, this treatment isn't appropriate right now. Please speak with your own physician.",
      },
      { property: "og:title", content: "Intake Review | Chubby No More" },
      {
        property: "og:description",
        content: "Based on your answers, this treatment isn't appropriate right now.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotEligiblePage,
});

function NotEligiblePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-[560px] items-center px-5 pt-5">
        <Link to="/" aria-label="Chubby No More home">
          <img
            src={cnmHeaderLogoAsset.url}
            alt="Chubby No More"
            className="h-7 w-auto max-w-[150px] object-contain"
          />
        </Link>
      </header>

      <div className="mx-auto max-w-[560px] px-5 pt-16">
        <h1 className="font-sans text-[28px] font-bold leading-tight text-[#103942]">
          We&apos;re not able to move forward right now
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#103942]/75">
          Based on the answers you gave, this treatment is not appropriate for you. Please speak with
          your own physician about your health and the options that may be right for you.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block min-h-[44px] pt-3 text-[14px] font-semibold text-[#103942] underline underline-offset-4"
        >
          Return to the homepage
        </Link>
      </div>

      <ComplianceFooter />
    </main>
  );
}
