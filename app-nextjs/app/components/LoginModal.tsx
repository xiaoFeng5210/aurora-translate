"use client";

import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现登录逻辑
    console.log("Login attempt:", { username, password });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-oid="c7npi:j"
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md relative"
        data-oid="dun777s"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          data-oid="7t.ei9i"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-oid="l6_79g2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
              data-oid="ey8pepx"
            />
          </svg>
        </button>

        <h2
          className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
          data-oid="ott5l_k"
        >
          登录 / 注册
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" data-oid="oi7xea-">
          <div data-oid="ym263p2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="xebtpf3"
            >
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="请输入用户名"
              required
              data-oid="1ost_-z"
            />
          </div>

          <div data-oid="pp94u4z">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="e8rm3u:"
            >
              密码
            </label>
            <div className="relative" data-oid="4j9x_iv">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="请输入密码"
                required
                data-oid="eg57b.2"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                data-oid="i9ffror"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="8lr.p5u"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      data-oid="u853y-5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="haec-du"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      data-oid="zlh-r3y"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      data-oid=":kdg60y"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transform transition-all active:scale-95"
            data-oid="gjl0zqw"
          >
            登录 / 注册
          </button>
        </form>
      </div>
    </div>
  );
}
