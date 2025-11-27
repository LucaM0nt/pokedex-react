import Footer from "../Footer";
import siteRoutes from "../../../siteRoutes";

export default function MobileMenu({ isOpen, headerHeight, children }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out md:static md:transform-none md:w-auto md:h-auto md:bg-transparent md:shadow-none z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full pt-20 pb-6 px-6 md:pt-0 md:pb-0 md:px-0 md:flex-row md:items-center md:gap-4">
          {/* Links */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
            {children}
          </div>

          {/* Footer (only appears inside mobile menu) */}
          <div className="mt-auto pt-8 border-t border-gray-700 md:hidden">
            <Footer mode="mobile" />
          </div>
        </div>
      </div>
    </>
  );
}
