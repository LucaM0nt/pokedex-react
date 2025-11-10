import { useGetAllPokemonQuery } from "./store/pokeApiSlice";

function App() {
  const { data, error, isLoading } = useGetAllPokemonQuery(); 

  if (isLoading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error.message}</div>; 

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {data.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
