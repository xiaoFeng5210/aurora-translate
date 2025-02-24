"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/store/auth";
import { useEffect, useState, useRef } from "react";
import { LoginModal } from "./LoginModal";

export function Nav() {
  const { isAuthenticated, userInfo, checkAuth, logout } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const ele = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [showUserMenu])

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  function handleClickOutside(evt: MouseEvent) {
    if (showUserMenu) {
      const isClickedOutside = !ele.current?.contains(evt.target as Node);
      if (isClickedOutside) {
        setShowUserMenu(false);
      }
    }
  }

  return (
    <nav className="bg-white shadow-sm" data-oid="iqxvxqw">
      <div className="max-w-6xl mx-auto px-4" data-oid="iqxvxqw">
        <div className="flex justify-between h-16" data-oid="iqxvxqw">
          <div className="flex items-center" data-oid="iqxvxqw">
            <Link
              href="/"
              className="text-xl font-bold text-purple-600"
              data-oid="iqxvxqw"
            >
              Aurora
            </Link>
          </div>

          <div className="flex items-center" data-oid="iqxvxqw">
            {isAuthenticated ? (
              <div className="flex items-center relative" data-oid="ldkgry2">
                <Link
                  href="/collection"
                  className="mr-4 text-gray-600 hover:text-purple-600"
                >
                  我的收藏
                </Link>
                <button
                  className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center relative"
                  onClick={() => setShowUserMenu(!showUserMenu)}
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
                {/* 用户菜单 */}
                {showUserMenu && (
                  <div ref={ele} className="absolute right-0 top-10 w-48 py-2 z-50 bg-white rounded-lg shadow-xl border border-gray-100">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      {userInfo?.username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      退出登录
                    </button>
                  </div>
                )}
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
                  onClick={() => setIsLoginModalOpen(true)}
                  data-oid="6jvxofe"
                >
                  注册
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
}
