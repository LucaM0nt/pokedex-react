import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  toggleCapture,
  isFavorite,
  isCaptured,
} from "../store/userSlice";

/**
 * Custom hook per gestire le azioni di favorite e capture su un Pokémon
 * @param {number} pokemonId - ID del Pokémon
 * @returns {Object} - { isFavorite, isCaptured, toggleFavorite, toggleCapture }
 */
export default function usePokemonActions(pokemonId) {
  const dispatch = useDispatch();

  const fav = useSelector((state) => isFavorite(state.user, pokemonId));
  const cap = useSelector((state) => isCaptured(state.user, pokemonId));

  const handleToggleFavorite = () => dispatch(toggleFavorite(pokemonId));
  const handleToggleCapture = () => dispatch(toggleCapture(pokemonId));

  return {
    isFavorite: fav,
    isCaptured: cap,
    toggleFavorite: handleToggleFavorite,
    toggleCapture: handleToggleCapture,
  };
}
