import TypeTag from "../TypeTag";

export default function PokemonInfo({ pokemonData, speciesData }) {
  const genderText =
    speciesData.gender_rate === -1
      ? "Genderless"
      : `${(8 - speciesData.gender_rate) * 12.5}% Male / ${
          speciesData.gender_rate * 12.5
        }% Female`;

  return (
    <div className="flex flex-col md:flex-row md:items-stretch gap-6 w-full">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-1">
          #{pokemonData.id} {pokemonData.name.toUpperCase()}
        </h2>
        <img
          src={
            pokemonData.sprites.other["official-artwork"].front_default ||
            pokemonData.sprites.front_default
          }
          alt={pokemonData.name}
          className="w-60 h-60 object-contain"
        />
        <div className="mt-1 flex justify-center flex-wrap gap-2">
          {pokemonData.types.map((t) => (
            <TypeTag key={t.type.name} type={t.type.name} />
          ))}
        </div>
        <p className="text-gray-600 text-base font-medium text-center italic mt-2">
          {speciesData.genera.find((g) => g.language.name === "en")?.genus ||
            "Unknown"}
        </p>
      </div>

      <div className="w-full md:w-1/2 flex">
        <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow text-center flex flex-col justify-center gap-4 h-full w-full">
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              <span className="text-blue-600 text-xl">📏</span> Height
            </div>
            <p className="text-gray-600">{pokemonData.height / 10} m</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              <span className="text-red-600 text-xl">🏋️</span> Weight
            </div>
            <p className="text-gray-600">{pokemonData.weight / 10} kg</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              <span className="text-purple-600 text-xl">⚥</span> Gender
            </div>
            <p className="text-gray-600">{genderText}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
              <span className="text-green-600 text-xl">✨</span> Abilities
            </div>
            <p className="text-gray-600">
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
