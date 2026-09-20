import { getClusterArticles } from "@/clustering/getClusterArticles";


export async function GET (req : Request, {params} : {params : Promise<{clusterId : string}>} ){
    const {clusterId} = await params;

    const articles = await getClusterArticles(clusterId);

    return Response.json({
        clusterId,
        articleCount : articles.length,
        articles
    })
}