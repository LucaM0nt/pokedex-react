import { useState, useRef } from "react";
import PokemonActions from "../pokedex-entry/PokemonActions.jsx";
import TypeTag from "../common/TypeTag";
import { TYPE_OPTIONS } from "../../constants/pokemonTypes";
import { GEN_OPTIONS } from "../../constants/pokemonGenerations";
import useClickOutside from "../../hooks/useClickOutside";
import usePokedexQueryParams from "../../hooks/usePokedexQueryParams";

export default function SearchFilters({ onResetFilters }) {
  const dropdownRef = useRef(null);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openGenDropdown, setOpenGenDropdown] = useState(false);

  const {
    type: selectedType,
    gen: selectedGen,
    favorites: showFavorites,
    captured: showCaptured,
    setType,
    setGen,
    toggleFavorites,
    toggleCaptured,
    resetAll,
  } = usePokedexQueryParams();

  useClickOutside(dropdownRef, () => {
    setOpenTypeDropdown(false);
    setOpenGenDropdown(false);
  });

  const handleSelectType = (type) => {
    setType(type || null);
    setOpenTypeDropdown(false);
  };

  const handleSelectGen = (genId) => {
    setGen(genId || null);
    setOpenGenDropdown(false);
  };

  const handleReset = () => {
    resetAll();
    if (onResetFilters) onResetFilters();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full" ref={dropdownRef}>
      {/* Dropdown Tipo */}
      <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-36">
        <button
          type="button"
          onClick={() => {
            setOpenTypeDropdown((prev) => !prev);
            setOpenGenDropdown(false);
          }}
          className="cursor-pointer w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 pr-6 sm:pr-7 bg-white text-gray-900 text-xs sm:text-sm min-h-0 h-9 sm:h-10 border border-gray-300 rounded-3xl transition-colors duration-300 hover:bg-blue-50 hover:border-blue-300"
        >
          {selectedType ? (
            <TypeTag type={selectedType} />
          ) : (
            <span className="text-gray-500 truncate">All types</span>
          )}
          <span className="flex-1" />
          <svg
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 transition-transform ${
              openTypeDropdown ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openTypeDropdown && (
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1 text-xs sm:text-sm min-w-max">
            <li
              className="cursor-pointer px-2 sm:px-3 py-2 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700"
              onMouseDown={() => handleSelectType(null)}
            >
              <span className="text-gray-700">All types</span>
            </li>
            <hr className="my-1" />
            {TYPE_OPTIONS.map((type) => (
              <li
                key={type}
                className="cursor-pointer px-2 sm:px-3 py-2 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700 flex items-center"
                onMouseDown={() => handleSelectType(type)}
              >
                <TypeTag type={type} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dropdown Generazione */}
      <div className="relative flex-1 min-w-[120px] sm:flex-none">
        <button
          type="button"
          onClick={() => {
            setOpenGenDropdown((prev) => !prev);
            setOpenTypeDropdown(false);
          }}
          className="cursor-pointer w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 pr-6 sm:pr-7 bg-white text-gray-900 text-xs sm:text-sm min-h-0 h-9 sm:h-10 border border-gray-300 rounded-3xl transition-colors duration-300 hover:bg-blue-50 hover:border-blue-300"
        >
          {selectedGen ? (
            <span className="truncate">
              {GEN_OPTIONS.find((g) => g.id === selectedGen)?.label ||
                selectedGen}
            </span>
          ) : (
            <span className="text-gray-500 truncate">All generations</span>
          )}
          <span className="flex-1" />
          <svg
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 transition-transform ${
              openGenDropdown ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openGenDropdown && (
          <ul className="absolute z-20 left-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1 text-xs sm:text-sm min-w-max">
            <li
              className="cursor-pointer px-2 sm:px-3 py-2 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700"
              onMouseDown={() => handleSelectGen(null)}
            >
              <span className="text-gray-700">All generations</span>
            </li>
            <hr className="my-1" />
            {GEN_OPTIONS.map((gen) => (
              <li
                key={gen.id}
                className="cursor-pointer px-2 sm:px-3 py-2 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700"
                onMouseDown={() => handleSelectGen(gen.id)}
              >
                {gen.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions group: Favorites, Captured, Reset */}
      <div className="flex items-center gap-4 ml-auto">
        <PokemonActions
          fav={showFavorites}
          cap={showCaptured}
          onToggleFavorite={toggleFavorites}
          onToggleCapture={toggleCaptured}
          favoriteOnLabel="Show all"
          favoriteOffLabel="Show favorites"
          captureOnLabel="Show all"
          captureOffLabel="Show caught"
          className="gap-2"
        />
        <button
          className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-gray-500 border border-gray-300 duration-300 hover:bg-red-200 hover:border-red-300 hover:text-red-950"
          onClick={handleReset}
          title="Reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
