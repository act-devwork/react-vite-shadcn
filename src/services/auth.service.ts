import apiService from './api.service';
import type { LoginPayload, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    return await apiService.post('/login', payload);
  },
};
