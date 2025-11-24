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
    <header ref={headerRef}
		className="fixed top-0 left-0 right-0 z-50 bg-gray-800">
      <div className="container mx-auto py-3 px-3 flex items-center justify-between">
        <button className="cursor-pointer focus:outline-none">
          <PokedexIcon className="w-12 h-12" />
        </button>
        <Navbar headerHeight={headerHeight} className="ml-auto" />
      </div>
    </header>
  );
}

export default Header;
