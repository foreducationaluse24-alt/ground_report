import { prisma } from "@/lib/prisma";
import { generateEmbeddings } from "./embedding";
import { saveEmbeddings } from "./saveEmbedding";



export async function embedArticle(articleId: string) {
  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
    },
  });

  if (!article) {
    throw new Error(`Article not found: ${articleId}`);
  }

  const text = [
    article.title,
    article.description,
    article.content,
  ]
    .filter(Boolean)
    .join("\n");

  const embedding = await generateEmbeddings(text);

  await saveEmbeddings(embedding ,article.id);
}