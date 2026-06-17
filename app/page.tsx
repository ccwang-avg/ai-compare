import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ChartColumnIncreasing,
  FileSearch,
  Files,
  Grid2x2Plus,
  Network,
  ScanSearch,
} from "lucide-react";
import {
  getLatestResearchDate,
  getMatrixRows,
  getProducts,
  getReportInsights,
  getReportMethods,
  getSourceStats,
  getTagHeatmapRows,
  getTypeCountMap,
} from "@/lib/data";
import {
  JUDGMENT_EXPLANATIONS,
  JUDGMENT_LABELS,
  REPORT_SECTIONS,
  TYPE_DESCRIPTIONS,
  type JudgmentKey,
} from "@/lib/types";

function getLevelClass(level: string) {
  if (level === "强") return "bg-[#8a3b12] text-white";
  if (level === "较强") return "bg-[rgba(138,59,18,0.16)] text-[#6f2f0f]";
  if (level === "中等") return "bg-[rgba(55,94,151,0.12)] text-[#274777]";
  return "bg-[rgba(91,88,79,0.12)] text-[#4f4b43]";
}

function getTypeWidth(count: number, total: number) {
  return `${Math.max(8, (count / total) * 100)}%`;
}

function getTypeShare(count: number, total: number) {
  return `${Math.round((count / total) * 100)}%`;
}

