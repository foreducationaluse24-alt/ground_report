import { cleanArticleContent } from "@/cleaningContent/clean";
import Rss_Parser from "@/ingestion/rss";
import { normalizeUrl } from "@/ingestion/url";
import { extract } from "@extractus/article-extractor";

export interface Article {
  url: string;
  title: string;
  description: string | null;
  content: string | null;
  author: string | null;
  imageUrl: string | null;
  source: string;
  publishedAt: Date | null;
}
//https://www.thehindu.com/feeder/default.rss
//

const Articles = async () => {
  const articles = await Rss_Parser("https://feeds.bbci.co.uk/news/rss.xml");

  const targetUrl = articles[0].link ? articles[0].link : articles?.[0]?.guid;
 
  if (!targetUrl) {
    return Response.json(
      { msg: "Unable to find a valid article URL in RSS feed" },
      { status: 502 },
    );
  }

  console.log(targetUrl)
  const url = normalizeUrl(targetUrl)
  console.log(url)

  try {
    const article = await extract(url);
    //console.log(article);
    if (!article) {
      return Response.json(
        { msg: "Unable to extract article content" },
        { status: 422 },
      );
    }

    const normalizedArticle: Article = {
      url: url,
      title: article.title ?? "",
      description: article.description ?? null,
      content: article.content ? cleanArticleContent(article.content) : null,
      author: article.author ?? null,
      imageUrl: article.image ?? null,
      source: article.source ?? "",
      publishedAt: article.published ? new Date(article.published) : null,
    };

    return Response.json(normalizedArticle);
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        msg: `something went wrong`,
      },
      { status: 500 },
    );
  }
};

export const GET = Articles;
