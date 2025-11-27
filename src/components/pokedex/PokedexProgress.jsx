import { useSelector } from "react-redux";
import { selectListById } from "../../store/userSlice";

export default function PokedexProgress() {
  const fullList = useSelector((state) => state.user.fullList);
  const capturesById = useSelector((state) =>
    selectListById(state, "captures")
  );

  const totalPokemon = fullList?.length || 0;
  const capturedCount = Object.keys(capturesById).length;
  const completionPercentage =
    totalPokemon > 0 ? Math.round((capturedCount / totalPokemon) * 100) : 0;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Pokédex Progress
        </span>
        <span className="text-sm font-bold text-gray-900">
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
        <span className="text-xs text-gray-500">
          {completionPercentage}% complete
        </span>
      </div>
    </div>
  );
}
