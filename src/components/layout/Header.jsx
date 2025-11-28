import Navbar from "./Navbar/Navbar";
import PokedexIcon from "../pokedex/PokedexIcon";
import { useRef, useEffect, useState } from "react";

/**
 * Header
 * Measures its own height and passes it to the Navbar so mobile drawers/layout
 * can align correctly. Listens to window resize to keep the value in sync.
 */
function Header() {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Track header height for responsive Navbar spacing/positioning
    function updateHeight() {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    // High z-index to sit above the mobile menu/backdrop layers
    <header ref={headerRef} className="w-full z-50 bg-gray-800">
      <div className="container mx-auto py-1 px-3 flex items-center justify-between">
        {/** Logo button (acts as a visual anchor; navigation can be wired later) */}
        <button className="cursor-pointer focus:outline-none w-12 h-12 overflow-hidden rounded">
          <PokedexIcon className="w-full h-full object-contain" />
        </button>
        <Navbar headerHeight={headerHeight} className="ml-auto" />
      </div>
    </header>
  );
}

export default Header;
