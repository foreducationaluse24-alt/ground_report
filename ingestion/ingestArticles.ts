import { extract } from "@extractus/article-extractor";
import { normalizeUrl } from "./url";
import { cleanArticleContent } from "@/cleaningContent/clean";
import { prisma } from "@/lib/prisma";
import pLimit from "p-limit";
import { contentHashing } from "./fingerprint";
import { isValidArticle } from "./articleValidation";
import { Prisma } from "@/generated/prisma/client";


export interface NormalizedArticle {
  url: string;
  title: string;
  description: string | null;
  content: string | null;
  author: string | null;
  hashedContent: string | null;
  imageUrl: string | null;
  source: string;
  publishedAt: Date | null;
}

export interface RssArticle {
  link?: string;
  title?: string;
  guid?: string;
  description?: string;
  publishedAt?: string;
}

type Result =
  | { status: "inserted" }
  | { status: "duplicated" }
  | { status: "invalid" };

export async function IngestionArticles(
  articles: RssArticle[],
  source: string,
) {
  const limit = pLimit(5);

  //allsetteled did not stop even when one promise get failed
  const result = await Promise.allSettled(
    articles.map((rssArticle) =>
      limit(async () => {
        const targetUrl = rssArticle.link ? rssArticle.link : rssArticle.guid;

        if (!targetUrl) {
          return { status: "invalid" };
        }

        //console.log(targetUrl);
        const url = normalizeUrl(targetUrl);
        //console.log(url);

        const urlExists = await prisma.article.findUnique({
          where: {
            url,
          },
        });

        if (urlExists) {
          return { status: "duplicated" }; //to count them as promised fulfilled
        }

        const article = await extract(url);

        //console.log(article);
        if (!article) {
          return { status: "invalid" };
        }

        const content = article.content
          ? cleanArticleContent(article.content)
          : null;
        const articleValidationTest = isValidArticle(
          article.title ?? "",
          content,
        );

        if (!articleValidationTest) {
          return { status: "invalid" };
        }

        const hashedContent = content ? contentHashing(content) : null;

        const normalizedArticle: NormalizedArticle = {
          url: url,
          title: article.title ?? "",
          description: article.description ?? null,
          content,
          hashedContent,
          author: article.author ?? null,
          imageUrl: article.image ?? null,
          source: source,
          publishedAt: article.published ? new Date(article.published) : null,
        };

        try {
          await prisma.article.create({
            data: normalizedArticle,
          });
          return { status: "inserted" };
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
          ) {
            return { status: "duplicated" };
          }
          throw err;
        }
      }),
    ),
  );

  const insertedArticles = result.filter(
    (r) => r.status === "fulfilled" && r.value.status === "inserted",
  );
  const duplicateArticles = result.filter(
    (r) => r.status === "fulfilled" && r.value.status === "duplicated",
  );
  const invalidArticles = result.filter(
    (r) => r.status === "fulfilled" && r.value.status === "invalid",
  );
  const failedArticles = result.filter((r) => r.status === "rejected");

  return {
    msg: `Articles processed`,
    Totalcount: articles.length,
    inserted: insertedArticles.length,
    duplicatedArticles: duplicateArticles.length,
    invalid: invalidArticles.length,
    failed: failedArticles.length,
  };
}
