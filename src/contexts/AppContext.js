// ============================================
// context/AppContext.jsx
// ============================================
import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [settings, setSettings] = useState({
    store_name: 'ToolUp Store',
    store_phone: '+234 800 123 4567',
    store_email: 'support@toolup.ng',
    store_address: 'Lagos, Nigeria',
    bank_name: 'GTBank',
    account_name: 'ToolUp Enterprises',
    account_number: '0123456789',
    pickup_fee: '0',
    delivery_fee: '2500',
    enable_pickup: 'true',
    enable_delivery: 'true',
  });
  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 15 Pro', category: 'Phones', price: 799000, stock: 15, emoji_icon: '📱', description: 'Latest iPhone with advanced features' },
    { id: 2, name: 'Samsung Galaxy S24', category: 'Phones', price: 699000, stock: 20, emoji_icon: '📱', description: 'Flagship Android phone' },
    { id: 3, name: 'USB-C Cable', category: 'Accessories', price: 3500, stock: 100, emoji_icon: '🔌', description: 'Fast charging cable' },
    { id: 4, name: 'Phone Case', category: 'Accessories', price: 5000, stock: 50, emoji_icon: '🛡️', description: 'Protective phone case' },
    { id: 5, name: 'Wireless Charger', category: 'Gadgets', price: 12000, stock: 25, emoji_icon: '⚡', description: 'Fast wireless charging pad' },
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const value = {
    // User state
    user,
    setUser,
    isAdmin,
    setIsAdmin,

    // Settings state
    settings,
    setSettings,

    // Products state
    products,
    setProducts,

    // Cart state
    cartItems,
    setCartItems,

    // Orders state
    orders,
    setOrders,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};