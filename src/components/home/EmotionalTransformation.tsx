// Transformation imagery section.
import { Reveal } from "@/components/Reveal";
import { tiles } from "./content";
import { HeroTile } from "./HeroTile";

export function EmotionalTransformation() {
  const heroTiles = tiles.filter((t) => t.variant === "image-hero");
  return (
    <section className="bg-white px-4 pb-16 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {heroTiles.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <a href="/intake" className="block h-full" aria-label={`Start intake form for ${t.title}`}>
                <HeroTile tile={t} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
