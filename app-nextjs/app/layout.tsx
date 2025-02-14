import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aurora Translate",
  description: "Aurora Translate by OnLook",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-oid="lgh8ejv">
      <body className={inter.className} data-oid="1yne.ej">
        {children}
      </body>
    </html>
  );
}
