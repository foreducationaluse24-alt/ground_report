
const blindspotStories = [
  {
    id: "story-1",
    headline: "New environmental policy sparks debate",
    description:
      "A major policy announcement has received significantly more coverage from left-leaning publications.",
    left: 75,
    center: 40,
    right: 10,
    publications: 15,
  },
  {
    id: "story-2",
    headline: "Changes to international trade regulations",
    description:
      "Coverage of the proposed regulations is concentrated among right-leaning publications.",
    left: 15,
    center: 30,
    right: 80,
    publications: 22,
  },
];

// Displays stories with uneven coverage across publication categories.
export default function BlindspotsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Heading */}
      <section>
        <p className="text-sm font-medium uppercase tracking-wider text-investigative-amber">
          Media Coverage
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-investigative-navy">
          Blindspots
        </h1>

        <p className="mt-2 text-sm text-investigative-slate">
          Discover important stories receiving uneven attention
          across the political spectrum.
        </p>
      </section>

      {/* Story list */}
      <section className="space-y-5">
        {blindspotStories.map((story) => (
          <article
            key={story.id}
            className="rounded-xl border border-investigative-border bg-investigative-card p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-investigative-amber">
                Coverage Gap
              </span>

              <span className="text-xs text-investigative-slate">
                {story.publications} publications
              </span>
            </div>

            <h2 className="mt-3 font-serif text-xl font-bold text-investigative-navy">
              {story.headline}
            </h2>

            <p className="mt-2 text-sm leading-6 text-investigative-slate">
              {story.description}
            </p>

            <div className="mt-5 space-y-4">
              {[
                { label: "Left", value: story.left, color: "bg-blue-500" },
                { label: "Center", value: story.center, color: "bg-slate-500" },
                { label: "Right", value: story.right, color: "bg-rose-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-mono">{item.value}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-investigative-border pt-4">
              <a
                href={`/stories/${story.id}`}
                className="text-sm font-semibold text-investigative-navy hover:text-investigative-amber"
              >
                Read Full Analysis →
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
