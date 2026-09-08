import { normalizeUrl } from "./url";
import { cleanArticleContent } from "@/cleaningContent/clean";
import { prisma } from "@/lib/prisma";
import pLimit from "p-limit";
import { contentHashing } from "./fingerprint";
import { isValidArticle } from "./articleValidation";
import { Prisma } from "@/generated/prisma/client";
import { articleExtracter } from "./extractArticle";
import { parseArticleDate } from "./dateValidation";

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

type InsertedResult = {
  status: "inserted";
  articleId: string;
};

type DuplicateResult = {
  status: "duplicated";
};

type InvalidResult = {
  status: "invalid";
};

type Result =
  | InsertedResult
  | DuplicateResult
  | InvalidResult;

//type guard function
function isFulfilled<T>(
  result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> {
  return result.status === "fulfilled";
}
//type guard function
function isInserted(
  result: Result,
): result is InsertedResult {
  return result.status === "inserted";
}



export async function IngestionArticles(
  articles: RssArticle[],
  source: string,
) {
  const limit = pLimit(5);

  //allsetteled did not stop even when one promise get failed
  const result = await Promise.allSettled(
    articles.map((rssArticle) =>
      limit(async ():Promise<Result> => {
        const targetUrl = rssArticle.link ?? rssArticle.guid;

        if (!targetUrl) {
          return { status: "invalid" };
        }

        try {
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

          const article = await articleExtracter(url);
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
            imageUrl: article.imageUrl ?? null,
            source: source,
            publishedAt: parseArticleDate(
              article.publishedAt,
              rssArticle.publishedAt,
            ),
          };

          const createdArticle = await prisma.article.create({
            data: normalizedArticle,
          });

          return { status: "inserted", articleId: createdArticle.id };
        } catch (err) {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
          ) {
            return { status: "duplicated" };
          }
          console.error("Article ingestion failed:", {
            url: targetUrl,
            error: err,
          });
          throw err;
        }
      }),
    ),
  );

 const fulfilledResults = result.filter(isFulfilled);

const insertedArticles = fulfilledResults
  .map((r) => r.value)
  .filter(isInserted);

const duplicateArticles = fulfilledResults.filter(
  (r) => r.value.status === "duplicated",
);

const invalidArticles = fulfilledResults.filter(
  (r) => r.value.status === "invalid",
);

const failedArticles = result.filter(
  (r) => r.status === "rejected",
);

const articleIds = insertedArticles.map(
  (article) => article.articleId,
);

  return {
    msg: `Articles processed`,
    Totalcount: articles.length,
    inserted: insertedArticles.length,
    duplicatedArticles: duplicateArticles.length,
    invalid: invalidArticles.length,
    failed: failedArticles.length,
    articleIds,
  };
}
