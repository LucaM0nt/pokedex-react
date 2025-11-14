import { useGetPokemonQuery } from "../store/pokeApiSlice";

function PokemonListItem({ pkmnId }) {
  const { data, error, isLoading } = useGetPokemonQuery(pkmnId);

  if (isLoading) {
    return <li className="p-2 bg-white rounded shadow">Loading...</li>;
  }

  if (error) {
    return (
      <li className="p-2 bg-white rounded shadow text-red-600">
        Errore nel caricamento
      </li>
    );
  }

  if (!data) {
    return <li className="p-2 bg-white rounded shadow">Nessun dato trovato</li>;
  }

  return (
    <li className="p-2 bg-white rounded shadow">
      #{data.id} {data.name}
    </li>
  );
}

export default PokemonListItem;
