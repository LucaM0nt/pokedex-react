import { useState, useEffect, useRef } from "react";
import { useGetAllPokemonQuery } from "../store/pokeApiSlice";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [url, setUrl] = useState({ limit: 30, offset: 0 });
  const containerRef = useRef(null);

  const { data, error, isLoading } = useGetAllPokemonQuery(url);

  // Accumula i Pokémon
  useEffect(() => {
    if (data?.results) {
      setPokemonList((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  // Lazy loading con scroll interno
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Il container scrollabile vero è il main del layout (genitore).
    // Se il div interno non è scrollabile (overflow sul genitore), ascoltiamo il genitore.
    const scrollContainer = container.parentElement;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!data?.next) return;

      const nearBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight + 100;
      if (!nearBottom) return;

      const params = new URL(data.next).searchParams;
      setUrl({
        offset: Number(params.get("offset")),
        limit: Number(params.get("limit")),
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    // Eseguiamo una chiamata iniziale nel caso il contenuto sia già corto
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [data]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <ul className="space-y-2">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name} className="p-2 bg-white rounded shadow">
            {pokemon.name}
          </li>
        ))}
        {isLoading && <li>Loading...</li>}
        {error && <li>Error loading Pokémon</li>}
      </ul>
    </div>
  );
}
