import { useState, useEffect } from "react";
import { fetchEvolutionTree } from "../utils/pokemonEntryUtils.jsx";

/**
 * useEvolutionChain
 * Fetches and parses evolution chain with AbortController cleanup.
 * @returns {Object} - { evolutionTree, isLoading, error }
 */
export default function useEvolutionChain(evolutionChainUrl) {
  const [evolutionTree, setEvolutionTree] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!evolutionChainUrl) {
      setEvolutionTree(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);
    setError(null);

    fetchEvolutionTree(evolutionChainUrl, signal)
      .then((tree) => {
        setEvolutionTree(tree);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        console.error("Evolution chain fetch error:", err);
        setError(err);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [evolutionChainUrl]);

  return { evolutionTree, isLoading, error };
}
