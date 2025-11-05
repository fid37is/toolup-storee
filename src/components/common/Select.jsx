// ============================================
// components/common/Select.jsx
// ============================================
export const Select = ({ label, value, onChange, options, required = false }) => {
    return (
      <div>
        {label && (
          <label className="block text-slate-300 text-sm mb-2">
            {label}
            {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-cyan-500 outline-none transition"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  };