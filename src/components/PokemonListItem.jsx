import { useDispatch, useSelector } from "react-redux";

import { useGetPokemonQuery } from "../store/pokeApiSlice";
import { store } from "../store/index.js";
import { toggleFavorite, toggleCapture, isFavorite, isCaptured } from "../store/userListsSlice";

import TypeTag from "./TypeTag";

function PokemonListItem({ pkmnId }) {
  const { data, error, isLoading } = useGetPokemonQuery(pkmnId);
  const dispatch = useDispatch();
  const fav = useSelector((state) => isFavorite(state.userLists, pkmnId));
  const cap = useSelector((state) => isCaptured(state.userLists, pkmnId));

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
        Errore nel caricamento
      </li>
    );
  }

  if (!data) {
    return (
      <li className="p-3 bg-white rounded-lg shadow">Nessun dato trovato</li>
    );
  }
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(pkmnId));
    const lists = store.getState().userLists;
    console.log("favoritesById:", lists.favorites.byId);
  };

  const handleToggleCapture = () => {
    dispatch(toggleCapture(pkmnId));
    const lists = store.getState().userLists;
    console.log("capturesById:", lists.captures.byId);
  };

  return (
    <li className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        <img
          src={data.sprites.other.dream_world.front_default}
          alt={data.name}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h3 className="font-bold text-lg capitalize">
            #{data.id} {data.name}
          </h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            {data.types?.map((typeObj) => (
              <TypeTag key={typeObj.type.name} type={typeObj.type.name} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={!!fav}
            onChange={handleToggleFavorite}
          />
          <span className="text-sm">Favorite</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            checked={!!cap}
            onChange={handleToggleCapture}
          />
          <span className="text-sm">Captured</span>
        </label>
      </div>
    </li>
  );
}

export default PokemonListItem;
