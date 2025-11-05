// ============================================
// components/checkout/CartView.jsx
// ============================================
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export const CartView = ({ items, onRemoveItem, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-slate-400 text-lg">Your cart is empty</p>
        <p className="text-slate-500 text-sm mt-2">Add products to get started</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map(item => (
        <Card key={item.id} className="flex items-center gap-4">
          <span className="text-4xl">{item.emoji_icon}</span>

          <div className="flex-1">
            <h4 className="text-white font-bold">{item.name}</h4>
            <p className="text-slate-400 text-sm">₦{item.price.toLocaleString()} each</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-700 rounded-lg p-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="text-slate-300 hover:text-white"
            >
              <Minus size={16} />
            </button>
            <span className="text-white font-semibold w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="text-slate-300 hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="text-right mr-4">
            <p className="text-white font-bold">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 size={20} />
          </button>
        </Card>
      ))}

      <div className="mt-6 pt-4 border-t border-slate-600">
        <div className="flex justify-between text-slate-300 mb-2">
          <span>Subtotal:</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-cyan-400 font-bold text-lg">
          <span>Total Items:</span>
          <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
      </div>

      <Button onClick={onCheckout} className="w-full mt-6">
        Proceed to Checkout
      </Button>
    </div>
  );
};

