// ============================================
// components/storefront/ProductGrid.jsx
// ============================================
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products, selectedCategory, onAddCart }) => {
    const filtered =
      selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);
  
    if (filtered.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-slate-400 text-lg">
            No products found in this category
          </p>
        </div>
      );
    }
  
    return filtered.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        onAddCart={onAddCart}
      />
    ));
  };
  