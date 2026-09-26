import { feedQueue } from "../feedQueue";

async function test() {
  const job = await feedQueue.add("test-feed-job", {
    feedName: "TEST",
    rssUrl: "https://feeds.bbci.co.uk/news/rss.xml",
    domain: "bbc.com",
  });

  console.log("Added job:", job.id);

  await feedQueue.close();
}

test();