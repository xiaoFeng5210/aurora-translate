import { create } from 'zustand';
import { authApi } from '@/api/authApi';

interface UserInfo {
  username: string;
  // 以后可以在这里添加更多用户信息
  // avatar?: string;
  // email?: string;
  // role?: string;
  // ...
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: UserInfo | null;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  // 可以添加更新用户信息的方法
  updateUserInfo: (info: Partial<UserInfo>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  token: null,
  userInfo: null,
  showLoginModal: false,

  setShowLoginModal: (show) => set({ showLoginModal: show }),

  login: async (username: string, password: string) => {
    try {
      const token = await authApi.login({ username, password });
      authApi.setAuthToken(token);
      set({
        isAuthenticated: true,
        token,
        showLoginModal: false,
        userInfo: { username }
      });
    } catch (error) {
      throw error;
    }
  },

  register: async (username: string, password: string) => {
    try {
      const token = await authApi.register({ username, password });
      authApi.setAuthToken(token);
      set({
        isAuthenticated: true,
        token,
        showLoginModal: false,
        userInfo: { username }
      });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    authApi.clearAuthToken();
    set({
      isAuthenticated: false,
      token: null,
      userInfo: null
    });
  },

  checkAuth: () => {
    const token = authApi.getStoredToken();
    const storedUserInfo = localStorage.getItem('user_info');

    if (token && storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        authApi.setAuthToken(token);
        set({
          isAuthenticated: true,
          token,
          userInfo
        });
      } catch (e) {
        // 如果解析失败，清除无效数据
        localStorage.removeItem('user_info');
        set({
          isAuthenticated: false,
          token: null,
          userInfo: null
        });
      }
    } else {
      set({
        isAuthenticated: false,
        token: null,
        userInfo: null
      });
    }
  },

  updateUserInfo: (info: Partial<UserInfo>) => {
    const currentInfo = get().userInfo;
    const newInfo = { ...currentInfo, ...info };
    localStorage.setItem('user_info', JSON.stringify(newInfo));
    set({ userInfo: newInfo as UserInfo });
  },
})); 
