import { useGetLastPokemonQuery } from "../store/pokeApiSlice";

/**
 * useLastPokemonId
 * Returns the last valid Pokémon numeric ID from the API.
 * Used for wrap-around navigation and progress calculations.
 * @returns {Object} - { lastId, isLoading, isError }
 */
export default function useLastPokemonId() {
  const { data: lastPokemon, isLoading, isError } = useGetLastPokemonQuery();
  const lastId = lastPokemon?.id ?? null;
  return { lastId, isLoading, isError };
}
