import TypeTag from "../common/TypeTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import FallbackImage from "../common/FallbackImage.jsx";

/**
 * EvolutionNode
 * Recursively renders an evolution node with sprite, labels, types, and children.
 *
 * Props:
 * - evo: node object with `name`, `url`, optional `types`, and `evolves_to` array
 *
 * Behavior:
 * - Derives `evoId` from the species/pokemon URL path segment
 * - Uses a responsive grid for children, mapping count → `md:grid-cols-N`
 * - Each child renders another `EvolutionNode` (simple recursion)
 */
export default function EvolutionNode({ evo }) {
  const evoId = evo.url.split("/").filter(Boolean).pop();

  const children = evo.evolves_to || [];
  const childCount = children.length;

  const colMap = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  const desktopCols = colMap[Math.min(childCount, 4)];

  const spriteSrc = evoId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`
    : undefined;

  return (
    <div className="flex flex-col items-center gap-2 min-w-40 py-4">
      <a href={`/entry/${evoId}`} className="group focus:outline-none">
        <div className="bg-white rounded-full p-2 shadow-sm border border-gray-200 flex items-center justify-center mb-3">
          <FallbackImage
            type="sprite"
            src={spriteSrc}
            alt={evo.name}
            className="w-26 h-26 md:w-30 md:h-30 object-contain transform transition-transform duration-200 group-hover:scale-105 group-focus:scale-105"
          />
        </div>
      </a>

      <p className="text-center -mt-2">
        <span className="capitalize text-gray-600 text-sm md:text-lg">#{evoId}</span>
        <br />
        <span className="capitalize text-gray-700 text-sm font-semibold md:text-xl">{evo.name}</span>
      </p>

      {evo.types && (
        <div className="flex justify-center gap-1 flex-wrap">
          {evo.types.map((t) => (
            <TypeTag key={t.type.name} type={t.type.name} className="text-sm" />
          ))}
        </div>
      )}

      {childCount > 0 && (
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faAngleDown} className="text-gray-500 text-4xl py-7" />

          <div className={`grid grid-cols-1 ${desktopCols} gap-2 lg:gap-8 place-items-start`}>
            {children.map((child, index) => (
              <EvolutionNode key={index} evo={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
