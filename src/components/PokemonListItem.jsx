import { useGetPokemonQuery } from "../store/pokeApiSlice";
import TypeTag from "./TypeTag";

function PokemonListItem({ pkmnId }) {
  const { data, error, isLoading } = useGetPokemonQuery(pkmnId);

  if (isLoading) {
    return (
      <li className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        Loading...
      </li>
    );
  }

  if (error) {
    return (
      <li className="p-3 bg-white rounded-lg shadow text-red-600">
        Errore nel caricamento
      </li>
    );
  }

  if (!data) {
    return (
      <li className="p-3 bg-white rounded-lg shadow">Nessun dato trovato</li>
    );
  }

  return (
    <li className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-4">
      <img
        src={data.sprites.other.dream_world.front_default}
        alt={data.name}
        className="w-16 h-16 object-contain"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg capitalize">
          #{data.id} {data.name}
        </h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {data.types?.map((typeObj) => (
            <TypeTag key={typeObj.type.name} type={typeObj.type.name} />
          ))}
        </div>
      </div>
    </li>
  );
}

export default PokemonListItem;
