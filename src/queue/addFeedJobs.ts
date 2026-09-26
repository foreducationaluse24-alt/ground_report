import { feeds } from "@/feeds/source";
import { feedQueue } from "./feedQueue";

//saving each feed into redis "process-feed" job queue
export async function addFeeds(){
    for(const feed of feeds){
        const job = await feedQueue.add("process-feed",{
            feedName : feed.name,
            rssUrl : feed.rssUrl,
            domain : feed.domain
        },{
            jobId : `${feed.name}`,    //to prevent multiple job of same id to be on queue. by giving it a name bullmq does not allow same jobId job to be on the queue Simultaneously
            removeOnComplete : true,            
            removeDependencyOnFailure : true   //remove later
        })
        console.log(feed.name, "job id:", job.id);
    }
}





// Run feedScheduler.ts
//         ↓
// Schedule registered in Redis
//         ↓
// STOP EVERYTHING
//         ↓
// Wait 10 minutes
//         ↓
// Start schedulerWorker.ts
//         ↓
// BullMQ sees scheduled work
//         ↓
// process-feeds runs


//The scheduler survives your worker restarting because Redis is the persistent source of truth, not your Node process.