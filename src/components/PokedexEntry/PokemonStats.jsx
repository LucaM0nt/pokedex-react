import React from "react";

// Color mapping by stat type (optional, for flair)
const STAT_COLORS = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-pink-500",
  "special-defense": "bg-green-500",
  speed: "bg-blue-500",
};

export default function PokemonStats({ stats }) {
  // stats is expected to be the array from PokeAPI: pokemonData.stats
  const maxStatValue = 255; // Max value in Pokémon games for scaling

  return (
    <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Base Stats
      </h3>

      <div className="flex flex-col gap-3">
        {stats.map((stat) => {
          const value = stat.base_stat;
          const name = stat.stat.name; // e.g., "attack", "speed"

          const widthPercent = Math.min((value / maxStatValue) * 100, 100);

          return (
            <div key={name} className="flex items-center gap-3">
              <span className="capitalize w-28 text-gray-700 font-semibold text-sm md:text-base">
                {name.replace("-", " ")}
              </span>

              <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className={`${
                    STAT_COLORS[name] || "bg-gray-500"
                  } h-4 rounded-full transition-all duration-500`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              <span className="w-10 text-right text-gray-700 font-medium text-sm md:text-base">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
