// ============================================
// services/settingsService.js
// ============================================
export const settingsService = {
    /**
     * Get all settings
     */
    async getSettings() {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*');
  
        if (error) throw error;
  
        // Convert array to object
        const settings = {};
        data.forEach(setting => {
          settings[setting.key] = setting.value;
        });
  
        return { success: true, data: settings };
      } catch (error) {
        return { success: false, error: error.message, data: {} };
      }
    },
  
    /**
     * Update single setting
     */
    async updateSetting(key, value) {
      try {
        const { data, error } = await supabase
          .from('settings')
          .update({
            value,
            updated_at: new Date().toISOString(),
          })
          .eq('key', key)
          .select()
          .single();
  
        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    /**
     * Update multiple settings
     */
    async updateMultipleSettings(updates) {
      try {
        const promises = Object.entries(updates).map(([key, value]) =>
          this.updateSetting(key, value)
        );
  
        const results = await Promise.all(promises);
        const failed = results.filter(r => !r.success);
  
        if (failed.length > 0) {
          throw new Error(`Failed to update ${failed.length} settings`);
        }
  
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  };
  