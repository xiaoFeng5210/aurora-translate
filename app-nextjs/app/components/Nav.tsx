'use client';

import { useState } from 'react';

export function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="bg-white shadow-md" data-oid=".ism9a3">
            <div className="max-w-7xl mx-auto px-4" data-oid="3c.0xb6">
                <div className="flex justify-between items-center h-16" data-oid="swdmvep">
                    <div className="flex items-center" data-oid="fgg7m.r">
                        <a
                            href="/"
                            className="text-xl font-bold text-purple-600"
                            data-oid="1:u-80a"
                        >
                            Aurora
                        </a>
                        <div className="ml-10 flex space-x-4" data-oid=".:4fx3d">
                            <a
                                href="/"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                                data-oid=":qnnn:1"
                            >
                                首页
                            </a>
                            <a
                                href="/favorites"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                                data-oid="nuhiwy0"
                            >
                                收藏夹
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center" data-oid="xr.irig">
                        {isLoggedIn ? (
                            <div className="flex items-center" data-oid="-0osn0c">
                                <button
                                    className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                                    data-oid="umrqxni"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-purple-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        data-oid=":mag_:6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                            data-oid="j12lmu8"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-4" data-oid="ib:vcwm">
                                <button
                                    className="text-gray-700 hover:text-purple-600 px-3 py-2"
                                    data-oid="cf1d.tb"
                                >
                                    登录
                                </button>
                                <button
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                    data-oid="3s7sam_"
                                >
                                    注册
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
