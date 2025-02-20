import axios, { AxiosResponse } from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : '',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  }
};

export type {
  BaseResponse,
  PaginationData,
  CollectionQueryParams,
  CollectionItem as CollectionItemType
}; 
