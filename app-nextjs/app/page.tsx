"use client";

import { Nav } from "./components/Nav";
import { TranslateInput } from "./components/translate/TranslateInput";
import { TranslateOutput } from "./components/translate/TranslateOutput";
import { Features } from "./components/translate/Features";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100" data-oid="nfkc-jq">
      <Nav data-oid="gjus5:n" />
      <div className="max-w-4xl mx-auto px-4 py-12" data-oid="w6dy78v">
        <div className="text-center mb-12" data-oid="8zlu_4w">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4" data-oid="y5acss6">
            Aurora Translate
          </h1>
          <p className="text-gray-600" data-oid="rw4hd_i">
            使用先进的AI技术，让您的翻译更加自然流畅
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2" data-oid="i95bpzs">
          <TranslateInput />
          <TranslateOutput />
        </div>
        <Features />
      </div>
    </div>
  );
}
