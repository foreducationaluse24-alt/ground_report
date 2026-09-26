import IORedis from "ioredis"
import { Worker } from "bullmq"
import { addFeeds } from "@/queue/addFeedJobs";

const connection = new IORedis(process.env.REDIS_URL!,{
    maxRetriesPerRequest : null
})

//listening to feed-shedular queue
const shedularWorker = new Worker("feed-scheduler",
    async (job) =>{
        console.log("-------------------------------------")
        console.log(`runnning schedular job : [${job.id}]`);
        await addFeeds();
        console.log("All feeds added to feed queue");
        
    },
    {
        connection 
    }
)


shedularWorker.on("completed",(job)=>{
    console.log(`Scheduler job ${job.id} completed (THIS IS ON COMPLETED LOG)`);
    console.log("-------------------------------------")
})


shedularWorker.on("failed",(job,err)=>{
    console.log(`Scheduler job ${job?.id} completed by error : ${err}`);
    console.log("-------------------------------------")
})