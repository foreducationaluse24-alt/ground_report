import { prisma } from "@/lib/prisma";
import { findSimilarArticles } from "./findSimilarity";
import { CreatingCluster } from "./creatingCluster";

interface ExistingCluster {
  type: "existing";
  clusterId: string;
  matchedArticleId: string;
  similarity: number;
  publishedAt: Date;
}

interface NewCluster {
  type: "new";
  clusterId: string;
}

interface ClusterError {
  type: "error";
  error: string;
}

type findClusterREturnTpe = ExistingCluster | NewCluster | ClusterError;

const Similarity_threshold = 0.7;

export async function findCluster(
  articleId: string,
): Promise<findClusterREturnTpe> {
  
  try {

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
    const similarArticles = await findSimilarArticles(articleId, 10);

    //filter
    const similarCandidates = similarArticles.filter((candidate) => {
      if (
        candidate.similarity < Similarity_threshold ||
        !candidate.publishedAt ||
        !article.publishedAt
      ) {
        return false;
      }

      const timeDifference = Math.abs(
        candidate.publishedAt.getTime() - article.publishedAt.getTime(),
      );
      // console.log(`time_difference : ${timeDifference}`);

      const twentyFourHours = 24 * 60 * 60 * 1000;

      return timeDifference <= twentyFourHours; // true: keep this article, false : discard it
    });

    //checking if cluster already exist for this particular article
    const existingCluster = similarCandidates.find(
      (candidate) => candidate.clusterId !== null,
    );

    if (existingCluster) {
      await prisma.article.update({
        where: { id: articleId },
        data: { clusterId: existingCluster.clusterId },
      });

      return {
        type: "existing",
        clusterId: existingCluster.clusterId!,
        matchedArticleId: existingCluster.id,
        similarity: existingCluster.similarity,
        publishedAt: existingCluster.publishedAt!,
      };
    }

    //Making a cluster id if cluster is not present which match
    const clusterId = await CreatingCluster(articleId);

    return {
      type: "new",
      clusterId: clusterId,
    };
  } catch (error) {
    console.error(error);
    return { type: "error", error: String(error) };
  }
}
