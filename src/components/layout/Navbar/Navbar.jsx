import { useState } from "react";
import siteRoutes from "../../../siteRoutes";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../../store/userSlice";

import HamburgerButton from "./HamburgerButton";
import NavbarLink from "./NavbarLink";
import NavbarSubmenu from "./NavbarSubmenu";
import MobileMenu from "./MobileMenu";

export default function Navbar({ className, headerHeight }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, logout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className={`relative ${className}`}>
      <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Mobile menu */}
      <MobileMenu isOpen={isOpen} headerHeight={headerHeight}>
        <div className="flex flex-col md:flex-row gap-3">
          {siteRoutes[0].children.map((el) => {
            // Skip conditional items (login/user)
            if (el.showInNav === "conditional") return null;
            if (!el.showInNav) return null;

            const linkPath = el.path || "/"; // fallback for index route

            return (
              <div key={linkPath} className="relative">
                <NavbarLink to={linkPath} onClick={() => setIsOpen(false)}>
                  {el.title}
                </NavbarLink>

                {el.children?.length > 0 && (
                  <NavbarSubmenu children={el.children} />
                )}
              </div>
            );
          })}

          {/* Conditional rendering based on login state */}
          {!isLogged ? (
            <div key="login" className="relative">
              <button
                onClick={() => {
                  dispatch(openLoginModal());
                  setIsOpen(false);
                }}
                className="text-white text-lg md:text-base px-3 py-2 md:py-0 rounded-lg md:rounded-none hover:text-blue-400 hover:bg-gray-800/30 md:hover:bg-transparent transition-all duration-300 cursor-pointer w-full text-left md:w-auto md:text-center block md:inline-block"
              >
                Login
              </button>
            </div>
          ) : (
            <>
              <div key="user" className="relative">
                <NavbarLink to="/user" onClick={() => setIsOpen(false)}>
                  User
                </NavbarLink>
              </div>
              <div key="logout" className="relative">
                <button
                  onClick={handleLogout}
                  className="text-red-400 text-lg md:text-base px-3 py-2 md:py-0 rounded-lg md:rounded-none hover:text-red-300 hover:bg-gray-800/30 md:hover:bg-transparent transition-all duration-300 cursor-pointer w-full text-left md:w-auto md:text-center block md:inline-block"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </MobileMenu>
    </nav>
  );
}
