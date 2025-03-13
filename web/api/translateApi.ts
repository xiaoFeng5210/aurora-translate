import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 语言方向参数转换
function language2params(fromLang: string): string {
  const langMap: { [key: string]: string } = {
    'en': 'auto2en',
    'zh': 'auto2zh',
    'ja': 'auto2ja',
    'ko': 'auto2ko'
  };
  return langMap[fromLang] || 'auto2en';
}

export interface TranslateRequest {
  source: string[];
  direction: string;
}

export interface TranslateResponse {
  code: number;
  data: string[];
  message?: string;
}

export const translateApi = {
  translate: async (params: { text: string; fromLang: string; toLang: string }): Promise<{ translatedText: string }> => {
    const direction = language2params(params.toLang);

    const requestData: TranslateRequest = {
      source: [params.text],
      direction,
    };

    const response = await api.post<TranslateResponse>('/api/v1/translate/text', requestData);
    if (response.data.code === 0 && response.data.data.length > 0) {
      return {
        translatedText: response.data.data[0]
      };
    } else {
      throw new Error(response.data.message || '翻译失败');
    }
  },
};
