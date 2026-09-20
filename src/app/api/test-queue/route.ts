import { feedQueue } from "@/queue/feedQueue";


export async function GET(){

    //adding job to bullmq which then saves to redis
    const job = await feedQueue.add(
        "test-feed",{
            feedName : "test-feed",
            rssUrl : "https://feeds.bbci.co.uk/news/rss.xml",
        }
    )

    return Response.json({
        msg : "job added",
        jobId : job.id
    })
}