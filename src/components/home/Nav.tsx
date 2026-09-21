// Promo banner, sticky header and shared pill button.
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "./content";
import cnmHeaderLogoAsset from "@/assets/cnm-header-logo.png.asset.json";

export function PromoBanner() {
  return (
    <div className="w-full bg-[#103942] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]">
        <span className="hidden h-1.5 w-1.5 rounded-full bg-[#42D1C3] sm:inline-block" />
        <span className="sm:hidden">Free eligibility check · 60 seconds</span>
        <span className="hidden sm:inline">Free online eligibility check — takes 60 seconds</span>
      </div>
    </div>
  );
}

export function PillButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition";
  if (variant === "secondary") {
    return <a href={href} className={`${base} border border-[#103942] text-[#103942] hover:bg-[#F5F5F7] hover:text-[#103942]`}>{children}</a>;
  }
  return <a href={href} className={`${base} bg-[#103942] text-white hover:bg-[#42D1C3] hover:text-[#103942]`}>{children}</a>;
}

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full max-w-full border-b border-[#103942]/10 bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(16,57,66,0.08),0_8px_24px_-16px_rgba(16,57,66,0.18)]" : ""}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6 lg:gap-10">
          <a href="/" aria-label="Chubby No More home" className="flex shrink-0 items-center py-1">
            <img src={cnmHeaderLogoAsset.url} alt="Chubby No More" className="h-7 w-auto max-w-[150px] object-contain sm:h-8 sm:max-w-[190px] lg:h-9 lg:max-w-none" />
          </a>
          <nav className="hidden items-center gap-6 md:flex lg:gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#103942]/80 transition hover:text-[#42D1C3]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#switching"
            className="hidden shrink-0 items-center justify-center rounded-full border border-[#103942]/25 px-4 py-2.5 text-xs font-semibold tracking-wide text-[#103942] transition hover:border-[#42D1C3] hover:text-[#42D1C3] sm:inline-flex sm:text-sm"
          >
            Switch your care
          </a>
          <a href="/intake" className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#103942] px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942] sm:px-7 sm:py-3.5 sm:text-sm">
            <span className="sm:hidden">See if I qualify</span>
            <span className="hidden sm:inline">See if I qualify — free</span>
          </a>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[#103942] transition hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3] md:hidden"
          >
            <Menu className="h-7 w-7" strokeWidth={2} />
          </button>
        </div>

      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-[#103942]/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute inset-x-0 top-0 rounded-b-3xl bg-white px-4 pb-6 pt-3 shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <a href="/" aria-label="Chubby No More home" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center py-1">
                <img src={cnmHeaderLogoAsset.url} alt="Chubby No More" className="h-7 w-auto max-w-[150px] object-contain sm:h-8 sm:max-w-[190px]" />
              </a>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[#103942] transition hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3]"
              >
                <X className="h-7 w-7" strokeWidth={2} />
              </button>
            </div>
            <nav className="mt-4 flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[#103942]/10 py-3.5 text-base font-semibold text-[#103942] transition hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3] active:text-[#42D1C3]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href="/intake"
              onClick={() => setMenuOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#103942] px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3]"
            >
              See if I qualify — free
            </a>
            <a
              href="#switching"
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#103942]/25 px-6 py-3 text-sm font-semibold tracking-wide text-[#103942] transition hover:border-[#42D1C3] hover:text-[#42D1C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42D1C3]"
            >
              Switch your care
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
