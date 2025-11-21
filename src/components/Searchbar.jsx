import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

export default function Searchbar({ onSelectPokemon, onSearch }) {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef(null);

  const allPokemon = useSelector((state) => state.userLists.fullList);

  // Debounce: update searchTerm after 200ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(input);
    }, 200);
    return () => clearTimeout(timeout);
  }, [input]);

  // Suggestions based on input
  const suggestions = useMemo(() => {
    if (!input) return [];
    return allPokemon
      .filter((p) => {
        const id = Number(p.url.replace(/\/$/, "").split("/").pop());
        return (
          p.name.startsWith(input.toLowerCase()) &&
          !p.name.toLowerCase().includes("-mega") &&
          id <= 10000
        );
      })
      .slice(0, 10);
  }, [input, allPokemon]);

  const handleSelect = (pokemon) => {
    setInput(pokemon.name);
    setSearchTerm(pokemon.name);
    const id = Number(pokemon.url.split("/").slice(-2)[0]);
    onSearch(pokemon.name); // Submit the search
    onSelectPokemon(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Submit on enter or button
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Cerca un Pokémon..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
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
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
          {suggestions.map((s) => (
            <li
              key={s.name}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer capitalize text-gray-900"
              onClick={() => handleSelect(s)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
