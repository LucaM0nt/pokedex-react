const typeColors = {
  normal: "bg-gray-400 text-white",
  fighting: "bg-red-700 text-white",
  flying: "bg-blue-300 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  rock: "bg-gray-600 text-white",
  bug: "bg-green-600 text-white",
  ghost: "bg-purple-700 text-white",
  steel: "bg-gray-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-black",
  psychic: "bg-pink-500 text-white",
  ice: "bg-cyan-300 text-black",
  dragon: "bg-indigo-600 text-white",
  dark: "bg-gray-800 text-white",
  fairy: "bg-pink-300 text-black",
};

export default function TypeTag({ type }) {
  const colorClass =
    typeColors[type?.toLowerCase()] || "bg-gray-500 text-white";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${colorClass}`}
    >
      {type}
    </span>
  );
}
