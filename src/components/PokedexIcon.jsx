// PokedexIcon.jsx — replaced SVG with project asset image
import React, { useState } from "react";
import { Link } from "react-router-dom";
import pokeball from "../assets/Pokeball_logo.webp";

export default function PokedexIcon({ className = "", alt = "Pokedex" }) {
  const [hover, setHover] = useState(false);

  const style = {
    transform: `rotate(-20deg) scale(${hover ? 1.12 : 1})`,
    transition: "transform 180ms ease",
    display: "inline-block",
    willChange: "transform",
    transformOrigin: "50% 50%",
  };

  return (
    <Link
      to="/"
      aria-label="Homepage"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={style}
      className="inline-block"
    >
      <img
        src={pokeball}
        alt={alt}
        className={className}
        style={{ display: "block" }}
        loading="lazy"
        draggable={false}
      />
    </Link>
  );
}
