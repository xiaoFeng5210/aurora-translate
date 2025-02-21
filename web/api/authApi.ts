import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  data: {
    token: string;
  };
  message?: string;
  errorMsg?: string;
}

export interface RegisterResponse {
  code: number;
  data: string; // token
  message?: string;
  errorMsg?: string;
}

export const authApi = {
  // 注册
  register: async (params: RegisterRequest): Promise<string> => {
    const response = await api.post<RegisterResponse>('/api/v1/register', params);
    if (response.data.code === 0) {
      return response.data.data; // 返回 token
    } else {
      throw new Error(response.data.errorMsg || response.data.message || '注册失败');
    }
  },

  // 登录
  login: async (params: LoginRequest): Promise<string> => {
    const response = await api.post<LoginResponse>('/api/v1/login', params);
    if (response.data.code === 0) {
      return response.data.data.token;
    } else {
      throw new Error(response.data.errorMsg || response.data.message || '登录失败');
    }
  },

  // 设置 token
  setAuthToken: (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // 可以选择将 token 存储在 localStorage 中
    localStorage.setItem('auth_token', token);
  },

  // 清除 token
  clearAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('auth_token');
  },

  // 获取存储的 token
  getStoredToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },
}; 
