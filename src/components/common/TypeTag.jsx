import { TYPE_COLORS } from "../../constants/pokemonTypes";

export default function TypeTag({ type, className = "", size = "md" }) {
  const colorClass =
    TYPE_COLORS[type?.toLowerCase()] || "bg-gray-500 text-white";

  // Responsive size variants for different use cases
  const sizeMap = {
    sm: "w-17 text-center px-2 py-0.5 text-xs",
    md: "w-20 text-center px-3 py-1 text-sm font-semibold",
    lg: "w-27 text-center px-3 py-2 text-base font-semibold",
    xl: "px-5 py-2.5 text-lg font-bold",
  };

  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <span
      className={`${sizeClass} rounded-full ${colorClass} ${className} capitalize`}
    >
      {type}
    </span>
  );
}
