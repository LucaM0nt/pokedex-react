import { useNavigate } from "react-router-dom";
import PokemonCryButton from "./PokemonCryButton";
import { useGetLastPokemonQuery } from "../../store/pokeApiSlice";
import PrevNextButton from "./PrevNextButton";
import useCurrentPokemonId from "../../hooks/useCurrentPokemonId";

/**
 * EntryHeader
 * Renders the Pokémon name/number with accessible genus subtitle and prev/next navigation.
 *
 * Props:
 * - pokemonId: numeric ID or string that can resolve to an ID
 * - pokemonName: fallback identifier used by `useCurrentPokemonId`
 * - speciesData: includes `genera` for localized genus; English is selected
 *
 * Behavior:
 * - Resolves a numeric `currentId` via `useCurrentPokemonId(pokemonId, pokemonName)`
 * - Computes `prevId`/`nextId` with wrap-around using the API-reported `lastId`
 * - Uses `PrevNextButton` for navigation and consistent sprite/label rendering
 */
export default function EntryHeader({ pokemonId, pokemonName, speciesData }) {
  const navigate = useNavigate();

  // Get the last valid Pokémon ID for wrap-around navigation
  const { data: lastPokemon } = useGetLastPokemonQuery();
  const lastId = lastPokemon?.id;

  // Resolve the current numeric ID from either id or name
  const { currentId } = useCurrentPokemonId(pokemonId, pokemonName);

  // Calculate prev/next with wrap-around (1 ↔ lastId)
  const prevId = currentId
    ? currentId - 1 < 1
      ? lastId
      : currentId - 1
    : null;
  const nextId = currentId
    ? lastId && currentId + 1 > lastId
      ? 1
      : currentId + 1
    : null;

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <PrevNextButton id={prevId} direction="prev" navigate={navigate} />

      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          #{currentId ?? "--"} {(pokemonName || "").toUpperCase()}
        </h2>
        <div className="text-gray-500 text-base md:text-lg lg:text-xl font-medium text-center italic mt-2 mb-1 flex items-center justify-center gap-2">
          <span>
            {speciesData.genera.find((g) => g.language.name === "en")?.genus ||
              "Unknown"}
          </span>
          {currentId && <PokemonCryButton pokemonId={currentId} />}
        </div>
      </div>

      <PrevNextButton id={nextId} direction="next" navigate={navigate} />
    </div>
  );
}
