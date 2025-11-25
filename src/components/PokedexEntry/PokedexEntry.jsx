import { useGetPokemonQuery, useGetPokemonSpeciesQuery } from "../../store/pokeApiSlice";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEvolutionTree } from "./utils.jsx";

import PokemonHeader from "./PokemonHeader";
import PokemonInfo from "./PokemonInfo";
import PokemonDescription from "./PokemonDescription";
import PokemonStats from "./PokemonStats";
import EvolutionChain from "./EvolutionChain";


export default function PokedexEntry() {
  const { id } = useParams();

  const { data: pokemonData, error: pokemonError, isLoading: isLoadingPokemon } =
    useGetPokemonQuery(id);
  const { data: speciesData, error: speciesError, isLoading: isLoadingSpecies } =
    useGetPokemonSpeciesQuery(id);

  const [evolutionTree, setEvolutionTree] = useState(null);

  useEffect(() => {
    if (speciesData?.evolution_chain?.url) {
      fetchEvolutionTree(speciesData.evolution_chain.url)
        .then((tree) => setEvolutionTree(tree))
        .catch(console.error);
    }
  }, [speciesData]);

  if (isLoadingPokemon || isLoadingSpecies)
    return <div className="p-4 bg-white rounded-lg shadow">Loading...</div>;
  if (pokemonError || speciesError)
    return <div className="p-4 bg-white rounded-lg shadow text-red-600">Loading error.</div>;
  if (!pokemonData || !speciesData)
    return <div className="p-4 bg-white rounded-lg shadow">No data.</div>;

  const flavorText =
    speciesData.flavor_text_entries.find((entry) => entry.language.name === "en")
      ?.flavor_text || "";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-red-700 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-black">
        <div className="bg-gray-100 rounded-lg border-4 border-black p-6 flex flex-col gap-4">
          <PokemonHeader id={pokemonData.id} name={pokemonData.name} types={pokemonData.types} />
          <PokemonInfo pokemonData={pokemonData} speciesData={speciesData} />
          <PokemonDescription flavorText={flavorText} />
          <PokemonStats stats={pokemonData.stats} />
          <EvolutionChain tree={evolutionTree} />
        </div>
      </div>
    </div>
  );
}
