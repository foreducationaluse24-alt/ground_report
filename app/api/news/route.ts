import { embedArticle } from "@/embedding/embedArticle";
import { feeds } from "@/feeds/source";
import { IngestionArticles } from "@/ingestion/ingestArticles";
import Rss_Parser from "@/ingestion/rss";

const Articles = async () => {
  const result = [];

  for (const feed of feeds) {
    console.log(`Processing ${feed.name} url`);
    const articles = await Rss_Parser(feed.rssUrl);

    const res = await IngestionArticles(articles, feed.name); // return success failed obj

    //genrating embedding for aticles that just been saved into database
    for(const articleId of res.articleIds){
        await embedArticle(articleId);
    }
  
    result.push({
      source: feed.name,
      ...res,
    });
  }
  return Response.json(result);
};

export const GET = Articles;
