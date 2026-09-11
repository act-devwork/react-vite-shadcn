import { persist as zustandPersist, createJSONStorage } from 'zustand/middleware';

/**
 * Re-export zustand persist middleware with default config
 * Using: persist(yourStore, { name: 'storage-key' })
 */
export const persist = zustandPersist;

/**
 * Custom storage config using localStorage
 */
export const storage = createJSONStorage(() => localStorage);

/**
 * Helper function to clear storage
 */
export const clearStorage = (storageKey: string) => {
  localStorage.removeItem(storageKey);
};

/**
 * Helper function to get storage value
 */
export const getStorageValue = <T>(storageKey: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(storageKey);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};
