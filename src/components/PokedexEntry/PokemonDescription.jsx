import { parseText } from "./utils.jsx";

export default function PokedexDescription({ flavorText }) {
  return (
    <div className="mt-6 bg-white p-4 border-4 border-gray-300 rounded-md shadow-inner">
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-red-700">Pokédex Entry</h3>
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">{parseText(flavorText)}</p>
    </div>
  );
}
