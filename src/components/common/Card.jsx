export default function Card({ children, className = "", as = "div" }) {
  // Polymorphic component - can render as different HTML elements
  const Component = as;

  return (
    <Component
      className={`bg-white rounded-lg shadow-lg border border-gray-300 p-6 ${className}`}
    >
      {children}
    </Component>
  );
}
