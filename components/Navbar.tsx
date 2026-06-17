"use client";

import Link from "next/link";
import { ChartColumnBig, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "报告首页" },
  { href: "/compare", label: "对比矩阵" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(25,31,35,0.08)] bg-[rgba(244,240,232,0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-stone-950">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(25,31,35,0.1)] bg-white/80 shadow-sm">
            <ChartColumnBig className="h-5 w-5 text-[#8a3b12]" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-stone-500">
              Research Edition
            </div>
            <div className="text-sm font-semibold sm:text-base">AI 竞品分析报告</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-white/70 hover:text-stone-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-full p-2 text-stone-600 hover:bg-white/70 sm:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="切换菜单"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[rgba(25,31,35,0.08)] bg-[rgba(244,240,232,0.95)] px-4 py-3 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-3 py-2 text-sm font-medium text-stone-700 hover:bg-white/70"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
