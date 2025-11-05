// ============================================
// components/layout/Header.jsx
// ============================================
import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const Header = ({ onMenuToggle, onLogout }) => {
  const { user, isAdmin } = useApp();

  return (
    <header className="bg-linear-to-r from-slate-900 to-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-cyan-400">⚙️ ToolUp</span>
          <span className="text-xs text-slate-400">Enterprises</span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-slate-300 font-medium">{user.name}</p>
                {isAdmin && (
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                    ADMIN
                  </span>
                )}
              </div>
              <Button
                variant="secondary"
                onClick={onLogout}
                className="flex items-center gap-2 py-1 px-3 text-sm"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          )}

          <button onClick={onMenuToggle} className="md:hidden text-slate-300 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};
