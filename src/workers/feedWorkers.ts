import { findCluster } from "@/clustering/findCluster";
import { embedArticle } from "@/embedding/embedArticle";
import { IngestionArticles } from "@/ingestion/ingestArticles";
import Rss_Parser from "@/ingestion/rss";
import { Worker } from "bullmq";
import IORedis from "ioredis";

//BullMQ requires the Redis connection used by a Worker to have:  "maxRetriesPerRequest: null" bcz if redis connection fails bullmq worker must wait and continously running not give up after few retries.
const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const feedWorker = new Worker(
  "feed-ingestion", //"feed-ingestion" => That's how BullMQ knows:This worker handles jobs from this queue.
  async (job) => {
    const { feedName, rssUrl, domain } = job.data;
    console.log("------------------------------------------")
    console.log({
      feedName,
      rssUrl,
      domain,
    });
    const articles = await Rss_Parser(rssUrl);
    const res = await IngestionArticles(articles, feedName, domain);
    const { inserted, duplicatedArticles, Totalcount, failed, invalid } = res;

    for (let articleId of res.articleIds) {
      console.log(`Starting embedding: ${articleId}`);
      await embedArticle(articleId);
      console.log(`Embedding completed: ${articleId}`);

      await findCluster(articleId);
      console.log(`Clustering completed: ${articleId}`);
    }
    console.log(`Finished feed: ${feedName}`);
    console.log({ Totalcount, inserted, duplicatedArticles, failed, invalid });

    //BullMQ records the returned value as the job's result.
    return {
      Totalcount,
      inserted,
      duplicatedArticles,
      failed,
      invalid,
    };
  },
  {
    connection,
    concurrency: 1, //It means this worker can process up to 3 jobs at the same time.
  },
);

feedWorker.on("completed", (job) => {
  console.log(`job ${job.id} completed (coming from feedworker.on)`);
  console.log("------------------------------------------")
});

feedWorker.on("failed", (job, err) => {
  console.log(`job ${job?.id} failed with Erorr ${err}`);
  console.log("------------------------------------------")
});
