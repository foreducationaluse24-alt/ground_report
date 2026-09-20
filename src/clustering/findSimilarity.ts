import { prisma } from "@/lib/prisma";

export async function findSimilarArticles(articleId: string, limit : number) {
  const articles = await prisma.$queryRaw<
    {
      id: string;
      title: string;
      source: string;
      clusterId : string | null;
      publishedAt: Date | null;
      similarity: number;
    }[]
  >`
    SELECT
      a."id",
      a."title",
      a."source",
      a."clusterId",
      a."publishedAt",
      1 - (
        a."embedding" <=> target."embedding"
      ) AS similarity
    FROM "Article" a
    CROSS JOIN "Article" target
    WHERE
      target."id" = ${articleId}
      AND a."embedding" IS NOT NULL
      AND a."id" != ${articleId}
      AND 1 - (
            a."embedding" <=> target."embedding"
        ) > 0.75
    ORDER BY
      a."embedding" <=> target."embedding"
    LIMIT ${limit}
  `;

  return articles;
}
