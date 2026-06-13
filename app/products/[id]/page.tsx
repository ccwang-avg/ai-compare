import Link from "next/link";
import { ArrowLeft, Bot, Star } from "lucide-react";
import { notFound } from "next/navigation";
import ScoreBar from "@/components/ScoreBar";
import { getProductById } from "@/lib/data";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const scores = [
    { label: "中文能力", score: product.chineseSupport },
    { label: "搜索能力", score: product.searchAbility },
    { label: "文件处理能力", score: product.fileAbility },
    { label: "编程能力", score: product.codingAbility },
    { label: "Agent 能力", score: product.agentAbility },
    { label: "易用性", score: product.easeOfUse },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{product.type}</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">{product.name}</h1>
            <p className="mt-3 text-slate-600">{product.summary}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            推荐指数 {product.recommendationIndex}
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-medium text-slate-900">适合人群</h2>
            <div className="flex flex-wrap gap-1.5">
              {product.targetUsers.map((user) => (
                <span
                  key={user}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700"
                >
                  {user}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-medium text-slate-900">适合场景</h2>
            <div className="flex flex-wrap gap-1.5">
              {product.scenarios.map((scenario) => (
                <span
                  key={scenario}
                  className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700"
                >
                  {scenario}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mb-6 text-sm text-slate-600">
          <span className="font-medium text-slate-900">价格：</span>
          {product.pricing}
        </p>

        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-medium text-slate-900">优点</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {product.pros.map((pro) => (
                <li key={pro}>{pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-medium text-slate-900">缺点</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {product.cons.map((con) => (
                <li key={con}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-sm font-medium text-slate-900">能力评分</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {scores.map((item) => (
              <ScoreBar key={item.label} label={item.label} score={item.score} />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-violet-600" />
            <h2 className="font-medium text-slate-900">Agent 信息</h2>
          </div>

          {product.agentInfo.hasAgentAbility ? (
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">是否具备 Agent 能力</dt>
                <dd className="font-medium text-slate-900">是</dd>
              </div>
              <div>
                <dt className="text-slate-500">Agent 类型</dt>
                <dd className="font-medium text-slate-900">{product.agentInfo.agentType}</dd>
              </div>
              <div>
                <dt className="text-slate-500">自动化程度</dt>
                <dd className="font-medium text-slate-900">
                  {product.agentInfo.automationLevel}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">是否需要人工确认</dt>
                <dd className="font-medium text-slate-900">
                  {product.agentInfo.requiresHumanReview ? "是" : "否"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">适合任务</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {product.agentInfo.suitableTasks.map((task) => (
                    <span
                      key={task}
                      className="rounded bg-white px-2 py-0.5 text-xs text-slate-700"
                    >
                      {task}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">风险点</dt>
                <dd className="mt-1">
                  <ul className="list-disc space-y-1 pl-5 text-slate-600">
                    {product.agentInfo.risks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-slate-600">
              该产品主要是对话式或内容生成型 AI，不适合作为高自动化 Agent 使用。
            </p>
          )}
        </div>

        <div className="mt-6">
          <Link
            href={`/compare?a=${product.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            加入对比
          </Link>
        </div>
      </div>
    </div>
  );
}
