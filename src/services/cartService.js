// ============================================
// services/cartService.js
// ============================================
export const cartService = {
    /**
     * Add item to user's cart
     */
    async addToCart(userId, productId, quantity = 1) {
      try {
        const { data, error } = await supabase
          .from('cart')
          .upsert(
            { user_id: userId, product_id: productId, quantity },
            { onConflict: 'user_id,product_id' }
          )
          .select()
          .single();
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Get user's cart with product details
     */
    async getCart(userId) {
      try {
        const { data, error } = await supabase
          .from('cart')
          .select(`
            *,
            products(*)
          `)
          .eq('user_id', userId);
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message, data: [] };
      }
    },
  
    /**
     * Update cart item quantity
     */
    async updateCartQuantity(userId, productId, quantity) {
      try {
        if (quantity <= 0) {
          return this.removeFromCart(userId, productId);
        }
  
        const { data, error } = await supabase
          .from('cart')
          .update({ quantity })
          .eq('user_id', userId)
          .eq('product_id', productId)
          .select()
          .single();
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Remove item from cart
     */
    async removeFromCart(userId, productId) {
      try {
        const { error } = await supabase
          .from('cart')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);
  
        if (error) throw error;
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Clear entire cart
     */
    async clearCart(userId) {
      try {
        const { error } = await supabase
          .from('cart')
          .delete()
          .eq('user_id', userId);
  
        if (error) throw error;
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  };
  