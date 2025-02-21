"use client";

import { useTranslateStore } from "@/app/store/translate";

export default function TranslateHistory() {
  const { history, clearHistory } = useTranslateStore();

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4" data-oid="k58__gt">
      <div
        className="flex justify-between items-center mb-4"
        data-oid="q7v.k6s"
      >
        <h2 className="text-xl font-semibold" data-oid="09:s1d3">
          翻译历史
        </h2>
        <button
          onClick={clearHistory}
          className="text-red-500 hover:text-red-600"
          data-oid="xwju3wo"
        >
          清除历史
        </button>
      </div>
      <div className="space-y-4" data-oid="wt58kc5">
        {history.map((entry, index) => (
          <div
            key={entry.timestamp}
            className="border rounded p-4 bg-white shadow-sm"
            data-oid="_1qte04"
          >
            <div className="text-sm text-gray-500 mb-2" data-oid="c6_q:m3">
              {new Date(entry.timestamp).toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="sd:ve6f">
              <div data-oid="h_1m-.0">
                <div className="text-sm text-gray-500" data-oid="4lfn820">
                  {entry.fromLang} → {entry.toLang}
                </div>
                <div data-oid="0bpj2wl">{entry.sourceText}</div>
              </div>
              <div data-oid="czvrd:q">
                <div className="text-sm text-gray-500" data-oid="-z.4ok3">
                  翻译结果
                </div>
                <div data-oid="wxaqi67">{entry.translatedText}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
