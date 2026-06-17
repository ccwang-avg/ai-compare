import { JUDGMENT_LABELS, type JudgmentKey, type ProductReport } from "@/lib/types";

interface CompareTableProps {
  products: ProductReport[];
}

function getLevelClass(level: string) {
  if (level === "强") return "bg-[#8a3b12] text-white";
  if (level === "较强") return "bg-[rgba(138,59,18,0.16)] text-[#6f2f0f]";
  if (level === "中等") return "bg-[rgba(55,94,151,0.12)] text-[#274777]";
  return "bg-[rgba(91,88,79,0.12)] text-[#4f4b43]";
}

export default function CompareTable({ products }: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-[28px] border border-[rgba(25,31,35,0.08)] bg-[rgba(255,255,255,0.76)] p-4 shadow-[0_10px_40px_rgba(41,32,23,0.04)]">
      <table className="min-w-[1160px] w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            {["产品", "主类型", "定位", ...Object.values(JUDGMENT_LABELS), "优势", "风险"].map(
              (head, index, arr) => (
                <th
                  key={head}
                  className={`border-b border-[rgba(25,31,35,0.08)] bg-[rgba(244,240,232,0.95)] px-4 py-4 text-left font-semibold text-stone-800 ${
                    index === 0 ? "rounded-tl-2xl" : ""
                  } ${index === arr.length - 1 ? "rounded-tr-2xl" : ""}`}
                >
                  {head}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product, rowIndex) => (
            <tr key={product.id}>
              <td className={`border-b border-[rgba(25,31,35,0.08)] px-4 py-4 align-top ${rowIndex === products.length - 1 ? "rounded-bl-2xl" : ""}`}>
                <div className="font-semibold text-stone-950">{product.name}</div>
                <div className="text-xs text-stone-500">{product.company}</div>
              </td>
              <td className="border-b border-[rgba(25,31,35,0.08)] px-4 py-4 align-top text-stone-700">{product.type}</td>
              <td className="border-b border-[rgba(25,31,35,0.08)] px-4 py-4 align-top text-stone-700">{product.slogan}</td>
              {(Object.keys(JUDGMENT_LABELS) as JudgmentKey[]).map((key) => (
                <td key={key} className="border-b border-[rgba(25,31,35,0.08)] px-4 py-4 align-top">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getLevelClass(product.judgments[key])}`}>
                    {product.judgments[key]}
                  </span>
                </td>
              ))}
              <td className="border-b border-[rgba(25,31,35,0.08)] px-4 py-4 align-top text-stone-700">
                {product.strengths.slice(0, 2).join(" / ")}
              </td>
              <td className={`border-b border-[rgba(25,31,35,0.08)] px-4 py-4 align-top text-stone-700 ${rowIndex === products.length - 1 ? "rounded-br-2xl" : ""}`}>
                {product.risks.slice(0, 2).join(" / ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
