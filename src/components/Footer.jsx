import { Link } from "react-router-dom";

export default function Footer({ mode = "desktop" }) {
  // mode: "desktop" | "mobile"

  return (
    <footer
      className={`bg-gray-800 z-40 ${
        mode === "desktop"
          ? "hidden md:block text-center py-2"
          : "block md:hidden"
      }`}
    >
      <div className=" text-slate-400">
        <p className="pb-1.5">
          All Pokémon and their information are the property of The Pokémon
          Company.
        </p>
        <a href="/privacy-policy.html" className="text-yellow-400">
          Privacy Policy
        </a>{" "}
        -{" "}
        <a href="/terms-of-service.html" className="text-yellow-400">
          Terms of Service
        </a>{" "}
        -{" "}
        <Link to="/about" className="text-yellow-400">
          About Us
        </Link>
      </div>
    </footer>
  );
}
