"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Info, Layers3 } from "lucide-react";
import { getProducts } from "@/lib/data";
import { JUDGMENT_LABELS, REPORT_SECTIONS, type JudgmentKey } from "@/lib/types";

const MAX_SELECTED = 4;
const MIN_SELECTED = 2;

function getLevelClass(level: string) {
  if (level === "强") return "bg-[#8a3b12] text-white";
  if (level === "较强") return "bg-[rgba(138,59,18,0.16)] text-[#6f2f0f]";
  if (level === "中等") return "bg-[rgba(55,94,151,0.12)] text-[#274777]";
  return "bg-[rgba(91,88,79,0.12)] text-[#4f4b43]";
}

export default function CompareClient() {
  const products = getProducts();
  const searchParams = useSearchParams();

  const initialIds = useMemo(() => {
    const fromQuery = searchParams.get("ids")?.split(",").filter(Boolean);
    const fallback = products.slice(0, MAX_SELECTED).map((product) => product.id);
    const ids = fromQuery && fromQuery.length > 0 ? fromQuery : fallback;
    return ids.filter((id) => products.some((product) => product.id === id)).slice(0, MAX_SELECTED);
  }, [products, searchParams]);

  const [selectedIds, setSelectedIds] = useState(initialIds);
  const selectedProducts = useMemo(
    () => products.filter((product) => selectedIds.includes(product.id)),
    [products, selectedIds]
  );

  const matrixKeys: JudgmentKey[] = ["multimodal", "research", "coding", "agent", "enterprise"];

  function toggleProduct(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.length <= MIN_SELECTED ? current : current.filter((item) => item !== id);
      }
      return current.length >= MAX_SELECTED ? current : [...current, id];
    });
  }

  const summary = useMemo(() => {
    if (selectedProducts.length < MIN_SELECTED) return [];
    return selectedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      role: product.sampleRole,
      judgment: product.keyJudgments[0]?.judgment ?? product.analysis.conclusion,
      impact: product.keyJudgments[0]?.impact ?? product.representativeFor,
    }));
  }, [selectedProducts]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <section className="report-panel rounded-[30px] p-6 sm:p-7">
        <p className="report-kicker">Interactive Product Read</p>
        <h1 className="mt-3 text-5xl font-semibold leading-none text-stone-950">交互式对比页</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
          首页主矩阵负责完整铺开全样本，这里只负责少量产品的深度对照。你可以选 2 到 4 个产品，
          直接看它们在产品定位、体验设计、能力边界与商业化路径上的差异点。
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/#matrix"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 font-semibold text-stone-800 transition hover:bg-white"
          >
            返回首页主矩阵
          </Link>
        </div>
      </section>

      <section className="mt-6 report-panel rounded-[30px] p-6 sm:p-7">
        <div className="mb-4 flex items-center gap-2 text-sm text-[var(--muted)]">
          <Info className="h-4 w-4 text-[#8a3b12]" />
          所有判断基于公开资料整理与官方页面核对，研究日期统一为 2026-06-15。
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const checked = selectedIds.includes(product.id);
            const disabled = !checked && selectedIds.length >= MAX_SELECTED;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggleProduct(product.id)}
                disabled={disabled}
                className={`rounded-[22px] border p-4 text-left transition ${
                  checked
                    ? "border-[#8a3b12] bg-[rgba(138,59,18,0.08)]"
                    : "border-[rgba(25,31,35,0.08)] bg-white/80 hover:bg-white"
                } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-stone-950">{product.name}</div>
                    <div className="mt-1 text-xs text-stone-500">{product.sampleRole}</div>
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      checked
                        ? "border-[#8a3b12] bg-[#8a3b12] text-white"
                        : "border-[rgba(25,31,35,0.12)] text-transparent"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="mt-3 text-sm leading-6 text-[var(--muted)]">{product.representativeFor}</div>
              </button>
            );
          })}
        </div>
      </section>

      {summary.length > 0 && (
        <section className="mt-6 report-panel rounded-[30px] p-6">
          <div className="section-head">
            <Layers3 className="h-5 w-5 text-[#8a3b12]" />
            <h2>首要判断</h2>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {summary.map((item) => (
              <div
                key={item.id}
                className="rounded-[20px] border border-[var(--line)] bg-[rgba(244,240,232,0.82)] p-4 text-sm leading-7 text-stone-800"
              >
                <div className="font-semibold text-stone-950">{item.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500">{item.role}</div>
                <div className="mt-3">{item.judgment}</div>
                <div className="mt-2 text-[var(--muted)]">{item.impact}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-6 grid gap-6">
        {REPORT_SECTIONS.map((section) => (
          <article key={section.key} className="report-panel rounded-[30px] p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="report-kicker">Dimension</p>
                <h2 className="text-3xl font-semibold text-stone-950">{section.title}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">{section.desc}</p>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
              {selectedProducts.map((product) => {
                const block =
                  section.key === "positioning"
                    ? product.analysis.positioning
                    : section.key === "experience"
                      ? product.analysis.experience
                      : section.key === "capability"
                        ? product.analysis.capability
                        : product.analysis.business;

                return (
                  <div
                    key={`${section.key}-${product.id}`}
                    className="rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,241,233,0.88))] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xl font-semibold text-stone-950">{product.name}</div>
                        <div className="mt-1 text-xs text-stone-500">{product.company}</div>
                      </div>
                      <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d2f11]">
                        {product.type}
                      </span>
                    </div>

                    {section.key === "positioning" && (
                      <div className="mt-4 grid gap-2 text-xs leading-6 text-[var(--muted)]">
                        <div>
                          <span className="font-semibold text-stone-800">服务谁：</span>
                          {product.facts.targetUsers.slice(0, 3).join(" / ")}
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800">先解决：</span>
                          {product.facts.keyScenarios[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800">主战场：</span>
                          {product.facts.coreEntry}
                        </div>
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-7 text-stone-800">{block.summary}</p>
                    <div className="mt-4 rounded-[18px] border border-[var(--line)] bg-white/80 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">判断依据</div>
                      <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                        {block.evidence.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>

                    {section.key === "capability" && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {matrixKeys.map((key) => (
                          <span
                            key={key}
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getLevelClass(product.judgments[key])}`}
                          >
                            {JUDGMENT_LABELS[key]}: {product.judgments[key]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
