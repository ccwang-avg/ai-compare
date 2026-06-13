import Link from "next/link";
import { ArrowRight, Bot, Star } from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{product.type}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {product.recommendationIndex}
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {product.summary}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {product.scenarios.slice(0, 3).map((scenario) => (
          <span
            key={scenario}
            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
          >
            {scenario}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">{product.pricing}</span>
          {product.agentInfo.hasAgentAbility && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
              <Bot className="h-3 w-3" />
              Agent
            </span>
          )}
        </div>
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          查看详情
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
