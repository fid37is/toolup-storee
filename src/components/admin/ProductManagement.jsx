// ============================================
// components/admin/ProductManagement.jsx
// ============================================
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Modal } from '../common/Modal';
import { useState } from 'react';
import { Card } from '../common/Card';

export const ProductManagement = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Phones',
    price: '',
    stock: '',
    emoji_icon: '📱',
    description: '',
  });

  const categories = ['Phones', 'Accessories', 'Gadgets'];
  const emojis = ['📱', '🔌', '🛡️', '⚡', '🎧', '💻'];

  const handleOpenModal = (product = null) => {
    if (product) {
      setFormData(product);
      setEditingId(product.id);
    } else {
      setFormData({
        name: '',
        category: 'Phones',
        price: '',
        stock: '',
        emoji_icon: '📱',
        description: '',
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      onUpdateProduct(editingId, formData);
    } else {
      onAddProduct({
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="inline mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Card key={product.id} className="flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <span className="text-4xl">{product.emoji_icon}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h4 className="text-white font-bold mb-1 line-clamp-2">
              {product.name}
            </h4>
            <p className="text-slate-400 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-auto pt-3 border-t border-slate-600 space-y-1">
              <div className="flex justify-between text-slate-300 text-sm">
                <span>Category:</span>
                <span className="font-semibold">{product.category}</span>
              </div>
              <div className="flex justify-between text-slate-300 text-sm">
                <span>Price:</span>
                <span className="font-semibold text-cyan-400">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-300 text-sm">
                <span>Stock:</span>
                <span className={product.stock === 0 ? 'text-red-400' : 'text-green-400'}>
                  {product.stock} units
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Product' : 'Add New Product'}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <Input
            label="Product Name"
            placeholder="e.g., iPhone 15 Pro"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categories.map(cat => ({ label: cat, value: cat }))}
          />

          <Select
            label="Icon"
            value={formData.emoji_icon}
            onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
            options={emojis.map(emoji => ({ label: emoji, value: emoji }))}
          />

          <Input
            type="number"
            label="Price (₦)"
            placeholder="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <Input
            type="number"
            label="Stock"
            placeholder="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />

          <Input
            label="Description"
            placeholder="Product description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Button onClick={handleSubmit} className="w-full mt-4">
            {editingId ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
