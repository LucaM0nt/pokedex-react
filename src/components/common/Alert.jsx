/**
 * Alert
 * Reusable component for displaying messages with consistent styling.
 *
 * Props:
 * - type: 'error' | 'info' | 'warning' | 'success' (default: 'info')
 * - message: string or React node
 * - className: additional classes
 */
export default function Alert({ type = "info", message, className = "" }) {
  const baseClasses =
    "p-4 rounded-lg shadow border text-sm font-medium";

  const typeClasses = {
    error: "bg-red-50 border-red-300 text-red-700",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
    info: "bg-blue-50 border-blue-300 text-blue-700",
    success: "bg-green-50 border-green-300 text-green-700",
  };

  const selectedType = typeClasses[type] || typeClasses.info;

  return (
    <div className={`${baseClasses} ${selectedType} ${className}`}>
      {message}
    </div>
  );
}
