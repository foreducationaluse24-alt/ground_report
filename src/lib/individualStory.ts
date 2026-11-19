import { Prisma } from "../../generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "./timeAgo";
import { excerpt } from "./excerpt";
import { getClusterCoverageAnalysis } from "@/services/clustering/getClusterCoverageAnalysis";


export type Side = "Left" | "Center" | "Right" | "Unrated";

const SIDE: Record<string, Side> = {
  LEFT: "Left",
  LEAN_LEFT: "Left",
  CENTRE: "Center",
  LEAN_RIGHT: "Right",
  RIGHT: "Right",
};

type Row = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  preview: string | null;
  imageUrl: string | null;
  outletId: string;
  outlet: string;
  outletDomain: string;
  bias: string | null;
  factuality: number | null;
  date: Date;
};

// Fetches a story's articles, selects its lead article, and combines publication coverage with bias analysis.
export async function getStory(clusterId: string) {
  const rows = await prisma.$queryRaw<Row[]>(Prisma.sql`
    SELECT
      a.id,
      a.title,
      a.url,
      a.description,
      LEFT(a.content, 300) AS preview,
      a."imageUrl",
      a."outletId",
      o.name AS outlet,
      o.domain AS "outletDomain",
      o.bias::text AS bias,
      o."factualityScore" AS factuality,
      COALESCE(a."publishedAt", a."createdAt") AS date
    FROM "Article" a
    JOIN "Outlet" o ON o.id = a."outletId"
    WHERE a."clusterId" = ${clusterId}
    ORDER BY date DESC
  `);

  if (rows.length === 0) return null;

  const articles = rows.map((r) => ({
    id: r.id,
    title: r.title,
    url: r.url,
    snippet: excerpt(r.preview, 350) || r.description,
    imageUrl: r.imageUrl,
    outletId: r.outletId,
    outlet: r.outlet,
    factuality: r.factuality,
    side: (r.bias ? SIDE[r.bias] : "Unrated") as Side,
    date: r.date,
  }));

  // Lead article: image first, then factuality score, then publication date.
  const lead = [...articles].sort(
    (a, b) =>
      Number(!!b.imageUrl) - Number(!!a.imageUrl) ||
      (b.factuality ?? -1) - (a.factuality ?? -1) ||
      b.date.getTime() - a.date.getTime(),
  )[0];

  // Keep only the newest article for each publication domain.
  const sideByDomain = new Map<string, Side>();

  for (let i = 0; i < rows.length; i++) {
    const domain = rows[i].outletDomain;

    if (!sideByDomain.has(domain)) {
      sideByDomain.set(domain, articles[i].side);
    }
  }

  // Three-group publication counts for the existing frontend.
  const coverage = { left: 0, center: 0, right: 0 };

  for (const side of sideByDomain.values()) {
    if (side === "Left") coverage.left++;
    else if (side === "Center") coverage.center++;
    else if (side === "Right") coverage.right++;
  }

  // Reuse the existing five-category comparison and coverage-gap helpers.
  const { comparison, coverageGap } =
    await getClusterCoverageAnalysis(clusterId);


  return {
    headline: lead.title,
    summary: lead.snippet ?? "Summary not available",
    articlesCount: articles.length,
    publicationsCount: sideByDomain.size,
    lastUpdated: timeAgo(articles[0].date),

    coverage,
    comparison,
    coverageGap,
    articles,
  };
}
