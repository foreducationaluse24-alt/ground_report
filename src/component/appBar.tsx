"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "DISCOVER",
    links: [
      { href: "/home", label: "Top Stories", icon: "⌂" },
      // { href: "/latest", label: "Latest News", icon: "◷" },
      { href: "/markets", label: "Markets", icon: "◈" },
    ],
  },
  {
    title: "ANALYSIS",
    links: [
      { href: "/fact-check", label: "Fact Check", icon: "▤" },
     { href: "/blindspots", label: "Blindspots", icon: "◉" },
      // { href: "/coverage", label: "Coverage Gaps", icon: "▥" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 border-r border-slate-200 bg-investigative-paper px-4 py-6">
      <div className="space-y-8">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 px-3 text-xs font-semibold tracking-widest text-slate-400">
              {section.title}
            </h3>

            <ul className="space-y-1">
              {section.links.map((link) => {
                const active = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-investigative-navy text-white"
                          : "text-investigative-navy hover:bg-slate-200/70"
                      }`}
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
