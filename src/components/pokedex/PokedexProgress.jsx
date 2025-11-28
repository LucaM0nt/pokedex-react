import { useSelector } from "react-redux";
import { selectListById } from "../../store/userSlice";
import useLastPokemonId from "../../hooks/useLastPokemonId";
import Alert from "../common/Alert";

export default function PokedexProgress() {
  const fullList = useSelector((state) => state.user.fullList);
  const capturesById = useSelector((state) =>
    selectListById(state, "captures")
  );
  const { lastId, isLoading, isError } = useLastPokemonId();

  // Prefer API-derived last valid id to avoid counting placeholder species.
  const hasFallback = Array.isArray(fullList) && fullList.length > 0;
  const totalPokemon = Number.isFinite(lastId) && lastId > 0 ? lastId : hasFallback ? fullList.length : 0;
  const capturedCount = Object.keys(capturesById).length;
  const completionPercentage =
    totalPokemon > 0 ? Math.round((capturedCount / totalPokemon) * 100) : 0;

  return (
    <div className="mb-4">
      {isLoading ? (
        <Alert type="info" message="Loading progress…" />
      ) : isError && !hasFallback ? (
        <Alert type="warning" message="Could not determine the total number of Pokémon." />
      ) : (
      <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-400 md:text-gray-700">
          Pokédex Progress
        </span>
        <span className="text-sm font-bold text-gray-300 md:text-gray-900">
          {capturedCount} / {totalPokemon}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-linear-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="text-right mt-1">
        <span className="text-xs text-gray-400 md:text-gray-500">
          {completionPercentage}% complete
        </span>
      </div>
      </>
      )}
    </div>
  );
}
