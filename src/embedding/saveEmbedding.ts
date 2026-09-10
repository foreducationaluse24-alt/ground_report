import { prisma } from "@/lib/prisma";
import pgvector from 'pgvector'

export async function saveEmbeddings(embeddings : number[],articleId : string){
    const vector = pgvector.toSql(embeddings);  // number[] gets converted into something PostgreSQL understands as a vector:

    await prisma.$executeRaw`
    UPDATE "Article" SET "embedding" = ${vector}::vector 
    WHERE "id" = ${articleId}`;

}