import TypeTag from "../TypeTag";

export default function PokemonHeader({ id, name }) {
  return (
    <div className="text-center mb-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
        #{id} {name.toUpperCase()}
      </h2>
    </div>
  );
}
