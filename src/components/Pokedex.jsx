import { useState, useEffect, useRef } from "react";
import {
  useGetAllPokemonQuery,
  useGetAllPokemonFullListQuery,
  useGetPokemonTypeQuery,
} from "../store/pokeApiSlice";
import PokemonListItem from "./PokemonListItem";

export default function Pokedex({
  submittedSearchTerm,
  selectedType,
  onHoverPokemon,
}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [url, setUrl] = useState({ limit: 30, offset: 0 });
  const [loadingType, setLoadingType] = useState(false); // nuovo stato per caricamento tipo
  const containerRef = useRef(null);

  const { data: pageData, isLoading, isFetching } = useGetAllPokemonQuery(url);
  const { data: fullListData } = useGetAllPokemonFullListQuery();

  // Nuova query: Pokémon per tipo
  const { data: typeData, isFetching: isTypeFetching } = useGetPokemonTypeQuery(
    selectedType,
    { skip: !selectedType }
  );

  const isSearching = submittedSearchTerm.trim().length > 0;

  // Gestione stato loading per tipo
  useEffect(() => {
    if (!selectedType) return;
    setLoadingType(true); // inizio caricamento
  }, [selectedType]);

  useEffect(() => {
    if (!selectedType) return;
    if (!isTypeFetching) setLoadingType(false); // fine caricamento
  }, [isTypeFetching, selectedType]);

  // Lazy load paginato solo se non stiamo cercando e non c'è tipo selezionato
  useEffect(() => {
    if (isSearching || selectedType) return;

    if (pageData?.results) {
      setPokemonList((prev) => {
        const newItems = pageData.results.filter((p) => {
          const id = Number(p.url.replace(/\/$/, "").split("/").pop());
          return !p.name.toLowerCase().includes("-mega") && id <= 10000;
        });
        return [...prev, ...newItems];
      });
    }
  }, [pageData, isSearching, selectedType]);

  // Lazy loading scroll
  useEffect(() => {
    if (isSearching || selectedType) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!pageData?.next || isFetching) return;

      const nearBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

      if (!nearBottom) return;

      const params = new URL(pageData.next).searchParams;
      setUrl({
        offset: Number(params.get("offset")),
        limit: Number(params.get("limit")),
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [pageData, isFetching, isSearching, selectedType]);

  // Lista finale
  const filteredList =
    (selectedType
      ? typeData
      : isSearching
      ? fullListData?.results
      : pokemonList
    )?.filter((p) => {
      const id = Number(p.url.replace(/\/$/, "").split("/").pop());

      if (p.name.toLowerCase().includes("-mega") || id > 10000) return false;

      if (
        isSearching &&
        !p.name.toLowerCase().includes(submittedSearchTerm.toLowerCase())
      )
        return false;

      return true;
    }) || [];

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-0 py-4 bg-white"
    >
      <ul className="space-y-3 w-full">
        {/* Mostriamo loading quando stiamo caricando un tipo */}
        {loadingType ? (
          <li className="text-center py-4 text-gray-500">Loading...</li>
        ) : (
          filteredList.map((pokemon) => {
            const id = Number(pokemon.url.replace(/\/$/, "").split("/").pop());
            return (
              <PokemonListItem key={id} pkmnId={id} onHover={onHoverPokemon} />
            );
          })
        )}

        {/* Lazy load per lista principale */}
        {!isSearching && !selectedType && isLoading && (
          <li className="text-center py-4 text-gray-500">Loading...</li>
        )}
      </ul>
    </div>
  );
}
