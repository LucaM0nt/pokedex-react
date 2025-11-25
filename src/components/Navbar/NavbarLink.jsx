import { NavLink } from "react-router-dom";

export default function NavbarLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      className="text-slate-200 text-lg px-3 pb-7 md:pb-0 
                 hover:text-yellow-400 transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}
