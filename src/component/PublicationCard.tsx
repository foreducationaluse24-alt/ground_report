import Link from "next/link";

type PublicationCardProps = {
  source: string;
  headline: string;
  bias: "Left" | "Center" | "Right" | "Unrated";
  redirect: string;
};

export default function PublicationCard({
  source,
  headline,
  bias,
  redirect,
}: PublicationCardProps) {
  const biasStyle = {
    Left: "bg-blue-100 text-blue-800",
    Center: "bg-slate-100 text-slate-700",
    Right: "bg-rose-100 text-rose-800",
    Unrated: "bg-amber-100 text-amber-800",
  };

  return (
    <Link
      href={redirect}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <article className="flex h-full flex-col justify-between rounded-xl border border-investigative-border bg-investigative-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-investigative-amber hover:shadow-md">
        <div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="font-semibold text-investigative-navy">
              {source}
            </h3>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${biasStyle[bias]}`}
            >
              {bias}
            </span>
          </div>

          <h2 className="font-serif text-xl font-semibold leading-snug text-investigative-navy transition-colors group-hover:text-investigative-amber sm:text-2xl">
            {headline}
          </h2>
        </div>

        {/* Bottom CTA aligned across all cards */}
        <div className="mt-6 pt-3 border-t border-investigative-border/50 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-200 group-hover:text-investigative-navy">
            Read original article
            <svg
              className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-investigative-amber"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}