export default function HomePage() {
  const products = getProducts();
  const matrixRows = getMatrixRows();
  const methods = getReportMethods();
  const insights = getReportInsights();
  const typeCountMap = getTypeCountMap();
  const sourceStats = getSourceStats();
  const heatmapRows = getTagHeatmapRows();
  const researchDate = getLatestResearchDate();
  const matrixKeys: JudgmentKey[] = ["multimodal", "research", "coding", "agent", "enterprise"];
  const productMap = new Map(products.map((product) => [product.id, product] as const));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="report-panel relative overflow-hidden rounded-[34px] px-6 py-8 sm:px-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(138,59,18,0.18),transparent_32%),radial-gradient(circle_at_left,rgba(55,94,151,0.12),transparent_28%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="report-kicker">AI Competitor Research Report</p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.92] text-stone-950 sm:text-6xl">
              把公开资料、官方定价与产品叙事
              <br />
              组织成可追溯的 AI 竞品分析报告
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              这份页面不是产品信息展板，也不是主观排行榜。它按照“产品定位、体验设计、能力边界、商业化路径”四个维度，
              对主流 AI 产品做横向研究，并把关键判断与证据来源显性挂到页面上。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#matrix"
                className="inline-flex items-center gap-2 rounded-full bg-[#8a3b12] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(138,59,18,0.22)] transition hover:-translate-y-0.5"
              >
                查看主对比矩阵
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:bg-white"
              >
                打开交互式对比页
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "样本数量",
                value: `${products.length} 个`,
                desc: "覆盖通用助手、生态型助手、AI 搜索、编程 Agent 与中文助手。",
              },
              {
                label: "研究日期",
                value: researchDate,
                desc: "所有带时效性的结论都以本轮调研日期为准。",
              },
              {
                label: "一级来源",
                value: `${sourceStats.tier1} 条`,
                desc: "优先使用官网、功能页、定价页、帮助中心与更新日志。",
              },
              {
                label: "输出形式",
                value: "判断 + 证据 + 影响",
                desc: "避免只堆事实或只给结论，确保分析过程可解释。",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-[var(--line)] bg-white/72 p-5 shadow-[0_12px_30px_rgba(36,28,21,0.05)]">
                <div className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
                  {item.label}
                </div>
                <div className="mt-3 text-3xl font-semibold text-stone-950">{item.value}</div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="report-panel rounded-[30px] p-6 sm:p-7">
          <div className="section-head">
            <FileSearch className="h-5 w-5 text-[#8a3b12]" />
            <h2>本次研究任务</h2>
          </div>
          <div className="mt-5 grid gap-4">
            {[
              "这些产品分别服务谁，它们的核心定位是什么？",
              "它们如何设计主入口和关键体验路径？",
              "它们真正稳定的能力边界在哪里？",
              "它们如何定价，并如何承接团队与企业场景？",
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-[var(--line)] bg-[rgba(244,240,232,0.78)] px-4 py-4 text-sm leading-7 text-stone-800">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="report-panel rounded-[30px] p-6 sm:p-7">
          <div className="section-head">
            <BookOpenText className="h-5 w-5 text-[#8a3b12]" />
            <h2>方法与样本标准</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {methods.map((method) => (
              <article key={method.title} className="rounded-[22px] border border-[var(--line)] bg-white/78 p-4">
                <h3 className="text-xl font-semibold text-stone-950">{method.title}</h3>
                <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                  {method.points.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 report-panel rounded-[30px] p-6 sm:p-7">
        <div className="section-head">
          <Grid2x2Plus className="h-5 w-5 text-[#8a3b12]" />
          <h2>四维分析框架</h2>
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--muted)]">
          这套框架不是为了给产品贴标签，而是为了回答四个更实际的问题：它服务谁，靠什么体验组织用户路径，
          真正稳定的能力边界在哪里，以及最终靠什么完成商业承接。
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {REPORT_SECTIONS.map((section) => (
            <article key={section.key} className="rounded-[24px] border border-[var(--line)] bg-white/78 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8a3b12]">
                Framework
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-stone-950">{section.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{section.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="report-panel rounded-[30px] p-6 sm:p-7">
          <div className="section-head">
            <ChartColumnIncreasing className="h-5 w-5 text-[#8a3b12]" />
            <h2>关键横向洞察</h2>
          </div>
          <div className="mt-5 space-y-4">
            {insights.map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[var(--line)] bg-[rgba(244,240,232,0.82)] p-5">
                <h3 className="text-xl font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-800">
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
        </div>

        <div className="report-panel rounded-[30px] p-6 sm:p-7">
          <div className="section-head">
            <Network className="h-5 w-5 text-[#8a3b12]" />
            <h2>样本分布与分类口径</h2>
          </div>
          <div className="mt-5 grid gap-4">
            {Object.entries(typeCountMap).map(([type, count], index) => {
              const currentProducts = products.filter((product) => product.type === type);

              return (
                <article
                  key={type}
                  className="rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,241,233,0.86))] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-stone-900">{type}</div>
                      <div className="mt-1 text-sm leading-6 text-[var(--muted)]">
                        {TYPE_DESCRIPTIONS[type as keyof typeof TYPE_DESCRIPTIONS]}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700">
                        {count} 个
                      </div>
                      <div className="mt-2 text-xs text-stone-500">{getTypeShare(count, products.length)}</div>
                    </div>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-[rgba(25,31,35,0.06)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#8a3b12,#bd6a33)]"
                      style={{ width: getTypeWidth(count, products.length) }}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentProducts.map((product) => (
                      <span
                        key={product.id}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          index % 2 === 0
                            ? "border-[rgba(138,59,18,0.18)] bg-[rgba(138,59,18,0.08)] text-[#6f2f0f]"
                            : "border-[rgba(55,94,151,0.14)] bg-[rgba(55,94,151,0.08)] text-[#274777]"
                        }`}
                      >
                        {product.name}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="rounded-[22px] border border-[var(--line)] bg-white/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">服务对象</div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                样本优先覆盖已经形成稳定用户心智的主流入口，而不是只挑功能最全或营销最响的产品。
              </p>
            </article>
            <article className="rounded-[22px] border border-[var(--line)] bg-white/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">分类原则</div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                分类依据是产品的主战场与工作流重心，不是模型厂商背景，也不是单点能力标签。
              </p>
            </article>
            <article className="rounded-[22px] border border-[var(--line)] bg-white/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">对比目的</div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                同类样本用于看分化路径，异类样本用于看边界差异，因此首页矩阵强调角色与定位，而不是总分。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="matrix"
        className="mt-8 report-panel rounded-[30px] p-6 sm:p-7"
      >
        <div className="section-head">
          <ScanSearch className="h-5 w-5 text-[#8a3b12]" />
          <h2>主对比矩阵</h2>
        </div>
        <p className="mt-3 max-w-5xl text-sm leading-7 text-[var(--muted)]">
          这里不再以总分或排行作为主叙事，而是直接用“样本角色、产品定位、体验设计、能力边界、商业化路径”五列展开比较。
          右侧的能力等级只作为辅助刻度，用来补充而不是替代判断。
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-[1680px] w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                {[
                  "产品",
                  "样本角色",
                  "产品定位",
                  "体验设计",
                  "能力边界",
                  "商业化路径",
                  "代表场景",
                  ...matrixKeys.map((key) => JUDGMENT_LABELS[key]),
                ].map((head, index, arr) => (
                  <th
                    key={head}
                    className={`border-b border-[var(--line)] bg-[rgba(244,240,232,0.9)] px-4 py-4 text-left font-semibold text-stone-800 ${
                      index === 0 ? "rounded-tl-2xl" : ""
                    } ${index === arr.length - 1 ? "rounded-tr-2xl" : ""}`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixRows.map((row, index) => (
                <tr key={row.id}>
                  <td className={`border-b border-[var(--line)] px-4 py-5 align-top ${index === matrixRows.length - 1 ? "rounded-bl-2xl" : ""}`}>
                    <div className="font-semibold text-stone-950">{row.name}</div>
                    <div className="mt-1 text-xs text-stone-500">{row.company}</div>
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-5 align-top">
                    <div className="rounded-2xl border border-[var(--line)] bg-white/75 p-3 text-sm leading-6 text-stone-800">
                      <div className="font-semibold text-stone-950">{row.sampleRole}</div>
                      <div className="mt-1 text-[13px] text-[var(--muted)]">{row.representativeFor}</div>
                    </div>
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-5 align-top">
                    <div className="rounded-2xl border border-[var(--line)] bg-white/72 p-3">
                      <p className="text-sm leading-7 text-stone-700">{row.positioning}</p>
                      <div className="mt-3 space-y-2 text-xs leading-6 text-[var(--muted)]">
                        <div>
                          <span className="font-semibold text-stone-800">服务谁：</span>
                          {productMap.get(row.id)?.facts.targetUsers.slice(0, 2).join(" / ")}
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800">先解决：</span>
                          {productMap.get(row.id)?.facts.keyScenarios[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800">主战场：</span>
                          {productMap.get(row.id)?.facts.coreEntry}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-5 align-top text-sm leading-7 text-stone-700">{row.experience}</td>
                  <td className="border-b border-[var(--line)] px-4 py-5 align-top text-sm leading-7 text-stone-700">{row.capability}</td>
                  <td className="border-b border-[var(--line)] px-4 py-5 align-top text-sm leading-7 text-stone-700">
                    <div>{row.business}</div>
                    <div className="mt-2 text-xs text-stone-500">{row.pricing}</div>
                  </td>
                  <td className="border-b border-[var(--line)] px-4 py-5 align-top">
                    <div className="flex flex-wrap gap-2">
                      {row.keyScenarios.slice(0, 3).map((scenario) => (
                        <span key={scenario} className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-xs text-stone-700">
                          {scenario}
                        </span>
                      ))}
                    </div>
                  </td>
                  {matrixKeys.map((key) => (
                    <td key={key} className="border-b border-[var(--line)] px-4 py-5 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getLevelClass(row.judgments[key])}`}>
                        {row.judgments[key]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 report-panel rounded-[30px] p-6 sm:p-7">
        <div className="section-head">
          <Files className="h-5 w-5 text-[#8a3b12]" />
          <h2>样本卡片与详情入口</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,241,233,0.88))] p-5 shadow-[0_14px_32px_rgba(36,28,21,0.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d2f11]">
                    {product.type}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-stone-950">{product.name}</h3>
                  <p className="mt-1 text-sm text-stone-500">{product.company}</p>
                </div>
                <BadgeCheck className="mt-1 h-5 w-5 text-[#8a3b12]" />
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{product.summary}</p>
              <div className="mt-4 rounded-[18px] border border-[var(--line)] bg-white/80 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">样本角色</div>
                <p className="mt-2 text-sm font-semibold text-stone-900">{product.sampleRole}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{product.representativeFor}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--line)] bg-white/75 px-3 py-1 text-xs text-stone-700">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/products/${product.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8a3b12] transition hover:gap-3"
              >
                查看样本详情
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="report-panel rounded-[30px] p-6 sm:p-7">
          <div className="section-head">
            <Network className="h-5 w-5 text-[#8a3b12]" />
            <h2>能力标签热力矩阵</h2>
          </div>
          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[140px_repeat(8,minmax(88px,1fr))] gap-2">
                <div />
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-[var(--line)] bg-white/80 px-3 py-4 text-center text-sm font-semibold text-stone-900"
                  >
                    {product.name}
                  </div>
                ))}
                {heatmapRows.map((row) => (
                  <div key={row.tag} className="contents">
                    <div className="rounded-2xl border border-[var(--line)] bg-[rgba(244,240,232,0.86)] px-4 py-3 text-sm font-medium text-stone-700">
                      {row.tag}
                    </div>
                    {row.items.map((item) => (
                      <div
                        key={`${row.tag}-${item.productId}`}
                        className={`rounded-2xl border border-[var(--line)] px-3 py-3 text-center text-xs font-semibold ${
                          item.active
                            ? "bg-[rgba(138,59,18,0.16)] text-[#6f2f0f]"
                            : "bg-white/60 text-stone-400"
                        }`}
                      >
                        {item.active ? "覆盖" : "·"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="report-panel rounded-[30px] p-6 sm:p-7">
          <div className="section-head">
            <BadgeCheck className="h-5 w-5 text-[#8a3b12]" />
            <h2>能力刻度解释</h2>
          </div>
          <div className="mt-5 grid gap-4">
            {Object.entries(JUDGMENT_LABELS).map(([key, label]) => (
              <article key={key} className="rounded-[20px] border border-[var(--line)] bg-white/80 p-4">
                <h3 className="text-xl font-semibold text-stone-950">{label}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {JUDGMENT_EXPLANATIONS[key as JudgmentKey]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
