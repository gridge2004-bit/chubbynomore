// Sticky mobile call-to-action bar.


export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#103942]/10 bg-white px-4 py-3 shadow-[0_-8px_24px_-16px_rgba(16,57,66,0.35)] md:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 leading-tight">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#103942]/60">
            Plans from
          </div>
          <div className="text-[15px] font-semibold text-[#103942]">$179.99 / 28 days</div>
        </div>
        <a
          href="/intake"
          className="ml-auto inline-flex shrink-0 items-center justify-center rounded-full bg-[#103942] px-5 py-3 text-[13px] font-semibold tracking-wide text-white transition hover:bg-[#42D1C3] hover:text-[#103942]"
        >
          Check if I qualify — free
        </a>
      </div>
    </div>
  );
}
