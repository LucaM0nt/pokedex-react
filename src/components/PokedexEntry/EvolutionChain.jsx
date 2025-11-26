import TypeTag from "../TypeTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function EvolutionChain({ tree }) {
  if (!tree) return null;

  const EvolutionNode = ({ evo }) => {
    const evoId = evo.url.split("/").filter(Boolean).pop();

    const children = evo.evolves_to || [];
    const childCount = children.length;

    // Dynamic columns based on number of children
    const cols =
      childCount === 1
        ? "grid-cols-1"
        : childCount === 2
        ? "grid-cols-2"
        : childCount === 3
        ? "grid-cols-3"
        : "grid-cols-4"; // 4+ evolutions

    return (
      <div className="flex flex-col items-center gap-1 min-w-40 py-4">
        <a href={`/entry/${evo.name}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`}
            alt={evo.name}
            className="w-20 h-20 md:w-36 md:h-36 image-render-pixel"
          />
        </a>

        <p className="capitalize text-gray-700 text-sm md:text-lg text-center font-medium -mt-1">
          #{evoId}
          <br />
          {evo.name}
        </p>

        {evo.types && (
          <div className="flex justify-center gap-1 flex-wrap">
            {evo.types.map((t) => (
              <TypeTag
                key={t.type.name}
                type={t.type.name}
                className="text-sm"
              />
            ))}
          </div>
        )}

        {childCount > 0 && (
          <div className="flex flex-col items-center mt-4">
            <FontAwesomeIcon
              icon={faAngleDown}
              className="text-gray-500 text-3xl my-8"
            />

            {/* Dynamic responsive grid */}
            <div className={`grid ${cols} gap-7 place-items-start`}>
              {children.map((child, index) => (
                <EvolutionNode key={index} evo={child} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow">
      <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-800 text-center pt-5">
        Evolution Chain
      </h3>

      <div className="flex justify-center">
        <EvolutionNode evo={tree} />
      </div>
    </div>
  );
}
