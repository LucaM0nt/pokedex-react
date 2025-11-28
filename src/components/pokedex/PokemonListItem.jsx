import { Link, useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../../store/pokeApiSlice";
import { store } from "../../store/index.js";
import usePokemonActions from "../../hooks/usePokemonActions";

import TypeTag from "../common/TypeTag";
import FallbackImage from "../common/FallbackImage.jsx";
import Alert from "../common/Alert.jsx";
import PokemonActions from "../pokedex-entry/PokemonActions.jsx";

function PokemonListItem({ pkmnId, onHover }) {
  const { data, error, isLoading } = useGetPokemonQuery(pkmnId);
  const navigate = useNavigate();
  const {
    isFavorite: fav,
    isCaptured: cap,
    toggleFavorite,
    toggleCapture,
  } = usePokemonActions(pkmnId);

  if (isLoading) {
    return (
      <li>
        <Alert type="info" message="Loading..." />
      </li>
    );
  }

  if (error) {
    const message =
      typeof error === "string"
        ? error
        : error?.status
        ? `Error loading Pokémon (HTTP ${error.status}).`
        : "Network error loading Pokémon.";
    return (
      <li>
        <Alert type="error" message={message} />
      </li>
    );
  }
  if (!data) {
    return (
      <li>
        <Alert type="info" message="No data found." />
      </li>
    );
  }
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite();
    const lists = store.getState().user;
  };

  const handleToggleCapture = (e) => {
    e.stopPropagation();
    toggleCapture();
    const lists = store.getState().user;
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
      className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex items-center gap-2 sm:gap-4 justify-between cursor-pointer"
      onMouseEnter={() => onHover(pkmnId)}
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Open details for ${data.name}`}
    >
      <div className="flex items-center gap-2 sm:gap-4 group min-w-0">
        <FallbackImage
          type="sprite"
          src={data.sprites.other.home.front_default}
          alt={data.name}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain group-hover:scale-105 transition-transform shrink-0"
        />
        <div className="min-w-0">
          <h3 className="font-bold text-sm sm:text-lg capitalize text-gray-800 group-hover:text-blue-600 transition-colors truncate">
            #{data.id} {data.name}
          </h3>
          <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2 flex-wrap">
            {data.types?.map((typeObj) => (
              <TypeTag key={typeObj.type.name} type={typeObj.type.name} />
            ))}
          </div>
        </div>
      </div>

      <PokemonActions
        fav={fav}
        cap={cap}
        onToggleFavorite={handleToggleFavorite}
        onToggleCapture={handleToggleCapture}
        favoriteOnLabel="Remove from favorites"
        favoriteOffLabel="Add to favorites"
        captureOnLabel="Remove from captured"
        captureOffLabel="Add to captured"
        className="pr-4 md:gap-4 shrink-0"
      />
    </li>
  );
}

export default PokemonListItem;
