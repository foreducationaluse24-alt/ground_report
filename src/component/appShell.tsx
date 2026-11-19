
"use client";

import { useState } from "react";
import Sidebar from "./appBar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="fixed bottom-5 left-5 z-[60] rounded-full bg-investigative-navy p-3 text-white shadow-lg md:hidden"
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-16 left-0 z-40 transform transition-transform duration-300 md:sticky md:top-16 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
