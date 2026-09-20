import { prisma } from "@/lib/prisma";

export async function CreatingCluster(articleId : string) {
    const cluster = await prisma.storyCluster.create({
        data : {}
    });

    await prisma.article.update({
        where :{
            id : articleId
        },
        data : {
            clusterId : cluster.id
        }
    })

    return cluster.id;
}