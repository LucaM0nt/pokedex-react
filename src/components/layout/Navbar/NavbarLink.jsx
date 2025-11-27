import { NavLink } from "react-router-dom";

export default function NavbarLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-lg md:text-base px-3 py-2 md:py-0 rounded-lg md:rounded-none transition-all duration-300 block md:inline-block ${
          isActive
            ? "text-yellow-400 bg-gray-800/50 md:bg-transparent"
            : "text-slate-200 hover:text-yellow-400 hover:bg-gray-800/30 md:hover:bg-transparent"
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}
