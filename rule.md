你是一名资深前端工程师和产品设计师。请帮我实现一个轻量 MVP，用作 AI 产品实习作品集项目。

项目名称：
AI 工具选型助手

项目定位：
帮助用户根据身份、任务和 Agent 需求，快速对比并选择合适的 AI 产品。第一版重点做「首页浏览 + 详情 + 对比 + 用户群体匹配」，不做完整产品库、不做独立 Agent 专区、不做规则推荐页（后期接入大模型时再实现智能推荐）。

技术栈要求：
- Next.js App Router
- TypeScript
- Tailwind CSS
- lucide-react 图标
- 使用本地 JSON 数据
- 不接后端
- 不接数据库
- 不接大模型
- 不写爬虫
- 不自动上网查数据
- 页面风格简洁、专业、偏 SaaS 工具型
- 适合面试演示
- 移动端和桌面端都要适配

请创建或整理以下项目结构（直接在 c:\AI_Compare 根目录下，不套子文件夹）：

  app/
    layout.tsx
    page.tsx
    products/
      [id]/
        page.tsx
    compare/
      page.tsx
  components/
    Navbar.tsx
    ProductCard.tsx
    CompareTable.tsx
  data/
    products.json
    cases.json
  lib/
    types.ts
    matchPersona.ts

首版不包含（后期扩展）：
- app/recommender/page.tsx
- lib/score.ts
- lib/recommend.ts
- components/RecommendationResult.tsx

---

核心功能要求：

1. 全局导航
- 顶部导航包含：
  - 首页
  - 产品对比
- 不需要「帮我选择」入口（智能推荐后期接入大模型后再加）
- 不需要产品库入口
- 不需要 Agent 专区入口
- 导航清晰、简洁
- 桌面端和移动端都要能正常展示

2. 首页 app/page.tsx
首页是一个轻量工具入口，不是营销落地页。

需要包含：
- 项目名称：AI 工具选型助手
- 一句话定位：根据你的身份和使用场景，对比并选择合适的 AI 工具
- 主按钮：开始对比（跳转 /compare）
- 次按钮：浏览产品（页面内锚点滚动到产品卡片区）
- 精选产品卡片区，展示 6-8 个产品
- 每张产品卡片使用 ProductCard
- 每张卡片可以进入产品详情页
- 首页要展示这个项目的核心逻辑（简短，3 步）：
  - 浏览产品能力
  - 选择身份进行对比
  - 根据匹配度做出选择
- 3 个典型场景卡片：
  - 学生写作与资料总结
  - 职场新人办公提效
  - 开发者使用编程 Agent
- 3 个使用案例（从 data/cases.json 读取，可展开步骤）：
  - 用 AI 总结 PDF
  - 用 Agent 做竞品调研
  - 用 Cursor 修改网页组件
- 底部项目说明区块：
  - 技术栈、数据来源（本地 JSON）
  - 注明：「智能问答推荐功能将在接入大模型后上线」
- 页面不要堆太多说明文字，重点是可操作

3. 产品详情页 app/products/[id]/page.tsx
根据产品 id 从 data/products.json 查找产品。

需要展示：
- 产品名称
- 产品类型
- 一句话介绍
- 适合人群
- 适合场景
- 价格情况
- 推荐指数
- 优点
- 缺点
- 能力评分：
  - 中文能力
  - 搜索能力
  - 文件处理能力
  - 编程能力
  - Agent 能力
  - 易用性

Agent 信息不要单独做专区，直接放在产品详情页里：
- 是否具备 Agent 能力
- Agent 类型
- 自动化程度
- 是否需要人工确认
- 适合任务
- 风险点

如果该产品没有明显 Agent 能力，也要显示：
「该产品主要是对话式或内容生成型 AI，不适合作为高自动化 Agent 使用。」

如果找不到产品 id：
- 显示友好的未找到状态
- 提供返回首页按钮

4. 产品对比页 app/compare/page.tsx
从 data/products.json 读取产品。

功能要求：
- 支持选择 2 个产品进行对比（首版固定 2 个，不做 3 产品）
- 使用 CompareTable 展示横向对比
- 默认预选 2 个产品，避免页面空白
- 首版不做「只显示差异项」开关（后期按需补充）

用户群体匹配（替代规则推荐页的核心能力）：
- 对比页顶部增加「选择你的身份」下拉框：
  - 学生
  - 职场新人
  - 开发者
  - 内容创作者
  - 不限（默认，不显示匹配行）
- 选择身份后，CompareTable 新增一行「群体匹配度」（置于「适合人群」之后）
- 使用 lib/matchPersona.ts 计算匹配结果：
  - 产品 targetUsers 包含所选身份 → 绿色标签「高度匹配」
  - targetUsers 含「通用用户」等泛化标签 → 黄色标签「一般匹配」
  - 不包含 → 灰色标签「不太匹配」
- 表格下方一行提示：
  「基于适合人群字段的规则匹配，后期将接入大模型智能推荐。」

