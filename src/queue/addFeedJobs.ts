import { feeds } from "@/feeds/source";
import { feedQueue } from "./feedQueue";

//saving each feed into redis "process-feed" job queue
export async function addFeeds(){
    for(const feed of feeds){
        await feedQueue.add("process-feed",{
            feedName : feed.name,
            rssUrl : feed.rssUrl
        })
    }
}