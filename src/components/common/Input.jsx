// ============================================
// components/common/Input.jsx
// ============================================
export const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    label,
    error,
    required = false,
  }) => {
    return (
      <div>
        {label && (
          <label className="block text-slate-300 text-sm mb-2">
            {label}
            {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-slate-700 text-white p-3 rounded border border-slate-600 focus:border-cyan-500 outline-none transition"
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    );
  };
  