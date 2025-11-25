import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Titolo stile Pokémon */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold tracking-wider text-gray-800">
            404
          </h1>
          <div className="text-2xl font-semibold tracking-wide text-gray-700">
            WILD MISSINGNO. APPEARED!
          </div>
        </div>

        {/* Box stile gioco Pokémon */}
        <div className="bg-white text-gray-900 rounded-lg border border-gray-300 p-6 shadow-lg">
          <div className="space-y-4">
            <p className="text-lg font-medium">
              Oh no! This page doesn't exist in this region!
            </p>
            <p className="text-sm text-gray-600">
              The route you're trying to reach hasn't been discovered yet, or it
              might have been removed by a wild Pokémon.
            </p>
          </div>
        </div>

        {/* Bottoni stile menu Pokémon */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            ← Return to Pokédex
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded transition-colors border border-gray-300"
          >
            Go Back
          </button>
        </div>

        {/* Easter egg text */}
        <p className="text-xs text-gray-500 mt-8">
          Tip: Try checking the URL or use the navigation menu
        </p>
      </div>
    </div>
  );
}
