// ============================================
// components/admin/OrderManagement.jsx
// ============================================
import { Select as SelectComponent } from '../common/Select';
import { Badge } from '../common/Badge';

export const OrderManagement = ({ orders, onUpdateOrderStatus }) => {
  const statuses = [
    { value: 'pending_payment', label: 'Pending Payment' },
    { value: 'payment_verified', label: 'Payment Verified' },
    { value: 'ready_pickup', label: 'Ready for Pickup' },
    { value: 'out_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending_payment: 'warning',
      payment_verified: 'info',
      ready_pickup: 'info',
      out_delivery: 'info',
      delivered: 'success',
      cancelled: 'danger',
    };
    return colors[status] || 'default';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Orders</h2>

      {orders.length === 0 ? (
        <Card>
          <p className="text-slate-400 text-center py-8">No orders yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id}>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-slate-400 text-sm">Order ID</p>
                  <p className="text-white font-bold">{order.id}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Customer</p>
                  <p className="text-white font-bold">{order.fullName || 'N/A'}</p>
                  <p className="text-slate-500 text-xs">{order.phone}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Amount</p>
                  <p className="text-cyan-400 font-bold">
                    ₦{(order.total || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Date</p>
                  <p className="text-white font-bold">
                    {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-600">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Current Status</p>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Update Status
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                    className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-cyan-500"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <p className="text-slate-400 text-sm mb-2">Items</p>
                  <div className="space-y-1 text-sm text-slate-300">
                    {order.items.map((item, idx) => (
                      <p key={idx}>
                        {item.name} × {item.quantity}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};