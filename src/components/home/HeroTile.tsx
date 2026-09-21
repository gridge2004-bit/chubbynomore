// Image tile used by the transformation section.
import type { Tile } from "./content";

export function HeroTile({ tile }: { tile: Tile }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-3xl bg-[#F5F5F7]">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={tile.img}
          alt={tile.imgAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-4 px-6 py-6 sm:px-7 sm:py-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#103942]/25 text-[#103942] sm:h-12 sm:w-12">
          {tile.icon === "user" ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
            </svg>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-[20px] font-bold leading-tight text-[#103942] sm:text-[22px]">{tile.title}</h3>
          {tile.subtitle && (
            <p className="mt-1 text-[14px] leading-snug text-[#103942]/70 sm:text-[15px]">{tile.subtitle}</p>
          )}
        </div>
      </div>
    </article>
  );
}
