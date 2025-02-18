"use client";

import { useTranslateStore } from "@/app/store/translate";
import { copyClipboard } from "@/lib/utils";
import { CopySuccess } from "../common/CopySuccess";
import { useState } from "react";

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
    <div className="bg-white rounded-2xl shadow-xl p-6" data-oid="9:gw.xq">
      <div className="mb-4" data-oid="4vtw.6a">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          data-oid="684wo5:"
        >
          翻译结果
        </label>
        <div
          className="w-full h-48 p-4 bg-gray-50 rounded-xl overflow-auto"
          data-oid="ki:e7nb"
        >
          {isLoading ? (
            <span
              className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse font-medium"
              data-oid="dxa10lx"
            >
              AI模型正在翻译中ing...
            </span>
          ) : (
            outputText || (
              <span className="text-gray-400" data-oid="v7t2tak">
                翻译结果将在这里显示...
              </span>
            )
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 relative" data-oid="s54ma1x">
        {outputText && (
          <>
            <button
              onClick={() => {
                /* TODO: 实现收藏功能 */
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2"
              data-oid="a571zxm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="hsivgg:"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  data-oid="ivgq_1u"
                />
              </svg>
              收藏
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2"
              data-oid="sjix8mi"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="tczd5tp"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  data-oid="bsnwcgu"
                />
              </svg>
              复制结果
            </button>
          </>
        )}
        <CopySuccess
          show={showCopySuccess}
          onAnimationComplete={() => setShowCopySuccess(false)}
          data-oid="2f0vxur"
        />
      </div>
    </div>
  );
}
