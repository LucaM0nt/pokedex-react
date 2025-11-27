import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LoginModal from "../components/auth/LoginModal";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginModalOpen,
  closeLoginModal,
  login,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isLoginOpen = useSelector(selectLoginModalOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col ${
        isHome ? "h-screen" : "min-h-screen"
      } overflow-x-hidden`}
    >
      <Header />

      <main className={`flex-1 container mx-auto ${isHome ? "min-h-0" : ""}`}>
        {/* On homepage: main fills remaining space; inner section scrolls. Others: natural height. */}
        <section className={isHome ? "h-full overflow-auto" : ""}>
          <Outlet />
        </section>
      </main>

      {/* Global Login Modal overlay */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => dispatch(closeLoginModal())}
        onConfirm={(username) => {
          dispatch(login({ username }));
          dispatch(closeLoginModal());
          navigate("/user");
        }}
      />

      <Footer />
    </div>
  );
}
