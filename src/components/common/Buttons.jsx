// ============================================
// components/common/Button.jsx
// ============================================
export const Button = ({ children, variant = 'primary', onClick, disabled = false, className = '' }) => {
    const variants = {
      primary: 'bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600',
      secondary: 'bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700',
      danger: 'bg-red-500 hover:bg-red-600 disabled:bg-slate-600',
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`font-semibold py-2 px-4 rounded-lg transition text-white ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {children}
      </button>
    );
  };