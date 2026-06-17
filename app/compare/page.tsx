import { Suspense } from "react";
import CompareClient from "./CompareClient";

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 text-center text-stone-500">
          正在加载对比矩阵...
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  );
}
