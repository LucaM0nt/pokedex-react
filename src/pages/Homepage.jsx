import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetAllPokemonFullListQuery } from "../store/pokeApiSlice";
import { setFullList } from "../store/userSlice";
import usePokedexQueryParams from "../hooks/usePokedexQueryParams";

import Pokedex from "../components/pokedex/Pokedex";
import PokemonPreview from "../components/pokedex/PokemonPreview";
import Searchbar from "../components/pokedex/Searchbar";
import SearchFilters from "../components/pokedex/SearchFilters";
import PokedexProgress from "../components/pokedex/PokedexProgress";

export default function Homepage() {
  const [hoveredPokemonId, setHoveredPokemonId] = useState(null);
  const [lastHoveredId, setLastHoveredId] = useState(1);

  const dispatch = useDispatch();
  const { data } = useGetAllPokemonFullListQuery();

  const {
    search: searchTerm,
    type: selectedType,
    gen: selectedGen,
    favorites: showFavorites,
    captured: showCaptured,
    setSearch,
    resetAll,
  } = usePokedexQueryParams();

  useEffect(() => {
    if (data) dispatch(setFullList(data.results));
  }, [data, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full min-h-0 py-5 px-1">
      <div className="md:basis-[60%] min-h-0 min-w-0 h-full flex flex-col">
        <div className="w-full">
          <Searchbar onSearch={setSearch} />
          <div className="mt-4">
            <SearchFilters onResetFilters={resetAll} />
          </div>
        </div>

        <div className="flex-1 min-h-0 mt-2">
          <Pokedex
            submittedSearchTerm={searchTerm}
            selectedType={selectedType}
            selectedGen={selectedGen}
            showFavorites={showFavorites}
            showCaptured={showCaptured}
            onHoverPokemon={(id) => {
              setHoveredPokemonId(id);
              if (id) setLastHoveredId(id);
            }}
          />
        </div>
      </div>

      <aside className="hidden md:block md:basis-[40%] min-h-0 min-w-0 h-full">
        <div className="sticky top-4">
          <div className="hidden lg:block">
            <PokedexProgress />
          </div>
          <PokemonPreview
            key={hoveredPokemonId || lastHoveredId}
            id={hoveredPokemonId || lastHoveredId}
          />
        </div>
      </aside>
    </div>
  );
}
