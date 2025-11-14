function PokemonListItem({pokemon}) {
  return (
    <li key={pokemon.name} className="p-2 bg-white rounded shadow">
      {console.log(pokemon)}
      {pokemon.name}
    </li>
  );
}

export default PokemonListItem;
