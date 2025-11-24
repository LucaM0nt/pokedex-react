import { useState } from "react";
import siteRoutes from "../../siteRoutes";

import HamburgerButton from "./HamburgerButton";
import NavbarLink from "./NavbarLink";
import NavbarSubmenu from "./NavbarSubmenu";
import MobileMenu from "./MobileMenu";

export default function Navbar({ className, headerHeight }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`relative ${className}`}>
      <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Mobile menu */}
      <MobileMenu isOpen={isOpen} headerHeight={headerHeight}>
        <div className="flex flex-col md:flex-row gap-3">
          {siteRoutes[0].children.map((el) => {
            if (!el.showInNav) return null;

            return (
              <div key={el.path} className="relative">
                <NavbarLink to={el.path} onClick={() => setIsOpen(false)}>
                  {el.title}
                </NavbarLink>

                {el.children?.length > 0 && (
                  <NavbarSubmenu children={el.children} />
                )}
              </div>
            );
          })}
        </div>
      </MobileMenu>
    </nav>
  );
}
