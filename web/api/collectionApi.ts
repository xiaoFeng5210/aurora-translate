import axios, { AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '@/app/store/auth';
// 创建axios实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : '',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
    }
    return Promise.reject(error);
  }
);


// 添加请求拦截器设置token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/**
 * API响应基础结构
 */
interface BaseResponse {
  code: number;
  message?: string;
}

/**
 * 通用API响应结构
 */
export interface ApiResponse<T> extends BaseResponse {
  data: T;
}

/**
 * 收藏项类型
 */
export interface CollectionItem {
  id: number;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  createdAt: string;
}

/**
 * 分页数据结构
 */
interface PaginationData<T> {
  total: number;
  list: T[];
}

/**
 * 分页响应结构
 */
export interface PaginationResponse<T> extends BaseResponse {
  data: PaginationData<T>;
}

/**
 * 添加收藏请求参数
 */
export interface AddCollectionParams {
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
}

/**
 * 查询参数类型
 */
interface CollectionQueryParams {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
}

/**
 * 处理API错误
 */
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    // 如果服务器返回了错误消息
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    // 如果是网络错误
    if (axiosError.message === 'Network Error') {
      return '网络错误，请检查您的网络连接';
    }
    // 其他Axios错误
    return axiosError.message || '请求失败';
  }
  // 非Axios错误
  return error instanceof Error ? error.message : '未知错误';
};

/**
 * 收藏相关API
 */
export const collectionApi = {
  /**
   * 获取收藏列表
   */
  getCollections: async (
    params: CollectionQueryParams
  ): Promise<PaginationResponse<CollectionItem>> => {
    const response: AxiosResponse<PaginationResponse<CollectionItem>> =
      await api.get('/api/v1/collections', { params });
    return response.data;
  },

  /**
   * 添加收藏
   */
  addCollection: async (
    data: AddCollectionParams
  ): Promise<BaseResponse> => {
    const response: AxiosResponse<BaseResponse> =
      await api.post('/api/v1/collections/add', data);
    return response.data;
  },

  /**
   * 删除收藏
   */
  deleteCollection: async (
    id: number
  ): Promise<BaseResponse> => {
    const response: AxiosResponse<BaseResponse> =
      await api.delete(`/api/v1/collections/${id}`);
    return response.data;
  },

  // 更新译文的方法
  updateTranslation: async (data: { id: number; targetText: string }): Promise<ApiResponse<{ code: number, message: string }>> => {
    try {
      const response: AxiosResponse<ApiResponse<{ code: number, message: string }>> = await api.put('/api/v1/collections/update', data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

export type {
  BaseResponse,
  PaginationData,
  CollectionQueryParams,
  CollectionItem as CollectionItemType
}; 
