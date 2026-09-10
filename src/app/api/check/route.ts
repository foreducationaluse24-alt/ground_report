import { findSimilarArticles } from "@/embedding/findSimilarity";
import { prisma } from "@/lib/prisma";

const Check = async () => {
  try {
    const articleRandom = await prisma.$queryRaw<
      {
        id: string;
        title: string;
        source: string;
      }[]
    >`
  SELECT
    "id",
    "title",
    "source"
  FROM "Article"
  WHERE "embedding" IS NOT NULL
  LIMIT 1
`;

    if (!articleRandom) {
      return Response.json({
        error: "No embedded article found",
      });
    }

    const response = await findSimilarArticles(articleRandom[0].id, 10);

    return Response.json({
      originalArticle: articleRandom,
      similarArticles: response,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        msg: "Something went wrong!",
      },
      {
        status: 500,
      },
    );  
  }
};

export const GET = Check;
