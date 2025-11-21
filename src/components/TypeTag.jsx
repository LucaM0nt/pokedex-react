import { TYPE_COLORS } from "../constants/pokemonTypes";

export default function TypeTag({ type }) {
  const colorClass =
    TYPE_COLORS[type?.toLowerCase()] || "bg-gray-500 text-white";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${colorClass}`}
    >
      {type}
    </span>
  );
}
