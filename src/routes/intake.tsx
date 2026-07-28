import { createFileRoute, Link } from "@tanstack/react-router";
import { QualifyQuiz } from "@/components/QualifyQuiz";

export const Route = createFileRoute("/intake")({
  head: () => ({
    meta: [
      { title: "Free Eligibility Check | Chubby No More" },
      {
        name: "description",
        content:
          "Answer three quick questions to start your online GLP-1 eligibility check. A licensed provider reviews your health information before any treatment decision.",
      },
      { property: "og:title", content: "Free Eligibility Check | Chubby No More" },
      {
        property: "og:description",
        content:
          "Start your free online GLP-1 eligibility check — three questions, about 60 seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: IntakePage,
});

function IntakePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <div className="mx-auto flex max-w-xl items-center justify-between px-5 pt-6">
        <Link
          to="/"
          className="text-sm font-semibold text-[#103942] underline-offset-4 hover:underline"
        >
          ← Back to site
        </Link>
      </div>
      <h1 className="sr-only">Free online eligibility check</h1>
      <QualifyQuiz />
    </main>
  );
}
