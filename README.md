# AI 工具选型助手

轻量 MVP：帮助用户根据身份和使用场景，对比并选择合适的 AI 工具。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- lucide-react
- 本地 JSON 数据

## 功能

- **首页**：产品卡片、典型场景、使用案例、项目说明
- **产品详情**：能力评分、Agent 信息
- **产品对比**：2 产品横向对比 + 用户群体匹配度

## 快速开始

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 数据

- `data/products.json` — 产品数据（8 个示例）
- `data/cases.json` — 使用案例（3 个示例）

## 后续计划

- 接入大模型实现「帮我选择」智能推荐
- 增加产品库筛选、Agent 专区、使用案例独立页
