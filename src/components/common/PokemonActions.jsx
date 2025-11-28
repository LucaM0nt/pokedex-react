/**
 * PokemonActions
 * Small, reusable action group with Favorite and Captured toggles.
 * Designed to be context-agnostic: labels can be customized per view
 * (e.g., list item vs. search filters) while icons reflect current state.
 */
export default function PokemonActions({
  fav,
  cap,
  onToggleFavorite,
  onToggleCapture,
  className = "",
  
  // Customizable labels allow different contexts (pokédex entry page vs. homepage filters)
  favoriteOnLabel = "Remove from favorites",
  favoriteOffLabel = "Add to favorites",
  captureOnLabel = "Remove from caught",
  captureOffLabel = "Add to caught",
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={onToggleFavorite}
        className="cursor-pointer focus:outline-none duration-250 hover:opacity-70"
        aria-label={fav ? favoriteOnLabel : favoriteOffLabel}
        title={fav ? favoriteOnLabel : favoriteOffLabel}
      >
        {/* Star icon: filled and yellow when favored; gray otherwise */}
        <svg
          className={`w-7 h-7 ${
            fav ? "text-yellow-500 fill-current" : "text-gray-400 fill-current"
          }`}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>

      <button
        onClick={onToggleCapture}
        className="cursor-pointer focus:outline-none duration-250 hover:opacity-70"
        aria-label={cap ? captureOnLabel : captureOffLabel}
        title={cap ? captureOnLabel : captureOffLabel}
      >
        {/* Poké Ball icon: red when captured; gray when not */}
        <svg
          className={`w-7 h-7 ${cap ? "text-red-500" : "text-gray-400"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <circle cx="12" cy="12" r="3" fill={"white"} />
        </svg>
      </button>
    </div>
  );
}
