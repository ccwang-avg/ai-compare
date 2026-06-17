import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <h1 className="text-4xl font-semibold text-stone-950">未找到该产品</h1>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        请检查链接是否正确，或返回报告首页查看其他竞品分析。
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8a3b12] px-5 py-3 text-sm font-semibold text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>
    </div>
  );
}
