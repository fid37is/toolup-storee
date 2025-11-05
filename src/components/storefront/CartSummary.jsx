// ============================================
  // components/storefront/CartSummary.jsx
  // ============================================
  import { ShoppingCart } from 'lucide-react';
  
  export const CartSummary = ({ items, onCheckout, onViewCart }) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 2500;
    const total = subtotal + deliveryFee;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  
    return (
      <Card className="sticky top-24 h-fit">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Cart Summary</h3>
        </div>
  
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-slate-300">
            <span>Items:</span>
            <span className="font-semibold">{items.length}</span>
          </div>
  
          <div className="flex justify-between text-slate-300">
            <span>Quantity:</span>
            <span className="font-semibold">{totalQuantity}</span>
          </div>
  
          <div className="flex justify-between text-slate-300">
            <span>Subtotal:</span>
            <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
          </div>
  
          <div className="flex justify-between text-slate-300 pb-3 border-b border-slate-600">
            <span>Delivery:</span>
            <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
          </div>
  
          <div className="flex justify-between text-cyan-400 font-bold text-lg">
            <span>Total:</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>
  
        <div className="space-y-2">
          <Button onClick={onViewCart} className="w-full">
            View Cart ({items.length})
          </Button>
          <Button
            onClick={onCheckout}
            variant="secondary"
            className="w-full"
            disabled={items.length === 0}
          >
            Checkout
          </Button>
        </div>
      </Card>
    );
  };