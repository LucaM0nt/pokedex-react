/**
 * IconGrid
 * Responsive grid of small Pokémon sprite tiles linking to their entry pages.
 * Shows an empty label when no IDs are provided. Optionally renders a remove
 * button on hover to allow deleting items from a list (favorites/captured).
 *
 * Props:
 * - ids: number[] — Pokémon IDs to render
 * - emptyLabel: string — message when no ids are present
 * - onRemove?: (id: number) => void — render and handle remove button if set
 *
 * Implementation notes:
 * - Images use `loading="lazy"` and `FallbackImage` to guard against failures.
 * - Remove button uses `preventDefault` to avoid following the `<Link>`.
 */
import { Link } from "react-router-dom";
import FallbackImage from "../common/FallbackImage.jsx";

export default function IconGrid({ ids, emptyLabel, onRemove }) {
  if (!ids || ids.length === 0) {
    return <p className="text-gray-500 text-sm">{emptyLabel}</p>;
  }

  return (
    <div className="mt-6 mx-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {ids.map((id) => (
        <div key={id} className="relative group">
          <Link to={`/entry/${id}`} className="block">
            <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm w-24 h-24 md:w-26 md:h-26 mx-auto flex items-center justify-center group-hover:border-blue-400 hover:shadow transition duration-200">
              <FallbackImage
                type="sprite"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={`#${id}`}
                className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 image-render-pixel"
                loading="lazy"
              />
            </div>
            <p className="mt-1 text-center text-sm md:text-base text-gray-600 group-hover:text-gray-800">
              #{id}
            </p>
          </Link>
          
          {/* Remove button - hidden until hover, positioned at top-right */}
          {onRemove && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onRemove(id);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors shadow cursor-pointer opacity-0 group-hover:opacity-100"
              aria-label={`Remove #${id}`}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
