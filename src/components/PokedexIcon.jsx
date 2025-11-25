// PokedexIcon.jsx — replaced SVG with project asset image
import React, { useState } from "react";
import pokeball from "../assets/ce30463b8da710923be366d5114de468-removebg-preview.webp";

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
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={style}
      aria-hidden={false}
    >
      <img
        src={pokeball}
        alt={alt}
        className={className}
        style={{ display: "block" }}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
