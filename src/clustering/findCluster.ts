import { prisma } from "@/lib/prisma";


const Similarity_threshold = 0.2;

export async function findCluster(articleId: string) {
  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      publishedAt: true,
    },
  });

  if (!article) {
    throw Error(`article not found ${articleId}`);
  }

  const candidates = await prisma.$queryRaw<
    {
      id: string;
      title: string;
      source: string;
      publishedAt: string;
      similarity: number;
    }[]
  >` SELECT
    candidate."id",
    candidate."title",
    candidate."source",
    candidate."publishedAt",

    1 - (
      candidate."embedding" <=> target."embedding"
    ) AS similarity

  FROM "Article" candidate

  CROSS JOIN "Article" target

  WHERE
    target."id" = ${articleId}

    AND candidate."embedding" IS NOT NULL

    AND candidate."id" != target."id"

    AND candidate."publishedAt" IS NOT NULL
    AND target."publishedAt" IS NOT NULL

    AND candidate."publishedAt"
      BETWEEN target."publishedAt" - INTERVAL '24 hours'
      AND target."publishedAt" + INTERVAL '24 hours'

  ORDER BY
    candidate."embedding" <=> target."embedding"

  LIMIT 20`;

    const similarCandidates = candidates.filter((articles)=>articles.similarity >= Similarity_threshold)

    return candidates;

}
