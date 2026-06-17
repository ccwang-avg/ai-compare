import Link from "next/link";
import { ArrowLeft, ExternalLink, FileSearch, Scale, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";
import {
  JUDGMENT_EXPLANATIONS,
  JUDGMENT_LABELS,
  REPORT_SECTIONS,
  type JudgmentKey,
} from "@/lib/types";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

function getLevelClass(level: string) {
  if (level === "强") return "bg-[#8a3b12] text-white";
  if (level === "较强") return "bg-[rgba(138,59,18,0.16)] text-[#6f2f0f]";
  if (level === "中等") return "bg-[rgba(55,94,151,0.12)] text-[#274777]";
  return "bg-[rgba(91,88,79,0.12)] text-[#4f4b43]";
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950"
      >
        <ArrowLeft className="h-4 w-4" />
        返回报告首页
      </Link>

      <section className="report-panel rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[rgba(138,59,18,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#6f2f0f]">
                {product.type}
              </span>
              <span className="text-sm text-stone-500">{product.company}</span>
              <span className="text-sm text-stone-400">调研日期 {product.researchDate}</span>
            </div>
            <h1 className="text-5xl font-semibold leading-none text-stone-950">{product.name}</h1>
            <p className="mt-4 text-lg text-stone-700">{product.slogan}</p>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">{product.summary}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={product.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/85 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:bg-white"
            >
              访问官网
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 rounded-full bg-[#8a3b12] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(138,59,18,0.22)]"
            >
              加入横向对比
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="report-panel rounded-[30px] p-6">
          <div className="section-head">
            <Scale className="h-5 w-5 text-[#8a3b12]" />
            <h2>样本角色与基础事实</h2>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <div className="rounded-[20px] border border-[var(--line)] bg-white/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">样本角色</div>
              <div className="mt-2 text-lg font-semibold text-stone-950">{product.sampleRole}</div>
              <p className="mt-2">{product.representativeFor}</p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-stone-900">核心入口</div>
              <p>{product.facts.coreEntry}</p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-stone-900">目标用户</div>
              <p>{product.facts.targetUsers.join(" / ")}</p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-stone-900">代表场景</div>
              <p>{product.facts.keyScenarios.join(" / ")}</p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-stone-900">定价摘要</div>
              <p>{product.facts.pricingSummary}</p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-stone-900">组织承接</div>
              <p>{product.facts.enterpriseOffer}</p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-stone-900">能力标签</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--line)] bg-white/85 px-3 py-1 text-xs text-stone-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="report-panel rounded-[30px] p-6">
          <div className="section-head">
            <ShieldCheck className="h-5 w-5 text-[#8a3b12]" />
            <h2>能力刻度与边界说明</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {(Object.keys(JUDGMENT_LABELS) as JudgmentKey[]).map((key) => (
              <article key={key} className="rounded-[20px] border border-[var(--line)] bg-white/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-stone-900">{JUDGMENT_LABELS[key]}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getLevelClass(product.judgments[key])}`}>
                    {product.judgments[key]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {JUDGMENT_EXPLANATIONS[key]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 report-panel rounded-[30px] p-6">
        <div className="section-head">
          <FileSearch className="h-5 w-5 text-[#8a3b12]" />
          <h2>关键判断</h2>
        </div>
        <div className="mt-5 grid gap-4">
          {product.keyJudgments.map((item) => (
            <article key={item.judgment} className="rounded-[22px] border border-[var(--line)] bg-[rgba(244,240,232,0.82)] p-5">
              <p className="text-sm leading-7 text-stone-800">
                <span className="font-semibold">判断：</span>
                {item.judgment}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                <span className="font-semibold text-stone-800">依据：</span>
                {item.evidence}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                <span className="font-semibold text-stone-800">影响：</span>
                {item.impact}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6">
        {REPORT_SECTIONS.map((section) => {
          const dimension = product.analysis[section.key];
          return (
            <article key={section.key} className="report-panel rounded-[30px] p-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold text-stone-950">{section.title}</h2>
                <p className="text-sm text-stone-500">{section.desc}</p>
              </div>
              <p className="mt-4 text-sm leading-8 text-stone-800">{dimension.summary}</p>
              <div className="mt-4 rounded-[22px] border border-[var(--line)] bg-white/80 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">判断依据</div>
                <div className="mt-3 space-y-2">
                  {dimension.evidence.map((item) => (
                    <p key={item} className="text-sm leading-7 text-[var(--muted)]">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          { title: "主要优势", items: product.strengths, tone: "bg-[rgba(52,116,87,0.1)] text-[#255742]" },
          { title: "主要短板", items: product.weaknesses, tone: "bg-[rgba(55,94,151,0.1)] text-[#274777]" },
          { title: "风险与机会", items: [...product.risks.slice(0, 2), ...product.opportunities.slice(0, 2)], tone: "bg-[rgba(128,59,66,0.1)] text-[#70343b]" },
        ].map((block) => (
          <article key={block.title} className="report-panel rounded-[30px] p-6">
            <h2 className="text-3xl font-semibold text-stone-950">{block.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {block.items.map((item) => (
                <span key={item} className={`rounded-full px-3 py-1 text-xs font-semibold ${block.tone}`}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 report-panel rounded-[30px] p-6">
        <div className="section-head">
          <FileSearch className="h-5 w-5 text-[#8a3b12]" />
          <h2>来源与时效说明</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[0.32fr_0.68fr]">
          <article className="rounded-[22px] border border-[var(--line)] bg-white/80 p-5">
            <div className="text-sm font-semibold text-stone-900">调研日期</div>
            <div className="mt-2 text-sm text-[var(--muted)]">{product.researchDate}</div>
            <div className="mt-4 text-sm font-semibold text-stone-900">页面更新时间</div>
            <div className="mt-2 text-sm text-[var(--muted)]">{product.updatedAt}</div>
          </article>
          <article className="rounded-[22px] border border-[var(--line)] bg-white/80 p-5">
            <div className="text-sm font-semibold text-stone-900">一级来源证据链</div>
            <div className="mt-4 space-y-3">
              {product.sources.map((source) => (
                <div key={source.url} className="rounded-[18px] border border-[var(--line)] bg-[rgba(244,240,232,0.7)] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-[#8a3b12] underline-offset-4 hover:underline"
                    >
                      {source.label}
                    </a>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-stone-600">
                      {source.type}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-stone-600">
                      {`Tier ${source.tier}`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{source.note}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
