import { create } from 'zustand';
import { persist, storage } from './middleware/storage';
import { THEME, type ThemeEnum } from '@/types/app';

interface ThemeState {
  theme: ThemeEnum;
  setTheme: (theme: ThemeEnum) => void;
  applyTheme: () => void;
}
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: THEME.LIGHT,

      setTheme: (theme: ThemeEnum) => {
        set({ theme });
        get().applyTheme();
      },

      applyTheme: () => {
        const { theme } = get();
        const root = document.documentElement;

        // Remove old class
        root.classList.remove(THEME.LIGHT, THEME.DARK);
        root.classList.add(theme.toLowerCase());
      },
    }),
    {
      name: 'theme',
      storage: storage,
    },
  ),
);

// Auto apply theme when app starts
if (typeof window !== 'undefined') {
  const store = useThemeStore.getState();
  store.applyTheme();
}
