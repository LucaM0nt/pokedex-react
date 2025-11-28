// Color mapping by stat type (for flair)
const STAT_COLORS = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-pink-500",
  "special-defense": "bg-green-500",
  speed: "bg-blue-500",
};

/**
 * PokemonStats
 * Visualizes the `pokemonData.stats` array with responsive bars.
 *
 * Props:
 * - stats: PokeAPI `pokemon.stats` array; each item includes `base_stat` and `stat.name`
 *
 * Behavior:
 * - Horizontal bars for `md+`, vertical bars for small screens
 * - Scales to the canonical max stat value (255)
 */
export default function PokemonStats({ stats }) {
  // stats is expected to be the array from PokeAPI: pokemonData.stats
  const maxStatValue = 255; // Canonical upper bound used for scaling
  // Render horizontal bars on md+ (original layout), vertical bars on smaller screens
  return (
    <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center lg:text-2xl">
        Base Stats
      </h3>

      {/* Horizontal bars for md and up (original appearance) */}
      <div className="hidden md:flex flex-col gap-3">
        {stats.map((stat) => {
          const value = stat.base_stat;
          const name = stat.stat.name; // e.g., "attack", "speed"

          const widthPercent = Math.min((value / maxStatValue) * 100, 100);

          return (
            <div key={name} className="flex items-center gap-3">

              <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className={`${
                    STAT_COLORS[name] || "bg-gray-500"
                  } h-4 rounded-full transition-all duration-500`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              
              <span className="w-6 pr-6 text-right text-gray-700 font-medium text-sm md:text-base">
                {value}
              </span>

              <span className="capitalize w-30 text-gray-700 font-semibold text-sm md:text-base">
                {name.replace("-", " ")}
              </span>
            </div>
          );
        })}
      </div>

      {/* Vertical bars for tablets and smaller (md and below) */}
      <div className="flex md:hidden items-start justify-between gap-1 px-1 overflow-x-auto">
        {stats.map((stat) => {
          const value = stat.base_stat;
          const name = stat.stat.name; // e.g., "attack", "speed"

          const heightPercent = Math.min((value / maxStatValue) * 100, 100);
          const label = name.replace("-", " ");

          return (
            <div
              key={name}
              className="flex flex-col items-center flex-1 min-w-11"
            >
              <div
                className="w-full h-34 bg-gray-200 rounded-md overflow-hidden flex items-end"
                aria-hidden
              >
                <div
                  className={`${
                    STAT_COLORS[name] || "bg-gray-500"
                  } w-full transition-all rounded-md duration-500`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <div className="mt-1 text-center">
                <div className="text-[10px] sm:text-sm font-semibold text-gray-700 capitalize">
                  {label}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-600">
                  {value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
