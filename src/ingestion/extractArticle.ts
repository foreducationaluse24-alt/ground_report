import { extract } from "@extractus/article-extractor";

export async function articleExtracter(url: string) {
  const article = await extract(url);

  if (!article) {
    return null;
  }

  return {
    title: article.title ?? null,
    description: article.description ?? null,
    content: article.content ?? null,
    author: article.author ?? null,
    imageUrl: article.image ?? null,
    publishedAt: article.published ?? null,
  };
}
