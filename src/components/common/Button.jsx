export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 disabled:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-medium py-2 px-6 rounded transition-colors cursor-pointer disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
