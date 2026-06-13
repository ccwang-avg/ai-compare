"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { UseCase } from "@/lib/types";

interface CaseCardProps {
  useCase: UseCase;
}

export default function CaseCard({ useCase }: CaseCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{useCase.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{useCase.userGoal}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {useCase.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
        >
          {expanded ? (
            <>
              收起 <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              步骤 <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-slate-100 pt-4 text-sm">
          <div>
            <h4 className="mb-2 font-medium text-slate-900">操作步骤</h4>
            <ol className="list-decimal space-y-1 pl-5 text-slate-600">
              {useCase.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="mb-1 font-medium text-slate-900">预期产出</h4>
            <p className="text-slate-600">{useCase.output}</p>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-slate-900">风险提示</h4>
            <ul className="list-disc space-y-1 pl-5 text-slate-600">
              {useCase.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
