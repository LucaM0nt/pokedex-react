import TypeTag from "../common/TypeTag";
import FallbackImage from "../common/FallbackImage.jsx";

export default function PokemonInfo({ pokemonData, speciesData }) {
  const isGenderless = speciesData.gender_rate === -1;
  const femaleRatio = isGenderless ? 0 : speciesData.gender_rate * 12.5;
  const maleRatio = isGenderless ? 0 : 100 - femaleRatio;

  return (
    <div className="flex flex-col md:flex-row md:items-stretch gap-6 w-full">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <FallbackImage
          type="artwork"
          src={
            pokemonData.sprites?.other?.["official-artwork"]?.front_default ||
            pokemonData.sprites?.front_default
          }
          alt={pokemonData.name}
          className="w-60 h-60 object-contain"
        />
        <div className="mt-7 flex justify-center flex-wrap gap-3">
          {pokemonData.types.map((t) => (
            <TypeTag
              key={t.type.name}
              type={t.type.name}
              size="lg"
              className="shadow-sm"
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex">
        <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow text-center flex flex-col justify-center gap-4 h-full w-full">
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              Height
            </div>
            <p className="text-gray-600">{pokemonData.height / 10} m</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              Weight
            </div>
            <p className="text-gray-600">{pokemonData.weight / 10} kg</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              Gender
            </div>

            {/* Gender ratio bar */}
            <div className="mt-2 flex flex-col items-center">
              {isGenderless ? (
                <>
                  <div
                    className="w-48 sm:w-56 h-3 rounded-2xl bg-purple-400"
                    aria-hidden
                  />
                  <p className="text-gray-600 text-sm mt-1">Genderless</p>
                </>
              ) : (
                <>
                  <div
                    className="w-48 sm:w-56 h-3 rounded-2xl overflow-hidden flex"
                    role="img"
                    aria-label={`Male ${maleRatio.toFixed(
                      1
                    )}% Female ${femaleRatio.toFixed(1)}%`}
                  >
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${maleRatio}%` }}
                    />
                    <div
                      className="bg-pink-500 h-full"
                      style={{ width: `${femaleRatio}%` }}
                    />
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {`${maleRatio.toFixed(1)}% Male / ${femaleRatio.toFixed(
                      1
                    )}% Female`}
                  </p>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              Abilities
            </div>
            <p className="text-gray-600 capitalize">
              {pokemonData.abilities
                .map((a) => a.ability.name.replace("-", " "))
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
