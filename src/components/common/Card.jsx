// ============================================
// components/common/Card.jsx
// ============================================
export const Card = ({ children, className = '' }) => (
    <div className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );

  
