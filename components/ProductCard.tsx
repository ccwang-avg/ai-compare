import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductReport } from "@/lib/types";

interface ProductCardProps {
  product: ProductReport;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-[rgba(25,31,35,0.08)] bg-[rgba(255,255,255,0.76)] p-5 shadow-[0_8px_28px_rgba(41,32,23,0.04)]">
      <div className="mb-4">
        <span className="rounded-full bg-[rgba(138,59,18,0.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f2f0f]">
          {product.type}
        </span>
        <h3 className="mt-3 text-2xl font-semibold text-stone-950">{product.name}</h3>
        <p className="mt-1 text-sm text-stone-500">{product.company}</p>
      </div>

      <p className="text-sm leading-7 text-[var(--muted)]">{product.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[rgba(25,31,35,0.08)] bg-white/80 px-3 py-1 text-xs text-stone-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] bg-[rgba(244,240,232,0.9)] p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          分析结论
        </div>
        <p className="mt-2 text-sm leading-6 text-stone-700">{product.analysis.conclusion}</p>
      </div>

      <div className="mt-auto pt-4">
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a3b12]"
        >
          查看单产品分析
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
