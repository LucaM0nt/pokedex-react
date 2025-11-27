export default function TrainerStatCard({
  label,
  value,
  isEditing,
  inputType = "text",
  options,
  onChange,
  inputProps = {},
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <p className="text-gray-500 mb-1">{label}</p>
      {isEditing ? (
        inputType === "select" ? (
          <select
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
