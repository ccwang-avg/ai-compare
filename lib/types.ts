export type ProductType =
  | "通用助手"
  | "生态型助手"
  | "AI 搜索"
  | "编程 Agent"
  | "中文助手";

export type JudgmentLevel = "强" | "较强" | "中等" | "较弱";

export type JudgmentKey =
  | "multimodal"
  | "research"
  | "coding"
  | "agent"
  | "enterprise"
  | "ux";

export type SourceTier = 1 | 2 | 3;

export interface SourceLink {
  label: string;
  url: string;
  type: "官网首页" | "功能页" | "定价页" | "帮助中心" | "更新日志" | "企业页";
  tier: SourceTier;
  note: string;
}

export interface AnalysisDimension {
  label: string;
  summary: string;
  evidence: string[];
}

export interface KeyJudgment {
  judgment: string;
  evidence: string;
  impact: string;
}

export interface ProductAnalysis {
  positioning: AnalysisDimension;
  experience: AnalysisDimension;
  capability: AnalysisDimension;
  business: AnalysisDimension;
  conclusion: string;
}

export interface ProductFacts {
  coreEntry: string;
  targetUsers: string[];
  keyScenarios: string[];
  pricingSummary: string;
  enterpriseOffer: string;
}

export interface ProductReport {
  id: string;
  name: string;
  company: string;
  website: string;
  type: ProductType;
  sampleRole: string;
  representativeFor: string;
  researchDate: string;
  updatedAt: string;
  slogan: string;
  summary: string;
  tags: string[];
  facts: ProductFacts;
  judgments: Record<JudgmentKey, JudgmentLevel>;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  risks: string[];
  analysis: ProductAnalysis;
  keyJudgments: KeyJudgment[];
  sources: SourceLink[];
}

export interface ReportInsight {
  title: string;
  judgment: string;
  evidence: string;
  impact: string;
}

export interface ReportMethod {
  title: string;
  points: string[];
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

export const TYPE_DESCRIPTIONS: Record<ProductType, string> = {
  通用助手: "以通用问答、写作、资料整理和多工具协作为主入口。",
  生态型助手: "核心优势来自平台入口、办公生态或系统级分发能力。",
  "AI 搜索": "核心价值在检索、引用、事实核查与研究工作流。",
  "编程 Agent": "重点在工程上下文理解、改码闭环与团队开发协作。",
  中文助手: "重点在中文体验、资料处理和大众化低门槛使用。",
};

export const JUDGMENT_LABELS: Record<JudgmentKey, string> = {
  multimodal: "多模态",
  research: "研究检索",
  coding: "编程协作",
  agent: "Agent 执行",
  enterprise: "企业落地",
  ux: "体验完成度",
};

export const JUDGMENT_EXPLANATIONS: Record<JudgmentKey, string> = {
  multimodal: "看图片、文件、语音、视频等输入输出是否形成稳定能力，而不是只看是否“支持上传”。",
  research: "看检索、引用、事实核查、资料整合和研究产出的成熟度。",
  coding: "看代码生成、理解、修改、调试，以及与真实工程上下文协作的能力。",
  agent: "看是否能拆解任务、调用工具、持续执行并反馈结果。",
  enterprise: "看团队采购承接、安全、权限、合规、计费和组织管理能力。",
  ux: "看上手门槛、反馈透明度、信息架构和关键工作流完整性。",
};

export const JUDGMENT_ORDER: JudgmentLevel[] = ["强", "较强", "中等", "较弱"];

export const JUDGMENT_SCORE: Record<JudgmentLevel, number> = {
  强: 4,
  较强: 3,
  中等: 2,
  较弱: 1,
};

export const REPORT_SECTIONS = [
  {
    key: "positioning",
    title: "产品定位",
    desc: "它服务谁，先解决什么问题，主战场在哪里。",
  },
  {
    key: "experience",
    title: "体验设计",
    desc: "它如何让用户进入产品，以及如何组织关键工作流。",
  },
  {
    key: "capability",
    title: "能力边界",
    desc: "它强在哪，弱在哪，哪些能力只是覆盖而非优势。",
  },
  {
    key: "business",
    title: "商业化路径",
    desc: "它靠谁付费，如何从个人延展到团队和企业。",
  },
] as const;
