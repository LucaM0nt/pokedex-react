export default function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      className="md:hidden flex items-center p-2 text-white hover:text-blue-400 transition-colors duration-300 relative z-50"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg
        className="w-7 h-7 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}
