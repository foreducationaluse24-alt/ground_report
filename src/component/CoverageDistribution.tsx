type CoverageDistributionProps = {
  left: number;
  center: number;
  right: number;
  unrated?: number;
};

export default function CoverageDistribution({
  left,
  center,
  right,
  unrated = 0,
}: CoverageDistributionProps) {
  const total = left + center + right + unrated;

  const categories = [
    {
      label: "Left",
      count: left,
      barColor: "bg-blue-600",
      badgeColor: "bg-blue-100 text-blue-800",
      dotColor: "bg-blue-600",
    },
    {
      label: "Center",
      count: center,
      barColor: "bg-slate-500",
      badgeColor: "bg-slate-100 text-slate-700",
      dotColor: "bg-slate-500",
    },
    {
      label: "Right",
      count: right,
      barColor: "bg-rose-600",
      badgeColor: "bg-rose-100 text-rose-800",
      dotColor: "bg-rose-600",
    },
    ...(unrated > 0
      ? [
          {
            label: "Unrated",
            count: unrated,
            barColor: "bg-amber-500",
            badgeColor: "bg-amber-100 text-amber-800",
            dotColor: "bg-amber-500",
          },
        ]
      : []),
  ];

  const getPercentage = (count: number) =>
    total === 0 ? 0 : (count / total) * 100;

  return (
    <div className="rounded-xl border border-investigative-border bg-investigative-card p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold uppercase tracking-wider text-slate-800">
          Coverage Distribution
        </h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-xs font-medium text-investigative-navy">
          {total} {total === 1 ? "source" : "sources"}
        </span>
      </div>

      {/* Unified Stacked Spectrum Bar */}
      <div
        className="mb-12 flex h-3 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 gap-0.5"
        role="img"
        aria-label="Media bias spectrum breakdown"
      >
        {total === 0 ? (
          <div className="h-full w-full rounded-full bg-slate-200" />
        ) : (
          categories.map((cat) => {
            const pct = getPercentage(cat.count);
            if (pct === 0) return null;

            return (
              <div
                key={cat.label}
                style={{ width: `${pct}%` }}
                className={`h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 ease-out ${cat.barColor}`}
                title={`${cat.label}: ${cat.count} (${pct.toFixed(1)}%)`}
              />
            );
          })
        )}
      </div>

      {/* Individual Category Breakdown */}
      <div className="space-y-4">
        {categories.map((category) => {
          const percentage = getPercentage(category.count);

          return (
            <div key={category.label} className="group">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${category.dotColor}`}
                  />
                  <span className="font-medium text-investigative-navy">
                    {category.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-slate-500">
                    {category.count}{" "}
                    {category.count === 1 ? "article" : "articles"}
                  </span>
                  <span
                    className={`min-w-[3.5rem] rounded px-1.5 py-0.5 text-right font-semibold ${category.badgeColor}`}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${category.barColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}