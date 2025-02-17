'use client';

import { useTranslateStore } from '@/app/store/translate';

export default function TranslateHistory() {
  const { history, clearHistory } = useTranslateStore();

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">翻译历史</h2>
        <button
          onClick={clearHistory}
          className="text-red-500 hover:text-red-600"
        >
          清除历史
        </button>
      </div>
      <div className="space-y-4">
        {history.map((entry, index) => (
          <div
            key={entry.timestamp}
            className="border rounded p-4 bg-white shadow-sm"
          >
            <div className="text-sm text-gray-500 mb-2">
              {new Date(entry.timestamp).toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">
                  {entry.fromLang} → {entry.toLang}
                </div>
                <div>{entry.sourceText}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">翻译结果</div>
                <div>{entry.translatedText}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
