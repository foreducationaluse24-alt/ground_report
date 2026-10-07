import Rss_Parser from "@/lib/rss";

const check2 = async () => {
  try {
    const articles = await Rss_Parser(
      "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
    );
    const response = await fetch(
      "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOWEtXZ3gxSXRQejgzMEFqZFdudGYwSWdvUDB5cGVmckloeG9OLWR0Ml8xbWVmLTZjSmI0TWw5QnQ4WGY5cVppYjVDbUhZYUpTSVhFUFFtbjExeUEwRTBVSVUxRTRxRFU3M0hvUXdKcWpVRndxSjJuNEZXc0VtRnhfa1ZiLThJSWdIcFlZbjBLTFlJZHc0RE5QVFIzUkE1SkZyQTFXT1RxMWlWZw?oc=5url",
    );

    const html = await response.text();
    
    console.log(html.includes("http"));
    console.log(html.slice(0, 10000));

    return Response.json({articleNO : articles.length, articles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({
      msg: "something went wrong",
      error: String(error),
    });
  }
};

async function resolveArticleUrl(url: string) {
  const response = await fetch(url, {
    redirect: "follow",
  });

  return response.url;
}

/*

https://www.firstpost.com/rss/india.xml                 
https://www.firstpost.com/commonfeeds/v1/mfp/rss/india.xml                #200    


https://www.freepressjournal.in/stories.rss                               #128

https://economictimes.indiatimes.com/rssfeedsdefault.cms" 

https://feeds.feedburner.com/ndtvnews-top-stories                          #20

https://www.deccanchronicle.com/feeds.xml                                   #485
https://www.nationalheraldindia.com/stories.rss?section=news                #11
https://www.nationalheraldindia.com/stories.rss                             #11   (prefer)

https://feeds.washingtonpost.com/rss/world                                  #10

http://rss.cnn.com/rss/cnn_world.rss



https://indianexpress.com/section/india/feed/

*/

export const GET = check2;

// https://news.google.com/rss/articles/CBMiqgFBVV95cUxOWEtXZ3gxSXRQejgzMEFqZFdudGYwSWdvUDB5cGVmckloeG9OLWR0Ml8xbWVmLTZjSmI0TWw5QnQ4WGY5cVppYjVDbUhZYUpTSVhFUFFtbjExeUEwRTBVSVUxRTRxRFU3M0hvUXdKcWpVRndxSjJuNEZXc0VtRnhfa1ZiLThJSWdIcFlZbjBLTFlJZHc0RE5QVFIzUkE1SkZyQTFXT1RxMWlWZw?oc=5

// https://www.reuters.com/technology/mongodb-ceo-desai-steps-down-lead-metas-enterprise-platform-2026-09-28/
