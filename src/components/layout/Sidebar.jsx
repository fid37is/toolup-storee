// ============================================
// components/layout/Sidebar.jsx
// ============================================
import { Home, Package, BarChart3, Settings, X } from 'lucide-react';

export const Sidebar = ({ currentPage, onPageChange, isOpen, onClose, isAdmin }) => {
  const customerPages = [
    { id: 'storefront', label: 'Shop', icon: Home },
    { id: 'my-orders', label: 'My Orders', icon: Package },
  ];

  const adminPages = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'admin-products', label: 'Products', icon: Package },
    { id: 'admin-orders', label: 'Orders', icon: Package },
    { id: 'admin-settings', label: 'Settings', icon: Settings },
  ];

  const pages = isAdmin ? adminPages : customerPages;

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    onClose?.();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-slate-800/50 border-r border-slate-700 p-4 overflow-y-auto z-40 transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-white font-bold">Menu</h2>
          <button onClick={onClose} className="text-slate-400">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {pages.map(page => {
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => handlePageChange(page.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentPage === page.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon size={20} />
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
