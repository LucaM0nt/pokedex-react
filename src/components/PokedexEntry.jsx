import {
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
} from "../store/pokeApiSlice";
import TypeTag from "./TypeTag";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ---------- TEXT PARSER ----------
const parseText = (text) => {
  if (!text) return null;
  let parsedText = text
    .replace(/\n/g, " ")
    .replace(/\f/g, " ")
    .replace(/POKéMON/g, "Pokémon");

  return parsedText.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < parsedText.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
};

// ---------- EVOLUTION TREE BUILDING ----------
const buildEvolutionTree = (node) => {
  if (!node) return null;
  return {
    name: node.species.name,
    url: node.species.url,
    evolves_to: node.evolves_to.map((child) => buildEvolutionTree(child)),
  };
};

const fetchEvolutionTree = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return buildEvolutionTree(data.chain);
};

// ---------- EVOLUTION NODE COMPONENT ----------
const EvolutionNode = ({ evo }) => {
  const evoId = evo.url.split("/").filter(Boolean).pop();
  return (
    <div className="flex flex-col items-center gap-2">
      <a href={`/entry/${evo.name}`}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`}
          alt={evo.name}
          className="w-24 h-24 md:w-32 md:h-32 image-render-pixel"
        />
      </a>
      <p className="capitalize text-gray-700 text-sm md:text-base text-center font-medium">
        {evo.name} #{evoId}
      </p>
      {evo.types && (
        <div className="flex justify-center gap-1 flex-wrap">
          {evo.types.map((t) => (
            <TypeTag key={t.type.name} type={t.type.name} className="text-sm" />
          ))}
        </div>
      )}

      {evo.evolves_to.length > 0 && (
        <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
          {evo.evolves_to.map((child, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl text-gray-500 mb-2 md:mb-0 md:mx-2">
                ⬇️
              </span>
              <EvolutionNode evo={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------- MAIN COMPONENT ----------
export default function PokedexEntry() {
  const { id } = useParams();

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

  // Load evolution tree
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
    return (
      <div className="p-4 bg-white rounded-lg shadow text-red-600">
        Loading error.
      </div>
    );
  if (!pokemonData || !speciesData)
    return <div className="p-4 bg-white rounded-lg shadow">No data.</div>;

  const flavorText =
    speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text || "";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-red-700 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-black">
        <div className="bg-gray-100 rounded-lg border-4 border-black p-6 flex flex-col gap-4">
          {/* NAME + TYPES */}
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-gray-800">
              #{pokemonData.id}
              <span className="block">{pokemonData.name.toUpperCase()}</span>
            </h2>
            <div className="mt-2 flex justify-center flex-wrap gap-2">
              {pokemonData.types.map((t) => (
                <TypeTag key={t.type.name} type={t.type.name} />
              ))}
            </div>
          </div>

          {/* TOP: ARTWORK + INFO */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col items-center justify-center w-full md:w-1/2">
              <img
                src={
                  pokemonData.sprites.other["official-artwork"].front_default ||
                  pokemonData.sprites.front_default
                }
                alt={pokemonData.name}
                className="w-60 h-60 object-contain"
              />
              <p className="text-gray-800 text-lg font-semibold text-center italic mt-3">
                {speciesData.genera.find((g) => g.language.name === "en")
                  ?.genus || "Unknown"}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-white p-4 border-4 border-gray-300 rounded-md shadow-inner text-center flex flex-col gap-5">
                <div>
                  <div className="flex items-center justify-center gap-2 font-bold">
                    <span className="text-blue-600 text-xl">📏</span> Height
                  </div>
                  <p>{pokemonData.height / 10} m</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 font-bold">
                    <span className="text-red-600 text-xl">🏋️</span> Weight
                  </div>
                  <p>{pokemonData.weight / 10} kg</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 font-bold">
                    <span className="text-purple-600 text-xl">⚥</span> Gender
                  </div>
                  <p>
                    {speciesData.gender_rate === -1
                      ? "Genderless"
                      : `${(8 - speciesData.gender_rate) * 12.5}% Male / ${
                          speciesData.gender_rate * 12.5
                        }% Female`}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 font-bold">
                    <span className="text-green-600 text-xl">✨</span> Abilities
                  </div>
                  <p>
                    {pokemonData.abilities
                      .map((a) => a.ability.name.replace("-", " "))
                      .join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6 bg-white p-4 border-4 border-gray-300 rounded-md shadow-inner">
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-red-700">
              Pokédex Entry
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {parseText(flavorText)}
            </p>
          </div>

          {/* EVOLUTION CHAIN */}
          {evolutionTree && (
            <div className="mt-6 bg-white p-4 border-4 border-gray-300 rounded-md shadow-inner">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-purple-700">
                Evolution Chain
              </h3>
              <div className="flex justify-center">
                <EvolutionNode evo={evolutionTree} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
