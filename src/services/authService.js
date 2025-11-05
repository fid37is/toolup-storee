// ============================================
// services/authService.js
// ============================================
import { supabase } from './supabaseClient';

export const authService = {
  /**
   * Sign up a new user
   */
  async signup(email, password, fullName) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create user profile
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email,
            full_name: fullName,
            role: 'customer',
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign in an existing user
   */
  async signin(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      return { success: true, user: userData, session: data.session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign out current user
   */
  async signout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get current session
   */
  async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Session error:', error);
      return null;
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return userData;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },

  /**
   * Check if user is admin
   */
  async isAdmin(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data?.role === 'admin';
    } catch (error) {
      return false;
    }
  },
};