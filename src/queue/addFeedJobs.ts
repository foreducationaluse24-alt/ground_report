import { feeds } from "@/feeds/source";
import { feedQueue } from "./feedQueue";

//saving each feed into redis "process-feed" job queue
export async function addFeeds(){
    for(const feed of feeds){
        await feedQueue.add("process-feed",{
            feedName : feed.name,
            rssUrl : feed.rssUrl
        },{
            jobId : `${feed.name}`    //to prevent multiple job of same id to be on queue. by giving it a name bullmq does not allow same jobId job to be on the queue Simultaneously
        })
    }
}