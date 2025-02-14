"use client";

import { useState } from "react";
import { Nav } from "./components/Nav";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
  ];

  const handleTranslate = () => {
    // Placeholder for translation logic
    setOutputText("Translation will be implemented soon...");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
      data-oid="4z0oq8c"
    >
      <Nav data-oid="v59keii" />
      <div className="max-w-4xl mx-auto px-4 py-12" data-oid=":7v70nl">
        <div className="text-center mb-12" data-oid="s3ndsz-">
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4"
            data-oid="xj1rzjv"
          >
            Aurora Translate
          </h1>
          <p className="text-gray-600" data-oid="wg_kvc-">
            使用先进的AI技术，让您的翻译更加自然流畅
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2" data-oid="voeempm">
          <div
            className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-105"
            data-oid="69m2lp0"
          >
            <div className="mb-4" data-oid="t3y0-sd">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="28.tpwz"
              >
                输入文字
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="请输入需要翻译的文字..."
                data-oid="29ufdgm"
              />
            </div>
            <div
              className="flex justify-between items-center"
              data-oid="z7278v."
            >
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                data-oid="bna93dr"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} data-oid="2go79_x">
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTranslate}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transform transition-all active:scale-95"
                data-oid="e84-e-1"
              >
                翻译
              </button>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl shadow-xl p-6"
            data-oid="4bk1.gy"
          >
            <div className="mb-4" data-oid="9w1k:ba">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid=".k4a:.t"
              >
                翻译结果
              </label>
              <div
                className="w-full h-48 p-4 bg-gray-50 rounded-xl overflow-auto"
                data-oid="iihsj80"
              >
                {outputText || "翻译结果将在这里显示..."}
              </div>
            </div>
            <div className="flex justify-end" data-oid="t0ora4b">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2"
                data-oid="f7wa2u0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="tnlx-hl"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    data-oid="8jocc2m"
                  />
                </svg>
                复制结果
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center" data-oid=":w:omwy">
          <h2
            className="text-2xl font-semibold text-gray-800 mb-4"
            data-oid="ynbj:o:"
          >
            为什么选择我们的AI翻译？
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8" data-oid="67:d2zm">
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="r_l90ec"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="wxlw0ko"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="f-ah20m"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    data-oid="qk:af7p"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="h7cxwsn"
              >
                快速准确
              </h3>
              <p className="text-gray-600 text-sm" data-oid="dzoot:z">
                采用最新AI技术，翻译速度快，准确度高
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="k.f63s-"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="6ej-svv"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="myftdri"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    data-oid="i90k6jh"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="a7r0n7k"
              >
                自然流畅
              </h3>
              <p className="text-gray-600 text-sm" data-oid="zrn5ckm">
                翻译结果自然流畅，符合目标语言表达习惯
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="tfo_ds1"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="e:go7oy"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="x9n94pc"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    data-oid="t:gim8l"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="dbfbi2n"
              >
                安全可靠
              </h3>
              <p className="text-gray-600 text-sm" data-oid="kc4r9.x">
                保护您的隐私，确保数据安全
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
