import TypeTag from "./TypeTag";
import PokedexButton from "./PokedexButton";
import { useGetPokemonQuery } from "../store/pokeApiSlice";
import { Link } from "react-router-dom";

export default function PokemonPreview({ id = 1 }) {
  const { data, error, isLoading } = useGetPokemonQuery(id);

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">Loading preview...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-red-600">
        Errore nel caricamento preview
      </div>
    );
  }

  if (!data) {
    return <div className="p-4 bg-white rounded-lg shadow">Nessun dato</div>;
  }

  return (
    <Link
      to={`/entry/${data.id}`}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
    >
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex flex-col items-center text-center">
          <img
            src={
              data.sprites.other["official-artwork"].front_default ||
              data.sprites.front_default
            }
            alt={data.name}
            className="w-40 h-40 object-contain mb-4"
          />

          <h2 className="text-2xl font-bold capitalize">
            #{data.id} {data.name}
          </h2>

          <div className="flex gap-2 mt-3">
            {data.types?.map((t) => (
              <TypeTag key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <div>Height: {(data.height / 10).toFixed(1)} m</div>
            <div>Weight: {(data.weight / 10).toFixed(1)} kg</div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Abilities</h3>
            <ul className="mt-2 text-sm">
              {data.abilities?.map((a) => (
                <li key={a.ability.name} className="capitalize">
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}
