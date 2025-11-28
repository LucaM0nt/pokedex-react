import { useSearchPokemonByNameQuery } from "../store/pokeApiSlice";

// Resolve the current numeric Pokémon id from either a numeric id or a name.
// Returns { currentId, isResolving }.
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
