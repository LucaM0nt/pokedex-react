import { NavLink } from "react-router-dom";

export default function NavbarLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-lg px-3 pb-7 md:pb-0 transition-colors duration-300 ${
          isActive
            ? "text-yellow-400"
            : "text-slate-200 hover:text-yellow-400"
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}
