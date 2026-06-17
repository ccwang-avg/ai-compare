import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 竞品分析报告",
  description:
    "从产品定位、核心场景、能力边界与商业化路径，对主流 AI 产品进行横向分析。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-73px)]">{children}</main>
      </body>
    </html>
  );
}
