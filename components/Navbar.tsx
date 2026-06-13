"use client";

import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "首页" },
  { href: "/compare", label: "产品对比" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <span className="text-sm sm:text-base">AI 工具选型助手</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="切换菜单"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-2 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
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
