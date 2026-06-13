import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Code2,
  GitCompare,
  Search,
  Users,
} from "lucide-react";
import CaseCard from "@/components/CaseCard";
import ProductCard from "@/components/ProductCard";
import { getProducts, getUseCases } from "@/lib/data";

const steps = [
  { icon: Search, title: "浏览产品能力", desc: "了解各工具的类型、场景与 Agent 能力" },
  { icon: Users, title: "选择身份进行对比", desc: "在对比页选择身份，查看群体匹配度" },
  { icon: GitCompare, title: "根据匹配度做出选择", desc: "结合能力评分与价格，选出合适工具" },
];

const scenarios = [
  {
    icon: BookOpen,
    title: "学生写作与资料总结",
    desc: "需要中文体验好、能处理 PDF 和长文档的工具",
    suggestion: "推荐关注：Kimi、ChatGPT",
  },
  {
    icon: Briefcase,
    title: "职场新人办公提效",
    desc: "日常写作、资料整理、轻量调研",
    suggestion: "推荐关注：ChatGPT、豆包、通义千问",
  },
  {
    icon: Code2,
    title: "开发者使用编程 Agent",
    desc: "代码生成、项目修改、自动化开发任务",
    suggestion: "推荐关注：Cursor、GitHub Copilot",
  },
];

export default function HomePage() {
  const products = getProducts();
  const useCases = getUseCases();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          AI 工具选型助手
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          根据你的身份和使用场景，对比并选择合适的 AI 工具
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            开始对比
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            浏览产品
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">如何使用</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                  {index + 1}
                </span>
                <step.icon className="h-4 w-4 text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="mb-12 scroll-mt-20">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">精选产品</h2>
          <span className="text-sm text-slate-500">{products.length} 个产品</span>
        </div>
        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            暂无产品数据，请在 data/products.json 中补充产品信息。
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">典型场景</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {scenarios.map((scenario) => (
            <div
              key={scenario.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <scenario.icon className="mb-3 h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-slate-900">{scenario.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{scenario.desc}</p>
              <p className="mt-3 text-xs text-blue-600">{scenario.suggestion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">使用案例</h2>
        {useCases.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            暂无使用案例，请在 data/cases.json 中补充案例信息。
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-1">
            {useCases.map((useCase) => (
              <CaseCard key={useCase.id} useCase={useCase} />
            ))}
          </div>
        )}
      </section>

      <section id="about" className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">项目说明</h2>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-900">技术栈：</span>
            Next.js App Router、TypeScript、Tailwind CSS、lucide-react
          </p>
          <p>
            <span className="font-medium text-slate-900">数据来源：</span>
            本地 JSON 示例数据（data/products.json、data/cases.json）
          </p>
          <p>
            <span className="font-medium text-slate-900">后续计划：</span>
            增加产品库筛选、Agent 专区、使用案例页，并接入大模型实现智能问答推荐。
          </p>
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-amber-800">
            智能问答推荐功能将在接入大模型后上线。
          </p>
        </div>
      </section>
    </div>
  );
}
