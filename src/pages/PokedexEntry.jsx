import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
} from "../store/pokeApiSlice.js";
import { fetchEvolutionTree } from "../components/PokedexEntry/utils.jsx";

import PokemonInfo from "../components/PokedexEntry/PokemonInfo.jsx";
import PokemonDescription from "../components/PokedexEntry/PokemonDescription.jsx";
import PokemonStats from "../components/PokedexEntry/PokemonStats.jsx";
import EvolutionChain from "../components/PokedexEntry/EvolutionChain.jsx";
import EntryHeader from "../components/PokedexEntry/EntryHeader.jsx";
import Alert from "../components/Alert.jsx";
import usePokemonActions from "../hooks/usePokemonActions";

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

  const [evolutionTree, setEvolutionTree] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let isMounted = true;

    if (speciesData?.evolution_chain?.url) {
      fetchEvolutionTree(speciesData.evolution_chain.url, signal)
        .then((tree) => {
          if (isMounted) setEvolutionTree(tree);
        })
        .catch((err) => {
          if (err?.name === "AbortError") return;
          console.error(err);
        });
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [speciesData]);

  // Use custom hook for Pokemon actions
  const {
    isFavorite: fav,
    isCaptured: cap,
    toggleFavorite: handleToggleFavorite,
    toggleCapture: handleToggleCapture,
  } = usePokemonActions(pokemonId);

  if (isLoadingPokemon || isLoadingSpecies)
    return <Alert type="info" message="Loading Pokémon details..." className="m-4" />;
  if (pokemonError || speciesError) {
    const message = pokemonError?.status || speciesError?.status
      ? `Error loading Pokémon (HTTP ${pokemonError?.status || speciesError?.status}).`
      : "Network error loading Pokémon details.";
    return <Alert type="error" message={message} className="m-4" />;
  }
  if (!pokemonData || !speciesData)
    return <Alert type="info" message="No Pokémon data available." className="m-4" />;

  const flavorText =
    speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text || "";

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          {/* Back link and toggles */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Pokédex</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleFavorite}
                className="cursor-pointer focus:outline-none"
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                title={fav ? "Remove from favorites" : "Add to favorites"}
              >
                <svg
                  className={`w-7 h-7 ${
                    fav
                      ? "text-yellow-500 fill-current"
                      : "text-gray-400 fill-current"
                  }`}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>

              <button
                onClick={handleToggleCapture}
                className="cursor-pointer focus:outline-none"
                aria-label={cap ? "Remove from caught" : "Add to caught"}
                title={cap ? "Remove from caught" : "Add to caught"}
              >
                <svg
                  className={`w-7 h-7 ${
                    cap ? "text-red-500" : "text-gray-400"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <circle cx="12" cy="12" r="3" fill={"white"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-7 my-10">
            <EntryHeader pokemonId={pokemonId} pokemonName={pokemonData.name} />
            <PokemonInfo pokemonData={pokemonData} speciesData={speciesData} />
            <PokemonDescription flavorText={flavorText} />
            <PokemonStats stats={pokemonData.stats} />
            <EvolutionChain tree={evolutionTree} />
          </div>
        </div>
      </div>
    </div>
  );
}
