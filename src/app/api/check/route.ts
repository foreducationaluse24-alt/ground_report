import { findSimilarArticles } from "@/clustering/findSimilarity";
import { prisma} from "@/lib/prisma";

const Check = async () => {
  try {
    const articles = await prisma.article.findMany({
    where: {
      clusterId : "cmuju4bv6002yboydod7i33hs",
    },
    select: {
      id: true,
      title: true,
      outlet: {
        select: {
          name: true,
          domain: true,
          bias: true,
          factualityScore: true,
        },
      },
    },
  });

  return Response.json(articles);

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