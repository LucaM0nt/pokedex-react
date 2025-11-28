/**
 * TrainerStatCard
 * Compact stat display that switches between static text and an editable
 * control depending on `isEditing`. Supports text/number inputs and a
 * select dropdown via `inputType`.
 *
 * Implementation notes:
 * - Accessibility: derive a stable `id` from label to associate controls.
 * - Number inputs coerce values with `Number(...)` before calling onChange.
 */
export default function TrainerStatCard({
  label,
  value,
  isEditing,
  inputType = "text",
  options,
  onChange,
  inputProps = {},
}) {
  
  // Generate unique ID from label for accessibility (e.g., "Lv." -> "trainer-lv")
  const fieldId = `trainer-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <p className="text-gray-500 mb-1">{label}</p>

      {/* Render select dropdown, text/number input, or static text based on editing state */}
      {isEditing ? (
        inputType === "select" ? (
          <select
            id={fieldId}
            name={fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 font-semibold capitalize"
            {...inputProps}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldId}
            name={fieldId}
            type={inputType}
            value={value}
            onChange={(e) =>
              onChange(
                inputType === "number" ? Number(e.target.value) : e.target.value
              )
            }
            className="w-full border border-gray-300 rounded px-2 py-1 font-semibold"
            {...inputProps}
          />
        )
      ) : (
        <p className="font-semibold capitalize">{value}</p>
      )}
    </div>
  );
}
