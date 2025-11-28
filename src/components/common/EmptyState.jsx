import Card from "./Card";

/**
 * EmptyState
 * Generic empty/placeholder view with optional icon, title, message, and actions.
 *
 * Props:
 * - icon: emoji or React node displayed prominently at the top
 * - title: short heading below the icon
 * - message: string or React nodes for flexible content (paragraphs, links)
 * - actions: React nodes (buttons/links) rendered in a centered flex row
 * - marginTop: adds top margin for vertical spacing within full-page layouts
 */
export default function EmptyState({
  icon,
  title,
  message,
  actions,
  marginTop = true,
}) {
  return (
    <div className={`p-4 ${marginTop ? "mt-24" : ""}`}>
      <div className="space-y-6 max-w-2xl text-center mx-auto">
        {icon && (
          <div className="space-y-2">
            <div className="text-4xl sm:text-6xl mb-4">{icon}</div>
            {title && (
              <div className="text-2xl font-semibold tracking-wide text-gray-700">
                {title}
              </div>
            )}
          </div>
        )}

        {message && (
          <Card className="text-gray-900">
            <div className="space-y-4">
              {/* Message supports either a plain string or rich React nodes */}
              {typeof message === "string" ? (
                <p className="text-lg font-medium">{message}</p>
              ) : (
                message
              )}
            </div>
          </Card>
        )}

        {/* Actions area: rendered only when provided */}
        {actions && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
