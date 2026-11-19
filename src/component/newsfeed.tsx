"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NewsCard, { NewsCardProps } from "./NewsCard";

type Props = {
  articles: Omit<NewsCardProps, "variant">[];
  heroCount?: number; // big swipeable cards at the top
  rowCount?: number;  // short cards under the carousel
};

export default function NewsFeed({
  articles,
  heroCount = 4,
  rowCount = 8,
}: Props) {
  const [showGrid, setShowGrid] = useState(false);
  const [active, setActive] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Remove duplicate stories (same clusterId)
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return articles.filter((a) => {
      if (seen.has(a.clusterId)) return false;
      seen.add(a.clusterId);
      return true;
    });
  }, [articles]);

  const heroes = unique.slice(0, heroCount);
  const rows = unique.slice(heroCount, heroCount + rowCount);
  const gridArticles = unique.slice(heroCount + rowCount);

  // Track which slide is visible (for the dots)
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(heroes.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  // Reveal the grid near the end of the rows
  useEffect(() => {
    if (showGrid || !sentinelRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowGrid(true),
      { rootMargin: "200px" }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [showGrid]);

  return (
    <div className="bg-neutral-900 pb-10">
      <section className="mx-auto max-w-3xl">
        {/* Swipeable big cards */}
        {heroes.length > 0 && (
          <div className="relative">
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {heroes.map((a) => (
                <div key={a.clusterId} className="w-full shrink-0 snap-center">
                  <NewsCard {...a} variant="hero" />
                </div>
              ))}
            </div>

            {/* Arrows (desktop) */}
            {heroes.length > 1 && (
              <>
                <button
                  onClick={() => goTo(active - 1)}
                  disabled={active === 0}
                  aria-label="Previous story"
                  className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-30 md:flex"
                >
                  ‹
                </button>
                <button
                  onClick={() => goTo(active + 1)}
                  disabled={active === heroes.length - 1}
                  aria-label="Next story"
                  className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-30 md:flex"
                >
                  ›
                </button>
              </>
            )}

            {/* Dots */}
            {heroes.length > 1 && (
              <div className="flex justify-center gap-2 py-3">
                {heroes.map((a, i) => (
                  <button
                    key={a.clusterId}
                    onClick={() => goTo(i)}
                    aria-label={`Go to story ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-6 bg-white" : "w-2 bg-neutral-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Short cards */}
        <div className="divide-y divide-neutral-700">
          {rows.map((a) => (
            <NewsCard key={a.clusterId} {...a} variant="row" />
          ))}
        </div>
      </section>

      <div ref={sentinelRef} className="h-px" />

      {/* Remaining articles in one 3-column grid */}
      {showGrid && gridArticles.length > 0 && (
        <section className="mx-auto mt-10 max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((a) => (
              <NewsCard key={a.clusterId} {...a} variant="grid" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}