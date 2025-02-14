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
      data-oid="nz1:9z5"
    >
      <Nav data-oid="0hpsw4e" />
      <div className="max-w-4xl mx-auto px-4 py-12" data-oid="kulm15c">
        <div className="text-center mb-12" data-oid="ejsayre">
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4"
            data-oid="i_uc7u_"
          >
            Aurora Translate
          </h1>
          <p className="text-gray-600" data-oid="evzqsdb">
            使用先进的AI技术，让您的翻译更加自然流畅
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2" data-oid="0:4fc:r">
          <div
            className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-105"
            data-oid="kwp_g5:"
          >
            <div className="mb-4" data-oid="qivzeo0">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="y-rs9sd"
              >
                输入文字
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="请输入需要翻译的文字..."
                data-oid="au077yr"
              />
            </div>
            <div
              className="flex justify-between items-center"
              data-oid="wmvxfy2"
            >
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                data-oid="z8rro_f"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} data-oid="p4_v-6y">
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTranslate}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transform transition-all active:scale-95"
                data-oid="jhic1zf"
              >
                翻译
              </button>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl shadow-xl p-6"
            data-oid="z6f.:al"
          >
            <div className="mb-4" data-oid="cg73qvc">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="mahod2s"
              >
                翻译结果
              </label>
              <div
                className="w-full h-48 p-4 bg-gray-50 rounded-xl overflow-auto"
                data-oid="70r.v5v"
              >
                {outputText || "翻译结果将在这里显示..."}
              </div>
            </div>
            <div className="flex justify-end" data-oid="1qudwd9">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2"
                data-oid="rouknd_"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="ii05z-b"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    data-oid="fwf:v54"
                  />
                </svg>
                复制结果
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center" data-oid="woot28r">
          <h2
            className="text-2xl font-semibold text-gray-800 mb-4"
            data-oid="zf2yve_"
          >
            为什么选择我们的AI翻译？
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8" data-oid="8lx6ggl">
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="nqw38zs"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="d2sajb4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="4:ljbt0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    data-oid="uj4aakx"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="b9_gy-r"
              >
                快速准确
              </h3>
              <p className="text-gray-600 text-sm" data-oid="5tytjpk">
                采用最新AI技术，翻译速度快，准确度高
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="af.ka5g"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="k777z-w"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="bq5ypi7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    data-oid="koxbm_x"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="tpj6xqn"
              >
                自然流畅
              </h3>
              <p className="text-gray-600 text-sm" data-oid="2z9859-">
                翻译结果自然流畅，符合目标语言表达习惯
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-xl shadow-lg"
              data-oid="fz5pd1p"
            >
              <div
                className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="01-5e_."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="b420per"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    data-oid="y-dd8-0"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-medium text-gray-800 mb-2"
                data-oid="705n-6r"
              >
                安全可靠
              </h3>
              <p className="text-gray-600 text-sm" data-oid="z36ka1j">
                保护您的隐私，确保数据安全
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
