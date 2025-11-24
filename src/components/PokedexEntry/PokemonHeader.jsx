import TypeTag from "../TypeTag";

export default function PokemonHeader({ id, name, types }) {
  return (
    <div className="text-center mb-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-gray-800">
        #{id}
        <span className="block">{name.toUpperCase()}</span>
      </h2>
      <div className="mt-2 flex justify-center flex-wrap gap-2">
        {types.map((t) => (
          <TypeTag key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
}
