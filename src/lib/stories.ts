import { Prisma } from "../../generated/prisma/client"; 
import { prisma } from "@/lib/prisma"; // your PrismaClient instance
import type { NewsCardProps } from "@/component/NewsCard";
import { timeAgo } from "./timeAgo";

export const PAGE_SIZE = 12;
type Story = Omit<NewsCardProps, "variant">;

type Row = {
  clusterId: string;
  headline: string;
  snippet: string | null;
  imageUrl: string | null;
  source: string;
  publications: number;
  factuality: number | null;
  left_pct: number | null;
  right_pct: number | null;
  latest_at: Date;
  total: number;
};



export async function getStories(page: number) {
  const limit = PAGE_SIZE;
  const offset = (page - 1) * PAGE_SIZE;

  const rows = await prisma.$queryRaw<Row[]>(Prisma.sql`
    WITH recent AS (
      SELECT
        a."clusterId", a.title, a.description, a."imageUrl",
        COALESCE(a."publishedAt", a."createdAt") AS ts,
        o.id AS outlet_id, o.name AS outlet_name,
        o.bias, o."factualityScore"
      FROM "Article" a
      JOIN "Outlet" o ON o.id = a."outletId"
      WHERE a."clusterId" IS NOT NULL
        AND COALESCE(a."publishedAt", a."createdAt") > NOW() - INTERVAL '300 days'
    ),
    stats AS (
      SELECT
        "clusterId",
        COUNT(DISTINCT outlet_id)::int AS publications,
        COUNT(DISTINCT outlet_id) FILTER (WHERE bias IN ('LEFT','LEAN_LEFT'))::int   AS left_n,
        COUNT(DISTINCT outlet_id) FILTER (WHERE bias = 'CENTRE')::int                AS center_n,
        COUNT(DISTINCT outlet_id) FILTER (WHERE bias IN ('RIGHT','LEAN_RIGHT'))::int AS right_n,
        AVG("factualityScore") AS factuality,
        MAX(ts) AS latest_at
      FROM recent
      GROUP BY "clusterId"
      HAVING COUNT(DISTINCT outlet_id) >= 2
    ),
    lead AS (
      SELECT DISTINCT ON ("clusterId")
        "clusterId", title, description, "imageUrl", outlet_name
      FROM recent
      ORDER BY "clusterId", ("imageUrl" IS NOT NULL) DESC, ts DESC
    )
    SELECT
      s."clusterId",
      l.title        AS headline,
      l.description  AS snippet,
      l."imageUrl",
      l.outlet_name  AS source,
      s.publications,
      s.factuality,
      s.latest_at,
      ROUND(100.0 * s.left_n  / NULLIF(s.left_n + s.center_n + s.right_n, 0))::int AS left_pct,
      ROUND(100.0 * s.right_n / NULLIF(s.left_n + s.center_n + s.right_n, 0))::int AS right_pct,
      (COUNT(*) OVER ())::int AS total
    FROM stats s
    JOIN lead l USING ("clusterId")
    ORDER BY
      s.publications
        / POWER(GREATEST(EXTRACT(EPOCH FROM (NOW() - s.latest_at)) / 3600, 0) + 2, 1.5) DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  const items: Story[] = rows.map((r) => {
    const hasBias = r.left_pct !== null && r.right_pct !== null;
    // factualityScore scale isn't known: treat <=1 as a 0-1 value
    const cred =
      r.factuality === null ? undefined : r.factuality <= 1 ? r.factuality * 100 : r.factuality;

    return {
      clusterId: r.clusterId,
      headline: r.headline,
      snippet: r.snippet ?? "",
      imageUrl: r.imageUrl ?? undefined,
      source: r.source,
      timeAgo: timeAgo(r.latest_at),
      publications: r.publications,
      credibility: cred !== undefined ? Math.round(cred) : undefined,
      bias: hasBias
        ? {
            left: r.left_pct!,
            right: r.right_pct!,
            center: 100 - r.left_pct! - r.right_pct!,
          }
        : undefined,
    };
  });

  return { items, total: rows[0]?.total ?? 0 };
}