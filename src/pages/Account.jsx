import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectListById,
  removeFavorite,
  removeCapture,
  openLoginModal,
} from "../store/userSlice";
import LoginModal from "../components/auth/LoginModal";
import useAuth from "../hooks/useAuth";
import IconGrid from "../components/trainer/IconGrid.jsx";
import TrainerCard from "../components/trainer/TrainerCard.jsx";

export default function Account() {
  const dispatch = useDispatch();
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

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal());
  };

  if (!isLogged) {
    return (
      <>
        <LoginModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            navigate("/");
          }}
        />
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-6 max-w-2xl">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold tracking-wider text-gray-800">
                🔒
              </h1>
              <div className="text-2xl font-semibold tracking-wide text-gray-700">
                TRAINER ACCESS REQUIRED
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-lg border border-gray-300 p-6 shadow-lg">
              <div className="space-y-4">
                <p className="text-lg font-medium">
                  You need to log in to access your trainer profile!
                </p>
                <p className="text-sm text-gray-600">
                  Login to view your favorite Pokémon, caught collection, and
                  customize your trainer card.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={handleOpenLoginModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded transition-colors border border-gray-300 cursor-pointer"
              >
                Return to Pokédex
              </button>
            </div>
          </div>
        </div>
      </>
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
