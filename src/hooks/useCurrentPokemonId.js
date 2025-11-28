import { useSearchPokemonByNameQuery } from "../store/pokeApiSlice";

/**
 * useCurrentPokemonId
 * Resolves a numeric Pokémon ID from either a numeric id or a name.
 * Skips name lookup if a valid numeric ID is provided.
 * @returns {Object} - { currentId, isResolving }
 */
export default function useCurrentPokemonId(pokemonId, pokemonName) {
  const parsedId = Number(pokemonId);
  const isNumericId = Number.isFinite(parsedId) && parsedId > 0;

  const { data: pokemonByName, isLoading } = useSearchPokemonByNameQuery(
    pokemonName ?? "",
    { skip: isNumericId || !pokemonName }
  );

  const currentId = isNumericId ? parsedId : pokemonByName?.id ?? null;
  const isResolving = !isNumericId && isLoading;

  return { currentId, isResolving };
}
