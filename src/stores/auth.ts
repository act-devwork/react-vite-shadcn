import { create } from 'zustand';
import { persist, storage } from './middleware/storage';
import type { Account } from '@/types/account';

interface AuthState {
  accessToken: string;
  user: Account | null;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: Account) => void;
  clearAuth: () => void;
  getAccessToken: () => string;
  getUser: () => Account | null;
  getIsAuthenticated: () => boolean;
  getIsAccessTokenValid: () => boolean;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: '',
      user: null,

      setAccessToken: (accessToken: string) => {
        set({ accessToken });
      },

      setUser: (user: Account) => {
        set({ user });
      },

      clearAuth: () => {
        set({ accessToken: '', user: null });
      },

      getAccessToken: () => {
        return get().accessToken;
      },

      getUser: () => {
        return get().user;
      },

      getIsAuthenticated: () => {
        return get().accessToken !== '' && get().user !== null;
      },

      getIsAccessTokenValid: () => {
        return get().accessToken !== '';
      },
    }),
    {
      name: 'auth',
      storage: storage,
    },
  ),
);
