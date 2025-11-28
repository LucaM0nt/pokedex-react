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
// Simple retry helper for fetch with Abort support
async function fetchWithRetry(url, options = {}, retries = 3, delayMs = 1000) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res;
  } catch (err) {
    // Immediately rethrow aborts
    if (err?.name === "AbortError") throw err;
    if (retries <= 0) throw err;
    await new Promise((r) => setTimeout(r, delayMs));
    return fetchWithRetry(url, options, retries - 1, delayMs * 2);
  }
}

const buildEvolutionNode = async (node, signal) => {
  const speciesUrl = node.species.url;
  const id = speciesUrl.split("/").filter(Boolean).pop();

  // Fetch Pokémon data to get types
  let pokeData = { types: [] };
  try {
    const pokeRes = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal });
    pokeData = await pokeRes.json();
  } catch (err) {
    // If a child fetch fails (network or 404), continue with empty types
    if (err?.name !== "AbortError") {
      console.warn(`Failed to fetch pokemon ${id} types:`, err);
    } else {
      throw err; // propagate aborts
    }
  }

  return {
    id,
    name: node.species.name,
    url: speciesUrl,
    types: pokeData.types, // <-- Gets the types.
    evolves_to: await Promise.all(
      node.evolves_to.map((child) => buildEvolutionNode(child, signal))
    ),
  };
};

export const fetchEvolutionTree = async (url, signal) => {
  const res = await fetchWithRetry(url, { signal });
  const data = await res.json();
  return await buildEvolutionNode(data.chain, signal);
};