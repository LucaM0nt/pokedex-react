import { useNavigate } from "react-router-dom";

// EntryHeader
// Shows a centered title with the current Pokémon `#ID NAME` and
// previous/next navigation controls on the left and right.
// Props:
// - `pokemonId` (number): current Pokémon id
// - `pokemonName` (string): current Pokémon name
export default function EntryHeader({ pokemonId, pokemonName }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <PrevNextButton id={pokemonId - 1} direction="prev" navigate={navigate} />

      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          #{pokemonId} {pokemonName.toUpperCase()}
        </h2>
      </div>

      <PrevNextButton id={pokemonId + 1} direction="next" navigate={navigate} />
    </div>
  );
}

// PrevNextButton
// Renders a single prev/next control. The entire control is clickable
// (navigates to `/entry/:id`). On small screens the sprite and id are
// hidden (only the arrow is visible). The `enabled` flag controls the
// disabled visual state.
function PrevNextButton({ id, direction, navigate }) {
  const enabled = id >= 1; // enabled if id is a positive number
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  // Responsive sprite sizing
  const spriteClass = "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16";

  // Arrow SVG (left-pointing). We'll reuse and rotate for the right arrow.
  const arrowSvg = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  // Right-pointing arrow - same path rotated 180deg
  const arrowSvgRight = (
    <svg
      className="w-5 h-5 transform rotate-180"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
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
              <img src={spriteUrl} alt={`#${id}`} className={`hidden md:block ${spriteClass}`} />
              <span className="hidden md:inline-block text-xs cursor-pointer">#{id}</span>
            </>
          )}

          {direction === "next" && (
            <>
              {/* id+sprite, then right arrow */}
              <span className="hidden md:inline-block text-xs cursor-pointer">#{id}</span>
              <img src={spriteUrl} alt={`#${id}`} className={`hidden md:block ${spriteClass}`} />
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
              <div className={`hidden md:block ${spriteClass} bg-gray-200 rounded`} />
              <span className="hidden md:inline-block text-xs">#{id}</span>
            </>
          ) : (
            <>
              <span className="hidden md:inline-block text-xs">#{id}</span>
              <div className={`hidden md:block ${spriteClass} bg-gray-200 rounded`} />
              {arrowSvgRight}
            </>
          )}
        </div>
      )}
    </div>
  );
}
