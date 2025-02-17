'use client';

import { useTranslateStore } from '@/app/store/translate';
import { useDevice } from '@/app/hooks/useDevice';
import { motion } from "motion/react"

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
];

export function TranslateInput() {
  const { inputText, selectedLanguage, isLoading, translate, setInputText, setSelectedLanguage, setOutputText } = useTranslateStore();
  const { isMobile } = useDevice();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      translate();
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-105" data-oid="z4f.vpq">
      <div className="mb-4" data-oid="1s_8y1:">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700" data-oid="i9705xj">
            输入文字
          </label>
          {inputText && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
              title="清空内容"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          placeholder="请输入需要翻译的文字..."
          data-oid="f1fz9fu"
        />
      </div>
      <div className="flex justify-between items-center flex-row" data-oid="y7nm32g">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          data-oid="21r:fqz"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} data-oid="8sb9ii:">
              {lang.name}
            </option>
          ))}
        </select>
        <motion.button
          onClick={translate}
          disabled={isLoading || !inputText.trim()}
          initial={{ backgroundPosition: "-100% 50%" }}
          animate={isLoading ? { backgroundPosition: "200% 50%" } : { backgroundPosition: "0% 50%" }}
          transition={{
            duration: 2,
            repeat: isLoading ? Infinity : 0,
            repeatType: "reverse"
          }}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transform transition-all active:scale-95 flex items-center gap-2 bg-[length:300%_100%]"
          data-oid="u8imfz4"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="bg-gradient-to-r from-white/80 to-indigo-100/80 bg-clip-text text-transparent animate-pulse">
                AI模型翻译中...
              </span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              翻译
              {!isMobile && (
                <div className="flex items-center text-xs opacity-60 ml-2 border border-white/40 rounded px-1">
                  <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Enter
                </div>
              )}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
} 
