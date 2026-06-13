"use client";

import type { ReactNode } from "react";
import { matchPersona, shouldShowPersonaMatch } from "@/lib/matchPersona";
import {
  MATCH_LEVEL_LABELS,
  type Persona,
  type Product,
} from "@/lib/types";

interface CompareTableProps {
  products: [Product, Product];
  persona: Persona;
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span
          key={item}
          className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ScoreCell({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium">{score}/5</span>
    </div>
  );
}

function MatchBadge({ level }: { level: "high" | "medium" | "low" }) {
  const config = MATCH_LEVEL_LABELS[level];
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.text}
    </span>
  );
}

type RowValue = string | string[] | number | boolean | ReactNode;

interface Row {
  label: string;
  values: RowValue[];
  show?: boolean;
}

export default function CompareTable({ products, persona }: CompareTableProps) {
  const showMatch = shouldShowPersonaMatch(persona);

  const rows: Row[] = [
    {
      label: "产品类型",
      values: products.map((p) => p.type),
    },
    {
      label: "适合人群",
      values: products.map((p) => <TagList key={p.id} items={p.targetUsers} />),
    },
    {
      label: "群体匹配度",
      values: products.map((p) => (
        <MatchBadge key={p.id} level={matchPersona(p, persona)} />
      )),
      show: showMatch,
    },
    {
      label: "适合场景",
      values: products.map((p) => <TagList key={p.id} items={p.scenarios} />),
    },
    {
      label: "价格情况",
      values: products.map((p) => p.pricing),
    },
    {
      label: "中文能力",
      values: products.map((p) => <ScoreCell key={p.id} score={p.chineseSupport} />),
    },
    {
      label: "搜索能力",
      values: products.map((p) => <ScoreCell key={p.id} score={p.searchAbility} />),
    },
    {
      label: "文件处理能力",
      values: products.map((p) => <ScoreCell key={p.id} score={p.fileAbility} />),
    },
    {
      label: "编程能力",
      values: products.map((p) => <ScoreCell key={p.id} score={p.codingAbility} />),
    },
    {
      label: "Agent 能力",
      values: products.map((p) => <ScoreCell key={p.id} score={p.agentAbility} />),
    },
    {
      label: "易用性",
      values: products.map((p) => <ScoreCell key={p.id} score={p.easeOfUse} />),
    },
    {
      label: "是否具备 Agent 能力",
      values: products.map((p) =>
        p.agentInfo.hasAgentAbility ? "是" : "否"
      ),
    },
    {
      label: "Agent 类型",
      values: products.map((p) => p.agentInfo.agentType),
    },
    {
      label: "自动化程度",
      values: products.map((p) => p.agentInfo.automationLevel),
    },
    {
      label: "是否需要人工确认",
      values: products.map((p) =>
        p.agentInfo.requiresHumanReview ? "是" : "否"
      ),
    },
    {
      label: "使用风险",
      values: products.map((p) => (
        <TagList key={p.id} items={p.agentInfo.risks} />
      )),
    },
    {
      label: "优点",
      values: products.map((p) => <TagList key={p.id} items={p.pros} />),
    },
    {
      label: "缺点",
      values: products.map((p) => <TagList key={p.id} items={p.cons} />),
    },
  ];

  const visibleRows = rows.filter((row) => row.show !== false);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="sticky left-0 z-10 min-w-[120px] bg-slate-50 px-4 py-3 text-left font-medium text-slate-600">
              对比项
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                className="min-w-[200px] px-4 py-3 text-left font-semibold text-slate-900"
              >
                {product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, index) => (
            <tr
              key={row.label}
              className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
            >
              <td className="sticky left-0 z-10 border-r border-slate-100 bg-inherit px-4 py-3 font-medium text-slate-600">
                {row.label}
              </td>
              {row.values.map((value, i) => (
                <td key={i} className="px-4 py-3 text-slate-700">
                  {typeof value === "string" || typeof value === "number"
                    ? value
                    : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
