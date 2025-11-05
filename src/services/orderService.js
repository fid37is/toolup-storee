
// ============================================
// services/productService.js
// ============================================
export const productService = {
    /**
     * Get all active products, optionally filtered by category
     */
    async getProducts(category = null) {
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('name');
  
        if (category) {
          query = query.eq('category', category);
        }
  
        const { data, error } = await query;
        if (error) throw error;
  
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message, data: [] };
      }
    },
  
    /**
     * Get single product by ID
     */
    async getProductById(id) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Create new product (admin only)
     */
    async createProduct(product) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([{
            name: product.name,
            description: product.description,
            category: product.category,
            price: parseFloat(product.price),
            stock: parseInt(product.stock) || 0,
            emoji_icon: product.emoji_icon,
            is_active: true,
          }])
          .select()
          .single();
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Update product (admin only)
     */
    async updateProduct(id, updates) {
      try {
        const { data, error } = await supabase
          .from('products')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()
          .single();
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Delete product (admin only)
     */
    async deleteProduct(id) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
  
        if (error) throw error;
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Get all categories
     */
    async getCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message, data: [] };
      }
    },
  
    /**
     * Update product stock
     */
    async updateStock(productId, quantityChange) {
      try {
        // Get current stock
        const { data: product, error: fetchError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', productId)
          .single();
  
        if (fetchError) throw fetchError;
  
        const newStock = Math.max(0, product.stock + quantityChange);
  
        const { data, error } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', productId)
          .select()
          .single();
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  };