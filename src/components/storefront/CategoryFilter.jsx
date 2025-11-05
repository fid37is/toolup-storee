
  // ============================================
  // components/storefront/CategoryFilter.jsx
  // ============================================
  export const CategoryFilter = ({ categories, selected, onSelect }) => {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              selected === cat
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  };
  