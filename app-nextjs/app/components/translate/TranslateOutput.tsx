'use client';

import { useTranslateStore } from '@/app/store/translate';
import { copyClipboard } from '@/lib/utils';
import { CopySuccess } from '../common/CopySuccess';
import { useState } from 'react';

export function TranslateOutput() {
  const { outputText, isLoading } = useTranslateStore();
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (outputText) {
      await copyClipboard(outputText);
      setShowCopySuccess(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6" data-oid="8ffrghv">
      <div className="mb-4" data-oid="j70p--5">
        <label className="block text-sm font-medium text-gray-700 mb-2" data-oid="txi7ya3">
          翻译结果
        </label>
        <div className="w-full h-48 p-4 bg-gray-50 rounded-xl overflow-auto" data-oid="45hhfdw">
          {isLoading ? (
            <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse font-medium">
              AI模型正在翻译中ing...
            </span>
          ) : (
            outputText || <span className="text-gray-400">翻译结果将在这里显示...</span>
          )}
        </div>
      </div>
      <div className="flex justify-end relative" data-oid="ymg._3x">
        {
          outputText && (
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2"
              data-oid="2r5t8y5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="j6j:s--"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  data-oid="vyvk4ic"
                />
              </svg>
              复制结果
            </button>
          )
        }
        <CopySuccess
          show={showCopySuccess}
          onAnimationComplete={() => setShowCopySuccess(false)}
        />
      </div>
    </div>
  );
} 
