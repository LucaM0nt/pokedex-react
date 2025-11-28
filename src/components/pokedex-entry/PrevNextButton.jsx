import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import FallbackImage from "../common/FallbackImage.jsx";

// Navigation button for previous/next Pokémon in the entry page.
// Shows arrow + sprite + ID on larger screens, just arrow on mobile.
export default function PrevNextButton({ id, direction, navigate }) {
  const enabled = Number.isFinite(Number(id)) && Number(id) >= 1;
  const spriteUrl = enabled
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : undefined;

  const spriteClass = "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16";

  const arrowLeft = (
    <FontAwesomeIcon
      icon={faAngleLeft}
      className="text-gray-500 text-2xl hover:text-gray-900"
    />
  );

  const arrowRight = (
    <FontAwesomeIcon
      icon={faAngleRight}
      className="text-gray-500 text-2xl hover:text-gray-900"
    />
  );

  return (
    <div className="flex items-center">
      {enabled ? (
        <button
          onClick={() => navigate(`/entry/${id}`)}
          className="group flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
          aria-label={direction === "prev" ? `Previous #${id}` : `Next #${id}`}
          title={direction === "prev" ? `Previous #${id}` : `Next #${id}`}
        >
          {direction === "prev" && (
            <>
              {arrowLeft}
              <FallbackImage
                type="sprite"
                src={spriteUrl}
                alt={`#${id}`}
                className={`hidden md:block ${spriteClass} transform transition-transform duration-200 group-hover:scale-110 group-focus:scale-110 jump-on-hover`}
              />
              <span className="hidden md:inline-block text-sm md:text-lg font-semibold cursor-pointer transform transition-transform duration-150 group-focus:scale-105">
                #{id}
              </span>
            </>
          )}

          {direction === "next" && (
            <>
              <span className="hidden md:inline-block text-sm md:text-lg font-semibold cursor-pointer transform transition-transform duration-150 group-focus:scale-105">
                #{id}
              </span>
              <FallbackImage
                type="sprite"
                src={spriteUrl}
                alt={`#${id}`}
                className={`hidden md:block ${spriteClass} transform transition-transform duration-200 group-hover:scale-110 group-focus:scale-110 jump-on-hover`}
              />
              {arrowRight}
            </>
          )}
        </button>
      ) : (
        <div className="opacity-30 flex items-center gap-2">
          {direction === "prev" ? (
            <>
              {arrowLeft}
              <div className={`hidden md:block ${spriteClass} bg-gray-200 rounded`} />
              <span className="hidden md:inline-block text-xs">#{id}</span>
            </>
          ) : (
            <>
              <span className="hidden md:inline-block text-xs">#{id}</span>
              <div className={`hidden md:block ${spriteClass} bg-gray-200 rounded`} />
              {arrowRight}
            </>
          )}
        </div>
      )}
    </div>
  );
}
