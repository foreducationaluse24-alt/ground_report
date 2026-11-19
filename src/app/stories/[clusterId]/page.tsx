import { notFound } from "next/navigation";
import CoverageDistribution from "@/component/CoverageDistribution";
import PublicationCard from "@/component/PublicationCard";
import StoryOverview from "@/component/StoryOverview";
import { getStory } from "@/lib/individualStory";
import Link from "next/link";

type StoryPageProps = {
  params: Promise<{ clusterId: string }>;
};

const BIAS_CATEGORIES = [
  { key: "LEFT", label: "Left" },
  { key: "LEAN_LEFT", label: "Lean Left" },
  { key: "CENTRE", label: "Center" },
  { key: "LEAN_RIGHT", label: "Lean Right" },
  { key: "RIGHT", label: "Right" },
] as const;

// Fetches a story and renders its overview, coverage comparison, and grouped publications.
export default async function StoryPage({ params }: StoryPageProps) {
  const { clusterId } = await params;

  const story = await getStory(clusterId);

  if (!story) notFound();

  const groups = (["Left", "Center", "Right", "Unrated"] as const)
    .map((side) => ({
      side,
      items: story.articles.filter((article) => article.side === side),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Story heading */}
      <section>
        <p className="text-sm font-medium uppercase tracking-wider text-investigative-amber">
          Story Analysis
        </p>

        <h1 className="mt-3 font-serif text-3xl font-bold text-investigative-navy">
          {story.headline}
        </h1>
      </section>

      {/* Story overview */}
      <section className="rounded-xl border border-investigative-border bg-investigative-card p-6">
        <StoryOverview
          summary={story.summary}
          articlesCount={story.articlesCount}
          publicationsCount={story.publicationsCount}
          lastUpdated={story.lastUpdated}
        />
      </section>

      {/* Raw publication coverage */}
      <section >
        <CoverageDistribution
          left={story.coverage.left}
          center={story.coverage.center}
          right={story.coverage.right}
        />
      </section>

      {/* Cluster vs overall bias comparison */}
      {/* Coverage comparison */}
<section className="rounded-xl border border-investigative-border bg-investigative-card p-6">
  <div className="mb-6 flex items-center justify-between gap-3">
    <div>
      <h2 className="font-serif text-xl font-bold">
        Coverage Compared to Overall Sources
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Distribution of publications covering this story compared to all tracked sources.
      </p>
    </div>

    <Link
      href="/docs/coverage-comparison"
      className="shrink-0 text-xs font-medium text-investigative-amber underline-offset-4 hover:underline"
    >
      How it works ↗
    </Link>
  </div>

  <div className="space-y-5">
    {BIAS_CATEGORIES.map(({ key, label }) => {
      const data = story.comparison[key];

      return (
        <div key={key} className="space-y-2">
          <h3 className="text-sm font-semibold text-investigative-navy">
            {label}
          </h3>

          {/* This story */}
          <div className="flex items-center gap-3">
            <span className="w-[72px] shrink-0 text-xs text-slate-500">
              This story
            </span>

            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#29445F]"
                style={{
                  width: `${Math.min(100, Math.max(0, data.cluster))}%`,
                }}
              />
            </div>

            <span className="w-10 shrink-0 text-right text-xs tabular-nums text-slate-600">
              {data.cluster.toFixed(1)}%
            </span>
          </div>

          {/* Overall sources */}
          <div className="flex items-center gap-3">
            <span className="w-[72px] shrink-0 text-xs text-slate-500">
              Overall
            </span>

            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-investigative-amber"
                style={{
                  width: `${Math.min(100, Math.max(0, data.overall))}%`,
                }}
              />
            </div>

            <span className="w-10 shrink-0 text-right text-xs tabular-nums text-slate-600">
              {data.overall.toFixed(1)}%
            </span>
          </div>
        </div>
      );
    })}
  </div>

  <div className="mt-6 border-t border-investigative-border pt-4">
    <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#29445F]" />
        This story
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-investigative-amber" />
        Overall sources
      </div>
    </div>
  </div>
</section>

      {/* Publications grouped by simplified bias */}
      <section className="space-y-8">
        <h2 className="font-serif text-xl font-bold">
          How Different Sources Reported It
        </h2>

        {groups.map(({ side, items }) => (
          <div key={side}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              {side} · {items.length}
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {items.map((article) => (
                <PublicationCard
                  key={article.id}
                  source={article.outlet}
                  bias={article.side}
                  headline={article.title}
                  redirect={article.url}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}