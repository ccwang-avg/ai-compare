export type Persona = "student" | "workplace" | "developer" | "creator" | "all";

export type MatchLevel = "high" | "medium" | "low";

export interface AgentInfo {
  hasAgentAbility: boolean;
  agentType: string;
  automationLevel: string;
  requiresHumanReview: boolean;
  suitableTasks: string[];
  risks: string[];
}

export interface Product {
  id: string;
  name: string;
  type: string;
  summary: string;
  targetUsers: string[];
  scenarios: string[];
  pricing: string;
  pricingType: string;
  recommendationIndex: number;
  chineseSupport: number;
  searchAbility: number;
  fileAbility: number;
  codingAbility: number;
  agentAbility: number;
  easeOfUse: number;
  pros: string[];
  cons: string[];
  agentInfo: AgentInfo;
}

export interface UseCase {
  id: string;
  title: string;
  userGoal: string;
  tools: string[];
  steps: string[];
  output: string;
  risks: string[];
}

export const PERSONA_LABELS: Record<Exclude<Persona, "all">, string> = {
  student: "学生",
  workplace: "职场新人",
  developer: "开发者",
  creator: "内容创作者",
};

export const PERSONA_OPTIONS: { value: Persona; label: string }[] = [
  { value: "all", label: "不限" },
  { value: "student", label: "学生" },
  { value: "workplace", label: "职场新人" },
  { value: "developer", label: "开发者" },
  { value: "creator", label: "内容创作者" },
];

export const MATCH_LEVEL_LABELS: Record<
  MatchLevel,
  { text: string; className: string }
> = {
  high: {
    text: "高度匹配",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  medium: {
    text: "一般匹配",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  low: {
    text: "不太匹配",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
};
