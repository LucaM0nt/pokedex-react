import TypeTag from "../common/TypeTag";
import FallbackImage from "../common/FallbackImage.jsx";
import Alert from "../common/Alert.jsx";
import Card from "../common/Card.jsx";
import {
  useGetPokemonQuery,
  useGetPokemonSpeciesQuery,
} from "../../store/pokeApiSlice";
import { Link } from "react-router-dom";

export default function PokemonPreview({ id = 1 }) {
  const { data, error, isLoading } = useGetPokemonQuery(id);
  const { data: speciesData } = useGetPokemonSpeciesQuery(id);

  if (isLoading) {
    return <Alert type="info" message="Loading preview..." />;
  }

  if (error) {
    const message =
      typeof error === "string"
        ? error
        : error?.status
        ? `Error loading preview (HTTP ${error.status}).`
        : "Network error loading preview.";
    return <Alert type="error" message={message} />;
  }

  if (!data) {
    return <Alert type="info" message="No data available." />;
  }

  const genus =
    speciesData?.genera?.find((g) => g.language.name === "en")?.genus || "";

  return (
    <Link
      to={`/entry/${data.id}`}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
    >
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex flex-col items-center text-center">
          <div className="text-center mb-4">
            <h2 className="text-l sm:text-3xl md:text-l font-bold text-gray-800">
              #{data.id} {data.name.toUpperCase()}
            </h2>
            {genus && (
              <p className="text-gray-500 text-base md:text-lg lg:text-xl font-medium italic mt-2 mb-1">
                {genus}
              </p>
            )}
          </div>

          <FallbackImage
            type="artwork"
            src={
              data.sprites.other["official-artwork"].front_default ||
              data.sprites.front_default
            }
            alt={data.name}
            className="w-40 h-40 object-contain mb-4"
          />

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
      </Card>
    </Link>
  );
}
