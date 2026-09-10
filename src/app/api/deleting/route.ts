import { prisma } from "@/lib/prisma";

const Delete_article_without_embedding = async () => {
  try {
    await prisma.$queryRaw`
    DELETE FROM "Article" 
    WHERE "embedding" IS NULL;`
    
    return Response.json({ msg: "Deletion done!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ msg: "something went wrong" }, { status: 500 });
  }
};

export const GET = Delete_article_without_embedding;
