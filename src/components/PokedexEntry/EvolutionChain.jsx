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
      <div className="flex flex-col items-center gap-1 min-w-40">
        <a href={`/entry/${evo.name}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`}
            alt={evo.name}
            className="w-20 h-20 md:w-36 md:h-36 image-render-pixel"
          />
        </a>

        <p className="capitalize text-gray-700 text-sm md:text-base text-center font-medium">
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
              className="text-gray-500 text-2xl mb-2"
            />

            {/* Dynamic responsive grid */}
            <div className={`grid ${cols} gap-7 place-items-center`}>
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
    <div className="my-5 bg-white p-4 border-4 border-gray-300 rounded-md shadow-inner">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-700 text-center">
        Evolution Chain
      </h3>

      <div className="flex justify-center">
        <EvolutionNode evo={tree} />
      </div>
    </div>
  );
}
