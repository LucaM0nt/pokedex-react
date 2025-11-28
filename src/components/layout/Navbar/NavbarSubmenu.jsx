import { NavLink } from "react-router-dom";

/**
 * NavbarSubmenu
 * Renders a responsive dropdown containing the child routes of a navbar item.
 * - Mobile: shown inline
 * - Desktop: shown as an absolute dropdown under the parent link
 * Clicking a submenu link triggers onLinkClick (usually closes mobile nav).
 *
 * NOTE: Currently unused - no routes have nested children.
 * Kept for future app expansion when nested navigation is needed.
 */
export default function NavbarSubmenu({ items, onLinkClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center relative">
      {/* Dropdown submenu - positioned absolutely on desktop */}
      {items && items.length > 0 && (
        <div
          className={`
      flex flex-col md:absolute top-full md:right-0 md:left-auto
      bg-gray-700 rounded-lg shadow-md
      ml-0 md:ml-0 w-40
    `}
        >
          {items.map((sub) => (
            <NavLink
              key={sub.path}
              to={sub.path}
              className="text-slate-200 px-3 py-2 hover:text-white hover:bg-gray-600 rounded-md"
              onClick={onLinkClick}
            >
              {sub.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
