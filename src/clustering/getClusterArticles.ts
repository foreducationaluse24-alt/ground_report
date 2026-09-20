import { prisma } from "@/lib/prisma";

export async function getClusterArticles(clusterId: string) {
  return prisma.article.findMany({
    where: {
      clusterId,
    },
    select: {
      id: true,
      title: true,
      source: true,
      publishedAt: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}