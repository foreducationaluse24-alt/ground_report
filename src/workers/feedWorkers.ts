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
  "feed-ingestion",
  async (job) => {
    //"feed-ingestion" => That's how BullMQ knows:This worker handles jobs from this queue.

    const { feedName, rssUrl } = job.data;

    const articles = await Rss_Parser(rssUrl);
    const res = await IngestionArticles(articles, feedName);
    const { inserted, duplicatedArticles, Totalcount, failed, invalid } = res;

    for (let articleId of res.articleIds) {
      await embedArticle(articleId);
      await findCluster(articleId);
    }
    console.log(`Finished feed: ${feedName}`);
    console.log({Totalcount,inserted,duplicatedArticles,failed,invalid});
    
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
    concurrency : 3 //It means this worker can process up to 3 jobs at the same time.
  },
);

feedWorker.on("completed", (job) => {
  console.log(`job ${job.id} completed`);
});

feedWorker.on("failed", (job, err) => {
  console.log(`job ${job?.id} failed with Erorr ${err}`);
});
