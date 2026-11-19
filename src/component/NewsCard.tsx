import Link from "next/link";

export type Bias = { left: number; center: number; right: number };

export type NewsCardProps = {
  clusterId: string;
  headline: string;
  publications: number;
  topic?: string;
  location?: string;
  imageUrl?: string;
  bias?: Bias;
  variant?: "hero" | "row" | "grid";
  // accepted so existing call sites don't break
  source?: string;
  timeAgo?: string;
  credibility?: number;
  snippet?: string;
};

const COLORS = {
  left: "bg-[#9b2c2c]",
  center: "bg-white",
  right: "bg-[#1e4d9b]",
};

function getDominant(bias?: Bias) {
  if (!bias) return null;
  return (
    [
      ["Left", bias.left],
      ["Center", bias.center],
      ["Right", bias.right],
    ] as const
  ).reduce((a, b) => (b[1] > a[1] ? b : a));
}

function SmallBar({ bias }: { bias: Bias }) {
  return (
    <div className="flex h-[7px] w-20 shrink-0 overflow-hidden">
      <div className={COLORS.left} style={{ width: `${bias.left}%` }} />
      <div className={COLORS.center} style={{ width: `${bias.center}%` }} />
      <div className={COLORS.right} style={{ width: `${bias.right}%` }} />
    </div>
  );
}

function CoverageLine({
  bias,
  publications,
}: {
  bias?: Bias;
  publications: number;
}) {
  const dominant = getDominant(bias);
  return (
    <div className="mt-3 flex items-center gap-3">
      {bias && <SmallBar bias={bias} />}
      <span className="text-sm text-neutral-200">
        {dominant ? `${dominant[1]}% ${dominant[0]} coverage: ` : ""}
        {publications} sources
      </span>
    </div>
  );
}

export default function NewsCard({
  clusterId,
  headline,
  publications,
  topic,
  location,
  imageUrl,
  bias,
  variant = "row",
  source,
  timeAgo,
}: NewsCardProps) {
  const href = `/stories/${clusterId}`;
  const label =
    topic || location
      ? [topic, location].filter(Boolean).join(" · ")
      : [source, timeAgo].filter(Boolean).join(" · ");

  /* ---------- HERO ---------- */
  if (variant === "hero") {
    return (
      <Link
        href={href}
        className="group relative block aspect-[4/3] w-full overflow-hidden bg-neutral-700 text-white sm:aspect-[16/10]"
      >
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {/* gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          {label && <p className="mb-2 text-xs text-neutral-200">{label}</p>}
          <h2 className="font-sans text-3xl font-bold leading-[1.1] tracking-tight underline decoration-2 underline-offset-4 sm:text-4xl md:text-5xl">
            {headline}
          </h2>

          {/* Full-width labelled coverage bar */}
          {bias && (
            <div className="mt-4 flex h-7 w-full overflow-hidden text-xs font-semibold">
              <div
                className={`${COLORS.left} flex items-center justify-center`}
                style={{ width: `${bias.left}%` }}
              >
                L {bias.left}%
              </div>
              <div
                className={`${COLORS.center} flex items-center justify-center text-neutral-900`}
                style={{ width: `${bias.center}%` }}
              >
                 {bias.center ? `Center ${bias.center}%` : null}
              </div>
              <div
                className={`${COLORS.right} flex items-center justify-center`}
                style={{ width: `${bias.right}%` }}
              >
                Right {bias.right}%
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  /* ---------- GRID (vertical, used in 3 columns) ---------- */
  if (variant === "grid") {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col bg-neutral-800 text-white transition hover:bg-neutral-700/60"
      >
        <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-700">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          {label && (
            <p className="mb-2 text-xs text-neutral-300">{label}</p>
          )}
          <h3 className="line-clamp-3 font-sans text-xl font-bold leading-tight tracking-tight group-hover:underline">
            {headline}
          </h3>
          <div className="mt-auto">
            <CoverageLine bias={bias} publications={publications} />
          </div>
        </div>
      </Link>
    );
  }

  /* ---------- ROW (compact, thumbnail on right) ---------- */
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-4 bg-neutral-800 px-5 py-6 text-white transition hover:bg-neutral-700/60"
    >
      <div className="min-w-0 flex-1">
        {label && <p className="mb-2 text-xs text-neutral-300">{label}</p>}
        <h2 className="font-sans text-2xl font-bold leading-[1.15] tracking-tight group-hover:underline md:text-[28px]">
          {headline}
        </h2>
        <CoverageLine bias={bias} publications={publications} />
      </div>

      {imageUrl && (
        <div className="hidden h-[120px] w-[125px] shrink-0 overflow-hidden sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
    </Link>
  );
}