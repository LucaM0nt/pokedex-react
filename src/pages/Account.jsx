import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  selectIsLogged,
  selectUsername,
  selectListById,
} from "../store/userSlice";
import LoginModal from "../components/LoginModal";

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const isLogged = useSelector(selectIsLogged);
  const username = useSelector(selectUsername);
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

  const initials = (username || "U").slice(0, 1).toUpperCase();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Trainer Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {username}
              </h1>
              <p className="text-gray-600">Ace Trainer • Kanto Region</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Trainer ID</p>
              <p className="font-semibold text-gray-800">#123456</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Lv.</p>
              <p className="font-semibold">45</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Badges</p>
              <p className="font-semibold">8</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Since</p>
              <p className="font-semibold">2025</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-gray-500">Favorite Type</p>
              <p className="font-semibold">Electric</p>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Favorite Pokémon
            </h2>
            <p className="text-sm text-gray-500">
              {favoriteIds.length}
            </p>
          </div>
          <IconGrid ids={favoriteIds} emptyLabel="No favorites yet" />
        </div>

        {/* Captured Grid */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Caught Pokémon
            </h2>
            <p className="text-sm text-gray-500">
              {capturedIds.length}
            </p>
          </div>
          <IconGrid ids={capturedIds} emptyLabel="No caught Pokémon yet" />
        </div>
      </div>
    </div>
  );
}

function IconGrid({ ids, emptyLabel }) {
  if (!ids || ids.length === 0) {
    return <p className="text-gray-500 text-sm">{emptyLabel}</p>;
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
      {ids.map((id) => (
        <Link key={id} to={`/entry/${id}`} className="group block">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-2 w-20 h-20 mx-auto flex items-center justify-center hover:shadow transition-shadow">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={`#${id}`}
              className="w-14 h-14 image-render-pixel"
              loading="lazy"
            />
          </div>
          <p className="mt-1 text-center text-xs text-gray-600 group-hover:text-gray-800">
            #{id}
          </p>
        </Link>
      ))}
    </div>
  );
}
