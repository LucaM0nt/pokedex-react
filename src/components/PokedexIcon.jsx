// PokedexIcon.jsx
export default function PokedexIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1"
    >
      {/* Quadrato rosso */}
      <rect x="2" y="2" width="20" height="20" rx="3" ry="3" fill="#DC0000" />

      {/* Tre pallini in alto a destra */}
      <circle cx="16" cy="4.5" r="0.8" fill="#FF605C" /> {/* rosso */}
      <circle cx="18" cy="4.5" r="0.8" fill="#FFBD44" /> {/* giallo */}
      <circle cx="20" cy="4.5" r="0.8" fill="#00CA4E" /> {/* verde */}

      {/* Linea orizzontale con bordo nero */}
      <line x1="2" y1="12" x2="22" y2="12" stroke="#FFFF" strokeWidth="2" />
      <line x1="2" y1="13" x2="22" y2="13" stroke="#000" strokeWidth="0.6" />
      <line x1="2" y1="11" x2="22" y2="11" stroke="#000" strokeWidth="0.6" />

      {/* Cerchio esterno con bordo nero */}
      <circle cx="12" cy="12" r="6.5" fill="#FFFF" stroke="#000" strokeWidth="0.6" />

      {/* Cerchio centrale con bordo nero */}
      <circle cx="12" cy="12" r="4.5" fill="#00BFFF" stroke="#000" strokeWidth="0.6" />
    </svg>
  );
}
