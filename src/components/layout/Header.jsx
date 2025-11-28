import Navbar from "./Navbar/Navbar";
import PokedexIcon from "../pokedex/PokedexIcon";

/**
 * Header
 * Static header with logo and Navbar. Height is no longer measured/passed
 * downstream; mobile drawer spacing is handled locally.
 */
function Header() {
  return (
    // High z-index to sit above the mobile menu/backdrop layers
    <header className="w-full z-50 bg-gray-800">
      <div className="container mx-auto py-1 px-3 flex items-center justify-between">
        {/** Logo button (acts as a visual anchor; navigation can be wired later) */}
        <button className="cursor-pointer focus:outline-none w-12 h-12 overflow-hidden rounded">
          <PokedexIcon className="w-full h-full object-contain" />
        </button>
        <Navbar className="ml-auto" />
      </div>
    </header>
  );
}

export default Header;
