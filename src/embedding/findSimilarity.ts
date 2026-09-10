import { prisma } from "@/lib/prisma";

export async function findSimilarArticles(articleId: string, limit = 10) {
  const articles = await prisma.$queryRaw<
    {
      id: string;
      title: string;
      source: string;
      similarity: number;
    }[]
  >`
    SELECT
      a."id",
      a."title",
      a."source",
      1 - (
        a."embedding" <=> target."embedding"
      ) AS similarity
    FROM "Article" a
    CROSS JOIN "Article" target
    WHERE
      target."id" = ${articleId}
      AND a."embedding" IS NOT NULL
      AND a."id" != ${articleId}
    ORDER BY
      a."embedding" <=> target."embedding"
    LIMIT ${limit}
  `;

  return articles;
}
