import TypeTag from "../TypeTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function EvolutionChain({ tree }) {
  if (!tree) return null;

  const EvolutionNode = ({ evo }) => {
    const evoId = evo.url.split("/").filter(Boolean).pop();

    const children = evo.evolves_to || [];
    const childCount = children.length;

    // Dynamic columns based on number of children (desktop).
    // On devices smaller than tablet, we'll always use 2 columns for readability.
    const colMap = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
    };

    const desktopCols = colMap[Math.min(childCount, 4)];

    return (
      <div className="flex flex-col items-center gap-2 min-w-40 py-4">
        <a href={`/entry/${evoId}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`}
            alt={evo.name}
            className="w-30 h-30 md:w-34 md:h-34"
          />
        </a>

        <p className="text-center -mt-2">
          <span className="capitalize text-gray-600 text-sm md:text-lg">
            #{evoId}
          </span>
          <br />
          <span className="capitalize text-gray-700 text-sm font-semibold md:text-xl">
            {evo.name}
          </span>
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
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faAngleDown}
              className="text-gray-500 text-4xl pt-11 pb-7"
            />

            {/* Dynamic responsive grid: 2 cols on small screens, dynamic cols on md+ */}
            <div
              className={`grid grid-cols-1 ${desktopCols} gap-7 place-items-start`}
            >
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
      <h3 className="text-xl lg:text-3xl font-semibold mb-4 text-gray-800 text-center pt-5">
        Evolution Chain
      </h3>

      <div className="flex justify-center">
        <EvolutionNode evo={tree} />
      </div>
    </div>
  );
}
