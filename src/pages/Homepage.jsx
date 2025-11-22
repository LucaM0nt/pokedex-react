import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetAllPokemonFullListQuery } from "../store/pokeApiSlice";
import { setFullList } from "../store/userListsSlice";

import Pokedex from "../components/Pokedex";
import PokemonPreview from "../components/PokemonPreview";
import Searchbar from "../components/Searchbar";
import SearchFilters from "../components/SearchFilters";

export default function Homepage() {
  const [selectedType, setSelectedType] = useState(null);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [hoveredPokemonId, setHoveredPokemonId] = useState(null);
  const [lastHoveredId, setLastHoveredId] = useState(1);

  const dispatch = useDispatch();
  const { data } = useGetAllPokemonFullListQuery();

  useEffect(() => {
    if (data) dispatch(setFullList(data.results));
  }, [data, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full min-h-0">
      <div className="md:w-3/5 min-h-0 h-full shrink-0 flex flex-col">
        <div className="w-full">
          <Searchbar onSearch={(t) => setSubmittedSearchTerm(t)} />
          <div className="mt-4">
            <SearchFilters onSelectType={(type) => setSelectedType(type)} />
          </div>
        </div>

        <div className="flex-1 min-h-0 mt-2">
          <Pokedex
            submittedSearchTerm={submittedSearchTerm}
            selectedType={selectedType}
            onHoverPokemon={(id) => {
              setHoveredPokemonId(id);
              if (id) setLastHoveredId(id);
            }}
          />
        </div>
      </div>

      <aside className="md:w-2/5 min-h-0 h-full shrink-0">
        <div className="sticky top-4">
          <PokemonPreview id={hoveredPokemonId || lastHoveredId} />
        </div>
      </aside>
    </div>
  );
}
