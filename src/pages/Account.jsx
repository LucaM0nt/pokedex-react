import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectListById,
  removeFavorite,
  removeCapture,
} from "../store/userSlice";
import LoginModal from "../components/LoginModal";
import useAuth from "../hooks/useAuth";
import IconGrid from "../components/IconGrid.jsx";
import TrainerCard from "../components/TrainerCard.jsx";

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const { isLogged, username } = useAuth();
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

  return <TrainerDashboard username={username} />;
}

function TrainerDashboard({ username }) {
  const dispatch = useDispatch();
  const favoritesById = useSelector((state) =>
    selectListById(state, "favorites")
  );
  const capturesById = useSelector((state) =>
    selectListById(state, "captures")
  );

  const favoriteIds = Object.keys(favoritesById || {})
    .map((x) => Number(x))
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  const capturedIds = Object.keys(capturesById || {})
    .map((x) => Number(x))
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  const handleRemoveCapture = (id) => {
    dispatch(removeCapture(id));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Trainer Card */}
        <TrainerCard username={username} />

        {/* Favorites Grid */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Favorite Pokémon
            </h2>
            <p className="text-sm text-gray-500">Total: {favoriteIds.length}</p>
          </div>
          <IconGrid
            ids={favoriteIds}
            emptyLabel="No favorites yet"
            onRemove={handleRemoveFavorite}
          />
        </div>

        {/* Captured Grid */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Caught Pokémon
            </h2>
            <p className="text-sm text-gray-500">Total: {capturedIds.length}</p>
          </div>
          <IconGrid
            ids={capturedIds}
            emptyLabel="No caught Pokémon yet"
            onRemove={handleRemoveCapture}
          />
        </div>
      </div>
    </div>
  );
}
