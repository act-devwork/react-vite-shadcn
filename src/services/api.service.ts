import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';
import { envConfigs } from '@/configs/env';
import { useAuthStore } from '@/stores/auth';
import qs from 'qs';

export class ApiService {
  api = axios.create({
    baseURL: envConfigs.apiUrl + '/api/v1',
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const accessToken = useAuthStore.getState().getAccessToken();

        if (accessToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().clearAuth();
          window.location.href = '/auth/login';
        }

        if (error.response?.status === 403) {
          console.error('Access denied: You do not have permission to access this resource');
        }

        return Promise.reject(error);
      },
    );
  }

  call = async (
    method: string,
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {},
  ): Promise<any> => {
    try {
      const response = await this.api({
        method,
        url: endpoint,
        data,
        ...options,
      });

      return response.data as any;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }

      throw error;
    }
  };

  get = (endpoint: string, params?: any, options: AxiosRequestConfig = {}) => {
    return this.call('GET', endpoint, undefined, { ...options, params });
  };

  post = (endpoint: string, data?: any, options: AxiosRequestConfig = {}) => {
    return this.call('POST', endpoint, data, options);
  };

  put = (endpoint: string, data?: any, options: AxiosRequestConfig = {}) => {
    return this.call('PUT', endpoint, data, options);
  };

  patch = (endpoint: string, data?: any, options: AxiosRequestConfig = {}) => {
    return this.call('PATCH', endpoint, data, options);
  };

  delete = (endpoint: string, data?: any, options: AxiosRequestConfig = {}) => {
    return this.call('DELETE', endpoint, data, options);
  };
}

export default new ApiService();
