import type { Account } from '@/types/account';
import apiService from './api.service';

export const accountService = {
  getAccountInfo: async (): Promise<Account> => {
    return await apiService.get('/users/info');
  },
};
