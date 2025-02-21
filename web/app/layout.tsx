import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <html lang="zh-CN" data-oid="bs7bemu">
      <body className={inter.className} data-oid=":-lo2le">
        {children}
        <ToastContainer data-oid="hf9.jvw" />
      </body>
    </html>
  );
}
