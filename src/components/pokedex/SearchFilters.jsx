import { useState, useEffect, useRef } from "react";
import TypeTag from "../common/TypeTag";
import { TYPE_OPTIONS } from "../../constants/pokemonTypes";
import { GEN_OPTIONS } from "../../constants/pokemonGenerations";
import useClickOutside from "../../hooks/useClickOutside";
import usePokedexQueryParams from "../../hooks/usePokedexQueryParams";

export default function SearchFilters({
  onSelectType,
  onSelectGen,
  onToggleFavorites,
  onToggleCaptured,
  onResetFilters,
}) {
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

  // Propagate current params to parent consumers
  useEffect(() => {
    if (onSelectType) onSelectType(selectedType);
  }, [selectedType, onSelectType]);
  useEffect(() => {
    if (onSelectGen) onSelectGen(selectedGen);
  }, [selectedGen, onSelectGen]);
  useEffect(() => {
    if (onToggleFavorites) onToggleFavorites(showFavorites);
  }, [showFavorites, onToggleFavorites]);
  useEffect(() => {
    if (onToggleCaptured) onToggleCaptured(showCaptured);
  }, [showCaptured, onToggleCaptured]);

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

  const handleToggleFavorites = () => {
    toggleFavorites();
  };

  const handleToggleCaptured = () => {
    toggleCaptured();
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
      <div className="flex items-center gap-2 ml-auto">
        {/* Icona Preferiti */}
        <button
          className="cursor-pointer focus:outline-none duration-250 hover:opacity-70"
          onClick={handleToggleFavorites}
          title={showFavorites ? "Show all" : "Show favorites"}
        >
          <svg
            className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${
              showFavorites
                ? "text-yellow-500 fill-current"
                : "text-gray-400 fill-current"
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>

        {/* Icona Catturati */}
        <button
          className="cursor-pointer focus:outline-none transition duration-250 hover:opacity-70"
          onClick={handleToggleCaptured}
          title={showCaptured ? "Show all" : "Show only caught Pokémon"}
        >
          <svg
            className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${
              showCaptured ? "text-red-500" : "text-gray-400"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
        </button>

        {/* Reset */}
        <button
          className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-gray-500 border border-gray-300 duration-300 hover:bg-red-200 hover:border-red-300 hover:text-red-950"
          onClick={() => {
            resetAll();
            if (onResetFilters) onResetFilters();
          }}
          title="Reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
