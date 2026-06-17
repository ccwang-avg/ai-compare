import products from "@/data/products.json";
import cases from "@/data/cases.json";
import type {
  JudgmentKey,
  JudgmentLevel,
  ProductReport,
  ProductType,
  ReportInsight,
  ReportMethod,
  UseCase,
} from "@/lib/types";

export function getProducts(): ProductReport[] {
  return products as ProductReport[];
}

export function getProductById(id: string): ProductReport | undefined {
  return getProducts().find((product) => product.id === id);
}

export function getUseCases(): UseCase[] {
  return cases as UseCase[];
}

export function getTypeCountMap() {
  return getProducts().reduce<Record<ProductType, number>>((acc, product) => {
    acc[product.type] = (acc[product.type] ?? 0) + 1;
    return acc;
  }, {} as Record<ProductType, number>);
}

export function getAllTags() {
  return Array.from(new Set(getProducts().flatMap((product) => product.tags)));
}

export function getTagHeatmapRows() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
    items: getProducts().map((product) => ({
      productId: product.id,
      active: product.tags.includes(tag),
    })),
  }));
}

export function getAverageJudgmentLevel(levels: JudgmentLevel[]): number {
  const scoreMap: Record<JudgmentLevel, number> = {
    强: 4,
    较强: 3,
    中等: 2,
    较弱: 1,
  };
  return levels.reduce((sum, level) => sum + scoreMap[level], 0) / levels.length;
}

export function getTopProductsByJudgment(key: JudgmentKey) {
  const scoreMap: Record<JudgmentLevel, number> = {
    强: 4,
    较强: 3,
    中等: 2,
    较弱: 1,
  };

  return [...getProducts()].sort(
    (a, b) => scoreMap[b.judgments[key]] - scoreMap[a.judgments[key]]
  );
}

export function getLatestResearchDate() {
  return getProducts()[0]?.researchDate ?? "2026-06-15";
}

export function getSourceStats() {
  const allSources = getProducts().flatMap((product) => product.sources);
  return {
    total: allSources.length,
    tier1: allSources.filter((source) => source.tier === 1).length,
    tier2: allSources.filter((source) => source.tier === 2).length,
    tier3: allSources.filter((source) => source.tier === 3).length,
  };
}

export function getReportMethods(): ReportMethod[] {
  return [
    {
      title: "研究目标",
      points: [
        "回答这些产品服务谁、如何进入、强弱边界在哪里、以及靠谁付费。",
        "把资料整理成可比较、可追溯、可解释的竞品报告，而不是信息堆砌。"
      ],
    },
    {
      title: "样本标准",
      points: [
        "在对应赛道中具有代表性，并具备较高用户认知度。",
        "产品形态存在明显差异，能形成横向比较价值。",
        "可获取到足够的一手公开资料，且近一年仍持续更新。"
      ],
    },
    {
      title: "来源分层",
      points: [
        "一级来源优先使用官网、功能页、定价页、帮助中心和更新日志。",
        "二级来源只用于补充上下文与交叉验证，不单独支撑核心结论。",
        "三级来源仅用于体验观察，不作为关键判断唯一依据。"
      ],
    },
  ];
}

export function getReportInsights(): ReportInsight[] {
  return [
    {
      title: "通用助手竞争焦点从模型转向工作流承接",
      judgment: "ChatGPT 与 Claude 的差异不再只是“谁更会答”，而是谁更能把多能力组织成稳定工作流。",
      evidence: "两者都在官方叙事中强调文件、代码、Agent 或产物工作台，而不是单轮问答。",
      impact: "竞品分析页面必须展示体验设计与商业承接，单纯能力列表已经不够。"
    },
    {
      title: "AI 搜索的核心价值是证据链压缩",
      judgment: "Perplexity 的价值不在万能，而在用引用机制降低资料获取和核查成本。",
      evidence: "其产品定位、答案结构和 Pro 路径都围绕 research 与 citation 展开。",
      impact: "页面中的“判断 + 证据”呈现方式应比传统评分更靠前。"
    },
    {
      title: "编程 Agent 的分水岭在真实工程闭环",
      judgment: "Cursor 和 GitHub Copilot 都属于编程赛道，但一个偏工程闭环，一个偏企业平台承接。",
      evidence: "Cursor 聚焦 IDE 内 agent 行为，Copilot 则强调 GitHub 平台与企业采购链路。",
      impact: "矩阵需要把“体验设计”和“商业化路径”并列展示，而不是只看 coding 分数。"
    },
    {
      title: "中文助手分化在资料处理还是大众渗透",
      judgment: "Kimi 与豆包同为中文助手，但一个偏资料处理，一个偏大众化可达性。",
      evidence: "Kimi 聚焦长文与资料，豆包更强调日常问答、创作与移动端普及。",
      impact: "同类产品也必须通过样本角色和代表场景来区分，而不是只按区域或语言标签划分。"
    },
  ];
}

export function getMatrixRows() {
  return getProducts().map((product) => ({
    id: product.id,
    name: product.name,
    company: product.company,
    type: product.type,
    sampleRole: product.sampleRole,
    representativeFor: product.representativeFor,
    positioning: product.analysis.positioning.summary,
    experience: product.analysis.experience.summary,
    capability: product.analysis.capability.summary,
    business: product.analysis.business.summary,
    keyScenarios: product.facts.keyScenarios,
    pricing: product.facts.pricingSummary,
    strengths: product.strengths,
    risks: product.risks,
    judgments: product.judgments,
  }));
}
