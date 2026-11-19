
type StoryOverviewProps = {
  summary: string;
  articlesCount: number;
  publicationsCount: number;
  lastUpdated: string;
};

export default function StoryOverview({
  summary,
  articlesCount,
  publicationsCount,
  lastUpdated,
}: StoryOverviewProps) {
  const stats = [
    { label: "Articles", value: articlesCount },
    { label: "Publications", value: publicationsCount },
    { label: "Last updated", value: lastUpdated },
  ];

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-investigative-navy">
        Story Overview
      </h2>

      <p className="mt-3 leading-7 text-investigative-slate">
        {summary}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-investigative-border pt-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-xs text-investigative-slate">
              {stat.label}
            </p>

            <p className="mt-1 font-semibold text-investigative-navy">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
