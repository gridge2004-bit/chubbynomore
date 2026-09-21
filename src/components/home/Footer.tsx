// Closing call-to-action and site footer.
import { Link } from "@tanstack/react-router";
import { LEGAL_LINKS } from "@/components/LegalPage";
import type { Clinician } from "./content";
import { PillButton } from "./Nav";
import cnmLogoFullAsset from "@/assets/cnm-logo-full.png.asset.json";
import dinnerCoupleAsset from "@/assets/dinner-couple.png.asset.json";

export function FinalCTA() {
  const checks = [
    "Clinician reviewed",
    "Private online intake",
    "Delivered to your door",
    "Availability varies by state",
  ];
  return (
    <section id="start" className="w-full bg-[#F5F5F7] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-14 lg:gap-20">
        <div className="overflow-hidden rounded-[1.75rem] bg-[#103942] shadow-[0_30px_60px_-40px_rgba(16,57,66,0.55)]">
          <img
            src={dinnerCoupleAsset.url}
            alt="Couple enjoying a candlelit dinner at an upscale restaurant"
            className="aspect-[4/3] h-full w-full object-cover object-center md:aspect-[3/2] lg:aspect-[3/2]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-3xl leading-[1.12] text-[#103942] sm:text-4xl lg:text-[46px]">
            Ready to see if GLP-1 is right for you? <em className="italic">ChubbyNoMore is with you every step.</em>
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-[#103942]">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-[#103942]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <PillButton href="/intake">See if I qualify — free</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const programLinks = [
    { label: "How It Works", href: "#how" },
    { label: "Medications", href: "#medications" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <footer className="bg-[#F5F5F7] text-[#103942]">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={cnmLogoFullAsset.url} alt="Chubby No More" className="h-24 w-auto shrink-0 md:h-28" />
            </div>

            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#103942]/70 md:text-lg">
              Online prescription weight-management care with clinician review and home delivery, where available.
            </p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-[#103942]/65">Program</div>
            <ul className="mt-4 space-y-3 text-base md:text-lg">
              {programLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#103942] transition hover:text-[#42D1C3]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-[#103942]/65">Legal</div>
            <ul className="mt-4 space-y-3 text-base md:text-lg">
              {LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[#103942] transition hover:text-[#42D1C3]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#103942]/10 pt-8 text-sm text-[#103942]/65 md:flex-row">
          <span>© 2026 Chubby No More Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}


/* ───────────── Query-driven SEO sections ───────────── */
