
// ============================================
// components/checkout/OrderConfirmation.jsx
// ============================================
import { Copy, Check } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useState } from 'react';

export const OrderConfirmation = ({ order, settings, onNewOrder }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = order.deliveryType === 'pickup' ? 0 : 2500;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="text-center mb-6 border-green-500/50 bg-green-500/5">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-3xl font-bold text-green-400 mb-2">Order Confirmed!</h2>
        <p className="text-slate-400">
          Thank you for your order. Your order ID is:
        </p>
        <p className="text-2xl font-bold text-white mt-2">{order.id}</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Order Details */}
        <Card>
          <h3 className="text-white font-bold mb-4">Order Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-400">Customer</p>
              <p className="text-white font-semibold">{order.fullName}</p>
            </div>
            <div>
              <p className="text-slate-400">Email</p>
              <p className="text-white">{order.email}</p>
            </div>
            <div>
              <p className="text-slate-400">Phone</p>
              <p className="text-white">{order.phone}</p>
            </div>
            <div>
              <p className="text-slate-400">Delivery Type</p>
              <Badge variant="info">
                {order.deliveryType === 'pickup' ? 'Shop Pickup' : 'Home Delivery'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Order Summary */}
        <Card>
          <h3 className="text-white font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4 pb-4 border-b border-slate-600">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal:</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Delivery:</span>
              <span>₦{fee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-cyan-400 font-bold text-base">
              <span>Total:</span>
              <span>₦{(subtotal + fee).toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Items */}
      <Card className="mb-6">
        <h3 className="text-white font-bold mb-4">Items Ordered</h3>
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-600 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji_icon}</span>
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-slate-400 text-xs">× {item.quantity}</p>
                </div>
              </div>
              <p className="text-cyan-400 font-semibold">
                ₦{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Instructions */}
      {order.paymentMethod === 'bank_transfer' && (
        <Card className="border-yellow-500/50 bg-yellow-500/5 mb-6">
          <h3 className="text-yellow-400 font-bold mb-4">Transfer Instructions</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-400">Bank:</p>
              <div className="flex items-center justify-between bg-slate-700/50 p-2 rounded mt-1">
                <p className="text-white font-semibold">{settings.bank_name}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-400">Account Name:</p>
              <div className="flex items-center justify-between bg-slate-700/50 p-2 rounded mt-1">
                <p className="text-white font-semibold">{settings.account_name}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-400">Account Number:</p>
              <div className="flex items-center justify-between bg-slate-700/50 p-2 rounded mt-1">
                <p className="text-white font-mono font-bold">{settings.account_number}</p>
                <button
                  onClick={() => copyToClipboard(settings.account_number)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-600">
              <p className="text-slate-400">Amount to Transfer:</p>
              <p className="text-2xl font-bold text-cyan-400 mt-1">
                ₦{(subtotal + fee).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}

      {order.paymentMethod === 'pay_on_delivery' && (
        <Card className="border-cyan-500/50 bg-cyan-500/5 mb-6">
          <p className="text-cyan-400 text-sm">
            <span className="font-bold">Payment on Delivery:</span> You will pay
            ₦{(subtotal + fee).toLocaleString()} when your order arrives.
          </p>
        </Card>
      )}

      <Button onClick={onNewOrder} className="w-full">
        Continue Shopping
      </Button>
    </div>
  );
};