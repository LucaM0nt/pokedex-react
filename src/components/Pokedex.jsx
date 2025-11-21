import { useState, useEffect, useRef } from "react";
import {
  useGetAllPokemonQuery,
  useGetAllPokemonFullListQuery,
} from "../store/pokeApiSlice";
import PokemonListItem from "./PokemonListItem";

export default function Pokedex({
  submittedSearchTerm,
  onHoverPokemon,
  selectedTypes = [],
  selectedGeneration = null,
  sortOption = "id-asc",
}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [url, setUrl] = useState({ limit: 30, offset: 0 });
  const containerRef = useRef(null);

  const { data, isLoading, isFetching } = useGetAllPokemonQuery(url);
  const { data: fullListData } = useGetAllPokemonFullListQuery();

  const isSearching = submittedSearchTerm.trim().length > 0;

  // Accumula i Pokémon solo se non stai cercando
  useEffect(() => {
    if (isSearching) return; // blocca lazy loading

    if (data?.results) {
      setPokemonList((prev) => {
        const newItems = data.results.filter((p) => {
          const id = Number(p.url.replace(/\/$/, "").split("/").pop());
          return !p.name.toLowerCase().includes("-mega") && id <= 10000;
        });
        return [...prev, ...newItems];
      });
    }
  }, [data, isSearching]);

  // Lazy loading solo se non stai cercando
  useEffect(() => {
    if (isSearching) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!data?.next || isFetching) return;

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
  }, [data, isFetching, isSearching]);

  // Lista finale, se stai cercando o applicando filtri
  const filteredList = (isSearching ? fullListData?.results || [] : pokemonList)
    .filter((p) => {
      const id = Number(p.url.replace(/\/$/, "").split("/").pop());

      // filtro mega Pokémon e id limite
      if (p.name.toLowerCase().includes("-mega") || id > 10000) return false;

      // filtro search
      if (
        isSearching &&
        !p.name.toLowerCase().includes(submittedSearchTerm.toLowerCase())
      )
        return false;

      // filtro tipi
      if (selectedTypes.length && p.types) {
        const pokemonTypes = p.types.map((t) => t.type.name);
        if (!selectedTypes.every((t) => pokemonTypes.includes(t))) return false;
      }

      // filtro generazione (se presente)
      if (selectedGeneration && p.generation) {
        if (p.generation !== selectedGeneration) return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "id-asc":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-0 py-4 bg-white"
    >
      <ul className="space-y-3 w-full">
        {filteredList.map((pokemon) => {
          const id = Number(pokemon.url.replace(/\/$/, "").split("/").pop());
          return (
            <PokemonListItem key={id} pkmnId={id} onHover={onHoverPokemon} />
          );
        })}

        {!isSearching && isLoading && (
          <li className="text-center py-4">Loading...</li>
        )}
      </ul>
    </div>
  );
}
