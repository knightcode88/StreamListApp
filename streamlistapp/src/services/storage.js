// Local storage service for persisting application data

const STORAGE_KEYS = {
  STREAM_LIST: 'streamlist_items',
  CART: 'cart_items',
  USER_PREFERENCES: 'user_preferences',
};

export const storageService = {
  // Generic methods
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage error:', error);
      return defaultValue;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  // Stream list methods
  getStreamList: () => storageService.getItem(STORAGE_KEYS.STREAM_LIST, []),
  saveStreamList: (items) => storageService.setItem(STORAGE_KEYS.STREAM_LIST, items),

  // Cart methods
  getCart: () => storageService.getItem(STORAGE_KEYS.CART, []),
  saveCart: (items) => storageService.setItem(STORAGE_KEYS.CART, items),

  // User preferences
  getPreferences: () => storageService.getItem(STORAGE_KEYS.USER_PREFERENCES, {}),
  savePreferences: (prefs) => storageService.setItem(STORAGE_KEYS.USER_PREFERENCES, prefs),
};