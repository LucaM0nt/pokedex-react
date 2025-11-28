import { useRef, useEffect } from "react";
import PokemonListItem from "./PokemonListItem";

export default function PokemonList({
  items,
  loading,
  hasMore,
  onLoadMore,
  onHoverPokemon,
  scrollSignal = 0,
}) {
  const containerRef = useRef(null);

  /**
   * Lazy loading on scroll
   * Attaches a scroll handler to detect near-bottom and trigger `onLoadMore`.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container || !hasMore) return;

    const handleScroll = () => {
      const nearBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

      if (nearBottom) onLoadMore();
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, onLoadMore]);

  // Scroll to top when `scrollSignal` changes (e.g., filters applied)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scrollSignal]);

  return (
    <div className="h-full relative">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto px-0 py-4 bg-white"
      >
        <ul className="space-y-3 w-full">
          {items.map((pokemon) => {
            const id = Number(pokemon.url.replace(/\/$/, "").split("/").pop());

            return (
              <PokemonListItem key={id} pkmnId={id} onHover={onHoverPokemon} />
            );
          })}

          {loading && (
            <li className="text-center py-4 text-gray-500">Loading...</li>
          )}
        </ul>
      </div>
      {/* Fixed white gradient fade at the bottom to soften cutoff */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-white to-transparent" />
    </div>
  );
}
