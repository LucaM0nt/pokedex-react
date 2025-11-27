import { useGetLastPokemonQuery } from "../store/pokeApiSlice";

// Returns the last valid Pokémon numeric id from the API.
// Reuses the same logic employed by EntryHeader to avoid counting placeholders.
export default function useLastPokemonId() {
  const { data: lastPokemon, isLoading, isError } = useGetLastPokemonQuery();
  const lastId = lastPokemon?.id ?? null;
  return { lastId, isLoading, isError };
}
