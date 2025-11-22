import { useState, useEffect, useRef } from "react";
import TypeTag from "./TypeTag";
import { TYPE_OPTIONS } from "../constants/pokemonTypes";
import { useSearchParams } from "react-router-dom";

export default function SearchFilters({ onSelectType }) {
  const [open, setOpen] = useState(false); // apre/chiude dropdown
  const [selectedType, setSelectedType] = useState(null); // tipo attivo

  const dropdownRef = useRef(null);

  // Hook router → leggiamo e aggiorniamo query params
  const [searchParams, setSearchParams] = useSearchParams();

  // Ogni volta che cambia il parametro "type" nell'URL, aggiorniamo il filtro
  useEffect(() => {
    const urlType = searchParams.get("type") || null;
    setSelectedType(urlType);
    if (onSelectType) onSelectType(urlType);
  }, [searchParams, onSelectType]);

  // Chiudi dropdown cliccando fuori
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quando l’utente seleziona un tipo
  const handleSelect = (type) => {
    if (!type) {
      searchParams.delete("type"); // rimuovi filtro
      setSearchParams(searchParams); // aggiorna URL
      setSelectedType(null);
    } else {
      searchParams.set("type", type); // imposta filtro
      setSearchParams(searchParams); // aggiorna URL
      setSelectedType(type);
    }

    setOpen(false); // chiudi dropdown
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* Pulsante principale: input-like */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center gap-2 px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          open ? "ring-2 ring-blue-500 border-blue-500" : ""
        }`}
        style={{ minHeight: "48px" }}
      >
        {selectedType ? (
          <TypeTag type={selectedType} />
        ) : (
          <span className="text-gray-500">Tutti i tipi</span>
        )}
        <span className="flex-1" />
        <svg
          className={`w-5 h-5 text-gray-400 absolute right-4 pointer-events-none transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown tipi */}
      {open && (
        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
          {/* Opzione "Tutti" */}
          <li
            className="cursor-pointer px-4 py-3 hover:bg-blue-50 text-gray-900 rounded-t-lg"
            onMouseDown={() => handleSelect(null)}
          >
            <span className="text-gray-700">Tutti i tipi</span>
          </li>
          <hr className="my-1" />
          {/* Lista tipi */}
          {TYPE_OPTIONS.map((type, idx) => (
            <li
              key={type}
              className={`cursor-pointer px-4 py-3 hover:bg-blue-50 flex items-center text-gray-900 ${
                idx === TYPE_OPTIONS.length - 1 ? "rounded-b-lg" : ""
              }`}
              onMouseDown={() => handleSelect(type)}
            >
              <TypeTag type={type} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
