"use client";

import { useState } from "react";
import { LoginModal } from "./LoginModal";
export function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md" data-oid="nfipnkb">
      <div className="max-w-7xl mx-auto px-4" data-oid="5oofm:l">
        <div
          className="flex justify-between items-center h-16"
          data-oid="mrb5zsj"
        >
          <div className="flex items-center" data-oid="4fqhkty">
            <a
              href="/"
              className="text-xl font-bold text-purple-600"
              data-oid="5xum:ba"
            >
              Aurora
            </a>
            <div className="ml-10 flex space-x-4" data-oid="ve:f-_m">
              <a
                href="/"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                data-oid="zd0v4ab"
              >
                首页
              </a>
              <a
                href="/collection"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                data-oid="-llbvmv"
              >
                收藏夹
              </a>
            </div>
          </div>
          <div className="flex items-center" data-oid="n3vq9p3">
            {isLoggedIn ? (
              <div className="flex items-center" data-oid="ldkgry2">
                <button
                  className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                  data-oid="84z1r9x"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-oid="89w7qph"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                      data-oid="odpc:h2"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4" data-oid="egm.3vs">
                <button
                  className="text-gray-700 hover:text-purple-600 px-3 py-2"
                  onClick={() => setIsLoginModalOpen(true)}
                  data-oid="ae04fxj"
                >
                  登录
                </button>
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  data-oid="6jvxofe"
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
        data-oid="1u79lz0"
      />
    </nav>
  );
}
