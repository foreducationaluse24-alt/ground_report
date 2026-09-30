import { prisma } from "@/lib/prisma"; 

export async function getClusterCoverage(clusterId: string) {
  const articles = await prisma.article.findMany({
    where: {
      clusterId,
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

  return articles;
}