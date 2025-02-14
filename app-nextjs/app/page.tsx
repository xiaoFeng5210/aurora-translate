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
      data-oid="xsa9lu6"
    >
      <Nav data-oid="1tqt:cs" />
      <div className="max-w-4xl mx-auto px-4 py-12" data-oid="w.dq93:">
        <div className="text-center mb-12" data-oid=".pul0q1">
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4"
            data-oid="ukefu3t"
          >
            Aurora Translate!
          </h1>
          <p className="text-gray-600" data-oid="s7wqhi8">
            使用先进的AI技术，让您的翻译更加自然流畅
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2" data-oid="yh_133s">
          <div
            className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-105"
            data-oid="a1vhe7:"
          >
            <div className="mb-4" data-oid="ydp_po5">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="ll0qn44"
              >
                输入文字
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="请输入需要翻译的文字..."
                data-oid="-63_u_e"
              />
            </div>
            <div
              className="flex justify-between items-center"
              data-oid="7.6r_1t"
            >
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                data-oid="hv13ft9"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} data-oid="8x-aefd">
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTranslate}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transform transition-all active:scale-95"
                data-oid="iorcdl3"
              >
                翻译
              </button>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl shadow-xl p-6"
            data-oid="y9m7ga3"
          >
            <div className="mb-4" data-oid="s:3tn4t">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="zh:gedj"
              >
                翻译结果
              </label>
              <div
                className="w-full h-48 p-4 bg-gray-50 rounded-xl overflow-auto"
                data-oid="w5-04g:"
              >
                {outputText || "翻译结果将在这里显示..."}
              </div>
            </div>
            <div className="flex justify-end gap-2" data-oid="j:w2e1.">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2"
                data-oid="if.9qya"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="u:j_l4c"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    data-oid="c1wsxbr"
                  />
                </svg>
                收藏
              </button>
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2"
                data-oid=":yhdiud"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="x_o72d."
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    data-oid="a0rfi60"
                  />
                </svg>
                复制结果
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center" data-oid="2s_6ze.">
          <h2
            className="text-2xl font-semibold text-gray-800 mb-4"
            data-oid="dt7numy"
          >
            为什么选择我们的AI翻译？
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8" data-oid="_6g6clj">
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="4:ver9k"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="ky7z33j"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="x7:t4i6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    data-oid="iuxhfl."
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="eu07._6"
              >
                快速准确
              </h3>
              <p className="text-gray-600 text-sm" data-oid="yz_2jrt">
                采用最新AI技术，翻译速度快，准确度高
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="ly_2e:6"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="leyyk8z"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="btr1o1z"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    data-oid="h8ja6zi"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="bz8n07s"
              >
                自然流畅
              </h3>
              <p className="text-gray-600 text-sm" data-oid="y4boxmz">
                翻译结果自然流畅，符合目标语言表达习惯
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid=".g55bqe"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="h1198u1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="cpg_ger"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    data-oid="8x6ogdj"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="m667.rc"
              >
                安全可靠
              </h3>
              <p className="text-gray-600 text-sm" data-oid="ys7ggx2">
                保护您的隐私，确保数据安全
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
