import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <h1 className="text-xl font-semibold text-slate-900">未找到该产品</h1>
      <p className="mt-2 text-sm text-slate-600">
        请检查链接是否正确，或返回首页浏览其他产品。
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>
    </div>
  );
}
