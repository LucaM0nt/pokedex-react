import Card from "./Card";

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
              {typeof message === "string" ? (
                <p className="text-lg font-medium">{message}</p>
              ) : (
                message
              )}
            </div>
          </Card>
        )}

        {actions && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
