import { extract } from "@extractus/article-extractor";
import { normalizeUrl } from "./url";
import { cleanArticleContent } from "@/cleaningContent/clean";
import { prisma } from "@/lib/prisma";
import pLimit from "p-limit";

export interface NormalizedArticle {
  url: string;
  title: string;
  description: string | null;
  content: string | null;
  author: string | null;
  imageUrl: string | null;
  source: string;
  publishedAt: Date | null;
}

export interface Articles {
  link?: string;
  title?: string;
  guid?: string;
  description?: string;
  publishedAt?: string;
}

export async function IngestionArticles(articles: Articles[], source : string) {
  const limit = pLimit(5);

  //allsetteled did not stop even when one promise get failed
  const result = await Promise.allSettled(
    articles.map((rssArticle) =>
      limit(async () => {
        const targetUrl = rssArticle.link ? rssArticle.link : rssArticle.guid;

        if (!targetUrl) {
          throw new Error("RSS article has no URL");
        }

        //console.log(targetUrl);
        const url = normalizeUrl(targetUrl);
        //console.log(url);

        const article = await extract(url);
        //console.log(article);
        if (!article) {
          throw new Error(`Could not extract article: ${url}`);
        }

        const normalizedArticle: NormalizedArticle = {
          url: url,
          title: article.title ?? "",
          description: article.description ?? null,
          content: article.content
            ? cleanArticleContent(article.content)
            : null,
          author: article.author ?? null,
          imageUrl: article.image ?? null,
          source: source,
          publishedAt: article.published ? new Date(article.published) : null,
        };

        return await prisma.article.upsert({
          where: {
            url,
          },
          update: {},
          create: normalizedArticle,
        });
      }),
    ),
  );

  const success = result.filter((r) => r.status === "fulfilled");
  const rejected = result.filter((r) => r.status === "rejected");

  return {
    msg: "Articles processed",
    Totalcount: articles.length,
    success: success.length,
    rejected: rejected.length,
  };
}
