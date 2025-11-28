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
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

/**
 * Account
 * Trainer profile page accessible at /user (when logged in) or /login (prompts login modal)
 * 
 * Behavior:
 * - /login: Opens login modal; redirects to /user after login
 * - /user: Shows trainer dashboard with favorites/captures if logged in
 * - Auto-redirects logged-in users from /login → /user
 * - Shows login prompt for non-authenticated users
 * 
 * Components:
 * - TrainerCard: Displays trainer info, badges, level, region, favorite type
 * - IconGrid: Shows Pokémon sprites with remove buttons on hover
 */
export default function Account() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // Local modal state (separate from Redux)
  const { isLogged, username } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // If user is logged in but on /login, redirect to /user
  useEffect(() => {
    if (isLogged && location.pathname === "/login") {
      navigate("/user", { replace: true });
    }
  }, [isLogged, location.pathname, navigate]);

  // Auto-open modal if user is not logged in and on /login
  useEffect(() => {
    if (!isLogged && location.pathname === "/login") {
      setShowModal(true);
    }
  }, [isLogged, location.pathname]);

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal());
  };

  // Not logged in: show modal + empty state with login prompt
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
        <EmptyState
          marginTop={true}
          icon="🔒"
          title="TRAINER ACCESS REQUIRED"
          message={
            <>
              <p className="text-lg font-medium">
                You need to log in to access your trainer profile!
              </p>
              <p className="text-sm text-gray-600">
                Login to view your favorite Pokémon, caught collection, and
                customize your trainer card.
              </p>
            </>
          }
          actions={
            <>
              <Button onClick={handleOpenLoginModal}>Login</Button>
              <Button variant="secondary" onClick={() => navigate("/")}>
                Return to Pokédex
              </Button>
            </>
          }
        />
      </>
    );
  }

  // Logged in: render trainer dashboard
  return <TrainerDashboard username={username} />;
}

/**
 * TrainerDashboard
 * Displays trainer card and two grids (favorites + captures) with remove functionality.
 * 
 * Data flow:
 * - Reads favorites/captures from Redux (stored as { byId: { "1": true, "25": true } })
 * - Converts string keys to sorted numeric IDs for rendering
 * - Dispatches remove actions to update Redux store (auto-persists to localStorage)
 */
function TrainerDashboard({ username }) {
  const dispatch = useDispatch();
  const favoritesById = useSelector((state) =>
    selectListById(state, "favorites")
  );
  const capturesById = useSelector((state) =>
    selectListById(state, "captures")
  );

  // Convert byId object keys to sorted numeric arrays for IconGrid
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
        <Card>
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
        </Card>

        {/* Captured Grid */}
        <Card>
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
        </Card>
      </div>
    </div>
  );
}
