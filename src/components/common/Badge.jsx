// ============================================
// components/common/Badge.jsx
// ============================================
export const Badge = ({ children, variant = 'default' }) => {
    const variants = {
      default: 'bg-slate-700 text-slate-200',
      success: 'bg-green-500/20 text-green-400',
      warning: 'bg-yellow-500/20 text-yellow-400',
      danger: 'bg-red-500/20 text-red-400',
      info: 'bg-cyan-500/20 text-cyan-400',
    };
  
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}>
        {children}
      </span>
    );
  };