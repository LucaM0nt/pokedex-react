import { parseText } from "../../utils/pokemonEntryUtils.jsx";

/**
 * PokedexDescription
 * Displays the species flavor text, normalized (whitespace/newlines) via `parseText`.
 *
 * Props:
 * - flavorText: raw text from species API (may include control chars)
 */
export default function PokedexDescription({ flavorText }) {
  return (
    <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow">
      <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-gray-800">
        Pokédex Entry
      </h3>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {parseText(flavorText)}
      </p>
    </div>
  );
}
