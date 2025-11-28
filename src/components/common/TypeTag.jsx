/**
 * TypeTag
 * Small badge for a Pokémon type. Color is derived from TYPE_COLORS
 * by lower-casing the provided type; falls back to a neutral gray when
 * the type is missing or unmapped.
 *
 * Size variants:
 * - sm, md, lg, xl — tuned for common placements (list items, headers).
 * Pass a `className` to extend layout without altering the base style.
 */
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