对比字段包括：
- 产品类型
- 适合人群
- 群体匹配度（选择身份后显示）
- 适合场景
- 价格情况
- 中文能力
- 搜索能力
- 文件处理能力
- 编程能力
- Agent 能力
- 易用性
- 是否具备 Agent 能力
- Agent 类型
- 自动化程度
- 是否需要人工确认
- 使用风险
- 优点
- 缺点

如果产品数据少于 2 个：
- 显示提示：「产品数量不足，至少需要 2 个产品才能对比。」

5. data/products.json
请创建最小示例数据，保证页面初次运行就能展示。

至少包含 6 个产品（建议 6-8 个）：
- ChatGPT
- Claude
- Kimi
- 豆包
- Cursor
- GitHub Copilot
可以自行适当补充（如 Perplexity、通义千问等）

每个产品字段必须统一，至少包括：
- id
- name
- type
- summary
- targetUsers
- scenarios
- pricing
- pricingType
- recommendationIndex
- chineseSupport
- searchAbility
- fileAbility
- codingAbility
- agentAbility
- easeOfUse
- pros
- cons
- agentInfo

targetUsers 必填，用于对比页群体匹配。示例值：
- 学生
- 职场新人
- 开发者
- 内容创作者
- 通用用户

agentInfo 字段结构：
- hasAgentAbility
- agentType
- automationLevel
- requiresHumanReview
- suitableTasks
- risks

示例字段结构如下：

{
  "id": "cursor",
  "name": "Cursor",
  "type": "编程 Agent",
  "summary": "适合开发者进行代码生成、项目问答和代码修改的 AI 编程工具。",
  "targetUsers": ["开发者", "技术学习者"],
  "scenarios": ["编程", "代码修改", "项目问答", "自动执行任务"],
  "pricing": "免费 + 付费",
  "pricingType": "freemium",
  "recommendationIndex": 4.6,
  "chineseSupport": 3,
  "searchAbility": 2,
  "fileAbility": 5,
  "codingAbility": 5,
  "agentAbility": 5,
  "easeOfUse": 4,
  "pros": ["编程场景强", "能理解项目上下文", "适合代码修改"],
  "cons": ["不适合非技术用户", "复杂任务需要人工确认"],
  "agentInfo": {
    "hasAgentAbility": true,
    "agentType": "编程 Agent",
    "automationLevel": "中高",
    "requiresHumanReview": true,
    "suitableTasks": ["修改代码", "生成组件", "解释项目结构"],
    "risks": ["可能误改代码", "需要人工 review"]
  }
}

6. data/cases.json
至少包含 3 个案例，供首页展示：
- 用 AI 总结 PDF
- 用 Agent 做竞品调研
- 用 Cursor 修改网页组件

每个案例字段至少包括：
- id
- title
- userGoal
- tools
- steps
- output
- risks

7. lib/types.ts
请定义类型：
- Product
- AgentInfo
- Persona（用户身份枚举：student | workplace | developer | creator | all）
- UseCase
- MatchLevel（"high" | "medium" | "low"）

首版不需要 RecommendationAnswers、RecommendationResult 类型。

8. lib/matchPersona.ts
请实现 matchPersona 函数：

```typescript
matchPersona(product: Product, persona: Persona): MatchLevel
```

逻辑要求：
- persona 为 all 时不参与匹配（对比页隐藏匹配行）
- targetUsers 包含所选身份对应的中文标签 → high
- targetUsers 含「通用用户」→ medium
- 否则 → low

9. components/ProductCard.tsx
展示：
- 产品名称
- 类型
- 一句话介绍
- 场景标签
- 价格
- 推荐指数
- Agent 能力标签（有 Agent 能力时显示）
- 查看详情按钮

10. components/CompareTable.tsx
展示横向对比表。
要求：
- 支持 2 个产品
- 能展示数组字段（适合人群、场景、优缺点等）
- 能展示评分字段（1-5 分，用评分条或数字）
- 能展示 Agent 信息字段
- 能展示群体匹配度行（带颜色标签）

11. 空状态和容错
必须处理：
- products.json 为空 → 首页和对比页显示友好空状态，不报错
- 产品 id 不存在 → 详情页 404 状态 + 返回首页按钮
- 对比产品数量不足 → 显示提示文案
- cases.json 为空 → 首页案例区显示空状态

12. 视觉要求
- 使用 Tailwind CSS
- 使用 lucide-react 图标
- 使用卡片、标签、评分条、表格
- 不要大面积渐变
- 不要花哨动画
- 不要做复杂营销 hero
- 页面应该像一个可用的 AI 选型工具
- 信息密度适中，适合面试现场演示

13. 后续扩展预留
代码结构要方便后续：
- 增加产品数据
- 增加产品库页面（带搜索和筛选）
- 增加 Agent 专区
- 增加使用案例独立页面
- 接入大模型实现「帮我选择」问答推荐页（替代/增强群体匹配）
- 接入自然语言需求解析
- 对比页增加第三产品、差异项开关

---

预估开发时间：1.5–2 小时

演示路径：
首页浏览产品 → 进入详情了解 Agent 信息 → 对比页选 2 产品 + 选身份 → 查看能力差异与群体匹配度
