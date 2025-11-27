import { useNavigate } from "react-router-dom";
import { useGetLastPokemonQuery, useSearchPokemonByNameQuery } from "../../store/pokeApiSlice";
import FallbackImage from "../FallbackImage.jsx";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// EntryHeader
// Shows a centered title with the current Pokémon `#ID NAME` and
// previous/next navigation controls on the left and right.
// Props:
// - `pokemonId` (number): current Pokémon id
// - `pokemonName` (string): current Pokémon name
export default function EntryHeader({ pokemonId, pokemonName }) {
  const navigate = useNavigate();

  // Use the latest API helper to fetch the last valid Pokémon record.
  // This avoids relying on `count` which may include invalid/placeholder rows.
  const { data: lastPokemon } = useGetLastPokemonQuery();
  const lastId = lastPokemon?.id;

  // Compute wrap-around prev/next using `lastId` when available.
  // If `lastId` is not available we fall back to simple +/- ids.
  // Determine a reliable numeric ID for the current Pokémon. The
  // `pokemonId` prop may be a number or a name string (e.g. when the
  // user edits the URL to `/entry/bulbasaur`). When it's not a valid
  // number, fetch the Pokémon by name to obtain its numeric `id`.
  const parsedId = Number(pokemonId);
  const isNumericId = Number.isFinite(parsedId) && parsedId > 0;

  // Call the name-based query only when we don't already have a numeric id.
  const { data: pokemonByName } = useSearchPokemonByNameQuery(pokemonName ?? "", {
    skip: isNumericId || !pokemonName,
  });

  const currentId = isNumericId ? parsedId : pokemonByName?.id || null;

  const prevId = currentId
    ? currentId - 1 < 1
      ? lastId
      : currentId - 1
    : null;
  const nextId = currentId
    ? lastId && currentId + 1 > lastId
      ? 1
      : currentId + 1
    : null;

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <PrevNextButton id={prevId} direction="prev" navigate={navigate} />

      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          #{currentId ?? "--"} {(pokemonName || "").toUpperCase()}
        </h2>
      </div>

      <PrevNextButton id={nextId} direction="next" navigate={navigate} />
    </div>
  );
}

// PrevNextButton
// Renders a single prev/next control. The entire control is clickable
// (navigates to `/entry/:id`). On small screens the sprite and id are
// hidden (only the arrow is visible). The `enabled` flag controls the
// disabled visual state.
function PrevNextButton({ id, direction, navigate }) {
  const enabled = Number.isFinite(Number(id)) && Number(id) >= 1; // enabled if id is a positive number
  const spriteUrl = enabled
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : undefined;

  // Responsive sprite sizing
  const spriteClass =
    "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16";

  // Arrow SVG (left-pointing).
  const arrowSvg = (
    <FontAwesomeIcon
      icon={faAngleLeft}
      className="text-gray-500 text-2xl"
    />
  );

  // Right-pointing arrow - same path rotated 180deg
  const arrowSvgRight = (
    <FontAwesomeIcon
      icon={faAngleRight}
      className="text-gray-500 text-2xl"
    />
  );

  // Render the control: clickable when `enabled`, otherwise shown as
  // a disabled visual placeholder with reduced opacity.
  return (
    <div className="flex items-center">
      {enabled ? (
        <button
          onClick={() => navigate(`/entry/${id}`)}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
          aria-label={direction === "prev" ? `Previous #${id}` : `Next #${id}`}
          title={direction === "prev" ? `Previous #${id}` : `Next #${id}`}
        >
          {direction === "prev" && (
            <>
              {/* left arrow, then sprite+id (sprite and id hidden on small screens) */}
              {arrowSvg}
                  <FallbackImage
                    type="sprite"
                    src={spriteUrl}
                    alt={`#${id}`}
                    className={`hidden md:block ${spriteClass} transform transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1 group-focus:scale-110`}
                  />
                  <span className="hidden md:inline-block text-sm md:text-lg font-semibold cursor-pointer transform transition-transform duration-150 group-hover:scale-105 group-focus:scale-105">
                    #{id}
                  </span>
            </>
          )}

          {direction === "next" && (
            <>
              {/* id+sprite, then right arrow */}
                  <span className="hidden md:inline-block text-sm md:text-lg font-semibold cursor-pointer transform transition-transform duration-150 group-hover:scale-105 group-focus:scale-105">
                    #{id}
                  </span>
                  <FallbackImage
                    type="sprite"
                    src={spriteUrl}
                    alt={`#${id}`}
                    className={`hidden md:block ${spriteClass} transform transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1 group-focus:scale-110`}
                  />
                  {arrowSvgRight}
            </>
          )}
        </button>
      ) : (
        // Disabled visual state (not clickable) with reduced opacity
        <div className="opacity-30 flex items-center gap-2">
          {direction === "prev" ? (
            <>
              {arrowSvg}
              <div
                className={`hidden md:block ${spriteClass} bg-gray-200 rounded`}
              />
              <span className="hidden md:inline-block text-xs">#{id}</span>
            </>
          ) : (
            <>
              <span className="hidden md:inline-block text-xs">#{id}</span>
              <div
                className={`hidden md:block ${spriteClass} bg-gray-200 rounded`}
              />
              {arrowSvgRight}
            </>
          )}
        </div>
      )}
    </div>
  );
}
