"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";

// 模拟的收藏数据
const mockCollections = [
  {
    id: 1,
    originalText: "The early bird catches the worm",
    translatedText: "早起的鸟儿有虫吃",
    fromLanguage: "en",
    toLanguage: "zh",
    timestamp: "2024-03-15",
  },
  {
    id: 2,
    originalText: "人生就像一盒巧克力，你永远不知道下一颗是什么味道",
    translatedText:
      "Life is like a box of chocolates, you never know what you're gonna get",
    fromLanguage: "zh",
    toLanguage: "en",
    timestamp: "2024-03-14",
  },
  {
    id: 3,
    originalText: "Time is money",
    translatedText: "时间就是金钱",
    fromLanguage: "en",
    toLanguage: "zh",
    timestamp: "2024-03-13",
  },
  {
    id: 4,
    originalText: "春眠不觉晓，处处闻啼鸟",
    translatedText:
      "Spring sleep does not know dawn, everywhere hear birds chirping",
    fromLanguage: "zh",
    toLanguage: "en",
    timestamp: "2024-03-12",
  },
];

export default function CollectionPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = mockCollections.filter(
    (item) =>
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translatedText.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
      data-oid="t:x_ph:"
    >
      <Nav data-oid="y0o6hov" />
      <div className="max-w-6xl mx-auto px-4 py-8" data-oid="edfvsvi">
        <div className="text-center mb-8" data-oid="2y9xp-k">
          <h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            data-oid="guk-ruv"
          >
            我的收藏
          </h1>
          <p className="text-gray-600 mt-2" data-oid="3kj:0yp">
            保存您喜欢的翻译内容
          </p>
        </div>

        {/* 搜索框 */}
        <div className="mb-6" data-oid="o2gmd37">
          <div className="max-w-xl mx-auto" data-oid="sz6q_pu">
            <div className="relative" data-oid="uehfyzu">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索收藏的翻译..."
                className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                data-oid=":70aghx"
              />

              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="u0li20q"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  data-oid="fi-q28k"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 收藏列表容器 */}
        <div
          className="bg-white rounded-2xl shadow-xl p-4 md:p-6"
          data-oid="l-p0qz4"
        >
          <div
            className="h-[calc(100vh-280px)] overflow-y-auto"
            data-oid="h4s2ehn"
          >
            {filteredCollections.length === 0 ? (
              <div
                className="text-center py-12 text-gray-500"
                data-oid="doo-ip-"
              >
                没有找到匹配的翻译内容
              </div>
            ) : (
              <div className="space-y-4" data-oid="y1dm.0v">
                {filteredCollections.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-100 rounded-xl hover:border-purple-200 transition-all hover:shadow-sm"
                    data-oid="3dhj8g7"
                  >
                    <div
                      className="grid md:grid-cols-2 gap-6"
                      data-oid="q6byqtc"
                    >
                      {/* 原文 */}
                      <div className="space-y-2" data-oid="y9kjqyv">
                        <div
                          className="text-sm font-medium text-gray-500 flex items-center gap-2"
                          data-oid="13vw-rx"
                        >
                          <span data-oid="u8ok8at">原文</span>
                          <span
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            data-oid="c:1xfri"
                          >
                            {item.fromLanguage}
                          </span>
                        </div>
                        <div
                          className="text-gray-800 min-h-[60px]"
                          data-oid="jwd59k7"
                        >
                          {item.originalText}
                        </div>
                      </div>
                      {/* 译文 */}
                      <div className="space-y-2" data-oid="j9krv_u">
                        <div
                          className="text-sm font-medium text-gray-500 flex items-center gap-2"
                          data-oid="047u8jy"
                        >
                          <span data-oid="ephygfw">译文</span>
                          <span
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            data-oid="4w:bm1b"
                          >
                            {item.toLanguage}
                          </span>
                        </div>
                        <div
                          className="text-gray-800 min-h-[60px]"
                          data-oid="tg4g1k9"
                        >
                          {item.translatedText}
                        </div>
                      </div>
                    </div>
                    {/* 底部操作栏 */}
                    <div
                      className="mt-4 flex justify-between items-center text-sm border-t border-gray-100 pt-4"
                      data-oid="s8_haib"
                    >
                      <div className="text-gray-500" data-oid="6zd6lu:">
                        {item.timestamp}
                      </div>
                      <div
                        className="flex items-center gap-3"
                        data-oid="v2:cjna"
                      >
                        <button
                          className="text-gray-400 hover:text-purple-600 p-1"
                          data-oid="rf23y8."
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="o:c.7qm"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              data-oid=".:z9r9w"
                            />
                          </svg>
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500 p-1"
                          data-oid="185g-xi"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="zx78668"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              data-oid="dz1r42g"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
