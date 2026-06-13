"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CompareTable from "@/components/CompareTable";
import { getProducts } from "@/lib/data";
import { PERSONA_OPTIONS, type Persona, type Product } from "@/lib/types";

export default function CompareClient() {
  const products = getProducts();
  const searchParams = useSearchParams();

  const defaultA = searchParams.get("a") ?? products[0]?.id ?? "";
  const defaultB = products.find((p) => p.id !== defaultA)?.id ?? products[1]?.id ?? "";

  const [productAId, setProductAId] = useState(defaultA);
  const [productBId, setProductBId] = useState(defaultB);
  const [persona, setPersona] = useState<Persona>("all");

  const selectedProducts = useMemo((): [Product, Product] | null => {
    const a = products.find((p) => p.id === productAId);
    const b = products.find((p) => p.id === productBId);
    if (!a || !b || a.id === b.id) return null;
    return [a, b];
  }, [products, productAId, productBId]);

  if (products.length < 2) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-slate-600">
          产品数量不足，至少需要 2 个产品才能对比。
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">产品对比</h1>
        <p className="mt-2 text-sm text-slate-600">
          选择两个产品并设置你的身份，查看能力差异与群体匹配度
        </p>
      </div>

      <div className="mb-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <div>
          <label htmlFor="product-a" className="mb-1.5 block text-sm font-medium text-slate-700">
            产品 A
          </label>
          <select
            id="product-a"
            value={productAId}
            onChange={(e) => setProductAId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === productBId}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="product-b" className="mb-1.5 block text-sm font-medium text-slate-700">
            产品 B
          </label>
          <select
            id="product-b"
            value={productBId}
            onChange={(e) => setProductBId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === productAId}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="persona" className="mb-1.5 block text-sm font-medium text-slate-700">
            选择你的身份
          </label>
          <select
            id="persona"
            value={persona}
            onChange={(e) => setPersona(e.target.value as Persona)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {PERSONA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedProducts ? (
        <>
          <CompareTable products={selectedProducts} persona={persona} />
          {persona !== "all" && (
            <p className="mt-4 text-sm text-slate-500">
              基于适合人群字段的规则匹配，后期将接入大模型智能推荐。
            </p>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          请选择两个不同的产品进行对比
        </div>
      )}
    </div>
  );
}
