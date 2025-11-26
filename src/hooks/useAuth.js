import { useDispatch, useSelector } from "react-redux";
import { selectIsLogged, selectUsername, logout } from "../store/userSlice";

/**
 * Custom hook per gestire lo stato di autenticazione dell'utente
 * @returns {Object} - { isLogged, username, logout }
 */
export default function useAuth() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const username = useSelector(selectUsername);

  const handleLogout = () => dispatch(logout());

  return {
    isLogged,
    username,
    logout: handleLogout,
  };
}
