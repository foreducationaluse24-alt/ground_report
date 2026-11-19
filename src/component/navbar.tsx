"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/home", label: "Top Stories" },
  { href: "/blindspots", label: "Blindspots" },
  { href: "/fact-check", label: "Fact Check" },
  { href: "/markets", label: "Markets" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-investigative-navy text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Masthead */}
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-tight sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          The Investigative <span className="text-investigative-amber">Analyst</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-5 text-sm font-medium tracking-wide transition-colors ${
                    active
                      ? "text-white after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-investigative-amber"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: search + mobile toggle */}
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search stories..."
            aria-label="Search stories"
            className="hidden w-52 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-slate-400 focus:border-investigative-amber focus:outline-none lg:block"
          />

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-md p-2 hover:bg-white/10 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
          <input
            type="search"
            placeholder="Search stories..."
            aria-label="Search stories"
            className="my-3 w-full rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-investigative-amber focus:outline-none"
          />
          <ul className="flex flex-col">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                      active
                        ? "bg-white/10 text-investigative-amber"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}