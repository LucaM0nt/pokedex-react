export default function PokemonInfo({ pokemonData, speciesData }) {
  const genderText =
    speciesData.gender_rate === -1
      ? "Genderless"
      : `${(8 - speciesData.gender_rate) * 12.5}% Male / ${
          speciesData.gender_rate * 12.5
        }% Female`;

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <img
          src={
            pokemonData.sprites.other["official-artwork"].front_default ||
            pokemonData.sprites.front_default
          }
          alt={pokemonData.name}
          className="w-60 h-60 object-contain"
        />
        <p className="text-gray-800 text-lg font-semibold text-center italic mt-3">
          {speciesData.genera.find((g) => g.language.name === "en")?.genus || "Unknown"}
        </p>
      </div>

      <div className="w-full md:w-1/2">
        <div className="bg-white p-4 border-4 border-gray-300 rounded-md shadow-inner text-center flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-center gap-2 font-bold">
              <span className="text-blue-600 text-xl">📏</span> Height
            </div>
            <p>{pokemonData.height / 10} m</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-bold">
              <span className="text-red-600 text-xl">🏋️</span> Weight
            </div>
            <p>{pokemonData.weight / 10} kg</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-bold">
              <span className="text-purple-600 text-xl">⚥</span> Gender
            </div>
            <p>{genderText}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 font-bold">
              <span className="text-green-600 text-xl">✨</span> Abilities
            </div>
            <p>{pokemonData.abilities.map((a) => a.ability.name.replace("-", " ")).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
