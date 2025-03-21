"use client";

import { useTranslateStore, MAX_INPUT_LENGTH } from "@/app/store/translate";
import { useDevice } from "@/app/hooks/useDevice";
import { motion } from "motion/react";
import { useState, useMemo, CSSProperties } from "react";
import { isMobile } from "@/lib/utils";

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
];

export function TranslateInput() {

  const [focursInput, setFocursInput] = useState(false)
  const {
    inputText,
    selectedLanguage,
    isLoading,
    translate,
    setInputText,
    setSelectedLanguage,
    setOutputText,
  } = useTranslateStore();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      translate();
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const textAreaFocus = () => {
    if (isMobile()) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 118,
          behavior: "smooth"
        })
        const textArea = document.querySelector("textarea")
        if (textArea) {
          textArea.focus()
        }
      })
    }
    setFocursInput(true)
  }


  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 transform transition-all"
      data-oid="2l:svra"
    >
      <div className="mb-4" data-oid="9237csh">
        <div
          className="flex justify-between items-center mb-2"
          data-oid="dl1y6:3"
        >
          <label
            className="text-sm font-medium text-gray-700"
            data-oid="v983cx_"
          >
            输入文字
          </label>
          {inputText && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
              title="清空内容"
              data-oid="ft4c9fm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="y_am58u"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  data-oid="b0rk:9v"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={textAreaFocus}
            onBlur={() => setFocursInput(false)}
            onKeyPress={handleKeyPress}
            className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="请输入需要翻译的文字..."
            data-oid="d9s4ecq"
          />
          <div
            className={`absolute bottom-2 right-2 text-sm ${inputText.length >= MAX_INPUT_LENGTH ? 'text-red-500' : 'text-gray-400'
              }`}
          >
            {inputText.length}/{MAX_INPUT_LENGTH}
          </div>
        </div>
      </div>
      <div
        className="flex justify-between items-center flex-row"
        data-oid="dn_t:bn"
      >
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          data-oid="0uju92_"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} data-oid="of1d-pt">
              {lang.name}
            </option>
          ))}
        </select>
        <motion.button
          onClick={translate}
          disabled={isLoading || !inputText.trim()}
          initial={{ backgroundPosition: "-100% 50%" }}
          animate={
            isLoading
              ? { backgroundPosition: "200% 50%" }
              : { backgroundPosition: "0% 50%" }
          }
          transition={{
            duration: 2,
            repeat: isLoading ? Infinity : 0,
            repeatType: "reverse",
          }}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transform transition-all active:scale-95 flex items-center gap-2 bg-[length:300%_100%]"
          data-oid="0vkj4sx"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                data-oid="ci67ggi"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  data-oid="t9k0m0f"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  data-oid="6:xphf4"
                ></path>
              </svg>
              <span
                className="bg-gradient-to-r from-white/80 to-indigo-100/80 bg-clip-text text-transparent animate-pulse"
                data-oid="6ieu44q"
              >
                AI模型翻译中...
              </span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="1iipbv6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  data-oid="o:u2m98"
                />
              </svg>
              翻译
              {!isMobile && (
                <div
                  className="flex items-center text-xs opacity-60 ml-2 border border-white/40 rounded px-1"
                  data-oid="4al0n.c"
                >
                  <svg
                    className="w-3 h-3 mr-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid=":_x9cl5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10v4a1 1 0 001 1h12v-2l4 3-4 3v-2H4a3 3 0 01-3-3v-4h2z"
                      data-oid="qnbrvha"
                    />
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
