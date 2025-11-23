import { useState, useEffect, useRef } from "react";
import TypeTag from "./TypeTag";
import { TYPE_OPTIONS } from "../constants/pokemonTypes";
import { GEN_OPTIONS } from "../constants/pokemonGenerations";
import { useSearchParams } from "react-router-dom";

export default function SearchFilters({
  onSelectType,
  onSelectGen,
  onResetFilters,
}) {
  const dropdownRef = useRef(null);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openGenDropdown, setOpenGenDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGen, setSelectedGen] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlType = searchParams.get("type") || null;
    const urlGen = searchParams.get("gen") || null;
    setSelectedType(urlType);
    // urlGen può essere stringa, converti in numero se possibile
    const genId = urlGen ? Number(urlGen) : null;
    setSelectedGen(genId);
    if (onSelectType) onSelectType(urlType);
    if (onSelectGen) onSelectGen(genId);
  }, [searchParams, onSelectType, onSelectGen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenTypeDropdown(false);
        setOpenGenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectType = (type) => {
    if (!type) {
      searchParams.delete("type");
      setSelectedType(null);
    } else {
      searchParams.set("type", type);
      setSelectedType(type);
    }
    setSearchParams(searchParams);
    setOpenTypeDropdown(false);
  };

  const handleSelectGen = (genId) => {
    if (!genId) {
      searchParams.delete("gen");
      setSelectedGen(null);
    } else {
      searchParams.set("gen", genId);
      setSelectedGen(genId);
    }
    setSearchParams(searchParams);
    setOpenGenDropdown(false);
  };

  return (
    <div className="flex items-center gap-2 w-full" ref={dropdownRef}>
      {/* Dropdown Tipo */}
      <div className="relative w-36">
        <button
          type="button"
          onClick={() => {
            setOpenTypeDropdown((prev) => !prev);
            setOpenGenDropdown(false);
          }}
          className="w-full flex items-center gap-2 px-2 py-2 pr-7 bg-white text-gray-900 text-sm min-h-0 h-10"
        >
          {selectedType ? (
            <TypeTag type={selectedType} />
          ) : (
            <span className="text-gray-500">Tutti i tipi</span>
          )}
          <span className="flex-1" />
          <svg
            className={`w-4 h-4 text-gray-400 absolute right-2 transition-transform ${
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
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1 text-sm">
            <li
              className="cursor-pointer px-3 py-2 hover:bg-blue-50"
              onMouseDown={() => handleSelectType(null)}
            >
              <span className="text-gray-700">Tutti i tipi</span>
            </li>
            <hr className="my-1" />
            {TYPE_OPTIONS.map((type) => (
              <li
                key={type}
                className="cursor-pointer px-3 py-2 hover:bg-blue-50 flex items-center"
                onMouseDown={() => handleSelectType(type)}
              >
                <TypeTag type={type} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dropdown Generazione */}
      <div className="relative min-w-[170px] w-48">
        <button
          type="button"
          onClick={() => {
            setOpenGenDropdown((prev) => !prev);
            setOpenTypeDropdown(false);
          }}
          className="w-full flex items-center gap-2 px-2 py-2 pr-7 bg-white text-gray-900 text-sm min-h-0 h-10"
        >
          {selectedGen ? (
            <span>
              {GEN_OPTIONS.find((g) => g.id === selectedGen)?.label ||
                selectedGen}
            </span>
          ) : (
            <span className="text-gray-500">Tutte le generazioni</span>
          )}
          <span className="flex-1" />
          <svg
            className={`w-4 h-4 text-gray-400 absolute right-2 transition-transform ${
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
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1 text-sm">
            <li
              className="cursor-pointer px-3 py-2 hover:bg-blue-50"
              onMouseDown={() => handleSelectGen(null)}
            >
              <span className="text-gray-700">Tutte le generazioni</span>
            </li>
            <hr className="my-1" />
            {GEN_OPTIONS.map((gen) => (
              <li
                key={gen.id}
                className="cursor-pointer px-3 py-2 hover:bg-blue-50"
                onMouseDown={() => handleSelectGen(gen.id)}
              >
                {gen.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Icona Preferiti */}
      <button className="cursor-pointer focus:outline-none">
        <svg
          className={`w-7 h-7 text-gray-400 fill-current
          `}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>

      {/* Icona Catturati */}
      <button className="cursor-pointer focus:outline-none">
        <svg
          className={`w-7 h-7 text-gray-400`}
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

      {/* Reset Filtri */}
      <button
        className="ml-auto px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 border border-gray-300"
        onClick={() => {
          setSearchParams({});
          setSelectedType(null);
          setSelectedGen(null);
          if (onResetFilters) onResetFilters();
        }}
        title="Reset filtri"
      >
        Reset filtri
      </button>
    </div>
  );
}
