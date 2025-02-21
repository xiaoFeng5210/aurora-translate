"use client";

import { Nav } from "./components/Nav";
import { TranslateInput } from "./components/translate/TranslateInput";
import { TranslateOutput } from "./components/translate/TranslateOutput";
import { Features } from "./components/translate/Features";

export default function Page() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
      data-oid="jny:kyr"
    >
      <Nav data-oid=".okyge5" />
      <div className="max-w-4xl mx-auto px-4 py-12" data-oid="rrc:2f:">
        <div className="text-center mb-12" data-oid="nwxledn">
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4"
            data-oid="7lrwazn"
          >
            Aurora Translate!
          </h1>
          <p className="text-gray-600" data-oid="03c0caw">
            使用先进的AI技术，让您的翻译更加自然流畅
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2" data-oid="xxoc7h3">
          <TranslateInput data-oid="q_1p-vl" />
          <TranslateOutput data-oid="vbrlf2c" />
        </div>
        <Features data-oid="l3.zehs" />
      </div>
    </div>
  );
}
