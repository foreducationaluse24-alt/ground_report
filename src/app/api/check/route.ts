import { findSimilarArticles } from "@/clustering/findSimilarity";
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
  WHERE "embedding" IS NOT NULL;
`;

    if (!articleRandom) {
      return Response.json({
        error: "No embedded article found",
      });
    }
    const b = []
    for(const a of articleRandom){
      const response = await findSimilarArticles(a.id, 10);
      b.push({originalArticle : a.title , similar : response});
    }

    return Response.json({
      b

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
