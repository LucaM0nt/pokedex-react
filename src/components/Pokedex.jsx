import { useState, useEffect, useRef } from "react";
import { useGetAllPokemonQuery } from "../store/pokeApiSlice";
import PokemonListItem from "./PokemonListItem";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [url, setUrl] = useState({ limit: 30, offset: 0 });
  const containerRef = useRef(null);

  const { data, error, isLoading, isFetching } = useGetAllPokemonQuery(url);

  // Accumula i Pokémon
  useEffect(() => {
    if (data?.results) {
      setPokemonList((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  // Lazy loading: ascoltiamo lo scroll sul container stesso (Pokedex)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!data?.next) return;
      if (isFetching) return; // evita richieste sovrapposte

      const nearBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;
      if (!nearBottom) return;

      const params = new URL(data.next).searchParams;
      setUrl({
        offset: Number(params.get("offset")),
        limit: Number(params.get("limit")),
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [data]);

  return (
    <div ref={containerRef} className="h-full overflow-y-auto p-4 bg-gray-100">
      <ul className="space-y-2">
        {pokemonList.map((pokemon) => {
          const id = Number(pokemon.url.replace(/\/$/, "").split("/").pop());
          return <PokemonListItem key={id} pkmnId={id} />;
        })}

        {isLoading && <li>Loading...</li>}
        {error && <li>Error loading Pokémon</li>}
      </ul>
    </div>
  );
}
