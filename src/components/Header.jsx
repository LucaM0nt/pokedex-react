import Navbar from "./Navbar/Navbar";
import PokedexIcon from "./PokedexIcon";
import { useRef, useEffect, useState } from "react";

function Header() {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
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
    <header ref={headerRef} className="w-full z-50 bg-gray-800">
      <div className="container mx-auto py-1 px-3 flex items-center justify-between">
        <button className="cursor-pointer focus:outline-none w-12 h-12 overflow-hidden rounded">
          <PokedexIcon className="w-full h-full object-contain" />
        </button>
        <Navbar headerHeight={headerHeight} className="ml-auto" />
      </div>
    </header>
  );
}

export default Header;
