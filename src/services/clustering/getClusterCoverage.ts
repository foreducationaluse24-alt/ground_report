import { prisma } from "@/lib/prisma"; 

//"What articles/outlets are in this cluster?"
export async function getClusterCoverage(clusterId: string) {
  const articles = await prisma.article.findMany({
    where: {
      clusterId,
    },
    select: {
      id: true,
      title: true,
      url : true,
      publishedAt : true,
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

  return articles;
}