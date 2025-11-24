import React from "react";

// ---------- TEXT PARSER ----------
export const parseText = (text) => {
  if (!text) return null;
  const parsedText = text
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

// ---------- EVOLUTION TREE BUILDER ----------
export const buildEvolutionTree = (node) => {
  if (!node) return null;
  return {
    name: node.species.name,
    url: node.species.url,
    evolves_to: node.evolves_to.map((child) => buildEvolutionTree(child)),
  };
};

// ---------- FETCH EVOLUTION TREE ----------
const buildEvolutionNode = async (node) => {
  const speciesUrl = node.species.url;
  const id = speciesUrl.split("/").filter(Boolean).pop();

  // Fetch Pokémon data to get types
  const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeData = await pokeRes.json();

  return {
    id,
    name: node.species.name,
    url: speciesUrl,
    types: pokeData.types, // <-- Gets the types.
    evolves_to: await Promise.all(
      node.evolves_to.map((child) => buildEvolutionNode(child))
    ),
  };
};

export const fetchEvolutionTree = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return await buildEvolutionNode(data.chain);
};