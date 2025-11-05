// ============================================
// components/admin/AdminDashboardStats.jsx
// ============================================
import React from 'react';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';
import { Card } from '../common/Card';

export const DashboardStats = ({ orders, products }) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending_payment').length;
  const totalProducts = products.length;

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'text-cyan-400',
    },
    {
      label: 'Total Revenue',
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-400',
    },
    {
      label: 'Pending Payments',
      value: pendingOrders,
      icon: Package,
      color: 'text-yellow-400',
    },
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Users,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="flex items-start gap-4">
            <div className={`p-3 bg-slate-700 rounded-lg ${stat.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

