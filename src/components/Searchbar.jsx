import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import usePokedexQueryParams from "../hooks/usePokedexQueryParams";

// Utility: estrai l'id dall'url (es: .../pokemon/25/)
function getIdFromUrl(url) {
  if (!url) return null;
  const parts = url.replace(/\/$/, "").split("/");
  return Number(parts[parts.length - 1]);
}

export default function Searchbar({ onSelectPokemon, onSearch }) {
  const { type, gen, favorites, captured, setSearch, apply } =
    usePokedexQueryParams();
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // FIX: niente fallback dentro il selector → nessun warning
  const allPokemon = useSelector((state) => state.user.fullList);
  const pokemonList = allPokemon ?? []; // fallback sicuro fuori dal selector

  const query = input.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!query) return [];

    return pokemonList
      .filter((p) => {
        const name = (p.name || "").toLowerCase();
        const id = getIdFromUrl(p.url);

        return (
          name.startsWith(query) &&
          !name.includes("-mega") &&
          Number.isFinite(id) &&
          id <= 10000
        );
      })
      .slice(0, 10);
  }, [query, pokemonList]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  const handleSelect = useCallback(
    (pokemon) => {
      if (!pokemon) return;
      setInput(pokemon.name);
      setIsFocused(false);

      const id = getIdFromUrl(pokemon.url);
      // Aggiorna URL params usando il custom hook, preservando type/gen/favorites/captured
      const searchValue = pokemon.name.trim();
      apply({ search: searchValue, type, gen, favorites, captured });
      if (onSearch) onSearch(searchValue);
      if (onSelectPokemon && Number.isFinite(id)) onSelectPokemon(id);
    },
    [onSearch, onSelectPokemon, apply, type, gen, favorites, captured]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = input.trim();
    // Aggiorna 'search' preservando gli altri parametri via hook
    setSearch(searchValue);
    if (onSearch) onSearch(searchValue);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((idx) => Math.min(idx + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((idx) => Math.max(idx - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          id="search"
          name="search"
          ref={inputRef}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Search Pokémon..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={isFocused && suggestions.length > 0}
          aria-haspopup="listbox"
          autoComplete="off"
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          role="listbox"
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1"
        >
          {suggestions.map((s, idx) => (
            <li
              key={s.name}
              role="option"
              aria-selected={activeIndex === idx}
              onMouseDown={() => handleSelect(s)}
              className={`px-4 py-2 cursor-pointer capitalize text-gray-900 hover:bg-blue-50 ${
                activeIndex === idx ? "bg-blue-100" : ""
              }`}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
