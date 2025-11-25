import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsLogged, selectUsername, logout } from "../store/userSlice";
import LoginModal from "../components/LoginModal";

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const isLogged = useSelector(selectIsLogged);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Se l'utente è su /login ma è già loggato, reindirizza a /user
  useEffect(() => {
    if (isLogged && location.pathname === "/login") {
      navigate("/user", { replace: true });
    }
  }, [isLogged, location.pathname, navigate]);

  // Apri la modale automaticamente se l'utente non è loggato e su /login
  useEffect(() => {
    if (!isLogged && location.pathname === "/login") {
      setShowModal(true);
    }
  }, [isLogged, location.pathname]);

  if (!isLogged) {
    return (
      <LoginModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/");
        }}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-300 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Ciao, {username}!
          </h1>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Benvenuto nella tua area personale del Pokédex.
          </p>
          <p className="text-gray-600">
            Da qui puoi gestire i tuoi Pokémon preferiti e catturati.
          </p>
        </div>
      </div>
    </div>
  );
}
