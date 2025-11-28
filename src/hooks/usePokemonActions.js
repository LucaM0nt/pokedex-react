import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  toggleCapture,
  isFavorite,
  isCaptured,
} from "../store/userSlice";

/**
 * usePokemonActions
 * Manages favorite and capture actions for a specific Pokémon.
 * @param {number} pokemonId - Pokémon ID
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
