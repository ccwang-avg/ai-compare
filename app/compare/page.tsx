import { Suspense } from "react";
import CompareClient from "./CompareClient";

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 text-center text-slate-500">
          加载中...
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  );
}
