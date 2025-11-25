import { NavLink } from "react-router-dom";

export default function NavbarSubmenu({ children }) {
  return (
    <div
      key={children.path}
      className="flex flex-col md:flex-row md:items-center relative"
    >
      {/* Sottomenu */}
      {children && children.length > 0 && (
        <div
          className={`
      flex flex-col md:absolute top-full md:right-0 md:left-auto
      bg-gray-700 rounded-lg shadow-md
      ml-0 md:ml-0 w-40
    `}
        >
          {children.map((sub) => (
            <NavLink
              key={sub.path}
              to={sub.path}
              className="text-slate-200 px-3 py-2 hover:text-white hover:bg-gray-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {sub.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
