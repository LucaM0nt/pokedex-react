import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLogged, logout } from "../../store/userSlice";
import siteRoutes from "../../siteRoutes";

import HamburgerButton from "./HamburgerButton";
import NavbarLink from "./NavbarLink";
import NavbarSubmenu from "./NavbarSubmenu";
import MobileMenu from "./MobileMenu";

export default function Navbar({ className, headerHeight }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector(selectIsLogged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
              <NavbarLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </NavbarLink>
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
                  className="text-red-400 text-lg px-3 pb-7 md:pb-0 hover:text-red-300 transition-colors duration-300"
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
