import Footer from "../Footer";
import siteRoutes from "../../siteRoutes";

export default function MobileMenu({ isOpen, headerHeight, children }) {
  const style = isOpen
    ? { height: `calc(101vh - ${headerHeight}px)` }
    : undefined;

  return (
    <div
      style={style}
      className={`flex flex-col md:flex md:flex-row md:items-center gap-1 md:gap-4 font-semibold
        absolute md:static bg-gray-800 md:bg-transparent w-70 -left-55 md:left-0 px-10 md:w-auto transition-all duration-300
        ${
          isOpen
            ? "max-h-auto md:max-h-1 py-8 mt-3"
            : "max-h-0 overflow-hidden md:max-h-full md:py-0"
        }`}
    >
      {/* Use flex-col + justify-between to push footer to bottom */}
      <div className="flex flex-col justify-between h-full md:h-auto w-full md:w-auto">
        {/* Links */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          {children}
        </div>

        {/* Footer (only appears inside mobile menu) */}
        <div className="md:hidden">
          <Footer mode="mobile" />
        </div>
      </div>
    </div>
  );
}
