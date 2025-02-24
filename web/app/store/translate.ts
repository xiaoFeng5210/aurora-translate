import { create } from 'zustand';
import { translateApi } from '@/api/translateApi';

// 添加最大字数常量
const MAX_INPUT_LENGTH = 1000;

interface TranslateState {
  inputText: string;
  outputText: string;
  selectedLanguage: string;
  isLoading: boolean;
  isTranslateSuccess: boolean;
  history: Array<{
    sourceText: string;
    translatedText: string;
    fromLang: string;
    toLang: string;
    timestamp: number;
  }>;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  setSelectedLanguage: (lang: string) => void;
  translate: () => Promise<void>;
  addToHistory: (entry: Omit<TranslateState['history'][0], 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useTranslateStore = create<TranslateState>((set, get) => ({
  inputText: '',
  outputText: '',
  selectedLanguage: 'en',
  isLoading: false,
  history: [],
  isTranslateSuccess: false,

  setInputText: (text) => {
    // 如果输入文本超过最大长度，截取前 MAX_INPUT_LENGTH 个字符
    const truncatedText = text.slice(0, MAX_INPUT_LENGTH);
    set({ inputText: truncatedText });
  },
  setOutputText: (text) => set({ outputText: text }),
  setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),

  translate: async () => {
    const { inputText, selectedLanguage } = get();
    if (!inputText.trim() || get().isLoading) return;

    set({ isLoading: true });
    try {
      const result = await translateApi.translate({
        text: inputText,
        fromLang: "auto",
        toLang: selectedLanguage,
      });

      set({ outputText: result.translatedText, isTranslateSuccess: true });

      get().addToHistory({
        sourceText: inputText,
        translatedText: result.translatedText,
        fromLang: "auto",
        toLang: selectedLanguage,
      });
    } catch (error) {
      set({ outputText: "翻译失败，请稍后重试", isTranslateSuccess: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addToHistory: (entry) =>
    set((state) => ({
      history: [
        {
          ...entry,
          timestamp: Date.now(),
        },
        ...state.history,
      ].slice(0, 10),
    })),

  clearHistory: () => set({ history: [] }),
}));

// 导出最大字数常量供其他组件使用
export { MAX_INPUT_LENGTH }; 
