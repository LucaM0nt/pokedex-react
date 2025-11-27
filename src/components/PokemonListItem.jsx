import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../store/pokeApiSlice";
import { store } from "../store/index.js";
import {
  toggleFavorite,
  toggleCapture,
  isFavorite,
  isCaptured,
} from "../store/userSlice";

import TypeTag from "./TypeTag";
import FallbackImage from "./FallbackImage.jsx";

function PokemonListItem({ pkmnId, onHover }) {
  const { data, error, isLoading } = useGetPokemonQuery(pkmnId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fav = useSelector((state) => isFavorite(state.user, pkmnId));
  const cap = useSelector((state) => isCaptured(state.user, pkmnId));

  if (isLoading) {
    return (
      <li className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        Loading...
      </li>
    );
  }

  if (error) {
    return (
      <li className="p-3 bg-white rounded-lg shadow text-red-600">
        Loading error...
      </li>
    );
  }

  if (!data) {
    return (
      <li className="p-3 bg-white rounded-lg shadow">No data available</li>
    );
  }
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(pkmnId));
    const lists = store.getState().userLists;
    console.log("favoritesById:", lists.favorites.byId);
  };

  const handleToggleCapture = (e) => {
    e.stopPropagation();
    dispatch(toggleCapture(pkmnId));
    const lists = store.getState().userLists;
    console.log("capturesById:", lists.captures.byId);
  };

  const handleNavigate = () => {
    navigate(`/entry/${pkmnId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate();
    }
  };

  return (
    <li
      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex items-center gap-4 justify-between cursor-pointer"
      onMouseEnter={() => onHover(pkmnId)}
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Apri dettaglio di ${data.name}`}
    >
      <div className="flex items-center gap-4 group">
        <FallbackImage
          type="sprite"
          src={data.sprites.other.home.front_default}
          alt={data.name}
          className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
        />
        <div>
          <h3 className="font-bold text-lg capitalize text-gray-800 group-hover:text-blue-600 transition-colors">
            #{data.id} {data.name}
          </h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            {data.types?.map((typeObj) => (
              <TypeTag key={typeObj.type.name} type={typeObj.type.name} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleToggleFavorite}
          className="cursor-pointer focus:outline-none"
          aria-label={fav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          <svg
            className={`w-7 h-7 ${
              fav
                ? "text-yellow-500 fill-current"
                : "text-gray-400 fill-current"
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>

        <button
          onClick={handleToggleCapture}
          className="cursor-pointer focus:outline-none"
          aria-label={cap ? "Rimuovi dai catturati" : "Aggiungi ai catturati"}
        >
          <svg
            className={`w-7 h-7 ${cap ? "text-red-500" : "text-gray-400"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <circle cx="12" cy="12" r="3" fill={cap ? "white" : "white"} />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default PokemonListItem;
