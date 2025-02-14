"use client";

import { useState } from "react";
import { LoginModal } from "./LoginModal";
export function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md" data-oid="bmfgyy9">
      <div className="max-w-7xl mx-auto px-4" data-oid="s4hx6:d">
        <div
          className="flex justify-between items-center h-16"
          data-oid="e5:.xj3"
        >
          <div className="flex items-center" data-oid="k5t51j1">
            <a
              href="/"
              className="text-xl font-bold text-purple-600"
              data-oid="bq_nyz3"
            >
              Aurora
            </a>
            <div className="ml-10 flex space-x-4" data-oid="f48zqu8">
              <a
                href="/"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                data-oid="2lsz6g9"
              >
                首页
              </a>
              <a
                href="/favorites"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                data-oid="a0fqg9h"
              >
                收藏夹
              </a>
            </div>
          </div>
          <div className="flex items-center" data-oid="mbh5r5b">
            {isLoggedIn ? (
              <div className="flex items-center" data-oid="gtb6os.">
                <button
                  className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                  data-oid="38xxwmw"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-oid="ac9cawl"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                      data-oid="-hb9yps"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4" data-oid="yenh5gn">
                <button
                  className="text-gray-700 hover:text-purple-600 px-3 py-2"
                  data-oid="tnpqb9k"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  登录
                </button>
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  data-oid="06os76k"
                >
                  注册
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 测试 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        data-oid="u4h4:y-"
      />
    </nav>
  );
}
