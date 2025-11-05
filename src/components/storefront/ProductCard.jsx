// ============================================
// components/storefront/ProductCard.jsx
// ============================================
import React from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export const ProductCard = ({ product, onAddCart }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <Card className="hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 group cursor-pointer transition">
      <div className="text-6xl mb-4 group-hover:scale-110 transition duration-300">
        {product.emoji_icon}
      </div>

      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
        {product.name}
      </h3>

      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-cyan-400">
          ₦{product.price.toLocaleString()}
        </span>
        <span className={`text-xs px-2 py-1 rounded ${
          isOutOfStock
            ? 'bg-red-500/20 text-red-400'
            : 'bg-green-500/20 text-green-400'
        }`}>
          {isOutOfStock ? 'Out of Stock' : `${product.stock} available`}
        </span>
      </div>

      <Button
        onClick={() => onAddCart(product)}
        disabled={isOutOfStock}
        className="w-full"
      >
        {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
      </Button>
    </Card>
  );
};
