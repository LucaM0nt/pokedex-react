import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import {
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
} from "../store/pokeApiSlice.js";
import useEvolutionChain from "../hooks/useEvolutionChain";

import PokemonInfo from "../components/pokedex-entry/PokemonInfo.jsx";
import PokemonDescription from "../components/pokedex-entry/PokemonDescription.jsx";
import PokemonStats from "../components/pokedex-entry/PokemonStats.jsx";
import EvolutionChain from "../components/pokedex-entry/EvolutionChain.jsx";
import EntryHeader from "../components/pokedex-entry/EntryHeader.jsx";
import Alert from "../components/common/Alert.jsx";
import Card from "../components/common/Card.jsx";
import usePokemonActions from "../hooks/usePokemonActions";
import PokemonActions from "../components/common/PokemonActions.jsx";

export default function PokedexEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemonId = Number(id);

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isLoadingPokemon,
  } = useGetPokemonQuery(id);

  const {
    data: speciesData,
    error: speciesError,
    isLoading: isLoadingSpecies,
  } = useGetPokemonSpeciesQuery(id);

  const { evolutionTree } = useEvolutionChain(
    speciesData?.evolution_chain?.url
  );

  // Use custom hook for Pokemon actions
  const {
    isFavorite: fav,
    isCaptured: cap,
    toggleFavorite: handleToggleFavorite,
    toggleCapture: handleToggleCapture,
  } = usePokemonActions(pokemonId);

  if (isLoadingPokemon || isLoadingSpecies) {
    return (
      <Alert type="info" message="Loading Pokémon details..." className="m-4" />
    );
  }

  if (pokemonError || speciesError) {
    const message =
      pokemonError?.status || speciesError?.status
        ? `Error loading Pokémon (HTTP ${
            pokemonError?.status || speciesError?.status
          }).`
        : "Network error loading Pokémon details.";
    return <Alert type="error" message={message} className="m-4" />;
  }

  if (!pokemonData || !speciesData) {
    return (
      <Alert type="info" message="No Pokémon data available." className="m-4" />
    );
  }

  const flavorText =
    speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text || "";

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <Card>
          {/* Back link and toggles */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-gray-600 text-xl hover:text-gray-900"
              />
              <span className="hidden sm:inline">Back to Pokédex</span>
              <span className="sm:hidden">Back</span>
            </button>

            <PokemonActions
              fav={fav}
              cap={cap}
              onToggleFavorite={handleToggleFavorite}
              onToggleCapture={handleToggleCapture}
            />
          </div>

          {/* Body */}
          <div className="space-y-7 my-10">
            <EntryHeader
              pokemonId={pokemonId}
              pokemonName={pokemonData.name}
              speciesData={speciesData}
            />
            <PokemonInfo pokemonData={pokemonData} speciesData={speciesData} />
            <PokemonDescription flavorText={flavorText} />
            <PokemonStats stats={pokemonData.stats} />
            <EvolutionChain tree={evolutionTree} />
          </div>
        </Card>
      </div>
    </div>
  );
}
