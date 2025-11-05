
// ============================================
// components/layout/Footer.jsx
// ============================================
export const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-slate-900 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">⚙️ ToolUp Store</h3>
              <p className="text-slate-400 text-sm">
                Premium phones and electronics by ToolUp Enterprises
              </p>
            </div>
  
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="text-slate-400 text-sm space-y-2">
                <p>📞 +234 800 123 4567</p>
                <p>✉️ support@toolup.ng</p>
                <p>📍 Lagos, Nigeria</p>
              </div>
            </div>
  
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-cyan-400">Shop</a></li>
                <li><a href="#" className="hover:text-cyan-400">Orders</a></li>
                <li><a href="#" className="hover:text-cyan-400">Support</a></li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-slate-700 pt-4 text-center text-slate-400 text-sm">
            <p>&copy; {currentYear} ToolUp Enterprises. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  